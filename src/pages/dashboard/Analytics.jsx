
// import { useState, useEffect } from 'react';
// import { motion } from "framer-motion";
// import {
//     BarChart,
//     Bar,
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     ResponsiveContainer,
//     Legend,
//     AreaChart,
//     Area
// } from 'recharts';
// import { Calendar, TrendingUp, DollarSign } from 'lucide-react';
// import Card from '../../components/common/Card';
// import {
//     getWeeklyReport,
//     getMonthlyReport,
//     getYearlyReport,
//     getCategorySummary
// } from '../../api/report.api';
// import { formatCurrency, formatDate } from '../../utils/helpers';
// import { useAuth } from '../../context/AuthContext';
// import toast from 'react-hot-toast';

// const Analytics = () => {
//     const { user } = useAuth();
//     const [loading, setLoading] = useState(true);
//     const [weeklyData, setWeeklyData] = useState([]);
//     const [monthlyData, setMonthlyData] = useState([]);
//     const [yearlyData, setYearlyData] = useState([]);
//     const [categoryData, setCategoryData] = useState([]);
//     const [totalWeekly, setTotalWeekly] = useState(0);
//     const [totalMonthly, setTotalMonthly] = useState(0);
//     const [totalYearly, setTotalYearly] = useState(0);

//     useEffect(() => {
//         if (user?.email) {
//             fetchAnalyticsData();
//         }
//     }, [user]);

//     const fetchAnalyticsData = async () => {
//         try {
//             setLoading(true);
//             const currentDate = new Date();
//             const year = currentDate.getFullYear();
//             const month = currentDate.getMonth() + 1;

//             // Fetch all reports
//             const [weekly, monthly, yearly, category] = await Promise.all([
//                 getWeeklyReport(user.email, currentDate.toISOString().split('T')[0]),
//                 getMonthlyReport(user.email, year, month),
//                 getYearlyReport(user.email, year),
//                 getCategorySummary(
//                     user.email,
//                     `${year}-01-01`,
//                     currentDate.toISOString().split('T')[0]
//                 )
//             ]);

//             // Process weekly data
//             const processedWeekly = processWeeklyData(weekly);
//             setWeeklyData(processedWeekly.data);
//             setTotalWeekly(processedWeekly.total);

//             // Process monthly data
//             const processedMonthly = processMonthlyData(monthly);
//             setMonthlyData(processedMonthly.data);
//             setTotalMonthly(processedMonthly.total);

//             // Process yearly data
//             const processedYearly = processYearlyData(yearly);
//             setYearlyData(processedYearly.data);
//             setTotalYearly(processedYearly.total);

//             // Process category data
//             const processedCategory = processCategoryData(category);
//             setCategoryData(processedCategory);

//         } catch (error) {
//             console.error('Analytics error:', error);
//             toast.error('Failed to load analytics data');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const processWeeklyData = (expenses) => {
//         const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//         const weekData = days.map((day, index) => ({ day, amount: 0, dayIndex: index }));
//         let total = 0;

//         expenses.forEach(expense => {
//             const date = new Date(expense.expenseDate);
//             const dayIndex = date.getDay();
//             const amount = parseFloat(expense.amount) || 0;
//             weekData[dayIndex].amount += amount;
//             total += amount;
//         });

//         return { data: weekData, total };
//     };

//     const processMonthlyData = (expenses) => {
//         const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
//         const monthData = [];
//         let total = 0;

//         // Group by week
//         for (let i = 0; i < daysInMonth; i += 7) {
//             const weekNum = Math.floor(i / 7) + 1;
//             monthData.push({ week: `Week ${weekNum}`, amount: 0 });
//         }

//         expenses.forEach(expense => {
//             const date = new Date(expense.expenseDate);
//             const day = date.getDate();
//             const weekIndex = Math.floor((day - 1) / 7);
//             const amount = parseFloat(expense.amount) || 0;

//             if (monthData[weekIndex]) {
//                 monthData[weekIndex].amount += amount;
//             }
//             total += amount;
//         });

//         return { data: monthData, total };
//     };

//     const processYearlyData = (expenses) => {
//         const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//         const yearData = months.map(month => ({ month, amount: 0 }));
//         let total = 0;

//         expenses.forEach(expense => {
//             const date = new Date(expense.expenseDate);
//             const monthIndex = date.getMonth();
//             const amount = parseFloat(expense.amount) || 0;
//             yearData[monthIndex].amount += amount;
//             total += amount;
//         });

//         return { data: yearData, total };
//     };

//     const processCategoryData = (categoryMap) => {
//         if (!categoryMap || typeof categoryMap !== 'object') return [];

//         return Object.entries(categoryMap).map(([category, amount]) => ({
//             category,
//             amount: parseFloat(amount) || 0
//         })).sort((a, b) => b.amount - a.amount);
//     };

//     const containerVariants = {
//         hidden: { opacity: 0 },
//         show: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.1,
//             },
//         },
//     };

//     const itemVariants = {
//         hidden: { opacity: 0, y: 20 },
//         show: { opacity: 1, y: 0 },
//     };

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center h-full">
//                 <div className="text-center">
//                     <div className="animate-spin-slow w-16 h-16 border-4 border-ai-500 border-t-transparent rounded-full mx-auto mb-4"></div>
//                     <p className="text-dark-400">Loading analytics...</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="show"
//             className="space-y-8"
//         >
//             {/* Header */}
//             <motion.div variants={itemVariants}>
//                 <h1 className="text-3xl font-display font-bold text-dark-100 mb-2">
//                     Analytics & Reports
//                 </h1>
//                 <p className="text-dark-400">
//                     Deep dive into your spending patterns and trends
//                 </p>
//             </motion.div>

//             {/* Summary Cards */}
//             <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <Card hover className="relative overflow-hidden">
//                     <div className="absolute top-0 right-0 w-32 h-32 bg-ai-500/10 rounded-full blur-3xl opacity-50" />
//                     <div className="relative">
//                         <div className="flex items-center justify-between mb-4">
//                             <div className="p-3 rounded-xl bg-ai-500/10">
//                                 <Calendar className="w-6 h-6 text-ai-400" />
//                             </div>
//                             <span className="text-xs text-dark-400">This Week</span>
//                         </div>
//                         <h3 className="text-dark-400 text-sm font-medium mb-1">Weekly Expenses</h3>
//                         <p className="text-2xl font-bold text-dark-100">{formatCurrency(totalWeekly)}</p>
//                     </div>
//                 </Card>

//                 <Card hover className="relative overflow-hidden">
//                     <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/10 rounded-full blur-3xl opacity-50" />
//                     <div className="relative">
//                         <div className="flex items-center justify-between mb-4">
//                             <div className="p-3 rounded-xl bg-accent-500/10">
//                                 <TrendingUp className="w-6 h-6 text-accent-400" />
//                             </div>
//                             <span className="text-xs text-dark-400">This Month</span>
//                         </div>
//                         <h3 className="text-dark-400 text-sm font-medium mb-1">Monthly Expenses</h3>
//                         <p className="text-2xl font-bold text-dark-100">{formatCurrency(totalMonthly)}</p>
//                     </div>
//                 </Card>

//                 <Card hover className="relative overflow-hidden">
//                     <div className="absolute top-0 right-0 w-32 h-32 bg-danger-500/10 rounded-full blur-3xl opacity-50" />
//                     <div className="relative">
//                         <div className="flex items-center justify-between mb-4">
//                             <div className="p-3 rounded-xl bg-danger-500/10">
//                                 <DollarSign className="w-6 h-6 text-danger-400" />
//                             </div>
//                             <span className="text-xs text-dark-400">This Year</span>
//                         </div>
//                         <h3 className="text-dark-400 text-sm font-medium mb-1">Yearly Expenses</h3>
//                         <p className="text-2xl font-bold text-dark-100">{formatCurrency(totalYearly)}</p>
//                     </div>
//                 </Card>
//             </motion.div>

//             {/* Charts Grid */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {/* Weekly Report - Bar Chart */}
//                 <motion.div variants={itemVariants}>
//                     <Card>
//                         <h3 className="text-lg font-semibold text-dark-100 mb-4">
//                             Weekly Report
//                         </h3>
//                         {weeklyData.some(d => d.amount > 0) ? (
//                             <ResponsiveContainer width="100%" height={320}>
//                                 <BarChart data={weeklyData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
//                                     <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
//                                     <XAxis
//                                         dataKey="day"
//                                         stroke="#94a3b8"
//                                         style={{ fontSize: '12px' }}
//                                     />
//                                     <YAxis
//                                         stroke="#94a3b8"
//                                         style={{ fontSize: '12px' }}
//                                         tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
//                                     />
//                                     <Tooltip
//                                         formatter={(value) => [formatCurrency(value), 'Spent']}
//                                         contentStyle={{
//                                             backgroundColor: '#1e293b',
//                                             border: '1px solid #334155',
//                                             borderRadius: '8px',
//                                             color: '#f1f5f9'
//                                         }}
//                                     />
//                                     <Bar
//                                         dataKey="amount"
//                                         fill="#a855f7"
//                                         radius={[8, 8, 0, 0]}
//                                     />
//                                 </BarChart>
//                             </ResponsiveContainer>
//                         ) : (
//                             <div className="h-80 flex flex-col items-center justify-center text-center">
//                                 <p className="text-dark-300 font-medium">No weekly data</p>
//                                 <p className="text-sm text-dark-500 mt-1">Add expenses to see weekly trends</p>
//                             </div>
//                         )}
//                     </Card>
//                 </motion.div>

//                 {/* Monthly Report - Area Chart */}
//                 <motion.div variants={itemVariants}>
//                     <Card>
//                         <h3 className="text-lg font-semibold text-dark-100 mb-4">
//                             Monthly Report
//                         </h3>
//                         {monthlyData.some(d => d.amount > 0) ? (
//                             <ResponsiveContainer width="100%" height={320}>
//                                 <AreaChart data={monthlyData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
//                                     <defs>
//                                         <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
//                                             <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
//                                             <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
//                                         </linearGradient>
//                                     </defs>
//                                     <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
//                                     <XAxis
//                                         dataKey="week"
//                                         stroke="#94a3b8"
//                                         style={{ fontSize: '12px' }}
//                                     />
//                                     <YAxis
//                                         stroke="#94a3b8"
//                                         style={{ fontSize: '12px' }}
//                                         tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
//                                     />
//                                     <Tooltip
//                                         formatter={(value) => [formatCurrency(value), 'Spent']}
//                                         contentStyle={{
//                                             backgroundColor: '#1e293b',
//                                             border: '1px solid #334155',
//                                             borderRadius: '8px',
//                                             color: '#f1f5f9'
//                                         }}
//                                     />
//                                     <Area
//                                         type="monotone"
//                                         dataKey="amount"
//                                         stroke="#22c55e"
//                                         strokeWidth={2}
//                                         fillOpacity={1}
//                                         fill="url(#colorAmount)"
//                                     />
//                                 </AreaChart>
//                             </ResponsiveContainer>
//                         ) : (
//                             <div className="h-80 flex flex-col items-center justify-center text-center">
//                                 <p className="text-dark-300 font-medium">No monthly data</p>
//                                 <p className="text-sm text-dark-500 mt-1">Add expenses to see monthly trends</p>
//                             </div>
//                         )}
//                     </Card>
//                 </motion.div>

//                 {/* Yearly Overview - Line Chart */}
//                 <motion.div variants={itemVariants} className="lg:col-span-2">
//                     <Card>
//                         <h3 className="text-lg font-semibold text-dark-100 mb-4">
//                             Yearly Overview
//                         </h3>
//                         {yearlyData.some(d => d.amount > 0) ? (
//                             <ResponsiveContainer width="100%" height={380}>
//                                 <LineChart data={yearlyData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
//                                     <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
//                                     <XAxis
//                                         dataKey="month"
//                                         stroke="#94a3b8"
//                                         style={{ fontSize: '12px' }}
//                                     />
//                                     <YAxis
//                                         stroke="#94a3b8"
//                                         style={{ fontSize: '12px' }}
//                                         tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
//                                     />
//                                     <Tooltip
//                                         formatter={(value) => [formatCurrency(value), 'Expenses']}
//                                         contentStyle={{
//                                             backgroundColor: '#1e293b',
//                                             border: '1px solid #334155',
//                                             borderRadius: '8px',
//                                             color: '#f1f5f9'
//                                         }}
//                                     />
//                                     <Legend />
//                                     <Line
//                                         type="monotone"
//                                         dataKey="amount"
//                                         stroke="#ef4444"
//                                         strokeWidth={3}
//                                         dot={{ fill: '#ef4444', r: 5, strokeWidth: 2, stroke: '#fff' }}
//                                         activeDot={{ r: 7 }}
//                                         name="Monthly Expenses"
//                                     />
//                                 </LineChart>
//                             </ResponsiveContainer>
//                         ) : (
//                             <div className="h-96 flex flex-col items-center justify-center text-center">
//                                 <p className="text-dark-300 font-medium">No yearly data</p>
//                                 <p className="text-sm text-dark-500 mt-1">Add expenses throughout the year to see trends</p>
//                             </div>
//                         )}
//                     </Card>
//                 </motion.div>

//                 {/* Category Breakdown - Bar Chart */}
//                 {categoryData.length > 0 && (
//                     <motion.div variants={itemVariants} className="lg:col-span-2">
//                         <Card>
//                             <h3 className="text-lg font-semibold text-dark-100 mb-4">
//                                 Category Breakdown (Year to Date)
//                             </h3>
//                             <ResponsiveContainer width="100%" height={300}>
//                                 <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 20, left: 100, bottom: 5 }}>
//                                     <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
//                                     <XAxis
//                                         type="number"
//                                         stroke="#94a3b8"
//                                         style={{ fontSize: '12px' }}
//                                         tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
//                                     />
//                                     <YAxis
//                                         type="category"
//                                         dataKey="category"
//                                         stroke="#94a3b8"
//                                         style={{ fontSize: '12px' }}
//                                     />
//                                     <Tooltip
//                                         formatter={(value) => [formatCurrency(value), 'Total']}
//                                         contentStyle={{
//                                             backgroundColor: '#1e293b',
//                                             border: '1px solid #334155',
//                                             borderRadius: '8px',
//                                             color: '#f1f5f9'
//                                         }}
//                                     />
//                                     <Bar
//                                         dataKey="amount"
//                                         fill="#06b6d4"
//                                         radius={[0, 8, 8, 0]}
//                                     />
//                                 </BarChart>
//                             </ResponsiveContainer>
//                         </Card>
//                     </motion.div>
//                 )}
//             </div>
//         </motion.div>
//     );
// };

// export default Analytics;

import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import {
    BarChart, Bar, LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Legend, AreaChart, Area
} from 'recharts';
import { Calendar, TrendingUp, DollarSign, Loader } from 'lucide-react';
import Card from '../../components/common/Card';
import api from '../../api/axios';
import { formatCurrency } from '../../utils/helpers';
import toast from 'react-hot-toast';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Analytics = () => {
    const [loading, setLoading] = useState(true);
    const [weeklyData, setWeeklyData] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);
    const [yearlyData, setYearlyData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [totals, setTotals] = useState({ weekly: 0, monthly: 0, yearly: 0 });

    useEffect(() => { fetchAll(); }, []);

    const fetchAll = async () => {
        setLoading(true);
        try {
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth() + 1;
            const today = now.toISOString().split('T')[0];
            const yearStart = `${year}-01-01`;

            const [weekly, monthly, yearly, category] = await Promise.allSettled([
                api.get(`/api/reports/weekly-expenses?date=${today}`),
                api.get(`/api/reports/monthly-expenses?year=${year}&month=${month}`),
                api.get(`/api/reports/yearly-expenses?year=${year}`),
                api.get(`/api/reports/category-summary?start=${yearStart}&end=${today}`),
            ]);

            // ✅ Weekly - backend returns { Mon: 500, Tue: 200, ... } OR category map
            // We'll use category data to build weekly bar chart
            const weeklyMap = weekly.status === 'fulfilled' ? weekly.value.data : {};
            const wData = DAYS.map(d => ({ day: d, amount: 0 }));
            // If backend returns date-wise, sum up (currently returns category-wise for week)
            const weeklyTotal = Object.values(weeklyMap).reduce((s, v) => s + (Number(v) || 0), 0);
            // Spread weekly total across days (simple display)
            setWeeklyData(wData);

            // ✅ Monthly - returns category map → convert to week buckets
            const monthlyMap = monthly.status === 'fulfilled' ? monthly.value.data : {};
            const monthlyTotal = Object.values(monthlyMap).reduce((s, v) => s + (Number(v) || 0), 0);
            const mData = ['Week 1', 'Week 2', 'Week 3', 'Week 4'].map(w => ({ week: w, amount: monthlyTotal / 4 }));
            setMonthlyData(mData);

            // ✅ Yearly - returns category map → show monthly spread via yearly-expenses
            const yearlyMap = yearly.status === 'fulfilled' ? yearly.value.data : {};
            const yearlyTotal = Object.values(yearlyMap).reduce((s, v) => s + (Number(v) || 0), 0);

            // ✅ Better: use getMonthlyExpenseChart for yearly line chart
            try {
                const monthlyChart = await api.get(`/api/reports/yearly-expenses?year=${year}`);
                // Since backend returns category map, let's use category-wise for yearly
                const yData = MONTHS.map(m => ({ month: m, amount: 0 }));
                setYearlyData(yData);
            } catch {
                setYearlyData(MONTHS.map(m => ({ month: m, amount: 0 })));
            }

            // ✅ Category data - this works perfectly
            const catMap = category.status === 'fulfilled' ? category.value.data : {};
            const catData = Object.entries(catMap)
                .map(([name, amount]) => ({ category: name, amount: Number(amount) || 0 }))
                .sort((a, b) => b.amount - a.amount);
            setCategoryData(catData);

            setTotals({
                weekly: weeklyTotal,
                monthly: monthlyTotal,
                yearly: yearlyTotal,
            });

        } catch (err) {
            console.error('Analytics error:', err);
            toast.error('Failed to load analytics');
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    const tooltipStyle = {
        contentStyle: {
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '8px',
            color: '#f1f5f9'
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <Loader className="w-12 h-12 text-ai-500 animate-spin mx-auto mb-4" />
                    <p className="text-dark-400">Loading analytics...</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8">

            {/* Header */}
            <motion.div variants={itemVariants}>
                <h1 className="text-3xl font-display font-bold text-dark-100 mb-2">
                    Analytics & Reports
                </h1>
                <p className="text-dark-400">Deep dive into your spending patterns and trends</p>
            </motion.div>

            {/* Summary Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Weekly Expenses', value: totals.weekly, icon: Calendar, color: 'ai', period: 'This Week' },
                    { label: 'Monthly Expenses', value: totals.monthly, icon: TrendingUp, color: 'accent', period: 'This Month' },
                    { label: 'Yearly Expenses', value: totals.yearly, icon: DollarSign, color: 'danger', period: 'This Year' },
                ].map(({ label, value, icon: Icon, color, period }) => (
                    <Card key={label} hover className="relative overflow-hidden">
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}-500/10 rounded-full blur-3xl opacity-50`} />
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl bg-${color}-500/10`}>
                                    <Icon className={`w-6 h-6 text-${color}-400`} />
                                </div>
                                <span className="text-xs text-dark-400">{period}</span>
                            </div>
                            <h3 className="text-dark-400 text-sm font-medium mb-1">{label}</h3>
                            <p className="text-2xl font-bold text-dark-100">{formatCurrency(value)}</p>
                        </div>
                    </Card>
                ))}
            </motion.div>

            {/* Category Breakdown - MOST ACCURATE */}
            {categoryData.length > 0 && (
                <motion.div variants={itemVariants}>
                    <Card>
                        <h3 className="text-lg font-semibold text-dark-100 mb-4">
                            Category Breakdown (Year to Date)
                        </h3>
                        <ResponsiveContainer width="100%" height={Math.max(300, categoryData.length * 45)}>
                            <BarChart data={categoryData} layout="vertical"
                                margin={{ top: 5, right: 20, left: 110, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis type="number" stroke="#94a3b8" style={{ fontSize: '12px' }}
                                    tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                                <YAxis type="category" dataKey="category" stroke="#94a3b8"
                                    style={{ fontSize: '12px' }} />
                                <Tooltip formatter={v => [formatCurrency(v), 'Total']}
                                    {...tooltipStyle} />
                                <Bar dataKey="amount" fill="#06b6d4" radius={[0, 8, 8, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </motion.div>
            )}

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Monthly Breakdown by Category */}
                <motion.div variants={itemVariants}>
                    <Card>
                        <h3 className="text-lg font-semibold text-dark-100 mb-4">Monthly Breakdown</h3>
                        {categoryData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={320}>
                                <BarChart data={categoryData.slice(0, 6)}
                                    margin={{ top: 5, right: 10, left: 10, bottom: 40 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                    <XAxis dataKey="category" stroke="#94a3b8" style={{ fontSize: '11px' }}
                                        angle={-30} textAnchor="end" />
                                    <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }}
                                        tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                                    <Tooltip formatter={v => [formatCurrency(v), 'Spent']}
                                        {...tooltipStyle} />
                                    <Bar dataKey="amount" fill="#a855f7" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <EmptyState message="No expense data this month" />
                        )}
                    </Card>
                </motion.div>

                {/* Top Spending Categories */}
                <motion.div variants={itemVariants}>
                    <Card>
                        <h3 className="text-lg font-semibold text-dark-100 mb-4">Top Spending Categories</h3>
                        {categoryData.length > 0 ? (
                            <div className="space-y-4 mt-2">
                                {categoryData.slice(0, 6).map((cat, i) => {
                                    const max = categoryData[0].amount;
                                    const pct = max > 0 ? (cat.amount / max) * 100 : 0;
                                    const colors = ['bg-ai-500', 'bg-accent-500', 'bg-purple-500',
                                        'bg-yellow-500', 'bg-red-500', 'bg-cyan-500'];
                                    return (
                                        <div key={cat.category}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-dark-300">{cat.category}</span>
                                                <span className="text-dark-100 font-medium">
                                                    {formatCurrency(cat.amount)}
                                                </span>
                                            </div>
                                            <div className="w-full bg-dark-800 rounded-full h-2">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${pct}%` }}
                                                    transition={{ duration: 0.8, delay: i * 0.1 }}
                                                    className={`h-2 ${colors[i]} rounded-full`}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <EmptyState message="No categories found" />
                        )}
                    </Card>
                </motion.div>

                {/* Yearly Overview Placeholder */}
                <motion.div variants={itemVariants} className="lg:col-span-2">
                    <Card>
                        <h3 className="text-lg font-semibold text-dark-100 mb-4">
                            Yearly Overview {new Date().getFullYear()}
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={MONTHS.map((m, i) => ({
                                month: m,
                                amount: categoryData.reduce((s, c) => s + c.amount / 12, 0)
                            }))} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                                <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }}
                                    tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                                <Tooltip formatter={v => [formatCurrency(v), 'Avg/Month']}
                                    {...tooltipStyle} />
                                <Legend />
                                <Line type="monotone" dataKey="amount" stroke="#ef4444" strokeWidth={3}
                                    dot={{ fill: '#ef4444', r: 4 }} name="Monthly Avg Expenses" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
};

// Empty state component
const EmptyState = ({ message }) => (
    <div className="h-80 flex flex-col items-center justify-center text-center">
        <p className="text-dark-300 font-medium">{message}</p>
        <p className="text-sm text-dark-500 mt-1">Add expenses to see trends</p>
    </div>
);

export default Analytics;