<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VideoGeneration extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 
        'topic', 
        'keywords',
        'target_audience',
        'duration',
        'type', 
        'tone', 
        'ai_output_script', 
        'scenes'
    ];

    // Mengonversi kolom 'scenes' dari JSON di database menjadi Array di Laravel secara otomatis
    protected $casts = [
        'scenes' => 'array',
    ];
}