<?php

namespace App\Http\Controllers;

use App\Models\VideoGeneration;
use Illuminate\Http\Request;
use OpenAI\Laravel\Facades\OpenAI; // Pastikan titik koma ada di sini
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
class VideoController extends Controller 
{
    /**
     * Menampilkan halaman dashboard dengan riwayat data
     */
    public function index(Request $request) 
    {
        $query = VideoGeneration::where('user_id', auth()->id())->latest();

        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('topic', 'like', '%' . $searchTerm . '%')
                  ->orWhere('ai_output_script', 'like', '%' . $searchTerm . '%');
            });
        }

        return Inertia::render('Dashboard', [
            'history' => $query->get(),
            'filters' => $request->only(['search'])
        ]);
    }

    

public function generate(Request $request) {
    $apiKey = env('GEMINI_API_KEY');
    
    // Validasi opsional
    $keywords = $request->keywords ? "Keywords: {$request->keywords}." : "";
    $audience = $request->target_audience ? "Target Audience: {$request->target_audience}." : "";
    $duration = $request->duration ? "Durasi perkiraan: {$request->duration}." : "";

    $prompt = "Buat skrip video {$request->type} tentang {$request->topic} dengan tone {$request->tone}. " .
              "{$keywords} {$audience} {$duration} " .
              "Berikan output dalam format JSON valid dengan struktur: " .
              "{ \"script\": \"...\", \"scenes\": [{\"scene_number\": 1, \"description\": \"...\"}] }";

    try {
        $response = Http::withHeaders(['Content-Type' => 'application/json'])
            ->post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}", [
                'contents' => [
                    ['parts' => [['text' => $prompt]]]
                ],
                'generationConfig' => [
                    'response_mime_type' => 'application/json',
                ]
            ]);

        $data = $response->json();
        
        // Cek jika API mengembalikan error alih-alih candidates (misal: API key salah, limit, atau diblokir)
        if (!isset($data['candidates'])) {
            $errorDetail = isset($data['error']['message']) ? $data['error']['message'] : json_encode($data);
            
            // Terjemahkan pesan error yang umum agar lebih ramah pengguna
            if (stripos($errorDetail, 'high demand') !== false) {
                $userFriendlyMessage = "Server AI sedang sangat sibuk (High Demand). Mohon tunggu sekitar 1-2 menit dan tekan tombol Generate lagi.";
            } elseif (stripos($errorDetail, 'API key not valid') !== false) {
                $userFriendlyMessage = "Konfigurasi API Key tidak valid. Silakan periksa pengaturan sistem.";
            } elseif (stripos($errorDetail, 'quota') !== false) {
                $userFriendlyMessage = "Kuota penggunaan AI Anda telah habis untuk sementara waktu.";
            } elseif (stripos($errorDetail, 'safety') !== false || stripos($errorDetail, 'block') !== false) {
                $userFriendlyMessage = "Permintaan diblokir oleh sistem keamanan AI (mungkin mengandung kata sensitif). Silakan ubah topik Anda.";
            } else {
                $userFriendlyMessage = "Gagal terhubung ke AI: " . $errorDetail;
            }

            throw new \Exception($userFriendlyMessage);
        }
        $resultText = $data['candidates'][0]['content']['parts'][0]['text'];
        
        // Hapus bungkus markdown ```json ... ``` jika Gemini mengembalikannya dalam format markdown
        $resultText = preg_replace('/```json\s*/', '', $resultText);
        $resultText = preg_replace('/```\s*/', '', $resultText);
        $resultText = trim($resultText);

        $cleanData = json_decode($resultText, true);

        if (!$cleanData || !isset($cleanData['script'])) {
            throw new \Exception('Format respons AI tidak valid. Harap coba lagi.');
        }

        // Simpan ke database
        \App\Models\VideoGeneration::create([
            'user_id' => auth()->id(),
            'topic' => $request->topic,
            'keywords' => $request->keywords,
            'target_audience' => $request->target_audience,
            'duration' => $request->duration,
            'type' => $request->type,
            'tone' => $request->tone,
            'ai_output_script' => $cleanData['script'],
            'scenes' => $cleanData['scenes'],
        ]);

        return back();
    } catch (\Exception $e) {
        return back()->withErrors(['error' => $e->getMessage()]);
    }
}

    /**
     * Menghapus data video generation
     */
    public function destroy($id)
    {
        $video = VideoGeneration::where('user_id', auth()->id())->findOrFail($id);
        $video->delete();

        return back();
    }
}