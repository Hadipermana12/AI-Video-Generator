import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import VideoForm from '@/Components/VideoForm';
import VideoCard from '@/Components/VideoCard';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Dashboard({ auth, history, filters }) {
    const { data, setData, post, processing, errors } = useForm({
        topic: '',
        keywords: '',
        target_audience: '',
        duration: '',
        type: 'Marketing',
        tone: 'Professional',
    });

    const [search, setSearch] = useState(filters?.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('dashboard'), { search }, { preserveState: true, preserveScroll: true });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">AI Video Strategy</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12 px-4">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Menggunakan Komponen Form */}
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <VideoForm 
                            data={data} 
                            setData={setData} 
                            post={post} 
                            processing={processing} 
                            errors={errors} 
                        />
                    </motion.div>

                    {/* Menggunakan Komponen Card dalam Loop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                            <h3 className="text-2xl font-bold text-white mb-4 sm:mb-0">Riwayat Generasi</h3>
                            <form onSubmit={handleSearch} className="relative w-full sm:w-1/3">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari topik atau script..."
                                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl pl-4 pr-10 py-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-500"
                                />
                                <button type="submit" className="absolute right-3 top-2.5 text-gray-400 hover:text-white">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </button>
                            </form>
                        </div>

                        {history.length > 0 ? (
                            history.map((item, index) => <VideoCard key={item.id} item={item} index={index} />)
                        ) : (
                            <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 text-center">
                                <p className="text-gray-400">Belum ada riwayat atau tidak ditemukan hasil pencarian.</p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}