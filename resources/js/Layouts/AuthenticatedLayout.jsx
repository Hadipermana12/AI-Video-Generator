import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ children }) {
    const user = usePage().props.auth.user;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

                *, *::before, *::after { box-sizing: border-box; }

                body {
                    margin: 0;
                    font-family: 'Inter', sans-serif;
                    background: #0a0a0f;
                    color: #e2e8f0;
                    min-height: 100vh;
                }

                /* ===== NAVBAR ===== */
                .nav-wrapper {
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    background: rgba(10, 10, 20, 0.85);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(255,255,255,0.07);
                    box-shadow: 0 4px 30px rgba(0,0,0,0.4);
                }

                .nav-inner {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                    height: 64px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .nav-brand {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    text-decoration: none;
                }

                .nav-brand-icon {
                    width: 38px; height: 38px;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 14px rgba(99,102,241,0.4);
                    flex-shrink: 0;
                }

                .nav-brand-icon svg { width: 20px; height: 20px; color: white; }

                .nav-brand-text {
                    font-size: 1rem;
                    font-weight: 700;
                    background: linear-gradient(135deg, #fff, #a5b4fc);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    letter-spacing: -0.02em;
                }

                .nav-links {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                }

                .nav-link {
                    padding: 0.5rem 0.875rem;
                    border-radius: 8px;
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: rgba(255,255,255,0.6);
                    text-decoration: none;
                    transition: all 0.2s;
                }

                .nav-link:hover, .nav-link.active {
                    color: #fff;
                    background: rgba(255,255,255,0.08);
                }

                /* User Dropdown */
                .user-dropdown-wrap { position: relative; }

                .user-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.375rem 0.75rem 0.375rem 0.375rem;
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 10px;
                    background: rgba(255,255,255,0.05);
                    cursor: pointer;
                    transition: all 0.2s;
                    font-family: 'Inter', sans-serif;
                }

                .user-btn:hover {
                    background: rgba(255,255,255,0.1);
                    border-color: rgba(255,255,255,0.2);
                }

                .user-avatar {
                    width: 30px; height: 30px;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: white;
                    flex-shrink: 0;
                }

                .user-name {
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: rgba(255,255,255,0.85);
                }

                .user-chevron {
                    width: 14px; height: 14px;
                    color: rgba(255,255,255,0.4);
                    transition: transform 0.2s;
                }

                .user-chevron.open { transform: rotate(180deg); }

                .dropdown-menu {
                    position: absolute;
                    top: calc(100% + 0.5rem);
                    right: 0;
                    min-width: 180px;
                    background: rgba(20,20,40,0.95);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    padding: 0.375rem;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
                    animation: fadeInDown 0.15s ease;
                    z-index: 200;
                }

                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-8px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .dropdown-item {
                    display: block;
                    width: 100%;
                    text-align: left;
                    padding: 0.5rem 0.75rem;
                    border-radius: 8px;
                    font-size: 0.875rem;
                    color: rgba(255,255,255,0.7);
                    text-decoration: none;
                    cursor: pointer;
                    transition: all 0.15s;
                    background: none;
                    border: none;
                    font-family: 'Inter', sans-serif;
                    font-weight: 400;
                }

                .dropdown-item:hover {
                    background: rgba(255,255,255,0.08);
                    color: #fff;
                }

                .dropdown-divider {
                    height: 1px;
                    background: rgba(255,255,255,0.08);
                    margin: 0.25rem 0;
                }

                .dropdown-item.danger:hover {
                    background: rgba(239,68,68,0.15);
                    color: #fca5a5;
                }

                /* Main content */
                .app-main {
                    min-height: calc(100vh - 64px);
                }
            `}</style>

            <div>
                <nav className="nav-wrapper">
                    <div className="nav-inner">
                        {/* Brand */}
                        <Link href={route('dashboard')} className="nav-brand">
                            <div className="nav-brand-icon">
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M15 10l4.553-2.276A1 1 0 0121 8.677V15.32a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                                </svg>
                            </div>
                            <span className="nav-brand-text">AI Video Generator</span>
                        </Link>

                        {/* Nav Links + User */}
                        <div className="nav-links">
                            <Link href={route('dashboard')} className="nav-link active">
                                Dashboard
                            </Link>

                            {/* User Dropdown */}
                            <div className="user-dropdown-wrap" style={{ marginLeft: '0.5rem' }}>
                                <button
                                    className="user-btn"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    <div className="user-avatar">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="user-name">{user?.name}</span>
                                    <svg className={`user-chevron ${dropdownOpen ? 'open' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {dropdownOpen && (
                                    <>
                                        <div
                                            style={{ position: 'fixed', inset: 0, zIndex: 150 }}
                                            onClick={() => setDropdownOpen(false)}
                                        />
                                        <div className="dropdown-menu">
                                            <div style={{ padding: '0.375rem 0.75rem 0.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '0.25rem' }}>
                                                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.125rem' }}>Masuk sebagai</div>
                                                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#a5b4fc' }}>{user?.email}</div>
                                            </div>
                                            <Link
                                                href={route('profile.edit')}
                                                className="dropdown-item"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                <svg style={{ width: 14, height: 14, marginRight: 6, display: 'inline' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Profile
                                            </Link>
                                            <div className="dropdown-divider" />
                                            <Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                                className="dropdown-item danger"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                <svg style={{ width: 14, height: 14, marginRight: 6, display: 'inline' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                Keluar
                                            </Link>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                <main className="app-main">
                    {children}
                </main>
            </div>
        </>
    );
}
