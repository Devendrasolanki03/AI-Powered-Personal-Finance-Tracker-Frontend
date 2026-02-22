import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, Calendar, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import adminAPI from '../../api/adminAPI';

const AdminInsights = () => {
    const [loading, setLoading] = useState(true);
    const [insights, setInsights] = useState([]);
    const [stats, setStats] = useState({ highImpact: 0, mediumImpact: 0, lowImpact: 0 });
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [impactFilter, setImpactFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchInsights();
        fetchStats();
    }, [currentPage, typeFilter, impactFilter]);

    const fetchInsights = async () => {
        try {
            const response = await adminAPI.getAllInsights(
                currentPage - 1, 20, typeFilter, impactFilter
            );
            setInsights(response.data.content || []);
            setTotalPages(response.data.totalPages || 1);
        } catch (error) {
            console.error('Error:', error);
            // Fallback data
            setInsights([
                {
                    insightId: 1,
                    userName: 'Rajesh Kumar',
                    insightType: 'SAVINGS',
                    insightText: 'Identified potential savings of ₹3,500 in dining expenses',
                    location: 'Indore, Madhya Pradesh',
                    impact: 'HIGH',
                    createdAt: '2026-01-14'
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await adminAPI.getInsightsStats();
            setStats(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const getImpactBadge = (impact) => {
        const styles = {
            HIGH: 'bg-red-500/10 text-red-400',
            MEDIUM: 'bg-yellow-500/10 text-yellow-400',
            LOW: 'bg-emerald-500/10 text-emerald-400'
        };
        return styles[impact] || styles.LOW;
    };

    const getTypeBadge = (type) => {
        const styles = {
            SAVINGS: 'bg-emerald-500/10 text-emerald-400',
            BUDGET: 'bg-purple-500/10 text-purple-400',
            ALERT: 'bg-yellow-500/10 text-yellow-400'
        };
        return styles[type] || styles.SAVINGS;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">AI Insights Logs</h1>
                <p className="text-gray-400">Track all AI-generated recommendations</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-[#1a2332] border border-gray-800/50 rounded-xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-red-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">{stats.highImpact}</p>
                            <p className="text-sm text-gray-400">High Impact</p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#1a2332] border border-gray-800/50 rounded-xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-yellow-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">{stats.mediumImpact}</p>
                            <p className="text-sm text-gray-400">Medium Impact</p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#1a2332] border border-gray-800/50 rounded-xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">{stats.lowImpact}</p>
                            <p className="text-sm text-gray-400">Low Impact</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-[#1a2332] border border-gray-800/50 rounded-xl p-6">
                <div className="flex flex-wrap gap-4">
                    <input
                        type="text"
                        placeholder="Search insights..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 min-w-[200px] px-4 py-2 bg-[#0a0f1e] border border-gray-700 rounded-lg text-white"
                    />
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="px-4 py-2 bg-[#0a0f1e] border border-gray-700 rounded-lg text-white"
                    >
                        <option value="">All Types</option>
                        <option value="SAVINGS">Savings</option>
                        <option value="BUDGET">Budget</option>
                        <option value="ALERT">Alert</option>
                    </select>
                    <select
                        value={impactFilter}
                        onChange={(e) => setImpactFilter(e.target.value)}
                        className="px-4 py-2 bg-[#0a0f1e] border border-gray-700 rounded-lg text-white"
                    >
                        <option value="">All Impact</option>
                        <option value="HIGH">High</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="LOW">Low</option>
                    </select>
                </div>
            </div>

            {/* Insights List */}
            <div className="space-y-4">
                {insights.map((insight) => (
                    <div key={insight.insightId} className="bg-[#1a2332] border border-gray-800/50 rounded-xl p-6 hover:border-gray-700/50 transition-all">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                                <Sparkles className="w-6 h-6 text-purple-400" />
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                    <h3 className="font-semibold text-white">{insight.userName}</h3>
                                    <span className="text-gray-500">•</span>
                                    <span className="text-sm text-gray-400">INS-{insight.insightId}</span>
                                    <span className={`px-3 py-1 rounded-full text-sm ${getTypeBadge(insight.insightType)}`}>
                                        {insight.insightType}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-sm ${getImpactBadge(insight.impact)}`}>
                                        {insight.impact} Impact
                                    </span>
                                </div>
                                <p className="text-white mb-4">{insight.insightText}</p>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        <span>{insight.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>{new Date(insight.createdAt).toLocaleDateString('en-IN')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">Page {currentPage} of {totalPages}</p>
                <div className="flex gap-2">
                    <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg bg-[#1a2332] border border-gray-700 text-gray-400 hover:text-white disabled:opacity-50"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg bg-[#1a2332] border border-gray-700 text-gray-400 hover:text-white disabled:opacity-50"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminInsights;