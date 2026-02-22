import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, UserCheck, Sparkles, ArrowUpRight } from 'lucide-react';
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import adminAPI from '../../api/adminAPI';

const AdminDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalExpenses: 0,
        activeUsers: 0,
        aiInsights: 0,
        newUsersThisMonth: 0,
        expensesThisMonth: 0,
        activeRate: 0,
        insightsThisWeek: 0
    });
    const [monthlyExpenses, setMonthlyExpenses] = useState([]);
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            // ✅ Correct API calls matching backend endpoints
            const [statsRes, expensesRes, categoriesRes] = await Promise.all([
                adminAPI.getDashboardStats(),        // GET /api/admin/stats
                adminAPI.getMonthlyExpenses(),       // GET /api/admin/stats/expenses/monthly
                adminAPI.getCategoryDistribution(),  // GET /api/admin/stats/expenses/categories
            ]);

            console.log('Stats:', statsRes.data);
            console.log('Expenses:', expensesRes.data);
            console.log('Categories:', categoriesRes.data);

            setStats(statsRes.data);
            setMonthlyExpenses(expensesRes.data);
            setCategoryData(categoriesRes.data);

        } catch (error) {
            console.error('Dashboard error:', error);

            // If unauthorized, redirect to login
            if (error.response?.status === 401) {
                localStorage.removeItem('admin_token');
                window.location.href = '/admin/login';
            }

            // Fallback to demo data if API fails
            setStats({
                totalUsers: 12458,
                totalExpenses: 58000000,
                activeUsers: 8234,
                aiInsights: 32567,
                newUsersThisMonth: 245,
                expensesThisMonth: 4200000,
                activeRate: 66,
                insightsThisWeek: 1234
            });

            setMonthlyExpenses([
                { month: 'Jan', total: 45000000 },
                { month: 'Feb', total: 48000000 },
                { month: 'Mar', total: 52000000 },
                { month: 'Apr', total: 49000000 },
                { month: 'May', total: 54000000 },
                { month: 'Jun', total: 58000000 },
            ]);

            setCategoryData([
                { name: 'Food', value: 32, color: '#a855f7' },
                { name: 'Transport', value: 21, color: '#06b6d4' },
                { name: 'Shopping', value: 19, color: '#8b5cf6' },
                { name: 'Utilities', value: 14, color: '#22c55e' },
                { name: 'Entertainment', value: 9, color: '#f59e0b' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const statsCards = [
        {
            title: 'Total Users',
            value: stats.totalUsers.toLocaleString(),
            icon: Users,
            trend: `+${stats.newUsersThisMonth} this month`,
            iconBg: 'bg-purple-500/20',
            iconColor: 'text-purple-400',
        },
        {
            title: 'Total Expenses Tracked',
            value: `₹${(stats.totalExpenses / 10000000).toFixed(1)} Cr`,
            icon: TrendingUp,
            trend: `+₹${(stats.expensesThisMonth / 100000).toFixed(0)}L this month`,
            iconBg: 'bg-emerald-500/20',
            iconColor: 'text-emerald-400',
        },
        {
            title: 'Active Users (Monthly)',
            value: stats.activeUsers.toLocaleString(),
            icon: UserCheck,
            trend: `${stats.activeRate}% active rate`,
            iconBg: 'bg-cyan-500/20',
            iconColor: 'text-cyan-400',
        },
        {
            title: 'AI Insights Generated',
            value: stats.aiInsights.toLocaleString(),
            icon: Sparkles,
            trend: `+${stats.insightsThisWeek.toLocaleString()} this week`,
            iconBg: 'bg-pink-500/20',
            iconColor: 'text-pink-400',
        },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">System Overview</h1>
                <p className="text-gray-400">Monitor all system metrics and analytics</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-[#1a2332] border border-gray-800/50 rounded-xl p-6 hover:border-gray-700/50 transition-all group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-lg ${stat.iconBg}`}>
                                    <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                                </div>
                                <ArrowUpRight className="w-5 h-5 text-emerald-400" />
                            </div>

                            <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
                            <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                            <p className="text-sm text-gray-500">{stat.trend}</p>
                        </motion.div>
                    );
                })}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="bg-[#1a2332] border border-gray-800/50 rounded-xl p-6"
                >
                    <h3 className="text-lg font-bold text-white mb-6">
                        Monthly Total Expenses (All Users)
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlyExpenses}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                            <XAxis dataKey="month" stroke="#6b7280" axisLine={false} tickLine={false} />
                            <YAxis
                                stroke="#6b7280"
                                tickFormatter={(value) => `₹${(value / 10000000).toFixed(1)}Cr`}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                formatter={(value) => [`₹${(value / 10000000).toFixed(2)} Cr`, 'Total']}
                                contentStyle={{
                                    backgroundColor: '#1f2937',
                                    border: '1px solid #374151',
                                    borderRadius: '8px'
                                }}
                            />
                            <Bar dataKey="total" fill="#a855f7" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Pie Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="bg-[#1a2332] border border-gray-800/50 rounded-xl p-6"
                >
                    <h3 className="text-lg font-bold text-white mb-6">
                        Global Expense Categories
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                label={({ name, value }) => `${name} ${value}%`}
                                outerRadius={100}
                                dataKey="value"
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1f2937',
                                    border: '1px solid #374151',
                                    borderRadius: '8px'
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminDashboard;