import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, TrendingUp, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import adminAPI from '../../api/adminAPI';

const AdminRevenue = () => {
    const [loading, setLoading] = useState(true);
    const [revenueStats, setRevenueStats] = useState({
        subscriptionRevenue: 4580000,
        activeSubscriptions: 8234,
        conversionRate: 12.8,
        avgRevenuePerUser: 556
    });
    const [growthData, setGrowthData] = useState([]);
    const [plansData, setPlansData] = useState([]);

    useEffect(() => {
        fetchRevenueData();
    }, []);

    const fetchRevenueData = async () => {
        try {
            const [statsRes, growthRes, plansRes] = await Promise.all([
                adminAPI.getRevenueStats(),
                adminAPI.getRevenueGrowth(),
                adminAPI.getSubscriptionPlans()
            ]);

            setRevenueStats(statsRes.data);
            setGrowthData(growthRes.data);
            setPlansData(plansRes.data);
        } catch (error) {
            console.error('Revenue error:', error);
            // Fallback data
            setGrowthData([
                { month: 'Jan', revenue: 3200000, subscriptions: 7234 },
                { month: 'Feb', revenue: 3450000, subscriptions: 7589 },
                { month: 'Mar', revenue: 3800000, subscriptions: 7892 },
                { month: 'Apr', revenue: 4100000, subscriptions: 8045 },
                { month: 'May', revenue: 4250000, subscriptions: 8123 },
                { month: 'Jun', revenue: 4580000, subscriptions: 8234 },
            ]);

            setPlansData([
                { plan: 'Free', users: 4224, revenue: 0 },
                { plan: 'Basic (₹99/mo)', users: 4500, revenue: 445500 },
                { plan: 'Premium (₹199/mo)', users: 2800, revenue: 557200 },
                { plan: 'Enterprise (₹499/mo)', users: 934, revenue: 466166 },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const statsCards = [
        {
            title: 'Subscription Revenue',
            value: `₹${(revenueStats.subscriptionRevenue / 100000).toFixed(1)} L`,
            icon: DollarSign,
            trend: '+12.5% from last month',
            color: 'text-purple-400',
            bgColor: 'bg-purple-500/20',
        },
        {
            title: 'Active Subscriptions',
            value: revenueStats.activeSubscriptions.toLocaleString(),
            icon: Users,
            trend: '245 new this month',
            color: 'text-emerald-400',
            bgColor: 'bg-emerald-500/20',
        },
        {
            title: 'Conversion Rate',
            value: `${revenueStats.conversionRate}%`,
            icon: TrendingUp,
            trend: '+2.3% improvement',
            color: 'text-cyan-400',
            bgColor: 'bg-cyan-500/20',
        },
        {
            title: 'Avg Revenue per User',
            value: `₹${revenueStats.avgRevenuePerUser}`,
            icon: DollarSign,
            trend: 'Monthly average',
            color: 'text-pink-400',
            bgColor: 'bg-pink-500/20',
        },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Revenue & Reports</h1>
                <p className="text-gray-400">Financial overview and downloadable reports</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-[#1a2332] border border-gray-800/50 rounded-xl p-6"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <p className="text-sm text-gray-400">{stat.title}</p>
                                <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                                    <Icon className={`w-5 h-5 ${stat.color}`} />
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                            <p className="text-sm text-gray-500">{stat.trend}</p>
                        </motion.div>
                    );
                })}
            </div>

            {/* Revenue Growth Chart */}
            <div className="bg-[#1a2332] border border-gray-800/50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-6">Revenue Growth</h3>
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={growthData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                        <XAxis dataKey="month" stroke="#6b7280" />
                        <YAxis
                            yAxisId="left"
                            stroke="#6b7280"
                            tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            stroke="#6b7280"
                        />
                        <Tooltip
                            formatter={(value, name) => {
                                if (name === 'revenue') {
                                    return [`₹${(value / 100000).toFixed(2)} L`, 'Revenue'];
                                }
                                return [value, 'Subscriptions'];
                            }}
                            contentStyle={{
                                backgroundColor: '#1f2937',
                                border: '1px solid #374151',
                                borderRadius: '8px'
                            }}
                        />
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="revenue"
                            stroke="#a855f7"
                            strokeWidth={3}
                            dot={{ fill: '#a855f7', r: 5 }}
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="subscriptions"
                            stroke="#06b6d4"
                            strokeWidth={3}
                            dot={{ fill: '#06b6d4', r: 5 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Subscription Plans */}
            <div className="bg-[#1a2332] border border-gray-800/50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-6">Subscription Plans Breakdown</h3>
                <div className="space-y-4">
                    {plansData.map((plan, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-800/20 hover:bg-gray-800/40 transition-colors">
                            <div className="flex-1">
                                <p className="font-semibold text-white mb-1">{plan.plan}</p>
                                <p className="text-sm text-gray-400">{plan.users.toLocaleString('en-IN')} users</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-bold text-white">
                                    ₹{(plan.revenue / 100000).toFixed(2)} L
                                </p>
                                <p className="text-sm text-gray-400">
                                    {((plan.users / 12458) * 100).toFixed(1)}% of total
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Download Reports */}
            <div className="bg-[#1a2332] border border-gray-800/50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-6">Download Reports</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="flex flex-col items-center gap-3 p-6 rounded-lg border border-gray-700 hover:border-purple-500 hover:bg-purple-500/5 transition-all">
                        <Download className="w-8 h-8 text-purple-400" />
                        <div>
                            <p className="font-semibold text-white">Export CSV</p>
                            <p className="text-xs text-gray-400">Raw data format</p>
                        </div>
                    </button>

                    <button className="flex flex-col items-center gap-3 p-6 rounded-lg border border-gray-700 hover:border-emerald-500 hover:bg-emerald-500/5 transition-all">
                        <Download className="w-8 h-8 text-emerald-400" />
                        <div>
                            <p className="font-semibold text-white">Export Excel</p>
                            <p className="text-xs text-gray-400">Spreadsheet format</p>
                        </div>
                    </button>

                    <button className="flex flex-col items-center gap-3 p-6 rounded-lg border border-gray-700 hover:border-red-500 hover:bg-red-500/5 transition-all">
                        <Download className="w-8 h-8 text-red-400" />
                        <div>
                            <p className="font-semibold text-white">Download PDF</p>
                            <p className="text-xs text-gray-400">Complete report</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminRevenue;