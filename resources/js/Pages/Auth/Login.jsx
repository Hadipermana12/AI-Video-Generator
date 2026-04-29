import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in - AI Video Generator" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

                * { box-sizing: border-box; margin: 0; padding: 0; }

                .login-bg {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #0f0c29 0%, #1a1a2e 40%, #16213e 70%, #0f3460 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Inter', sans-serif;
                    position: relative;
                    overflow: hidden;
                }

                .login-bg::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(ellipse at center, rgba(99, 102, 241, 0.15) 0%, transparent 60%);
                    animation: rotateGlow 20s linear infinite;
                }

                @keyframes rotateGlow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    opacity: 0.25;
                    animation: floatOrb 8s ease-in-out infinite;
                }

                .orb-1 {
                    width: 400px; height: 400px;
                    background: #6366f1;
                    top: -100px; right: -100px;
                    animation-delay: 0s;
                }

                .orb-2 {
                    width: 350px; height: 350px;
                    background: #8b5cf6;
                    bottom: -80px; left: -80px;
                    animation-delay: 4s;
                }

                .orb-3 {
                    width: 200px; height: 200px;
                    background: #06b6d4;
                    top: 50%; left: 30%;
                    animation-delay: 2s;
                }

                @keyframes floatOrb {
                    0%, 100% { transform: translateY(0px) scale(1); }
                    50% { transform: translateY(-30px) scale(1.05); }
                }

                .login-card {
                    position: relative;
                    z-index: 10;
                    width: 100%;
                    max-width: 440px;
                    margin: 1rem;
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 24px;
                    padding: 2.5rem;
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1);
                    animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }

                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .brand-icon {
                    width: 64px; height: 64px;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1.5rem;
                    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
                }

                .brand-icon svg {
                    width: 32px; height: 32px;
                    color: white;
                }

                .login-title {
                    text-align: center;
                    margin-bottom: 0.5rem;
                    font-size: 1.75rem;
                    font-weight: 700;
                    background: linear-gradient(135deg, #fff, #a5b4fc);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .login-subtitle {
                    text-align: center;
                    color: rgba(255,255,255,0.5);
                    font-size: 0.875rem;
                    margin-bottom: 2rem;
                }

                .status-msg {
                    background: rgba(34, 197, 94, 0.1);
                    border: 1px solid rgba(34, 197, 94, 0.3);
                    border-radius: 10px;
                    color: #86efac;
                    font-size: 0.875rem;
                    padding: 0.75rem 1rem;
                    margin-bottom: 1.25rem;
                }

                .form-group {
                    margin-bottom: 1.25rem;
                }

                .form-label {
                    display: block;
                    color: rgba(255,255,255,0.7);
                    font-size: 0.875rem;
                    font-weight: 500;
                    margin-bottom: 0.5rem;
                }

                .form-input {
                    width: 100%;
                    background: rgba(255,255,255,0.07);
                    border: 1px solid rgba(255,255,255,0.12);
                    border-radius: 12px;
                    color: #fff;
                    font-size: 0.9375rem;
                    padding: 0.75rem 1rem;
                    transition: all 0.25s;
                    outline: none;
                    font-family: 'Inter', sans-serif;
                }

                .form-input::placeholder {
                    color: rgba(255,255,255,0.3);
                }

                .form-input:focus {
                    border-color: rgba(99, 102, 241, 0.7);
                    background: rgba(255,255,255,0.1);
                    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
                }

                .form-error {
                    color: #fca5a5;
                    font-size: 0.8rem;
                    margin-top: 0.375rem;
                }

                .remember-row {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 1.5rem;
                }

                .remember-row input[type="checkbox"] {
                    width: 16px; height: 16px;
                    accent-color: #6366f1;
                    cursor: pointer;
                }

                .remember-label {
                    color: rgba(255,255,255,0.6);
                    font-size: 0.875rem;
                    cursor: pointer;
                }

                .login-btn {
                    width: 100%;
                    padding: 0.875rem;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    border: none;
                    border-radius: 12px;
                    color: white;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s;
                    font-family: 'Inter', sans-serif;
                    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
                    position: relative;
                    overflow: hidden;
                }

                .login-btn::before {
                    content: '';
                    position: absolute;
                    top: 0; left: -100%;
                    width: 100%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
                    transition: left 0.5s;
                }

                .login-btn:hover::before { left: 100%; }

                .login-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.5);
                }

                .login-btn:active { transform: translateY(0); }

                .login-btn:disabled {
                    opacity: 0.65;
                    cursor: not-allowed;
                    transform: none;
                }

                .forgot-link {
                    display: block;
                    text-align: center;
                    margin-top: 1.25rem;
                    color: rgba(165, 180, 252, 0.8);
                    font-size: 0.875rem;
                    text-decoration: none;
                    transition: color 0.2s;
                }

                .forgot-link:hover { color: #a5b4fc; }

                .divider {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin: 1.25rem 0;
                }

                .divider::before, .divider::after {
                    content: '';
                    flex: 1;
                    height: 1px;
                    background: rgba(255,255,255,0.1);
                }

                .divider span {
                    color: rgba(255,255,255,0.3);
                    font-size: 0.8rem;
                }

                .register-link {
                    display: block;
                    text-align: center;
                    color: rgba(255,255,255,0.5);
                    font-size: 0.875rem;
                }

                .register-link a {
                    color: #a5b4fc;
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.2s;
                }

                .register-link a:hover { color: #818cf8; }
            `}</style>

            <div className="login-bg">
                {/* Decorative orbs */}
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="orb orb-3" />

                <div className="login-card">
                    {/* Brand Icon */}
                    <div className="brand-icon">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M15 10l4.553-2.276A1 1 0 0121 8.677V15.32a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                        </svg>
                    </div>

                    <h1 className="login-title">AI Video Generator</h1>
                    <p className="login-subtitle">Masuk untuk mulai membuat video AI</p>

                    {status && (
                        <div className="status-msg">{status}</div>
                    )}

                    <form onSubmit={submit}>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="form-input"
                                placeholder="nama@email.com"
                                autoComplete="username"
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            {errors.email && <div className="form-error">{errors.email}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="form-input"
                                placeholder="••••••••"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            {errors.password && <div className="form-error">{errors.password}</div>}
                        </div>

                        <div className="remember-row">
                            <input
                                type="checkbox"
                                id="remember"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <label htmlFor="remember" className="remember-label">Ingat saya</label>
                        </div>

                        <button type="submit" className="login-btn" disabled={processing}>
                            {processing ? 'Memproses...' : 'Masuk'}
                        </button>
                    </form>

                    {canResetPassword && (
                        <Link href={route('password.request')} className="forgot-link">
                            Lupa password?
                        </Link>
                    )}


                </div>
            </div>
        </>
    );
}
