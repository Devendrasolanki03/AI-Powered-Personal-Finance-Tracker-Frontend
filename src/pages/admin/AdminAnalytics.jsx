import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';
import {
    BarChart,
    Bar,
    LineChart,
    Line,
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

const AdminAnalytics = () => {
    const [loading, setLoading] = useState(true);
    const [kpiData, setKpiData] = useState({
        avgExpensePerUser: 4657,
        highestCategory: 'Food',
        monthlyGrowth: 7.4,
        budgetUtilization: 77.5
    });
    const [categoryData, setCategoryData] = useState([]); // ✅ FIXED: was setCategory Data
    const [trendData, setTrendData] = useState([]);
    const [distributionData, setDistributionData] = useState([]);

    useEffect(() => {
        fetchAnalyticsData();
    }, []);

    const fetchAnalyticsData = async () => {
        try {
            setLoading(true);

            const [kpiRes, categoriesRes, trendsRes, distributionRes] = await Promise.all([
                adminAPI.getKPIMetrics(),
                adminAPI.getCategoryAnalytics(),
                adminAPI.getExpenseTrends(),
                adminAPI.getSpendingDistribution()
            ]);

            setKpiData(kpiRes.data);
            setCategoryData(categoriesRes.data);
            setTrendData(trendsRes.data);
            setDistributionData(distributionRes.data);
        } catch (error) {
            console.error('Analytics error:', error);

            // Fallback data
            setCategoryData([
                { category: 'Food', amount: 18500000 },
                { category: 'Transport', amount: 12000000 },
                { category: 'Shopping', amount: 15000000 },
                { category: 'Utilities', amount: 7000000 },
                { category: 'Entertainment', amount: 5500000 },
            ]);

            setTrendData([
                { month: 'Jan', expenses: 45000000 },
                { month: 'Feb', expenses: 48000000 },
                { month: 'Mar', expenses: 52000000 },
                { month: 'Apr', expenses: 49000000 },
                { month: 'May', expenses: 54000000 },
                { month: 'Jun', expenses: 58000000 },
            ]);

            setDistributionData([
                { name: 'Essential', value: 42, color: '#4F46E5' },
                { name: 'Lifestyle', value: 28, color: '#06b6d4' },
                { name: 'Savings', value: 22, color: '#10b981' },
                { name: 'Investments', value: 8, color: '#f59e0b' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const kpiCards = [
        {
            title: 'Avg Expense per User',
            value: `₹${kpiData.avgExpensePerUser.toLocaleString()}`,
            icon: DollarSign,
            trend: '+8.2%',
            trendUp: true,
            color: 'text-purple-400',
            bgColor: 'bg-purple-500/20',
        },
        {
            title: 'Highest Spending Category',
            value: kpiData.highestCategory,
            icon: TrendingUp,
            trend: '₹1.85 Cr total',
            trendUp: true,
            color: 'text-emerald-400',
            bgColor: 'bg-emerald-500/20',
        },
        {
            title: 'Monthly Expense Growth',
            value: `+${kpiData.monthlyGrowth}%`,
            icon: TrendingUp,
            trend: 'vs last month',
            trendUp: true,
            color: 'text-cyan-400',
            bgColor: 'bg-cyan-500/20',
        },
        {
            title: 'Budget Utilization Rate',
            value: `${kpiData.budgetUtilization}%`,
            icon: Calendar,
            trend: 'Average across users',
            trendUp: false,
            color: 'text-pink-400',
            bgColor: 'bg-pink-500/20',
        },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading analytics...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Expenses Analytics</h1>
                <p className="text-gray-400">Deep insights into spending patterns and trends</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiCards.map((kpi, index) => {
                    const Icon = kpi.icon;
                    const TrendIcon = kpi.trendUp ? TrendingUp : TrendingDown;
                    return (
                        <motion.div
                            key={kpi.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-[#1a2332] border border-gray-800/50 rounded-xl p-6 hover:border-gray-700/50 transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <p className="text-sm text-gray-400 mb-1">{kpi.title}</p>
                                </div>
                                <div className={`w-10 h-10 rounded-lg ${kpi.bgColor} flex items-center justify-center`}>
                                    <Icon className={`w-5 h-5 ${kpi.color}`} />
                                </div>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-white mb-2">{kpi.value}</p>
                                <div className="flex items-center gap-1">
                                    <TrendIcon className={`w-4 h-4 ${kpi.trendUp ? 'text-emerald-400' : 'text-red-400'}`} />
                                    <p className="text-sm text-gray-500">{kpi.trend}</p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Category Bar Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="bg-[#1a2332] border border-gray-800/50 rounded-xl p-6"
                >
                    <h3 className="text-lg font-bold text-white mb-6">Category-wise Expenses</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={categoryData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                            <XAxis dataKey="category" stroke="#6b7280" axisLine={false} tickLine={false} />
                            <YAxis
                                stroke="#6b7280"
                                tickFormatter={(value) => `₹${(value / 10000000).toFixed(1)}Cr`}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                formatter={(value) => [`₹${(value / 10000000).toFixed(2)} Cr`, 'Amount']}
                                contentStyle={{
                                    backgroundColor: '#1f2937',
                                    border: '1px solid #374151',
                                    borderRadius: '8px'
                                }}
                            />
                            <Bar dataKey="amount" fill="#a855f7" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Distribution Pie Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="bg-[#1a2332] border border-gray-800/50 rounded-xl p-6"
                >
                    <h3 className="text-lg font-bold text-white mb-6">Spending Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={distributionData}
                                cx="50%"
                                cy="50%"
                                label={({ name, value }) => `${name} ${value}%`}
                                outerRadius={100}
                                dataKey="value"
                            >
                                {distributionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value) => [`${value}%`, 'Percentage']}
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

            {/* Trend Line Chart */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="bg-[#1a2332] border border-gray-800/50 rounded-xl p-6"
            >
                <h3 className="text-lg font-bold text-white mb-6">Expenses Trend Over Time</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                        <XAxis dataKey="month" stroke="#6b7280" axisLine={false} tickLine={false} />
                        <YAxis
                            stroke="#6b7280"
                            tickFormatter={(value) => `₹${(value / 10000000).toFixed(1)}Cr`}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            formatter={(value) => [`₹${(value / 10000000).toFixed(2)} Cr`, 'Expenses']}
                            contentStyle={{
                                backgroundColor: '#1f2937',
                                border: '1px solid #374151',
                                borderRadius: '8px'
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="expenses"
                            stroke="#a855f7"
                            strokeWidth={3}
                            dot={{ fill: '#a855f7', r: 5 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </motion.div>
        </div>
    );
};

export default AdminAnalytics;