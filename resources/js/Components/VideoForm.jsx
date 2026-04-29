export default function VideoForm({ data, setData, post, processing, errors }) {
    const submit = (e) => {
        e.preventDefault();
        post(route('video.generate'), {
            onSuccess: () => {
                setData('topic', '');
                setData('keywords', '');
                setData('target_audience', '');
                setData('duration', '');
            },
        });
    };

    const videoTypes = [
        { value: 'Marketing', label: '📣 Marketing', desc: 'Promosi produk & brand' },
        { value: 'Educational', label: '🎓 Educational', desc: 'Tutorial & penjelasan' },
        { value: 'Entertainment', label: '🎬 Entertainment', desc: 'Hiburan & storytelling' },
        { value: 'Corporate', label: '🏢 Corporate', desc: 'Presentasi perusahaan' },
    ];

    const toneOptions = [
        { value: 'Professional', label: '💼 Professional', desc: 'Formal & kredibel' },
        { value: 'Casual', label: '😊 Casual', desc: 'Santai & akrab' },
        { value: 'Energetic', label: '⚡ Energetic', desc: 'Semangat & dinamis' },
        { value: 'Inspirational', label: '✨ Inspirational', desc: 'Memotivasi & menginspirasi' },
    ];

    return (
        <>
            <style>{`
                .vform-card {
                    background: linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 20px;
                    padding: 2rem;
                    position: relative;
                    overflow: hidden;
                    transition: border-color 0.3s;
                }

                .vform-card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 2px;
                    background: linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4);
                }

                .vform-title {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #fff;
                    margin-bottom: 0.25rem;
                    display: flex;
                    align-items: center;
                    gap: 0.625rem;
                }

                .vform-title-icon {
                    width: 36px; height: 36px;
                    background: linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.3));
                    border: 1px solid rgba(99,102,241,0.4);
                    border-radius: 10px;
                    display: flex; align-items: center; justify-content: center;
                }

                .vform-title-icon svg { width: 18px; height: 18px; color: #a5b4fc; }

                .vform-subtitle {
                    font-size: 0.85rem;
                    color: rgba(255,255,255,0.4);
                    margin-bottom: 1.75rem;
                    padding-left: 2.75rem;
                }

                .vform-label {
                    display: block;
                    font-size: 0.8125rem;
                    font-weight: 600;
                    color: rgba(255,255,255,0.6);
                    text-transform: uppercase;
                    letter-spacing: 0.06em;
                    margin-bottom: 0.625rem;
                }

                .vform-input {
                    width: 100%;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    color: #fff;
                    font-size: 1rem;
                    padding: 0.875rem 1rem;
                    outline: none;
                    transition: all 0.25s;
                    font-family: 'Inter', sans-serif;
                }

                .vform-input::placeholder { color: rgba(255,255,255,0.25); }

                .vform-input:focus {
                    border-color: rgba(99,102,241,0.6);
                    background: rgba(99,102,241,0.07);
                    box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
                }

                .vform-error {
                    color: #fca5a5;
                    font-size: 0.8rem;
                    margin-top: 0.375rem;
                }

                /* Type/Tone selector grid */
                .option-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 0.625rem;
                    margin-bottom: 1.5rem;
                }

                @media (min-width: 768px) {
                    .option-grid { grid-template-columns: repeat(4, 1fr); }
                }

                .option-card {
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 12px;
                    padding: 0.875rem 0.75rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    background: rgba(255,255,255,0.03);
                    text-align: center;
                }

                .option-card:hover {
                    border-color: rgba(99,102,241,0.4);
                    background: rgba(99,102,241,0.07);
                }

                .option-card.selected {
                    border-color: rgba(99,102,241,0.7);
                    background: rgba(99,102,241,0.12);
                    box-shadow: 0 0 0 1px rgba(99,102,241,0.3);
                }

                .option-label {
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: rgba(255,255,255,0.85);
                    display: block;
                    margin-bottom: 0.125rem;
                }

                .option-card.selected .option-label { color: #a5b4fc; }

                .option-desc {
                    font-size: 0.75rem;
                    color: rgba(255,255,255,0.35);
                    display: block;
                    line-height: 1.3;
                }

                .option-card.selected .option-desc { color: rgba(165,180,252,0.7); }

                /* Sections row */
                .vform-row {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                    margin-bottom: 1.75rem;
                }

                @media (min-width: 768px) {
                    .vform-row { grid-template-columns: 1fr 1fr; }
                }

                /* Generate button */
                .gen-btn {
                    width: 100%;
                    padding: 1rem;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    border: none;
                    border-radius: 14px;
                    color: white;
                    font-size: 1rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s;
                    font-family: 'Inter', sans-serif;
                    box-shadow: 0 4px 20px rgba(99,102,241,0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.625rem;
                    letter-spacing: 0.01em;
                    position: relative;
                    overflow: hidden;
                }

                .gen-btn::before {
                    content: '';
                    position: absolute;
                    top: 0; left: -100%;
                    width: 100%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
                    transition: left 0.5s;
                }

                .gen-btn:hover::before { left: 100%; }

                .gen-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 30px rgba(99,102,241,0.55);
                }

                .gen-btn:active { transform: translateY(0); }

                .gen-btn:disabled {
                    opacity: 0.65;
                    cursor: not-allowed;
                    transform: none;
                }

                .gen-btn svg { width: 20px; height: 20px; }

                /* Spinner */
                .spinner {
                    width: 18px; height: 18px;
                    border: 2.5px solid rgba(255,255,255,0.3);
                    border-top-color: #fff;
                    border-radius: 50%;
                    animation: spin 0.7s linear infinite;
                }

                @keyframes spin { to { transform: rotate(360deg); } }

                .topic-input-wrap { margin-bottom: 1.5rem; }

                /* Premium Loading State */
                .processing-state {
                    background: rgba(99, 102, 241, 0.08);
                    border: 1px solid rgba(99, 102, 241, 0.3);
                    border-radius: 14px;
                    padding: 1.5rem;
                    text-align: center;
                    animation: pulseBg 2s infinite;
                }
                
                @keyframes pulseBg {
                    0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
                    70% { box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
                }

                .processing-text {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                    color: #a5b4fc;
                    font-weight: 600;
                    margin-bottom: 1rem;
                    font-size: 1.05rem;
                }

                .processing-bar-bg {
                    height: 8px;
                    background: rgba(255,255,255,0.1);
                    border-radius: 4px;
                    overflow: hidden;
                    position: relative;
                }

                .processing-bar-fill {
                    position: absolute;
                    top: 0; left: 0; bottom: 0;
                    width: 50%;
                    background: linear-gradient(90deg, #6366f1, #06b6d4, #8b5cf6);
                    background-size: 200% 100%;
                    animation: loadingBar 2s infinite ease-in-out;
                    border-radius: 4px;
                }

                @keyframes loadingBar {
                    0% { left: -50%; }
                    100% { left: 100%; }
                }
            `}</style>

            <div className="vform-card">
                {errors.error && (
                    <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', padding: '1rem', borderRadius: '12px', color: '#fca5a5', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: 20, height: 20 }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        {errors.error}
                    </div>
                )}
                
                <div className="vform-title">
                    <div className="vform-title-icon">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    Buat Strategi Video AI
                </div>
                <p className="vform-subtitle">Masukkan detail dan biarkan AI membuat skrip video untuk Anda</p>

                <form onSubmit={submit}>
                    {/* Topic */}
                    <div className="topic-input-wrap">
                        <label className="vform-label">
                            <svg style={{ width: 12, height: 12, display: 'inline', marginRight: 5 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                            </svg>
                            Topik Video
                        </label>
                        <input
                            type="text"
                            value={data.topic}
                            className="vform-input"
                            placeholder="Contoh: Cara memasak nasi goreng spesial, Tips investasi saham pemula..."
                            onChange={(e) => setData('topic', e.target.value)}
                            required
                        />
                        {errors.topic && <div className="vform-error">{errors.topic}</div>}
                    </div>

                    <div className="vform-row">
                        {/* Keywords */}
                        <div className="topic-input-wrap" style={{ marginBottom: 0 }}>
                            <label className="vform-label">
                                <svg style={{ width: 12, height: 12, display: 'inline', marginRight: 5 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                </svg>
                                Kata Kunci (Keywords)
                            </label>
                            <input
                                type="text"
                                value={data.keywords || ''}
                                className="vform-input"
                                placeholder="Contoh: pemula, tips hemat, investasi aman (Opsional)"
                                onChange={(e) => setData('keywords', e.target.value)}
                            />
                        </div>

                        {/* Target Audience */}
                        <div className="topic-input-wrap" style={{ marginBottom: 0 }}>
                            <label className="vform-label">
                                <svg style={{ width: 12, height: 12, display: 'inline', marginRight: 5 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                Target Audiens
                            </label>
                            <input
                                type="text"
                                value={data.target_audience || ''}
                                className="vform-input"
                                placeholder="Contoh: Anak muda umur 18-24 tahun (Opsional)"
                                onChange={(e) => setData('target_audience', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="topic-input-wrap">
                        <label className="vform-label">
                            <svg style={{ width: 12, height: 12, display: 'inline', marginRight: 5 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Estimasi Durasi
                        </label>
                        <select
                            value={data.duration || ''}
                            className="vform-input"
                            style={{ appearance: 'none' }}
                            onChange={(e) => setData('duration', e.target.value)}
                        >
                            <option value="" style={{ background: '#1e1b4b', color: '#fff' }}>Tidak ditentukan (Opsional)</option>
                            <option value="15s" style={{ background: '#1e1b4b', color: '#fff' }}>15 Detik (Reels/TikTok pendek)</option>
                            <option value="30s" style={{ background: '#1e1b4b', color: '#fff' }}>30 Detik</option>
                            <option value="60s" style={{ background: '#1e1b4b', color: '#fff' }}>1 Menit (Standard Short)</option>
                            <option value="3m" style={{ background: '#1e1b4b', color: '#fff' }}>3 Menit (YouTube Video)</option>
                        </select>
                    </div>

                    <div className="vform-row">
                        {/* Type */}
                        <div>
                            <label className="vform-label">
                                <svg style={{ width: 12, height: 12, display: 'inline', marginRight: 5 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                                </svg>
                                Tipe Video
                            </label>
                            <div className="option-grid">
                                {videoTypes.map((t) => (
                                    <div
                                        key={t.value}
                                        className={`option-card ${data.type === t.value ? 'selected' : ''}`}
                                        onClick={() => setData('type', t.value)}
                                    >
                                        <span className="option-label">{t.label}</span>
                                        <span className="option-desc">{t.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tone */}
                        <div>
                            <label className="vform-label">
                                <svg style={{ width: 12, height: 12, display: 'inline', marginRight: 5 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                Tone / Gaya
                            </label>
                            <div className="option-grid">
                                {toneOptions.map((t) => (
                                    <div
                                        key={t.value}
                                        className={`option-card ${data.tone === t.value ? 'selected' : ''}`}
                                        onClick={() => setData('tone', t.value)}
                                    >
                                        <span className="option-label">{t.label}</span>
                                        <span className="option-desc">{t.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {processing ? (
                        <div className="processing-state">
                            <div className="processing-text">
                                <div className="spinner" style={{ width: 22, height: 22, borderWidth: 3 }}></div>
                                AI Sedang Membuat Simulasi Video...
                            </div>
                            <div className="processing-bar-bg">
                                <div className="processing-bar-fill"></div>
                            </div>
                            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.75rem' }}>
                                Mohon tunggu sebentar, ini mungkin memakan waktu beberapa detik.
                            </p>
                        </div>
                    ) : (
                        <button type="submit" className="gen-btn">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Generate Simulasi Video
                        </button>
                    )}
                </form>
            </div>
        </>
    );
}