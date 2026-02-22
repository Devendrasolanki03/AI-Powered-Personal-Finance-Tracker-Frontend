// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import {
//     Wallet,
//     TrendingDown,
//     PiggyBank,
//     Sparkles,
//     ArrowUpRight,
//     ArrowDownRight,
// } from 'lucide-react';
// import {
//     PieChart,
//     Pie,
//     Cell,
//     ResponsiveContainer,
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend
// } from 'recharts';
// import { getIncomes } from '../../api/income.api';
// import { getExpenses } from '../../api/expense.api';
// import { getAIAdvice } from '../../api/ai.api';
// import Card from '../../components/common/Card';
// import { formatCurrency, calculateTotal, groupByCategory } from '../../utils/helpers';
// import { EXPENSE_CATEGORIES } from '../../utils/constants';
// import toast from 'react-hot-toast';

// const Dashboard = () => {
//     const [stats, setStats] = useState({
//         totalIncome: 0,
//         totalExpense: 0,
//         savings: 0,
//     });
//     const [aiInsight, setAiInsight] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [expenses, setExpenses] = useState([]);
//     const [categoryData, setCategoryData] = useState([]);
//     const [monthlyData, setMonthlyData] = useState([]);

//     useEffect(() => {
//         fetchDashboardData();
//     }, []);

//     const fetchDashboardData = async () => {
//         try {
//             const [incomesRes, expensesRes] = await Promise.all([
//                 getIncomes(),
//                 getExpenses(),
//             ]);

//             const totalIncome = calculateTotal(incomesRes);
//             const totalExpense = calculateTotal(expensesRes);

//             setStats({
//                 totalIncome,
//                 totalExpense,
//                 savings: totalIncome - totalExpense,
//             });

//             setExpenses(expensesRes);

//             // Process category data for pie chart
//             const grouped = groupByCategory(expensesRes);
//             const categoryChartData = Object.entries(grouped).map(([categoryName, data]) => {
//                 const category = EXPENSE_CATEGORIES.find(cat => cat.name === categoryName);
//                 return {
//                     name: categoryName,
//                     value: data.total,
//                     color: category?.color || '#8b5cf6',
//                 };
//             });
//             setCategoryData(categoryChartData);

//             // Process monthly data for line chart
//             const monthlyExpenses = processMonthlyData(expensesRes);
//             setMonthlyData(monthlyExpenses);

//             // Fetch AI insight
//             try {
//                 const aiRes = await getAIAdvice();
//                 setAiInsight(aiRes || 'Keep tracking your expenses!');
//             } catch (aiError) {
//                 console.error('AI advice error:', aiError);
//                 setAiInsight('Start tracking your expenses to get personalized AI insights! 💡');
//             }
//         } catch (error) {
//             console.error('Dashboard error:', error);
//             toast.error('Failed to load dashboard data');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const processMonthlyData = (expenses) => {
//         const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
//         const monthlyTotals = {};

//         expenses.forEach(expense => {
//             const date = new Date(expense.expenseDate);
//             const monthName = months[date.getMonth()];
//             if (!monthlyTotals[monthName]) {
//                 monthlyTotals[monthName] = 0;
//             }
//             monthlyTotals[monthName] += parseFloat(expense.amount);
//         });

//         return months.map(month => ({
//             month,
//             expenses: monthlyTotals[month] || 0,
//         }));
//     };

//     const statsCards = [
//         {
//             title: 'Total Income',
//             value: stats.totalIncome,
//             icon: Wallet,
//             color: 'text-accent-400',
//             bgColor: 'bg-accent-500/10',
//             trend: '+12.5%',
//             trendUp: true,
//         },
//         {
//             title: 'Total Expenses',
//             value: stats.totalExpense,
//             icon: TrendingDown,
//             color: 'text-danger-400',
//             bgColor: 'bg-danger-500/10',
//             trend: '-8.2%',
//             trendUp: false,
//         },
//         {
//             title: 'Savings',
//             value: stats.savings,
//             icon: PiggyBank,
//             color: 'text-ai-400',
//             bgColor: 'bg-ai-500/10',
//             trend: '+24.3%',
//             trendUp: true,
//         },
//     ];

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
//                     <p className="text-dark-400">Loading dashboard...</p>
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
//                     Financial Overview
//                 </h1>
//                 <p className="text-dark-400">
//                     Track your income, expenses, and savings at a glance
//                 </p>
//             </motion.div>

//             {/* Stats Grid */}
//             <motion.div
//                 variants={containerVariants}
//                 className="grid grid-cols-1 md:grid-cols-3 gap-6"
//             >
//                 {statsCards.map((stat) => (
//                     <motion.div key={stat.title} variants={itemVariants}>
//                         <Card hover className="relative overflow-hidden">
//                             <div className={`absolute top-0 right-0 w-32 h-32 ${stat.bgColor} rounded-full blur-3xl opacity-50`} />

//                             <div className="relative">
//                                 <div className="flex items-start justify-between mb-4">
//                                     <div className={`p-3 rounded-xl ${stat.bgColor}`}>
//                                         <stat.icon className={`w-6 h-6 ${stat.color}`} />
//                                     </div>
//                                     <div className={`flex items-center gap-1 text-sm ${stat.trendUp ? 'text-accent-400' : 'text-danger-400'}`}>
//                                         {stat.trendUp ? (
//                                             <ArrowUpRight className="w-4 h-4" />
//                                         ) : (
//                                             <ArrowDownRight className="w-4 h-4" />
//                                         )}
//                                         <span>{stat.trend}</span>
//                                     </div>
//                                 </div>

//                                 <h3 className="text-dark-400 text-sm font-medium mb-1">
//                                     {stat.title}
//                                 </h3>
//                                 <p className="text-3xl font-bold text-dark-100">
//                                     {formatCurrency(stat.value)}
//                                 </p>
//                             </div>
//                         </Card>
//                     </motion.div>
//                 ))}
//             </motion.div>

//             {/* AI Insight */}
//             <motion.div variants={itemVariants}>
//                 <Card gradient className="relative overflow-hidden">
//                     <div className="absolute inset-0 bg-gradient-to-r from-ai-500/5 to-ai-700/5 animate-gradient" />

//                     <div className="relative flex items-start gap-4">
//                         <div className="p-3 bg-ai-500/20 rounded-xl float-animation">
//                             <Sparkles className="w-6 h-6 text-ai-400" />
//                         </div>
//                         <div className="flex-1">
//                             <h3 className="text-lg font-semibold text-dark-100 mb-2 flex items-center gap-2">
//                                 🤖 AI Financial Insight
//                             </h3>
//                             <p className="text-dark-300 leading-relaxed">
//                                 {aiInsight}
//                             </p>
//                         </div>
//                     </div>
//                 </Card>
//             </motion.div>

//             {/* Charts */}
//             <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {/* Pie Chart - Category Distribution */}
//                 <Card>
//                     <h3 className="text-lg font-semibold text-dark-100 mb-4">
//                         Expense Distribution
//                     </h3>
//                     {categoryData.length > 0 ? (
//                         <>
//                             <ResponsiveContainer width="100%" height={280}>
//                                 <PieChart>
//                                     <Pie
//                                         data={categoryData}
//                                         cx="50%"
//                                         cy="50%"
//                                         labelLine={false}
//                                         label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                                         outerRadius={90}
//                                         fill="#8884d8"
//                                         dataKey="value"
//                                         paddingAngle={2}
//                                     >
//                                         {categoryData.map((entry, index) => (
//                                             <Cell key={`cell-${index}`} fill={entry.color} />
//                                         ))}
//                                     </Pie>
//                                     <Tooltip
//                                         formatter={(value) => formatCurrency(value)}
//                                         contentStyle={{
//                                             backgroundColor: '#1e293b',
//                                             border: '1px solid #334155',
//                                             borderRadius: '8px',
//                                             color: '#f1f5f9'
//                                         }}
//                                     />
//                                 </PieChart>
//                             </ResponsiveContainer>

//                             {/* Legend */}
//                             <div className="grid grid-cols-2 gap-3 mt-4">
//                                 {categoryData.map((category) => (
//                                     <div key={category.name} className="flex items-center gap-2">
//                                         <div
//                                             className="w-3 h-3 rounded-full flex-shrink-0"
//                                             style={{ backgroundColor: category.color }}
//                                         />
//                                         <div className="flex-1 min-w-0">
//                                             <p className="text-xs text-dark-400 truncate">{category.name}</p>
//                                             <p className="text-sm text-dark-100 font-medium">{formatCurrency(category.value)}</p>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </>
//                     ) : (
//                         <div className="h-64 flex flex-col items-center justify-center text-center">
//                             <p className="text-dark-300 font-medium">No expense data available</p>
//                             <p className="text-sm text-dark-500 mt-1">Add your first expense to see category breakdown</p>
//                         </div>
//                     )}
//                 </Card>

//                 {/* Line Chart - Monthly Trend */}
//                 <Card>
//                     <h3 className="text-lg font-semibold text-dark-100 mb-4">
//                         Monthly Expense Trend
//                     </h3>
//                     {monthlyData.some(d => d.expenses > 0) ? (
//                         <ResponsiveContainer width="100%" height={280}>
//                             <LineChart data={monthlyData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
//                                 <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
//                                 <XAxis
//                                     dataKey="month"
//                                     stroke="#94a3b8"
//                                     style={{ fontSize: '12px' }}
//                                 />
//                                 <YAxis
//                                     stroke="#94a3b8"
//                                     style={{ fontSize: '12px' }}
//                                     tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
//                                 />
//                                 <Tooltip
//                                     formatter={(value) => [formatCurrency(value), 'Expenses']}
//                                     contentStyle={{
//                                         backgroundColor: '#1e293b',
//                                         border: '1px solid #334155',
//                                         borderRadius: '8px',
//                                         color: '#f1f5f9'
//                                     }}
//                                 />
//                                 <Line
//                                     type="monotone"
//                                     dataKey="expenses"
//                                     stroke="#a855f7"
//                                     strokeWidth={3}
//                                     dot={{ fill: '#a855f7', r: 5, strokeWidth: 2, stroke: '#fff' }}
//                                     activeDot={{ r: 7 }}
//                                 />
//                             </LineChart>
//                         </ResponsiveContainer>
//                     ) : (
//                         <div className="h-64 flex flex-col items-center justify-center text-center">
//                             <p className="text-dark-300 font-medium">No monthly data yet</p>
//                             <p className="text-sm text-dark-500 mt-1">Add expenses to see monthly trends</p>
//                         </div>
//                     )}
//                 </Card>
//             </motion.div>
//         </motion.div>
//     );
// };

// export default Dashboard;
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Wallet,
    TrendingDown,
    PiggyBank,
    Sparkles,
    ArrowUpRight,
    ArrowDownRight,
} from 'lucide-react';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';
import { getIncomes } from '../../api/income.api';
import { getExpenses } from '../../api/expense.api';
import { getAIAdvice } from '../../api/ai.api';
import Card from '../../components/common/Card';
import { formatCurrency, calculateTotal, groupByCategory } from '../../utils/helpers';
import { EXPENSE_CATEGORIES } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext'; // ✅ ADDED
import toast from 'react-hot-toast';

const Dashboard = () => {
    const { user } = useAuth(); // ✅ ADDED - Get user from context
    const [stats, setStats] = useState({
        totalIncome: 0,
        totalExpense: 0,
        savings: 0,
    });
    const [aiInsight, setAiInsight] = useState('');
    const [loading, setLoading] = useState(true);
    const [expenses, setExpenses] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);

    useEffect(() => {
        fetchDashboardData();
    }, []); // Keep as is - no dependency on user

    const fetchDashboardData = async () => {
        try {
            // ✅ UPDATED - Handle errors gracefully for new users
            const [incomesRes, expensesRes] = await Promise.all([
                getIncomes().catch(() => []), // Return empty array if API fails
                getExpenses().catch(() => []), // Return empty array if API fails
            ]);

            const totalIncome = calculateTotal(incomesRes);
            const totalExpense = calculateTotal(expensesRes);

            setStats({
                totalIncome,
                totalExpense,
                savings: totalIncome - totalExpense,
            });

            setExpenses(expensesRes);

            // Process category data for pie chart
            const grouped = groupByCategory(expensesRes);
            const categoryChartData = Object.entries(grouped).map(([categoryName, data]) => {
                const category = EXPENSE_CATEGORIES.find(cat => cat.name === categoryName);
                return {
                    name: categoryName,
                    value: data.total,
                    color: category?.color || '#8b5cf6',
                };
            });
            setCategoryData(categoryChartData);

            // Process monthly data for line chart
            const monthlyExpenses = processMonthlyData(expensesRes);
            setMonthlyData(monthlyExpenses);

            // Fetch AI insight
            try {
                const aiRes = await getAIAdvice();
                setAiInsight(aiRes || 'Keep tracking your expenses!');
            } catch (aiError) {
                console.error('AI advice error:', aiError);
                setAiInsight('Start tracking your expenses to get personalized AI insights! 💡');
            }
        } catch (error) {
            console.error('Dashboard error:', error);
            // ✅ UPDATED - Don't show error for 404 (new users)
            if (error.response?.status !== 404) {
                toast.error('Failed to load dashboard data');
            }
        } finally {
            setLoading(false);
        }
    };

    const processMonthlyData = (expenses) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        const monthlyTotals = {};

        expenses.forEach(expense => {
            const date = new Date(expense.expenseDate);
            const monthName = months[date.getMonth()];
            if (!monthlyTotals[monthName]) {
                monthlyTotals[monthName] = 0;
            }
            monthlyTotals[monthName] += parseFloat(expense.amount);
        });

        return months.map(month => ({
            month,
            expenses: monthlyTotals[month] || 0,
        }));
    };

    const statsCards = [
        {
            title: 'Total Income',
            value: stats.totalIncome,
            icon: Wallet,
            color: 'text-accent-400',
            bgColor: 'bg-accent-500/10',
            trend: '+12.5%',
            trendUp: true,
        },
        {
            title: 'Total Expenses',
            value: stats.totalExpense,
            icon: TrendingDown,
            color: 'text-danger-400',
            bgColor: 'bg-danger-500/10',
            trend: '-8.2%',
            trendUp: false,
        },
        {
            title: 'Savings',
            value: stats.savings,
            icon: PiggyBank,
            color: 'text-ai-400',
            bgColor: 'bg-ai-500/10',
            trend: '+24.3%',
            trendUp: true,
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="animate-spin-slow w-16 h-16 border-4 border-ai-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-dark-400">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-8"
        >
            {/* Header */}
            <motion.div variants={itemVariants}>
                <h1 className="text-3xl font-display font-bold text-dark-100 mb-2">
                    Financial Overview
                </h1>
                <p className="text-dark-400">
                    Track your income, expenses, and savings at a glance
                </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                {statsCards.map((stat) => (
                    <motion.div key={stat.title} variants={itemVariants}>
                        <Card hover className="relative overflow-hidden">
                            <div className={`absolute top-0 right-0 w-32 h-32 ${stat.bgColor} rounded-full blur-3xl opacity-50`} />

                            <div className="relative">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                    </div>
                                    <div className={`flex items-center gap-1 text-sm ${stat.trendUp ? 'text-accent-400' : 'text-danger-400'}`}>
                                        {stat.trendUp ? (
                                            <ArrowUpRight className="w-4 h-4" />
                                        ) : (
                                            <ArrowDownRight className="w-4 h-4" />
                                        )}
                                        <span>{stat.trend}</span>
                                    </div>
                                </div>

                                <h3 className="text-dark-400 text-sm font-medium mb-1">
                                    {stat.title}
                                </h3>
                                <p className="text-3xl font-bold text-dark-100">
                                    {formatCurrency(stat.value)}
                                </p>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>

            {/* AI Insight */}
            <motion.div variants={itemVariants}>
                <Card gradient className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-ai-500/5 to-ai-700/5 animate-gradient" />

                    <div className="relative flex items-start gap-4">
                        <div className="p-3 bg-ai-500/20 rounded-xl float-animation">
                            <span className="text-white font-bold text-xl">₹</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-dark-100 mb-2 flex items-center gap-2">
                                🤖 AI Financial Insight
                            </h3>
                            <p className="text-dark-300 leading-relaxed">
                                {aiInsight}
                            </p>
                        </div>
                    </div>
                </Card>
            </motion.div>

            {/* Charts */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pie Chart - Category Distribution */}
                <Card>
                    <h3 className="text-lg font-semibold text-dark-100 mb-4">
                        Expense Distribution
                    </h3>
                    {categoryData.length > 0 ? (
                        <>
                            <ResponsiveContainer width="100%" height={280}>
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={90}
                                        fill="#8884d8"
                                        dataKey="value"
                                        paddingAngle={2}
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value) => formatCurrency(value)}
                                        contentStyle={{
                                            backgroundColor: '#1e293b',
                                            border: '1px solid #334155',
                                            borderRadius: '8px',
                                            color: '#f1f5f9'
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>

                            {/* Legend */}
                            <div className="grid grid-cols-2 gap-3 mt-4">
                                {categoryData.map((category) => (
                                    <div key={category.name} className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded-full flex-shrink-0"
                                            style={{ backgroundColor: category.color }}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-dark-400 truncate">{category.name}</p>
                                            <p className="text-sm text-dark-100 font-medium">{formatCurrency(category.value)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="h-64 flex flex-col items-center justify-center text-center">
                            <p className="text-dark-300 font-medium">No expense data available</p>
                            <p className="text-sm text-dark-500 mt-1">Add your first expense to see category breakdown</p>
                        </div>
                    )}
                </Card>

                {/* Line Chart - Monthly Trend */}
                <Card>
                    <h3 className="text-lg font-semibold text-dark-100 mb-4">
                        Monthly Expense Trend
                    </h3>
                    {monthlyData.some(d => d.expenses > 0) ? (
                        <ResponsiveContainer width="100%" height={280}>
                            <LineChart data={monthlyData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis
                                    dataKey="month"
                                    stroke="#94a3b8"
                                    style={{ fontSize: '12px' }}
                                />
                                <YAxis
                                    stroke="#94a3b8"
                                    style={{ fontSize: '12px' }}
                                    tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                                />
                                <Tooltip
                                    formatter={(value) => [formatCurrency(value), 'Expenses']}
                                    contentStyle={{
                                        backgroundColor: '#1e293b',
                                        border: '1px solid #334155',
                                        borderRadius: '8px',
                                        color: '#f1f5f9'
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="expenses"
                                    stroke="#a855f7"
                                    strokeWidth={3}
                                    dot={{ fill: '#a855f7', r: 5, strokeWidth: 2, stroke: '#fff' }}
                                    activeDot={{ r: 7 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-64 flex flex-col items-center justify-center text-center">
                            <p className="text-dark-300 font-medium">No monthly data yet</p>
                            <p className="text-sm text-dark-500 mt-1">Add expenses to see monthly trends</p>
                        </div>
                    )}
                </Card>
            </motion.div>
        </motion.div>
    );
};

export default Dashboard;