// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { PiggyBank, AlertCircle, Save, Loader, Bell, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
// import { getBudgets, createBudget, updateBudget } from '../../api/budget.api';
// import api from '../../api/axios';
// import Card from '../../components/common/Card';
// import Button from '../../components/common/Button';
// import Input from '../../components/common/Input';
// import { formatCurrency } from '../../utils/helpers';
// import { EXPENSE_CATEGORIES } from '../../utils/constants';
// import toast from 'react-hot-toast';

// const Budget = () => {
//     const [budgets, setBudgets] = useState([]);
//     const [alerts, setAlerts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [saving, setSaving] = useState(false);
//     const [showAlertBanner, setShowAlertBanner] = useState(true);

//     useEffect(() => {
//         loadBudgets();
//         loadAlerts();
//     }, []);

//     const loadBudgets = async () => {
//         setLoading(true);
//         try {
//             const budgetsData = await getBudgets();
//             const budgetMap = {};

//             if (budgetsData && Array.isArray(budgetsData)) {
//                 budgetsData.forEach(budget => {
//                     if (budget.category && budget.category.categoryId) {
//                         budgetMap[budget.category.categoryId] = {
//                             budgetId: budget.budgetId,
//                             categoryId: budget.category.categoryId,
//                             categoryName: budget.category.name,
//                             monthlyLimit: budget.monthlyLimit,
//                         };
//                     }
//                 });
//             }

//             const allBudgets = EXPENSE_CATEGORIES.map(cat => {
//                 const existing = budgetMap[cat.id];
//                 return {
//                     budgetId: existing?.budgetId || null,
//                     categoryId: cat.id,
//                     categoryName: cat.name,
//                     icon: cat.icon,
//                     color: cat.color,
//                     monthlyLimit: existing?.monthlyLimit || 0,
//                 };
//             });

//             setBudgets(allBudgets);
//         } catch (error) {
//             console.error('Failed to load budgets:', error);
//             setBudgets(EXPENSE_CATEGORIES.map(cat => ({
//                 budgetId: null,
//                 categoryId: cat.id,
//                 categoryName: cat.name,
//                 icon: cat.icon,
//                 color: cat.color,
//                 monthlyLimit: 0,
//             })));
//         } finally {
//             setLoading(false);
//         }
//     };

//     const loadAlerts = async () => {
//         try {
//             const res = await api.get('/api/budgets/alerts/active');
//             const data = Array.isArray(res.data) ? res.data : [];
//             setAlerts(data);

//             const exceeded = data.filter(a => a.status === 'EXCEEDED');
//             if (exceeded.length > 0) {
//                 const categories = exceeded.map(a => a.categoryName).join(', ');
//                 toast.error(
//                     `🚨 ${exceeded.length} budget${exceeded.length > 1 ? 's' : ''} exceeded: ${categories}`,
//                     { duration: 6000, id: 'budget-exceeded' }
//                 );
//             }
//         } catch (error) {
//             console.warn('Budget alerts not available:', error.message);
//             setAlerts([]);
//         }
//     };

//     const handleBudgetChange = (categoryId, value) => {
//         setBudgets(budgets.map(b =>
//             b.categoryId === categoryId
//                 ? { ...b, monthlyLimit: parseFloat(value) || 0 }
//                 : b
//         ));
//     };

//     const handleSave = async () => {
//         setSaving(true);
//         try {
//             const savePromises = budgets
//                 .filter(b => b.monthlyLimit > 0)
//                 .map(async (budget) => {
//                     const budgetData = {
//                         categoryId: budget.categoryId,
//                         monthlyLimit: budget.monthlyLimit
//                     };
//                     if (budget.budgetId) {
//                         return updateBudget(budget.budgetId, budgetData);
//                     } else {
//                         return createBudget(budgetData);
//                     }
//                 });

//             await Promise.all(savePromises);
//             toast.success('✅ Budgets saved successfully!');
//             await loadBudgets();
//             await loadAlerts();
//         } catch (error) {
//             console.error('Failed to save budgets:', error);
//             toast.error('Failed to save budgets. Please try again.');
//         } finally {
//             setSaving(false);
//         }
//     };

//     const getCategoryAlert = (categoryId) => {
//         return alerts.find(a => a.categoryId === categoryId) || null;
//     };

//     const getStatusStyle = (status) => {
//         switch (status) {
//             case 'EXCEEDED': return {
//                 border: 'border-red-500',
//                 bg: 'bg-red-500/5',
//                 text: 'text-red-400',
//                 badge: 'bg-red-500/20 text-red-400',
//                 bar: 'bg-red-500',
//             };
//             case 'CRITICAL': return {
//                 border: 'border-orange-500',
//                 bg: 'bg-orange-500/5',
//                 text: 'text-orange-400',
//                 badge: 'bg-orange-500/20 text-orange-400',
//                 bar: 'bg-orange-500',
//             };
//             case 'WARNING': return {
//                 border: 'border-yellow-500',
//                 bg: 'bg-yellow-500/5',
//                 text: 'text-yellow-400',
//                 badge: 'bg-yellow-500/20 text-yellow-400',
//                 bar: 'bg-yellow-500',
//             };
//             default: return {
//                 border: 'border-dark-700',
//                 bg: '',
//                 text: 'text-accent-400',
//                 badge: 'bg-accent-500/20 text-accent-400',
//                 bar: 'bg-accent-500',
//             };
//         }
//     };

//     const totalBudget = budgets.reduce((sum, b) => sum + (b.monthlyLimit || 0), 0);
//     const exceededAlerts = alerts.filter(a => a.status === 'EXCEEDED');
//     const warningAlerts = alerts.filter(a => a.status === 'WARNING' || a.status === 'CRITICAL');

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center h-full">
//                 <div className="text-center">
//                     <Loader className="w-12 h-12 text-ai-500 animate-spin mx-auto mb-4" />
//                     <p className="text-dark-400">Loading budgets...</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">

//             {/* ALERT BANNER */}
//             <AnimatePresence>
//                 {showAlertBanner && exceededAlerts.length > 0 && (
//                     <motion.div
//                         initial={{ opacity: 0, y: -20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -20 }}
//                         className="bg-red-500/10 border-2 border-red-500/50 rounded-xl p-4"
//                     >
//                         <div className="flex items-start justify-between gap-3">
//                             <div className="flex items-start gap-3">
//                                 <div className="p-2 bg-red-500/20 rounded-lg mt-0.5">
//                                     <Bell className="w-5 h-5 text-red-400 animate-bounce" />
//                                 </div>
//                                 <div>
//                                     <h3 className="font-bold text-red-400 text-lg mb-1">
//                                         🚨 Budget Exceeded Alert!
//                                     </h3>
//                                     <p className="text-dark-300 text-sm mb-2">
//                                         You have exceeded budget in {exceededAlerts.length} {exceededAlerts.length === 1 ? 'category' : 'categories'}:
//                                     </p>
//                                     <div className="flex flex-wrap gap-2">
//                                         {exceededAlerts.map(alert => (
//                                             <span key={alert.categoryId} className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs font-semibold">
//                                                 {alert.categoryName}: {formatCurrency(alert.currentSpent)} / {formatCurrency(alert.monthlyLimit)}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//                             <button
//                                 onClick={() => setShowAlertBanner(false)}
//                                 className="text-dark-400 hover:text-dark-200 transition-colors flex-shrink-0"
//                             >
//                                 <XCircle className="w-5 h-5" />
//                             </button>
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             {/* WARNING BANNER */}
//             <AnimatePresence>
//                 {warningAlerts.length > 0 && (
//                     <motion.div
//                         initial={{ opacity: 0, y: -20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4"
//                     >
//                         <div className="flex items-center gap-3">
//                             <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
//                             <p className="text-yellow-300 text-sm">
//                                 <strong>Warning:</strong> {warningAlerts.length} {warningAlerts.length === 1 ? 'category is' : 'categories are'} approaching budget limit:{' '}
//                                 {warningAlerts.map(a => a.categoryName).join(', ')}
//                             </p>
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             {/* Header */}
//             <div className="flex items-center justify-between">
//                 <div>
//                     <h1 className="text-3xl font-display font-bold text-dark-100 mb-2">
//                         Budget Management
//                     </h1>
//                     <p className="text-dark-400">
//                         Set monthly spending limits for each category
//                     </p>
//                 </div>
//                 <div className="flex items-center gap-3">
//                     {exceededAlerts.length > 0 && (
//                         <div className="flex items-center gap-2 px-3 py-2 bg-red-500/20 border border-red-500/30 rounded-lg">
//                             <Bell className="w-4 h-4 text-red-400" />
//                             <span className="text-red-400 text-sm font-semibold">
//                                 {exceededAlerts.length} Exceeded
//                             </span>
//                         </div>
//                     )}
//                     <Button onClick={handleSave} icon={Save} loading={saving} disabled={saving}>
//                         {saving ? 'Saving...' : 'Save Budgets'}
//                     </Button>
//                 </div>
//             </div>

//             {/* Summary Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <Card className="bg-gradient-to-br from-ai-500/10 to-accent-500/10 border-ai-500/20">
//                     <div className="flex items-center gap-3 mb-3">
//                         <div className="p-2 bg-ai-500/20 rounded-lg">
//                             <PiggyBank className="w-5 h-5 text-ai-400" />
//                         </div>
//                         <h3 className="font-semibold text-dark-100">Total Budget</h3>
//                     </div>
//                     <p className="text-2xl font-bold text-dark-100">{formatCurrency(totalBudget)}</p>
//                     <p className="text-xs text-dark-500 mt-1">{budgets.filter(b => b.monthlyLimit > 0).length} active budgets</p>
//                 </Card>

//                 <Card className={exceededAlerts.length > 0 ? 'border-red-500/50 bg-red-500/5' : ''}>
//                     <div className="flex items-center gap-3 mb-3">
//                         <div className={`p-2 rounded-lg ${exceededAlerts.length > 0 ? 'bg-red-500/20' : 'bg-danger-500/20'}`}>
//                             <TrendingUp className={`w-5 h-5 ${exceededAlerts.length > 0 ? 'text-red-400' : 'text-danger-400'}`} />
//                         </div>
//                         <h3 className="font-semibold text-dark-100">Exceeded</h3>
//                     </div>
//                     <p className={`text-2xl font-bold ${exceededAlerts.length > 0 ? 'text-red-400' : 'text-accent-400'}`}>
//                         {exceededAlerts.length}
//                     </p>
//                     <p className="text-xs text-dark-500 mt-1">categories over limit</p>
//                 </Card>

//                 <Card>
//                     <div className="flex items-center gap-3 mb-3">
//                         <div className="p-2 bg-accent-500/20 rounded-lg">
//                             <CheckCircle className="w-5 h-5 text-accent-400" />
//                         </div>
//                         <h3 className="font-semibold text-dark-100">Within Budget</h3>
//                     </div>
//                     <p className="text-2xl font-bold text-accent-400">
//                         {alerts.filter(a => a.status === 'SAFE').length}
//                     </p>
//                     <p className="text-xs text-dark-500 mt-1">categories on track</p>
//                 </Card>
//             </div>

//             {/* Budget List */}
//             <div className="space-y-4">
//                 <div className="flex items-center justify-between mb-2">
//                     <h2 className="text-xl font-semibold text-dark-100">Category Budgets</h2>
//                     <p className="text-sm text-dark-500">Set limits to track your spending</p>
//                 </div>

//                 {budgets.map((budget) => {
//                     const alert = getCategoryAlert(budget.categoryId);
//                     const style = getStatusStyle(alert?.status);
//                     const percentage = alert ? Math.min(alert.percentage, 100) : 0;
//                     const isExceeded = alert?.status === 'EXCEEDED';

//                     return (
//                         <motion.div
//                             key={budget.categoryId}
//                             animate={isExceeded ? {
//                                 boxShadow: ['0 0 0 0 rgba(239,68,68,0)', '0 0 0 4px rgba(239,68,68,0.2)', '0 0 0 0 rgba(239,68,68,0)']
//                             } : {}}
//                             transition={{ duration: 2, repeat: isExceeded ? Infinity : 0 }}
//                         >
//                             <Card
//                                 hover
//                                 className={`border-2 transition-all ${alert ? style.border : 'border-dark-700'} ${style.bg}`}
//                             >
//                                 <div className="space-y-3">
//                                     <div className="flex items-center justify-between">
//                                         <div className="flex items-center gap-4 flex-1">
//                                             <div
//                                                 className="p-3 rounded-xl"
//                                                 style={{ backgroundColor: `${budget.color}20` }}
//                                             >
//                                                 <span className="text-3xl">{budget.icon}</span>
//                                             </div>
//                                             <div className="flex-1">
//                                                 <div className="flex items-center gap-2">
//                                                     <h3 className="font-semibold text-dark-100 text-lg">
//                                                         {budget.categoryName}
//                                                     </h3>
//                                                     {alert && (
//                                                         <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${style.badge}`}>
//                                                             {alert.status === 'EXCEEDED' ? '🚨 EXCEEDED' :
//                                                                 alert.status === 'CRITICAL' ? '🔴 CRITICAL' :
//                                                                     alert.status === 'WARNING' ? '⚠️ WARNING' : '✅ SAFE'}
//                                                         </span>
//                                                     )}
//                                                 </div>
//                                                 {alert ? (
//                                                     <p className={`text-sm font-medium ${style.text}`}>
//                                                         {formatCurrency(alert.currentSpent)} spent of {formatCurrency(alert.monthlyLimit)} limit
//                                                         {isExceeded && (
//                                                             <span className="ml-2 text-red-400 font-bold">
//                                                                 (+{formatCurrency(alert.currentSpent - alert.monthlyLimit)} over!)
//                                                             </span>
//                                                         )}
//                                                     </p>
//                                                 ) : (
//                                                     <p className="text-sm text-dark-400">Monthly spending limit</p>
//                                                 )}
//                                             </div>
//                                         </div>

//                                         <div className="w-48">
//                                             <Input
//                                                 type="number"
//                                                 placeholder="Enter amount"
//                                                 value={budget.monthlyLimit || ''}
//                                                 onChange={(e) => handleBudgetChange(budget.categoryId, e.target.value)}
//                                                 min="0"
//                                                 step="100"
//                                                 className={isExceeded ? 'border-red-500 focus:ring-red-500' : ''}
//                                             />
//                                         </div>
//                                     </div>

//                                     {/* Progress Bar */}
//                                     {alert && alert.monthlyLimit > 0 && (
//                                         <div>
//                                             <div className="flex items-center justify-between text-xs mb-1.5">
//                                                 <span className="text-dark-400">{alert.percentage.toFixed(1)}% used</span>
//                                                 <span className={style.text}>{alert.message}</span>
//                                             </div>
//                                             <div className="w-full bg-dark-800 rounded-full h-2.5 overflow-hidden">
//                                                 <motion.div
//                                                     initial={{ width: 0 }}
//                                                     animate={{ width: `${percentage}%` }}
//                                                     transition={{ duration: 0.8, ease: 'easeOut' }}
//                                                     className={`h-full ${style.bar} transition-colors ${isExceeded ? 'animate-pulse' : ''}`}
//                                                 />
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             </Card>
//                         </motion.div>
//                     );
//                 })}
//             </div>

//             {/* Info Card */}
//             <Card className="bg-dark-800/50 border-dark-700">
//                 <div className="flex items-start gap-3">
//                     <AlertCircle className="w-5 h-5 text-ai-400 flex-shrink-0 mt-0.5" />
//                     <div>
//                         <h4 className="font-semibold text-dark-200 mb-1">💡 Budget Tips</h4>
//                         <ul className="text-sm text-dark-400 space-y-1">
//                             <li>• Set realistic limits based on your monthly income</li>
//                             <li>• Track your expenses regularly to stay within budget</li>
//                             <li>• Adjust budgets as your spending patterns change</li>
//                             <li>• Check the Dashboard to see your current spending vs budget</li>
//                         </ul>
//                     </div>
//                 </div>
//             </Card>
//         </motion.div>
//     );
// };

// export default Budget;
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PiggyBank, AlertCircle, Save, Loader, Bell, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import { getBudgets, createBudget, updateBudget } from '../../api/budget.api';
import api from '../../api/axios';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { formatCurrency } from '../../utils/helpers';
import { EXPENSE_CATEGORIES } from '../../utils/constants';
import toast from 'react-hot-toast';

