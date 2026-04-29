import React, { useState } from 'react';
import axios from 'axios';

const VideoGenerator = () => {
  const [formData, setFormData] = useState({ topic: '', type: 'marketing', tone: 'formal' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/generate-video', formData);
      setResult(res.data);
    } catch (err) {
      alert("Gagal generate video simulation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4">AI Video Generator</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          className="w-full p-2 border rounded"
          placeholder="Topik Video (Contoh: Jualan Sepatu)" 
          onChange={(e) => setFormData({...formData, topic: e.target.value})}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <select className="p-2 border rounded" onChange={(e) => setFormData({...formData, type: e.target.value})}>
            <option value="marketing">Marketing</option>
            <option value="educational">Edukasi</option>
            <option value="reel">Social Media Reel</option>
          </select>
          <select className="p-2 border rounded" onChange={(e) => setFormData({...formData, tone: e.target.value})}>
            <option value="formal">Formal</option>
            <option value="casual">Santai</option>
            <option value="persuasive">Persuasif</option>
          </select>
        </div>
        <button 
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Sedang Meracik AI..." : "Generate Video Simulation"}
        </button>
      </form>

      {result && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-bold text-lg">Hasil Skrip:</h3>
          <p className="mb-4 italic">"{result.ai_output_script}"</p>
          <h3 className="font-bold">Breakdown Adegan:</h3>
          <div className="space-y-2">
            {result.scenes.map((scene, i) => (
              <div key={i} className="p-2 bg-blue-100 rounded border border-blue-200">
                <strong>Scene {scene.scene_number}:</strong> {scene.description}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGenerator;