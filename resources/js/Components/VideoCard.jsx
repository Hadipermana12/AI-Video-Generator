import { router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function VideoCard({ item, index = 0 }) {
    const [copied, setCopied] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    
    // --- VIDEO SIMULATION STATE ---
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    const SCENE_DURATION = 3500; // 3.5 detik per scene
    const UPDATE_INTERVAL = 50;

    useEffect(() => {
        let interval;
        if (isPlaying && item.scenes && item.scenes.length > 0) {
            interval = setInterval(() => {
                setProgress((prevProgress) => {
                    const newProgress = prevProgress + (UPDATE_INTERVAL / SCENE_DURATION) * 100;
                    if (newProgress >= 100) {
                        // Lanjut ke scene berikutnya
                        if (currentSceneIndex < item.scenes.length - 1) {
                            setCurrentSceneIndex(prev => prev + 1);
                            return 0; // reset progress bar
                        } else {
                            // Slideshow selesai
                            setIsPlaying(false);
                            setCurrentSceneIndex(0);
                            return 0;
                        }
                    }
                    return newProgress;
                });
            }, UPDATE_INTERVAL);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentSceneIndex, item.scenes]);

    const handlePlay = () => {
        setCurrentSceneIndex(0);
        setProgress(0);
        setIsPlaying(true);
    };

    const handleStop = () => {
        setIsPlaying(false);
        setCurrentSceneIndex(0);
        setProgress(0);
    };
    // --------------------------------

    // Fungsi format tanggal
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    // Delete handler
    const handleDelete = () => {
        if (confirm('Yakin ingin menghapus riwayat video ini?')) {
            setIsDeleting(true);
            router.delete(route('video.destroy', item.id), {
                preserveScroll: true,
                onFinish: () => setIsDeleting(false),
            });
        }
    };

    // Copy to clipboard
    const handleCopy = () => {
        let textToCopy = `Topik: ${item.topic}\nTipe: ${item.type}\nTone: ${item.tone}\n\n`;
        textToCopy += `--- SCRIPT ---\n${item.ai_output_script}\n\n`;
        textToCopy += `--- SCENES ---\n`;
        item.scenes?.forEach(scene => {
            textToCopy += `Scene ${scene.scene_number}: ${scene.description}\n`;
        });

        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    // Export TXT
    const handleExport = () => {
        let textToExport = `AI Video Generator Export\n`;
        textToExport += `Topik: ${item.topic}\n`;
        textToExport += `Tipe: ${item.type}\n`;
        textToExport += `Tone: ${item.tone}\n`;
        if (item.keywords) textToExport += `Keywords: ${item.keywords}\n`;
        if (item.target_audience) textToExport += `Target Audience: ${item.target_audience}\n`;
        if (item.duration) textToExport += `Duration: ${item.duration}\n`;
        textToExport += `Tanggal: ${formatDate(item.created_at)}\n\n`;
        
        textToExport += `=== SCRIPT ===\n${item.ai_output_script}\n\n`;
        textToExport += `=== SCENES ===\n`;
        item.scenes?.forEach(scene => {
            textToExport += `[Scene ${scene.scene_number}]\n${scene.description}\n\n`;
        });

        const blob = new Blob([textToExport], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Video_Script_${item.topic.replace(/\s+/g, '_')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <>
            <style>{`
                .vcard {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 16px;
                    padding: 1.5rem;
                    margin-bottom: 1.5rem;
                    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
                }

                .vcard:hover {
                    border-color: rgba(99, 102, 241, 0.5);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    transform: translateY(-2px);
                }

                .vcard-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1.25rem;
                    gap: 1rem;
                }

                .vcard-title {
                    font-size: 1.125rem;
                    font-weight: 700;
                    color: #fff;
                    margin-bottom: 0.25rem;
                }

                .vcard-meta {
                    font-size: 0.75rem;
                    color: rgba(255, 255, 255, 0.4);
                }

                .badge-group {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-top: 0.75rem;
                }

                .badge {
                    font-size: 0.7rem;
                    padding: 0.25rem 0.6rem;
                    border-radius: 6px;
                    font-weight: 600;
                    letter-spacing: 0.02em;
                }

                .badge-primary { background: rgba(99, 102, 241, 0.15); color: #a5b4fc; border: 1px solid rgba(99, 102, 241, 0.3); }
                .badge-secondary { background: rgba(20, 184, 166, 0.15); color: #5eead4; border: 1px solid rgba(20, 184, 166, 0.3); }
                .badge-outline { border: 1px solid rgba(255, 255, 255, 0.15); color: rgba(255, 255, 255, 0.6); }

                .vcard-content {
                    background: rgba(0, 0, 0, 0.2);
                    border-radius: 12px;
                    padding: 1.25rem;
                    margin-bottom: 1.25rem;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }

                .section-title {
                    font-size: 0.8125rem;
                    font-weight: 700;
                    color: #a5b4fc;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 0.75rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 0.375rem;
                }

                .section-title-left {
                    display: flex;
                    align-items: center;
                    gap: 0.375rem;
                }

                .section-title svg {
                    width: 18px;
                    height: 18px;
                    flex-shrink: 0;
                }

                .script-text {
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.8);
                    line-height: 1.6;
                    white-space: pre-line;
                }

                .scenes-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 0.75rem;
                }

                @media (min-width: 768px) {
                    .scenes-grid { grid-template-columns: repeat(2, 1fr); }
                }

                .scene-item {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 8px;
                    padding: 0.875rem;
                }

                .scene-number {
                    display: inline-block;
                    background: #6366f1;
                    color: white;
                    font-size: 0.65rem;
                    font-weight: 700;
                    padding: 0.15rem 0.4rem;
                    border-radius: 4px;
                    margin-bottom: 0.375rem;
                }

                .scene-desc {
                    font-size: 0.8125rem;
                    color: rgba(255, 255, 255, 0.7);
                    line-height: 1.5;
                }

                .vcard-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 0.75rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.08);
                    padding-top: 1.25rem;
                }

                .btn-action {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.375rem;
                    padding: 0.5rem 0.875rem;
                    border-radius: 8px;
                    font-size: 0.8125rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    border: 1px solid transparent;
                }

                .btn-action svg { width: 14px; height: 14px; }

                .btn-copy { background: rgba(255, 255, 255, 0.1); color: #fff; }
                .btn-copy:hover { background: rgba(255, 255, 255, 0.15); }
                .btn-export { background: rgba(99, 102, 241, 0.15); color: #a5b4fc; border-color: rgba(99, 102, 241, 0.3); }
                .btn-export:hover { background: rgba(99, 102, 241, 0.25); }
                .btn-delete { background: transparent; color: #fca5a5; border-color: rgba(248, 113, 113, 0.3); }
                .btn-delete:hover { background: rgba(248, 113, 113, 0.15); }
                .btn-delete:disabled { opacity: 0.5; cursor: not-allowed; }

                .btn-play {
                    background: linear-gradient(135deg, #10b981, #059669);
                    color: white;
                    padding: 0.4rem 0.75rem;
                    border-radius: 6px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    transition: transform 0.2s;
                }
                .btn-play:hover { transform: scale(1.05); }

                /* Slideshow Player UI */
                .video-player {
                    background: #000;
                    border-radius: 12px;
                    overflow: hidden;
                    position: relative;
                    aspect-ratio: 16/9;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                    border: 1px solid rgba(255,255,255,0.1);
                }

                .player-content {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    text-align: center;
                    background: radial-gradient(circle at center, #1e1b4b, #000);
                    position: relative;
                }

                .player-scene-num {
                    position: absolute;
                    top: 1rem; left: 1rem;
                    background: rgba(255,255,255,0.1);
                    padding: 0.25rem 0.75rem;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: #fff;
                    border: 1px solid rgba(255,255,255,0.2);
                }

                .player-text {
                    font-size: 1.25rem;
                    color: #fff;
                    line-height: 1.6;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.8);
                }

                .player-controls {
                    background: rgba(0,0,0,0.8);
                    padding: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    border-top: 1px solid rgba(255,255,255,0.1);
                }

                .btn-control {
                    background: transparent;
                    border: none;
                    color: #fff;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 32px; height: 32px;
                    border-radius: 50%;
                    transition: background 0.2s;
                }
                .btn-control:hover { background: rgba(255,255,255,0.1); }
                .btn-control svg { width: 20px; height: 20px; }

                .progress-container {
                    flex: 1;
                    height: 6px;
                    background: rgba(255,255,255,0.2);
                    border-radius: 3px;
                    overflow: hidden;
                }

                .progress-bar {
                    height: 100%;
                    background: #6366f1;
                    transition: width 0.05s linear;
                }
            `}</style>

            <motion.div 
                className="vcard"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ y: -5, boxShadow: "0 15px 35px rgba(0,0,0,0.3)", borderColor: "rgba(99, 102, 241, 0.6)" }}
            >
                <div className="vcard-header">
                    <div>
                        <h4 className="vcard-title">{item.topic}</h4>
                        <div className="vcard-meta">Dibuat pada {formatDate(item.created_at)}</div>
                        
                        <div className="badge-group">
                            <span className="badge badge-primary">{item.type}</span>
                            <span className="badge badge-secondary">{item.tone}</span>
                            {item.duration && <span className="badge badge-outline">{item.duration}</span>}
                            {item.target_audience && <span className="badge badge-outline">Audience: {item.target_audience}</span>}
                        </div>
                        {item.keywords && (
                            <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
                                <span style={{ color: '#a5b4fc' }}>Keywords:</span> {item.keywords}
                            </div>
                        )}
                    </div>
                </div>

                <div className="vcard-content">
                    <div className="section-title">
                        <div className="section-title-left">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Generated Script
                        </div>
                    </div>
                    <p className="script-text">{item.ai_output_script}</p>
                </div>

                {item.scenes && item.scenes.length > 0 && (
                    <div className="vcard-content">
                        <div className="section-title">
                            <div className="section-title-left">
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.677V15.32a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                                </svg>
                                Scene Breakdown
                            </div>
                            {!isPlaying && (
                                <button onClick={handlePlay} className="btn-play">
                                    <svg fill="currentColor" viewBox="0 0 24 24" style={{ width: 14, height: 14 }}>
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                    Play Simulation
                                </button>
                            )}
                        </div>

                        {isPlaying ? (
                            <div className="video-player">
                                <div className="player-content">
                                    <div className="player-scene-num">
                                        Scene {item.scenes[currentSceneIndex]?.scene_number} / {item.scenes.length}
                                    </div>
                                    <div className="player-text">
                                        "{item.scenes[currentSceneIndex]?.description}"
                                    </div>
                                </div>
                                <div className="player-controls">
                                    <button onClick={handleStop} className="btn-control">
                                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                                        </svg>
                                    </button>
                                    <div className="progress-container">
                                        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="scenes-grid">
                                {item.scenes.map((scene, idx) => (
                                    <div key={idx} className="scene-item">
                                        <span className="scene-number">Scene {scene.scene_number}</span>
                                        <p className="scene-desc">{scene.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                <div className="vcard-actions">
                    <button onClick={handleCopy} className="btn-action btn-copy">
                        {copied ? (
                            <>
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                Tersalin!
                            </>
                        ) : (
                            <>
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Copy Text
                            </>
                        )}
                    </button>
                    
                    <button onClick={handleExport} className="btn-action btn-export">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Export .TXT
                    </button>

                    <button 
                        onClick={handleDelete} 
                        disabled={isDeleting}
                        className="btn-action btn-delete"
                    >
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        {isDeleting ? 'Menghapus...' : 'Hapus'}
                    </button>
                </div>
            </motion.div>
        </>
    );
}