const Budget = () => {
    const [budgets, setBudgets] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showAlertBanner, setShowAlertBanner] = useState(true);

    useEffect(() => {
        loadBudgets();
        loadAlerts();
    }, []);

    const loadBudgets = async () => {
        setLoading(true);
        try {
            const budgetsData = await getBudgets();
            const budgetMap = {};

            if (budgetsData && Array.isArray(budgetsData)) {
                budgetsData.forEach(budget => {
                    if (budget.category && budget.category.categoryId) {
                        budgetMap[budget.category.categoryId] = {
                            budgetId: budget.budgetId,
                            categoryId: budget.category.categoryId,
                            categoryName: budget.category.name,
                            monthlyLimit: budget.monthlyLimit,
                        };
                    }
                });
            }

            const allBudgets = EXPENSE_CATEGORIES.map(cat => {
                const existing = budgetMap[cat.id];
                return {
                    budgetId: existing?.budgetId || null,
                    categoryId: cat.id,
                    categoryName: cat.name,
                    icon: cat.icon,
                    color: cat.color,
                    monthlyLimit: existing?.monthlyLimit || 0,
                };
            });

            setBudgets(allBudgets);
        } catch (error) {
            console.error('Failed to load budgets:', error);
            setBudgets(EXPENSE_CATEGORIES.map(cat => ({
                budgetId: null,
                categoryId: cat.id,
                categoryName: cat.name,
                icon: cat.icon,
                color: cat.color,
                monthlyLimit: 0,
            })));
        } finally {
            setLoading(false);
        }
    };

    const loadAlerts = async () => {
        try {
            // ✅ FIXED: Get ALL alerts including SAFE
            const res = await api.get('/api/budgets/alerts');
            const data = Array.isArray(res.data) ? res.data : [];
            console.log('📊 Budget page - All alerts loaded:', data);
            setAlerts(data);

            const exceeded = data.filter(a => a.status === 'EXCEEDED');
            if (exceeded.length > 0) {
                const categories = exceeded.map(a => a.categoryName).join(', ');
                toast.error(
                    `🚨 ${exceeded.length} budget${exceeded.length > 1 ? 's' : ''} exceeded: ${categories}`,
                    { duration: 6000, id: 'budget-exceeded' }
                );
            }
        } catch (error) {
            console.warn('Budget alerts not available:', error.message);
            setAlerts([]);
        }
    };

    const handleBudgetChange = (categoryId, value) => {
        setBudgets(budgets.map(b =>
            b.categoryId === categoryId
                ? { ...b, monthlyLimit: parseFloat(value) || 0 }
                : b
        ));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const savePromises = budgets
                .filter(b => b.monthlyLimit > 0)
                .map(async (budget) => {
                    const budgetData = {
                        categoryId: budget.categoryId,
                        monthlyLimit: budget.monthlyLimit
                    };
                    if (budget.budgetId) {
                        return updateBudget(budget.budgetId, budgetData);
                    } else {
                        return createBudget(budgetData);
                    }
                });

            await Promise.all(savePromises);
            toast.success('✅ Budgets saved successfully!');
            await loadBudgets();
            await loadAlerts();
        } catch (error) {
            console.error('Failed to save budgets:', error);
            toast.error('Failed to save budgets. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const getCategoryAlert = (categoryId) => {
        return alerts.find(a => a.categoryId === categoryId) || null;
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'EXCEEDED': return {
                border: 'border-red-500',
                bg: 'bg-red-500/5',
                text: 'text-red-400',
                badge: 'bg-red-500/20 text-red-400',
                bar: 'bg-red-500',
            };
            case 'CRITICAL': return {
                border: 'border-orange-500',
                bg: 'bg-orange-500/5',
                text: 'text-orange-400',
                badge: 'bg-orange-500/20 text-orange-400',
                bar: 'bg-orange-500',
            };
            case 'WARNING': return {
                border: 'border-yellow-500',
                bg: 'bg-yellow-500/5',
                text: 'text-yellow-400',
                badge: 'bg-yellow-500/20 text-yellow-400',
                bar: 'bg-yellow-500',
            };
            case 'SAFE': return {
                border: 'border-green-500/30',
                bg: 'bg-green-500/5',
                text: 'text-green-400',
                badge: 'bg-green-500/20 text-green-400',
                bar: 'bg-green-500',
            };
            default: return {
                border: 'border-dark-700',
                bg: '',
                text: 'text-dark-400',
                badge: 'bg-dark-700 text-dark-400',
                bar: 'bg-dark-600',
            };
        }
    };

    const totalBudget = budgets.reduce((sum, b) => sum + (b.monthlyLimit || 0), 0);
    const exceededAlerts = alerts.filter(a => a.status === 'EXCEEDED');
    const warningAlerts = alerts.filter(a => a.status === 'WARNING' || a.status === 'CRITICAL');
    const safeAlerts = alerts.filter(a => a.status === 'SAFE');

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <Loader className="w-12 h-12 text-ai-500 animate-spin mx-auto mb-4" />
                    <p className="text-dark-400">Loading budgets...</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">

            {/* ALERT BANNER - Only show if exceeded */}
            <AnimatePresence>
                {showAlertBanner && exceededAlerts.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-red-500/10 border-2 border-red-500/50 rounded-xl p-4"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-red-500/20 rounded-lg mt-0.5">
                                    <Bell className="w-5 h-5 text-red-400 animate-bounce" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-red-400 text-lg mb-1">
                                        🚨 Budget Exceeded Alert!
                                    </h3>
                                    <p className="text-dark-300 text-sm mb-2">
                                        You have exceeded budget in {exceededAlerts.length} {exceededAlerts.length === 1 ? 'category' : 'categories'}:
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {exceededAlerts.map(alert => (
                                            <span key={alert.categoryId} className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs font-semibold">
                                                {alert.categoryName}: {formatCurrency(alert.currentSpent)} / {formatCurrency(alert.monthlyLimit)}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowAlertBanner(false)}
                                className="text-dark-400 hover:text-dark-200 transition-colors flex-shrink-0"
                            >
                                <XCircle className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* WARNING BANNER */}
            <AnimatePresence>
                {warningAlerts.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4"
                    >
                        <div className="flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                            <p className="text-yellow-300 text-sm">
                                <strong>Warning:</strong> {warningAlerts.length} {warningAlerts.length === 1 ? 'category is' : 'categories are'} approaching budget limit:{' '}
                                {warningAlerts.map(a => a.categoryName).join(', ')}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-dark-100 mb-2">
                        Budget Management
                    </h1>
                    <p className="text-dark-400">
                        Set monthly spending limits for each category
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    {exceededAlerts.length > 0 && (
                        <div className="flex items-center gap-2 px-3 py-2 bg-red-500/20 border border-red-500/30 rounded-lg">
                            <Bell className="w-4 h-4 text-red-400" />
                            <span className="text-red-400 text-sm font-semibold">
                                {exceededAlerts.length} Exceeded
                            </span>
                        </div>
                    )}
                    <Button onClick={handleSave} icon={Save} loading={saving} disabled={saving}>
                        {saving ? 'Saving...' : 'Save Budgets'}
                    </Button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-ai-500/10 to-accent-500/10 border-ai-500/20">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-ai-500/20 rounded-lg">
                            <PiggyBank className="w-5 h-5 text-ai-400" />
                        </div>
                        <h3 className="font-semibold text-dark-100">Total Budget</h3>
                    </div>
                    <p className="text-2xl font-bold text-dark-100">{formatCurrency(totalBudget)}</p>
                    <p className="text-xs text-dark-500 mt-1">{budgets.filter(b => b.monthlyLimit > 0).length} active budgets</p>
                </Card>

                <Card className={exceededAlerts.length > 0 ? 'border-red-500/50 bg-red-500/5' : ''}>
                    <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg ${exceededAlerts.length > 0 ? 'bg-red-500/20' : 'bg-danger-500/20'}`}>
                            <TrendingUp className={`w-5 h-5 ${exceededAlerts.length > 0 ? 'text-red-400' : 'text-danger-400'}`} />
                        </div>
                        <h3 className="font-semibold text-dark-100">Exceeded</h3>
                    </div>
                    <p className={`text-2xl font-bold ${exceededAlerts.length > 0 ? 'text-red-400' : 'text-accent-400'}`}>
                        {exceededAlerts.length}
                    </p>
                    <p className="text-xs text-dark-500 mt-1">categories over limit</p>
                </Card>

                <Card className="border-green-500/30 bg-green-500/5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-green-500/20 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>
                        <h3 className="font-semibold text-dark-100">Within Budget</h3>
                    </div>
                    <p className="text-2xl font-bold text-green-400">
                        {safeAlerts.length}
                    </p>
                    <p className="text-xs text-dark-500 mt-1">categories on track</p>
                </Card>
            </div>

            {/* Budget List */}
            <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold text-dark-100">Category Budgets</h2>
                    <p className="text-sm text-dark-500">Set limits to track your spending</p>
                </div>

                {budgets.map((budget) => {
                    const alert = getCategoryAlert(budget.categoryId);
                    const style = getStatusStyle(alert?.status);
                    const percentage = alert ? Math.min(alert.percentage, 100) : 0;
                    const isExceeded = alert?.status === 'EXCEEDED';
                    const isSafe = alert?.status === 'SAFE';

                    return (
                        <motion.div
                            key={budget.categoryId}
                            animate={isExceeded ? {
                                boxShadow: ['0 0 0 0 rgba(239,68,68,0)', '0 0 0 4px rgba(239,68,68,0.2)', '0 0 0 0 rgba(239,68,68,0)']
                            } : {}}
                            transition={{ duration: 2, repeat: isExceeded ? Infinity : 0 }}
                        >
                            <Card
                                hover
                                className={`border-2 transition-all ${alert ? style.border : 'border-dark-700'} ${style.bg}`}
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4 flex-1">
                                            <div
                                                className="p-3 rounded-xl"
                                                style={{ backgroundColor: `${budget.color}20` }}
                                            >
                                                <span className="text-3xl">{budget.icon}</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-semibold text-dark-100 text-lg">
                                                        {budget.categoryName}
                                                    </h3>
                                                    {alert && (
                                                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${style.badge}`}>
                                                            {alert.status === 'EXCEEDED' ? '🚨 EXCEEDED' :
                                                                alert.status === 'CRITICAL' ? '🔴 CRITICAL' :
                                                                    alert.status === 'WARNING' ? '⚠️ WARNING' :
                                                                        '✅ SAFE'}
                                                        </span>
                                                    )}
                                                </div>
                                                {alert ? (
                                                    <p className={`text-sm font-medium ${style.text}`}>
                                                        {formatCurrency(alert.currentSpent)} spent of {formatCurrency(alert.monthlyLimit)} limit
                                                        {isExceeded && (
                                                            <span className="ml-2 text-red-400 font-bold">
                                                                (+{formatCurrency(alert.currentSpent - alert.monthlyLimit)} over!)
                                                            </span>
                                                        )}
                                                        {isSafe && (
                                                            <span className="ml-2 text-green-400 font-medium">
                                                                ({formatCurrency(alert.monthlyLimit - alert.currentSpent)} remaining)
                                                            </span>
                                                        )}
                                                    </p>
                                                ) : (
                                                    <p className="text-sm text-dark-400">Monthly spending limit</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="w-48">
                                            <Input
                                                type="number"
                                                placeholder="Enter amount"
                                                value={budget.monthlyLimit || ''}
                                                onChange={(e) => handleBudgetChange(budget.categoryId, e.target.value)}
                                                min="0"
                                                step="100"
                                                className={isExceeded ? 'border-red-500 focus:ring-red-500' : ''}
                                            />
                                        </div>
                                    </div>

                                    {/* ✅ Progress bar for ALL budgets with alerts */}
                                    {alert && alert.monthlyLimit > 0 && (
                                        <div>
                                            <div className="flex items-center justify-between text-xs mb-1.5">
                                                <span className="text-dark-400">{alert.percentage.toFixed(1)}% used</span>
                                                <span className={style.text}>{alert.message}</span>
                                            </div>
                                            <div className="w-full bg-dark-800 rounded-full h-2.5 overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${percentage}%` }}
                                                    transition={{ duration: 0.8, ease: 'easeOut' }}
                                                    className={`h-full ${style.bar} transition-colors ${isExceeded ? 'animate-pulse' : ''}`}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            {/* Info Card */}
            <Card className="bg-dark-800/50 border-dark-700">
                <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-ai-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-semibold text-dark-200 mb-1">💡 Budget Tips</h4>
                        <ul className="text-sm text-dark-400 space-y-1">
                            <li>• Set realistic limits based on your monthly income</li>
                            <li>• Track your expenses regularly to stay within budget</li>
                            <li>• Adjust budgets as your spending patterns change</li>
                            <li>• Check the Dashboard to see your current spending vs budget</li>
                        </ul>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

export default Budget;