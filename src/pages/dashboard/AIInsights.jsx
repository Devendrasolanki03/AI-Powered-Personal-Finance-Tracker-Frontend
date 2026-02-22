
// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import {
//     Sparkles,
//     RefreshCw,
//     Clock,
//     History,
//     Trash2,
//     Calendar,
//     TrendingUp,
//     AlertCircle,
//     Lightbulb,
//     Brain,
//     Target,
//     Zap
// } from 'lucide-react';
// import { getAIAdvice } from '../../api/ai.api';
// import api from '../../api/axios';
// import Card from '../../components/common/Card';
// import Button from '../../components/common/Button';
// import toast from 'react-hot-toast';

// const AIInsights = () => {
//     const [allInsights, setAllInsights] = useState([]);
//     const [selectedInsight, setSelectedInsight] = useState(null);
//     const [typedText, setTypedText] = useState('');
//     const [generating, setGenerating] = useState(false);
//     const [initialLoading, setInitialLoading] = useState(true);

//     useEffect(() => {
//         loadAllInsights();
//     }, []);

//     const loadAllInsights = async () => {
//         setInitialLoading(true);
//         try {
//             const response = await api.get('/api/ai-insights');

//             if (response.data && response.data.length > 0) {
//                 const adviceInsights = response.data
//                     .filter(insight =>
//                         insight.insightType === 'ADVICE' ||
//                         insight.insightType === 'advice'
//                     )
//                     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//                 setAllInsights(adviceInsights);

//                 if (adviceInsights.length > 0) {
//                     selectInsight(adviceInsights[0]);
//                 } else {
//                     showWelcomeMessage();
//                 }
//             } else {
//                 showWelcomeMessage();
//             }
//         } catch (error) {
//             console.error('Failed to load insights:', error);
//             showWelcomeMessage();
//         } finally {
//             setInitialLoading(false);
//         }
//     };

//     const showWelcomeMessage = () => {
//         const welcomeMsg = "Welcome to your AI Financial Advisor! Generate your first personalized insight to get started with smart financial recommendations tailored to your spending patterns and goals.";
//         setTypedText(welcomeMsg);
//     };

//     const selectInsight = (insight) => {
//         setSelectedInsight(insight);
//         animateText(insight.aiResponse || insight.insightText || 'No advice available');
//     };

//     const generateNewAdvice = async () => {
//         setGenerating(true);

//         try {
//             const response = await getAIAdvice();
//             const aiText = response?.data?.advice || response?.advice || response?.data || response;

//             try {
//                 await api.post(
//                     '/api/ai-insights?insightType=ADVICE',
//                     aiText,
//                     { headers: { 'Content-Type': 'text/plain' } }
//                 );
//             } catch (saveError) {
//                 console.warn('Failed to save:', saveError);
//             }

//             toast.success('✨ New AI advice generated successfully!');
//             await loadAllInsights();

//         } catch (error) {
//             console.error('AI error:', error);
//             let message = 'AI insights temporarily unavailable.';
//             if (error?.response?.status === 429) {
//                 message = '⚠️ AI quota exceeded. Please try again later.';
//             }
//             toast.error(message);
//         } finally {
//             setGenerating(false);
//         }
//     };

//     const deleteInsight = async (insightId, e) => {
//         e?.stopPropagation();
//         if (!confirm('Are you sure you want to delete this advice?')) return;

//         try {
//             await api.delete(`/api/ai-insights/${insightId}`);
//             toast.success('Advice deleted successfully');
//             await loadAllInsights();
//         } catch (error) {
//             toast.error('Failed to delete advice');
//         }
//     };

//     const animateText = (text) => {
//         let index = 0;
//         setTypedText('');

//         const interval = setInterval(() => {
//             if (index < text.length) {
//                 setTypedText((prev) => prev + text[index]);
//                 index++;
//             } else {
//                 clearInterval(interval);
//             }
//         }, 15);
//     };

//     const formatDate = (timestamp) => {
//         if (!timestamp) return '';
//         const date = new Date(timestamp);
//         const now = new Date();
//         const diffMs = now - date;
//         const diffMins = Math.floor(diffMs / 60000);
//         const diffHours = Math.floor(diffMs / 3600000);
//         const diffDays = Math.floor(diffMs / 86400000);

//         if (diffMins < 1) return 'Just now';
//         if (diffMins < 60) return `${diffMins}m ago`;
//         if (diffHours < 24) return `${diffHours}h ago`;
//         if (diffDays < 7) return `${diffDays}d ago`;

//         return date.toLocaleDateString('en-US', {
//             month: 'short',
//             day: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit'
//         });
//     };

//     return (
//         <div className="min-h-screen">
//             {/* Header Section */}
//             <div className="mb-8">
//                 <div className="flex items-center justify-between mb-2">
//                     <div className="flex items-center gap-3">
//                         <div className="p-3 bg-gradient-to-br from-ai-500 to-ai-700 rounded-2xl shadow-lg shadow-ai-500/20">
//                             <Brain className="w-7 h-7 text-white" />
//                         </div>
//                         <div>
//                             <h1 className="text-3xl font-display font-bold text-dark-100">
//                                 AI Financial Advisor
//                             </h1>
//                             <p className="text-dark-400 text-sm mt-0.5">
//                                 Personalized insights powered by artificial intelligence
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Main Grid Layout */}
//             <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
//                 {/* Left Column - Main Content */}
//                 <div className="xl:col-span-8 space-y-6">
//                     {/* Current Advice Card */}
//                     <Card className="relative overflow-hidden border-2 border-dark-700/50">
//                         {/* Gradient Background */}
//                         <div className="absolute inset-0 bg-gradient-to-br from-ai-500/5 via-transparent to-accent-500/5" />

//                         <div className="relative">
//                             {/* Card Header */}
//                             <div className="flex items-center justify-between pb-6 border-b border-dark-700/50 mb-6">
//                                 <div className="flex items-center gap-3">
//                                     <div className="p-2.5 bg-ai-500/20 rounded-xl">
//                                         <Sparkles className="w-5 h-5 text-ai-400" />
//                                     </div>
//                                     <div>
//                                         <h2 className="text-lg font-semibold text-dark-100">
//                                             Current Insight
//                                         </h2>
//                                         {selectedInsight && (
//                                             <div className="flex items-center gap-1.5 text-xs text-dark-500 mt-0.5">
//                                                 <Clock className="w-3.5 h-3.5" />
//                                                 <span>{formatDate(selectedInsight.createdAt)}</span>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>

//                                 <Button
//                                     onClick={generateNewAdvice}
//                                     loading={generating}
//                                     disabled={generating || initialLoading}
//                                     className="shadow-lg shadow-ai-500/20"
//                                 >
//                                     <RefreshCw className={`w-4 h-4 ${generating ? 'animate-spin' : ''}`} />
//                                     Generate New
//                                 </Button>
//                             </div>

//                             {/* Content */}
//                             {initialLoading ? (
//                                 <div className="flex flex-col items-center justify-center py-16 text-center">
//                                     <div className="relative">
//                                         <div className="w-16 h-16 border-4 border-ai-500/30 border-t-ai-500 rounded-full animate-spin" />
//                                         <Brain className="w-6 h-6 text-ai-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
//                                     </div>
//                                     <p className="text-dark-400 mt-4">Loading your AI insights...</p>
//                                 </div>
//                             ) : (
//                                 <div className="min-h-[200px]">
//                                     <p className="text-dark-200 leading-relaxed text-base whitespace-pre-wrap">
//                                         {typedText}
//                                         {generating && <span className="inline-block w-0.5 h-5 bg-ai-400 animate-pulse ml-0.5" />}
//                                     </p>
//                                 </div>
//                             )}
//                         </div>
//                     </Card>

//                     {/* Features Grid */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                         <Card className="hover:border-accent-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent-500/10">
//                             <div className="text-center p-2">
//                                 <div className="w-12 h-12 bg-accent-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
//                                     <Target className="w-6 h-6 text-accent-400" />
//                                 </div>
//                                 <h3 className="font-semibold text-dark-100 text-sm mb-1">
//                                     Goal Tracking
//                                 </h3>
//                                 <p className="text-xs text-dark-500">
//                                     Smart goal analysis
//                                 </p>
//                             </div>
//                         </Card>

//                         <Card className="hover:border-ai-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-ai-500/10">
//                             <div className="text-center p-2">
//                                 <div className="w-12 h-12 bg-ai-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
//                                     <TrendingUp className="w-6 h-6 text-ai-400" />
//                                 </div>
//                                 <h3 className="font-semibold text-dark-100 text-sm mb-1">
//                                     Trend Analysis
//                                 </h3>
//                                 <p className="text-xs text-dark-500">
//                                     Pattern detection
//                                 </p>
//                             </div>
//                         </Card>

//                         <Card className="hover:border-danger-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-danger-500/10">
//                             <div className="text-center p-2">
//                                 <div className="w-12 h-12 bg-danger-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
//                                     <AlertCircle className="w-6 h-6 text-danger-400" />
//                                 </div>
//                                 <h3 className="font-semibold text-dark-100 text-sm mb-1">
//                                     Smart Alerts
//                                 </h3>
//                                 <p className="text-xs text-dark-500">
//                                     Budget warnings
//                                 </p>
//                             </div>
//                         </Card>

//                         <Card className="hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10">
//                             <div className="text-center p-2">
//                                 <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
//                                     <Zap className="w-6 h-6 text-yellow-400" />
//                                 </div>
//                                 <h3 className="font-semibold text-dark-100 text-sm mb-1">
//                                     Quick Insights
//                                 </h3>
//                                 <p className="text-xs text-dark-500">
//                                     Instant analysis
//                                 </p>
//                             </div>
//                         </Card>
//                     </div>
//                 </div>

//                 {/* Right Column - History Sidebar */}
//                 <div className="xl:col-span-4">
//                     <Card className="sticky top-6 border-2 border-dark-700/50">
//                         <div className="flex items-center justify-between pb-4 border-b border-dark-700/50 mb-4">
//                             <div className="flex items-center gap-2">
//                                 <History className="w-5 h-5 text-ai-400" />
//                                 <h3 className="font-semibold text-dark-100">
//                                     Advice History
//                                 </h3>
//                             </div>
//                             <span className="px-2.5 py-1 bg-dark-700/50 rounded-full text-xs font-medium text-dark-300">
//                                 {allInsights.length}
//                             </span>
//                         </div>

//                         <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar pr-2">
//                             {allInsights.length === 0 ? (
//                                 <div className="text-center py-12">
//                                     <div className="w-16 h-16 bg-dark-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                                         <Lightbulb className="w-8 h-8 text-dark-600" />
//                                     </div>
//                                     <p className="text-sm text-dark-400 font-medium">No advice yet</p>
//                                     <p className="text-xs text-dark-600 mt-1">
//                                         Click "Generate New" to create your first insight
//                                     </p>
//                                 </div>
//                             ) : (
//                                 allInsights.map((insight, index) => (
//                                     <motion.button
//                                         key={insight.insightId}
//                                         initial={{ opacity: 0, y: 10 }}
//                                         animate={{ opacity: 1, y: 0 }}
//                                         transition={{ delay: index * 0.03 }}
//                                         onClick={() => selectInsight(insight)}
//                                         className={`
//                                             w-full text-left p-3.5 rounded-xl transition-all duration-200
//                                             ${selectedInsight?.insightId === insight.insightId
//                                                 ? 'bg-gradient-to-r from-ai-500/20 to-ai-600/20 border-2 border-ai-500/50 shadow-lg shadow-ai-500/10'
//                                                 : 'bg-dark-800/30 hover:bg-dark-800/50 border-2 border-transparent hover:border-dark-700/50'
//                                             }
//                                             group relative
//                                         `}
//                                     >
//                                         <div className="flex items-start gap-3">
//                                             <div className={`
//                                                 p-1.5 rounded-lg flex-shrink-0
//                                                 ${selectedInsight?.insightId === insight.insightId
//                                                     ? 'bg-ai-500/30'
//                                                     : 'bg-dark-700/50'
//                                                 }
//                                             `}>
//                                                 <Sparkles className={`
//                                                     w-4 h-4
//                                                     ${selectedInsight?.insightId === insight.insightId
//                                                         ? 'text-ai-400'
//                                                         : 'text-dark-500'
//                                                     }
//                                                 `} />
//                                             </div>

//                                             <div className="flex-1 min-w-0">
//                                                 <p className="text-sm text-dark-200 line-clamp-2 mb-2 leading-relaxed">
//                                                     {(insight.aiResponse || insight.insightText || '').substring(0, 80)}
//                                                     {(insight.aiResponse || insight.insightText || '').length > 80 && '...'}
//                                                 </p>
//                                                 <div className="flex items-center gap-2 text-xs text-dark-500">
//                                                     <Clock className="w-3 h-3" />
//                                                     <span>{formatDate(insight.createdAt)}</span>
//                                                 </div>
//                                             </div>

//                                             <button
//                                                 onClick={(e) => deleteInsight(insight.insightId, e)}
//                                                 className="
//                                                     absolute top-2 right-2
//                                                     p-1.5 rounded-lg
//                                                     opacity-0 group-hover:opacity-100
//                                                     hover:bg-danger-500/20
//                                                     transition-all duration-200
//                                                 "
//                                                 title="Delete advice"
//                                             >
//                                                 <Trash2 className="w-3.5 h-3.5 text-danger-400" />
//                                             </button>
//                                         </div>
//                                     </motion.button>
//                                 ))
//                             )}
//                         </div>
//                     </Card>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AIInsights;


// // import { useState, useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import {
// //     Sparkles, RefreshCw, Clock, History, Trash2, TrendingUp,
// //     AlertCircle, Lightbulb, Brain, Target, Zap
// // } from 'lucide-react';
// // import { getAIAdvice } from '../../api/ai.api';
// // import api from '../../api/axios';
// // import Card from '../../components/common/Card';
// // import Button from '../../components/common/Button';
// // import toast from 'react-hot-toast';

// // const AIInsights = () => {
// //     const [allInsights, setAllInsights] = useState([]);
// //     const [selectedInsight, setSelectedInsight] = useState(null);
// //     const [typedText, setTypedText] = useState('');
// //     const [generating, setGenerating] = useState(false);
// //     const [initialLoading, setInitialLoading] = useState(true);

// //     // ✅ FIXED: Only load history on mount, NO automatic AI generation
// //     useEffect(() => {
// //         loadInsightsHistory();
// //     }, []);

// //     // ✅ FIXED: Load saved insights from DB only, no AI call
// //     const loadInsightsHistory = async () => {
// //         setInitialLoading(true);
// //         try {
// //             const response = await api.get('/api/ai-insights');

// //             if (response.data && response.data.length > 0) {
// //                 const adviceInsights = response.data
// //                     .filter(insight =>
// //                         insight.insightType === 'ANALYSIS' ||
// //                         insight.insightType === 'analysis' ||
// //                         insight.insightType === 'ADVICE' ||
// //                         insight.insightType === 'advice'
// //                     )
// //                     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

// //                 setAllInsights(adviceInsights);

// //                 if (adviceInsights.length > 0) {
// //                     selectInsight(adviceInsights[0]);
// //                 } else {
// //                     showWelcomeMessage();
// //                 }
// //             } else {
// //                 showWelcomeMessage();
// //             }
// //         } catch (error) {
// //             console.error('Failed to load insights:', error);
// //             showWelcomeMessage();
// //         } finally {
// //             setInitialLoading(false);
// //         }
// //     };

// //     const showWelcomeMessage = () => {
// //         const welcomeMsg = `👋 Welcome to your AI Financial Advisor powered by Gemini!

// // Click "Generate New Advice" below to get your first personalized financial insight based on your spending patterns, budget status, and financial goals.

// // Your AI advisor will analyze your data and provide:
// // • Smart spending insights
// // • Budget optimization tips
// // • Savings recommendations
// // • Custom financial strategies

// // All your advice history will be saved here for future reference.`;
// //         setTypedText(welcomeMsg);
// //     };

// //     const selectInsight = (insight) => {
// //         setSelectedInsight(insight);
// //         animateText(insight.insightText || insight.aiResponse || 'No advice available');
// //     };

// //     // ✅ FIXED: Manual trigger only - user clicks button to generate
// //     const generateNewAdvice = async () => {
// //         setGenerating(true);

// //         try {
// //             const response = await getAIAdvice();
// //             const aiText = response?.data?.advice || response?.advice || response?.data || response;

// //             if (!aiText || aiText === 'AI insights are temporarily unavailable. Please try again later.') {
// //                 toast.error('❌ AI service is currently unavailable. Please try again later.');
// //                 setGenerating(false);
// //                 return;
// //             }

// //             toast.success('✨ New AI advice generated successfully!');

// //             // Reload history to show new advice
// //             await loadInsightsHistory();

// //         } catch (error) {
// //             console.error('AI generation error:', error);

// //             let message = '❌ AI insights temporarily unavailable.';

// //             if (error?.response?.status === 429) {
// //                 message = '⚠️ AI quota exceeded. Please try again in a few minutes.';
// //             } else if (error?.response?.status === 500) {
// //                 message = '❌ AI service error. Our team has been notified.';
// //             } else if (error?.message?.includes('Network Error')) {
// //                 message = '❌ Network error. Please check your connection.';
// //             }

// //             toast.error(message);
// //         } finally {
// //             setGenerating(false);
// //         }
// //     };

// //     const deleteInsight = async (insightId, e) => {
// //         e?.stopPropagation();
// //         if (!confirm('Are you sure you want to delete this advice?')) return;

// //         try {
// //             await api.delete(`/api/ai-insights/${insightId}`);
// //             toast.success('Advice deleted successfully');
// //             await loadInsightsHistory();
// //         } catch (error) {
// //             toast.error('Failed to delete advice');
// //         }
// //     };

// //     const animateText = (text) => {
// //         let index = 0;
// //         setTypedText('');

// //         const interval = setInterval(() => {
// //             if (index < text.length) {
// //                 setTypedText((prev) => prev + text[index]);
// //                 index++;
// //             } else {
// //                 clearInterval(interval);
// //             }
// //         }, 15);
// //     };

// //     const formatDate = (timestamp) => {
// //         if (!timestamp) return '';
// //         const date = new Date(timestamp);
// //         const now = new Date();
// //         const diffMs = now - date;
// //         const diffMins = Math.floor(diffMs / 60000);
// //         const diffHours = Math.floor(diffMs / 3600000);
// //         const diffDays = Math.floor(diffMs / 86400000);

// //         if (diffMins < 1) return 'Just now';
// //         if (diffMins < 60) return `${diffMins}m ago`;
// //         if (diffHours < 24) return `${diffHours}h ago`;
// //         if (diffDays < 7) return `${diffDays}d ago`;

// //         return date.toLocaleDateString('en-US', {
// //             month: 'short',
// //             day: 'numeric',
// //             hour: '2-digit',
// //             minute: '2-digit'
// //         });
// //     };

// //     return (
// //         <div className="min-h-screen">
// //             {/* Header */}
// //             <div className="mb-8">
// //                 <div className="flex items-center justify-between mb-2">
// //                     <div className="flex items-center gap-3">
// //                         <div className="p-3 bg-gradient-to-br from-ai-500 to-ai-700 rounded-2xl shadow-lg shadow-ai-500/20">
// //                             <Brain className="w-7 h-7 text-white" />
// //                         </div>
// //                         <div>
// //                             <h1 className="text-3xl font-display font-bold text-dark-100">
// //                                 AI Financial Advisor
// //                             </h1>
// //                             <p className="text-dark-400 text-sm mt-0.5">
// //                                 Powered by Google Gemini AI
// //                             </p>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>

// //             {/* Main Grid */}
// //             <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
// //                 {/* Main Content */}
// //                 <div className="xl:col-span-8 space-y-6">
// //                     {/* Current Advice Card */}
// //                     <Card className="relative overflow-hidden border-2 border-dark-700/50">
// //                         <div className="absolute inset-0 bg-gradient-to-br from-ai-500/5 via-transparent to-accent-500/5" />

// //                         <div className="relative">
// //                             {/* Header */}
// //                             <div className="flex items-center justify-between pb-6 border-b border-dark-700/50 mb-6">
// //                                 <div className="flex items-center gap-3">
// //                                     <div className="p-2.5 bg-ai-500/20 rounded-xl">
// //                                         <Sparkles className="w-5 h-5 text-ai-400" />
// //                                     </div>
// //                                     <div>
// //                                         <h2 className="text-lg font-semibold text-dark-100">
// //                                             {selectedInsight ? 'Current Insight' : 'Get Started'}
// //                                         </h2>
// //                                         {selectedInsight && (
// //                                             <div className="flex items-center gap-1.5 text-xs text-dark-500 mt-0.5">
// //                                                 <Clock className="w-3.5 h-3.5" />
// //                                                 <span>{formatDate(selectedInsight.createdAt)}</span>
// //                                             </div>
// //                                         )}
// //                                     </div>
// //                                 </div>

// //                                 <Button
// //                                     onClick={generateNewAdvice}
// //                                     loading={generating}
// //                                     disabled={generating || initialLoading}
// //                                     className="shadow-lg shadow-ai-500/20"
// //                                 >
// //                                     <RefreshCw className={`w-4 h-4 ${generating ? 'animate-spin' : ''}`} />
// //                                     Generate New Advice
// //                                 </Button>
// //                             </div>

// //                             {/* Content */}
// //                             {initialLoading ? (
// //                                 <div className="flex flex-col items-center justify-center py-16">
// //                                     <div className="relative">
// //                                         <div className="w-16 h-16 border-4 border-ai-500/30 border-t-ai-500 rounded-full animate-spin" />
// //                                         <Brain className="w-6 h-6 text-ai-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
// //                                     </div>
// //                                     <p className="text-dark-400 mt-4">Loading your advice history...</p>
// //                                 </div>
// //                             ) : (
// //                                 <div className="min-h-[200px]">
// //                                     <p className="text-dark-200 leading-relaxed text-base whitespace-pre-wrap">
// //                                         {typedText}
// //                                         {generating && <span className="inline-block w-0.5 h-5 bg-ai-400 animate-pulse ml-0.5" />}
// //                                     </p>
// //                                 </div>
// //                             )}
// //                         </div>
// //                     </Card>

// //                     {/* Features Grid */}
// //                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// //                         <Card className="hover:border-accent-500/50 transition-all duration-300">
// //                             <div className="text-center p-2">
// //                                 <div className="w-12 h-12 bg-accent-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
// //                                     <Target className="w-6 h-6 text-accent-400" />
// //                                 </div>
// //                                 <h3 className="font-semibold text-dark-100 text-sm mb-1">Goal Tracking</h3>
// //                                 <p className="text-xs text-dark-500">Smart goal analysis</p>
// //                             </div>
// //                         </Card>

// //                         <Card className="hover:border-ai-500/50 transition-all duration-300">
// //                             <div className="text-center p-2">
// //                                 <div className="w-12 h-12 bg-ai-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
// //                                     <TrendingUp className="w-6 h-6 text-ai-400" />
// //                                 </div>
// //                                 <h3 className="font-semibold text-dark-100 text-sm mb-1">Trend Analysis</h3>
// //                                 <p className="text-xs text-dark-500">Pattern detection</p>
// //                             </div>
// //                         </Card>

// //                         <Card className="hover:border-danger-500/50 transition-all duration-300">
// //                             <div className="text-center p-2">
// //                                 <div className="w-12 h-12 bg-danger-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
// //                                     <AlertCircle className="w-6 h-6 text-danger-400" />
// //                                 </div>
// //                                 <h3 className="font-semibold text-dark-100 text-sm mb-1">Smart Alerts</h3>
// //                                 <p className="text-xs text-dark-500">Budget warnings</p>
// //                             </div>
// //                         </Card>

// //                         <Card className="hover:border-yellow-500/50 transition-all duration-300">
// //                             <div className="text-center p-2">
// //                                 <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
// //                                     <Zap className="w-6 h-6 text-yellow-400" />
// //                                 </div>
// //                                 <h3 className="font-semibold text-dark-100 text-sm mb-1">Quick Insights</h3>
// //                                 <p className="text-xs text-dark-500">Instant analysis</p>
// //                             </div>
// //                         </Card>
// //                     </div>
// //                 </div>

// //                 {/* History Sidebar */}
// //                 <div className="xl:col-span-4">
// //                     <Card className="sticky top-6 border-2 border-dark-700/50">
// //                         <div className="flex items-center justify-between pb-4 border-b border-dark-700/50 mb-4">
// //                             <div className="flex items-center gap-2">
// //                                 <History className="w-5 h-5 text-ai-400" />
// //                                 <h3 className="font-semibold text-dark-100">Advice History</h3>
// //                             </div>
// //                             <span className="px-2.5 py-1 bg-dark-700/50 rounded-full text-xs font-medium text-dark-300">
// //                                 {allInsights.length}
// //                             </span>
// //                         </div>

// //                         <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar pr-2">
// //                             {allInsights.length === 0 ? (
// //                                 <div className="text-center py-12">
// //                                     <div className="w-16 h-16 bg-dark-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
// //                                         <Lightbulb className="w-8 h-8 text-dark-600" />
// //                                     </div>
// //                                     <p className="text-sm text-dark-400 font-medium">No advice yet</p>
// //                                     <p className="text-xs text-dark-600 mt-1">
// //                                         Click "Generate New Advice" to get started
// //                                     </p>
// //                                 </div>
// //                             ) : (
// //                                 allInsights.map((insight, index) => (
// //                                     <motion.button
// //                                         key={insight.insightId}
// //                                         initial={{ opacity: 0, y: 10 }}
// //                                         animate={{ opacity: 1, y: 0 }}
// //                                         transition={{ delay: index * 0.03 }}
// //                                         onClick={() => selectInsight(insight)}
// //                                         className={`
// //                                             w-full text-left p-3.5 rounded-xl transition-all duration-200
// //                                             ${selectedInsight?.insightId === insight.insightId
// //                                                 ? 'bg-gradient-to-r from-ai-500/20 to-ai-600/20 border-2 border-ai-500/50'
// //                                                 : 'bg-dark-800/30 hover:bg-dark-800/50 border-2 border-transparent hover:border-dark-700/50'
// //                                             }
// //                                             group relative
// //                                         `}
// //                                     >
// //                                         <div className="flex items-start gap-3">
// //                                             <div className={`p-1.5 rounded-lg flex-shrink-0 ${selectedInsight?.insightId === insight.insightId
// //                                                     ? 'bg-ai-500/30' : 'bg-dark-700/50'
// //                                                 }`}>
// //                                                 <Sparkles className={`w-4 h-4 ${selectedInsight?.insightId === insight.insightId
// //                                                         ? 'text-ai-400' : 'text-dark-500'
// //                                                     }`} />
// //                                             </div>

// //                                             <div className="flex-1 min-w-0">
// //                                                 <p className="text-sm text-dark-200 line-clamp-2 mb-2 leading-relaxed">
// //                                                     {(insight.insightText || insight.aiResponse || '').substring(0, 80)}
// //                                                     {(insight.insightText || insight.aiResponse || '').length > 80 && '...'}
// //                                                 </p>
// //                                                 <div className="flex items-center gap-2 text-xs text-dark-500">
// //                                                     <Clock className="w-3 h-3" />
// //                                                     <span>{formatDate(insight.createdAt)}</span>
// //                                                 </div>
// //                                             </div>

// //                                             <button
// //                                                 onClick={(e) => deleteInsight(insight.insightId, e)}
// //                                                 className="absolute top-2 right-2 p-1.5 rounded-lg
// //                                                            opacity-0 group-hover:opacity-100 hover:bg-danger-500/20
// //                                                            transition-all duration-200"
// //                                                 title="Delete advice"
// //                                             >
// //                                                 <Trash2 className="w-3.5 h-3.5 text-danger-400" />
// //                                             </button>
// //                                         </div>
// //                                     </motion.button>
// //                                 ))
// //                             )}
// //                         </div>
// //                     </Card>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default AIInsights;



// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import {
//     Sparkles,
//     RefreshCw,
//     Clock,
//     History,
//     Trash2,
//     TrendingUp,
//     AlertCircle,
//     Lightbulb,
//     Brain,
//     Target,
//     Zap
// } from 'lucide-react';
// import { getAIAdvice } from '../../api/ai.api';
// import api from '../../api/axios';
// import Card from '../../components/common/Card';
// import Button from '../../components/common/Button';
// import toast from 'react-hot-toast';

// const AIInsights = () => {
//     const [allInsights, setAllInsights] = useState([]);
//     const [selectedInsight, setSelectedInsight] = useState(null);
//     const [typedText, setTypedText] = useState('');
//     const [generating, setGenerating] = useState(false);
//     const [initialLoading, setInitialLoading] = useState(true);

//     useEffect(() => {
//         loadAllInsights();
//     }, []);

//     const loadAllInsights = async () => {
//         setInitialLoading(true);
//         try {
//             const response = await api.get('/api/ai-insights');

//             if (response.data && response.data.length > 0) {
//                 // ✅ FIX 1: Filter by ANALYSIS (backend saves as ANALYSIS, not ADVICE)
//                 const adviceInsights = response.data
//                     .filter(insight =>
//                         insight.insightType === 'ANALYSIS' ||
//                         insight.insightType === 'analysis' ||
//                         insight.insightType === 'SAVINGS' ||
//                         insight.insightType === 'savings'
//                     )
//                     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//                 setAllInsights(adviceInsights);

//                 if (adviceInsights.length > 0) {
//                     selectInsight(adviceInsights[0]);
//                 } else {
//                     showWelcomeMessage();
//                 }
//             } else {
//                 showWelcomeMessage();
//             }
//         } catch (error) {
//             console.error('Failed to load insights:', error);
//             showWelcomeMessage();
//         } finally {
//             setInitialLoading(false);
//         }
//     };

//     const showWelcomeMessage = () => {
//         const welcomeMsg = `👋 Welcome to your AI Financial Advisor powered by Gemini!

// Click "Generate New" below to get your first personalized financial insight based on your spending patterns, budget status, and financial goals.

// Your AI advisor will analyze your data and provide:
// • Smart spending insights
// • Budget optimization tips  
// • Savings recommendations
// • Custom financial strategies

// All your advice history will be saved here for future reference.`;
//         setTypedText(welcomeMsg);
//     };

//     const selectInsight = (insight) => {
//         setSelectedInsight(insight);
//         animateText(insight.insightText || insight.aiResponse || 'No advice available');
//     };

//     const generateNewAdvice = async () => {
//         setGenerating(true);

//         try {
//             const response = await getAIAdvice();
//             // const aiText = response?.data?.advice || response?.advice || response?.data || response;
//             const aiText = typeof response === 'string' ? response : response?.advice || response?.data || String(response);

//             // ✅ FIX 2: POST with ANALYSIS (valid enum value), not ADVICE
//             try {
//                 await api.post(
//                     '/api/ai-insights?insightType=ANALYSIS',
//                     aiText,
//                     { headers: { 'Content-Type': 'text/plain' } }
//                 );
//             } catch (saveError) {
//                 console.warn('Failed to save insight:', saveError);
//             }

//             toast.success('✨ New AI advice generated successfully!');
//             await loadAllInsights();

//         } catch (error) {
//             console.error('AI error:', error);
//             let message = '❌ AI insights temporarily unavailable.';
//             if (error?.response?.status === 429) {
//                 message = '⚠️ AI quota exceeded. Please try again later.';
//             } else if (error?.response?.status === 500) {
//                 message = '❌ AI service error. Please try again.';
//             }
//             toast.error(message);
//         } finally {
//             setGenerating(false);
//         }
//     };

//     const deleteInsight = async (insightId, e) => {
//         e?.stopPropagation();
//         if (!confirm('Are you sure you want to delete this advice?')) return;

//         try {
//             await api.delete(`/api/ai-insights/${insightId}`);
//             toast.success('Advice deleted successfully');
//             await loadAllInsights();
//         } catch (error) {
//             toast.error('Failed to delete advice');
//         }
//     };

//     const animateText = (text) => {
//         let index = 0;
//         setTypedText('');

//         const interval = setInterval(() => {
//             if (index < text.length) {
//                 setTypedText((prev) => prev + text[index]);
//                 index++;
//             } else {
//                 clearInterval(interval);
//             }
//         }, 15);
//     };

//     const formatDate = (timestamp) => {
//         if (!timestamp) return '';
//         const date = new Date(timestamp);
//         const now = new Date();
//         const diffMs = now - date;
//         const diffMins = Math.floor(diffMs / 60000);
//         const diffHours = Math.floor(diffMs / 3600000);
//         const diffDays = Math.floor(diffMs / 86400000);

//         if (diffMins < 1) return 'Just now';
//         if (diffMins < 60) return `${diffMins}m ago`;
//         if (diffHours < 24) return `${diffHours}h ago`;
//         if (diffDays < 7) return `${diffDays}d ago`;

//         return date.toLocaleDateString('en-US', {
//             month: 'short',
//             day: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit'
//         });
//     };

//     return (
//         <div className="min-h-screen">
//             {/* Header Section */}
//             <div className="mb-8">
//                 <div className="flex items-center justify-between mb-2">
//                     <div className="flex items-center gap-3">
//                         <div className="p-3 bg-gradient-to-br from-ai-500 to-ai-700 rounded-2xl shadow-lg shadow-ai-500/20">
//                             <Brain className="w-7 h-7 text-white" />
//                         </div>
//                         <div>
//                             <h1 className="text-3xl font-display font-bold text-dark-100">
//                                 AI Financial Advisor
//                             </h1>
//                             <p className="text-dark-400 text-sm mt-0.5">
//                                 Personalized insights powered by Google Gemini
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Main Grid Layout */}
//             <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
//                 {/* Left Column - Main Content */}
//                 <div className="xl:col-span-8 space-y-6">
//                     {/* Current Advice Card */}
//                     <Card className="relative overflow-hidden border-2 border-dark-700/50">
//                         <div className="absolute inset-0 bg-gradient-to-br from-ai-500/5 via-transparent to-accent-500/5" />

//                         <div className="relative">
//                             {/* Card Header */}
//                             <div className="flex items-center justify-between pb-6 border-b border-dark-700/50 mb-6">
//                                 <div className="flex items-center gap-3">
//                                     <div className="p-2.5 bg-ai-500/20 rounded-xl">
//                                         <Sparkles className="w-5 h-5 text-ai-400" />
//                                     </div>
//                                     <div>
//                                         <h2 className="text-lg font-semibold text-dark-100">
//                                             {selectedInsight ? 'Current Insight' : 'Get Started'}
//                                         </h2>
//                                         {selectedInsight && (
//                                             <div className="flex items-center gap-1.5 text-xs text-dark-500 mt-0.5">
//                                                 <Clock className="w-3.5 h-3.5" />
//                                                 <span>{formatDate(selectedInsight.createdAt)}</span>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>

//                                 <Button
//                                     onClick={generateNewAdvice}
//                                     loading={generating}
//                                     disabled={generating || initialLoading}
//                                     className="shadow-lg shadow-ai-500/20"
//                                 >
//                                     <RefreshCw className={`w-4 h-4 ${generating ? 'animate-spin' : ''}`} />
//                                     Generate New
//                                 </Button>
//                             </div>

//                             {/* Content */}
//                             {initialLoading ? (
//                                 <div className="flex flex-col items-center justify-center py-16 text-center">
//                                     <div className="relative">
//                                         <div className="w-16 h-16 border-4 border-ai-500/30 border-t-ai-500 rounded-full animate-spin" />
//                                         <Brain className="w-6 h-6 text-ai-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
//                                     </div>
//                                     <p className="text-dark-400 mt-4">Loading your AI insights...</p>
//                                 </div>
//                             ) : (
//                                 <div className="min-h-[200px]">
//                                     <p className="text-dark-200 leading-relaxed text-base whitespace-pre-wrap">
//                                         {typedText}
//                                         {generating && <span className="inline-block w-0.5 h-5 bg-ai-400 animate-pulse ml-0.5" />}
//                                     </p>
//                                 </div>
//                             )}
//                         </div>
//                     </Card>

//                     {/* Features Grid */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                         <Card className="hover:border-accent-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent-500/10">
//                             <div className="text-center p-2">
//                                 <div className="w-12 h-12 bg-accent-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
//                                     <Target className="w-6 h-6 text-accent-400" />
//                                 </div>
//                                 <h3 className="font-semibold text-dark-100 text-sm mb-1">Goal Tracking</h3>
//                                 <p className="text-xs text-dark-500">Smart goal analysis</p>
//                             </div>
//                         </Card>

//                         <Card className="hover:border-ai-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-ai-500/10">
//                             <div className="text-center p-2">
//                                 <div className="w-12 h-12 bg-ai-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
//                                     <TrendingUp className="w-6 h-6 text-ai-400" />
//                                 </div>
//                                 <h3 className="font-semibold text-dark-100 text-sm mb-1">Trend Analysis</h3>
//                                 <p className="text-xs text-dark-500">Pattern detection</p>
//                             </div>
//                         </Card>

//                         <Card className="hover:border-danger-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-danger-500/10">
//                             <div className="text-center p-2">
//                                 <div className="w-12 h-12 bg-danger-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
//                                     <AlertCircle className="w-6 h-6 text-danger-400" />
//                                 </div>
//                                 <h3 className="font-semibold text-dark-100 text-sm mb-1">Smart Alerts</h3>
//                                 <p className="text-xs text-dark-500">Budget warnings</p>
//                             </div>
//                         </Card>

//                         <Card className="hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10">
//                             <div className="text-center p-2">
//                                 <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
//                                     <Zap className="w-6 h-6 text-yellow-400" />
//                                 </div>
//                                 <h3 className="font-semibold text-dark-100 text-sm mb-1">Quick Insights</h3>
//                                 <p className="text-xs text-dark-500">Instant analysis</p>
//                             </div>
//                         </Card>
//                     </div>
//                 </div>

//                 {/* Right Column - History Sidebar */}
//                 <div className="xl:col-span-4">
//                     <Card className="sticky top-6 border-2 border-dark-700/50">
//                         <div className="flex items-center justify-between pb-4 border-b border-dark-700/50 mb-4">
//                             <div className="flex items-center gap-2">
//                                 <History className="w-5 h-5 text-ai-400" />
//                                 <h3 className="font-semibold text-dark-100">Advice History</h3>
//                             </div>
//                             <span className="px-2.5 py-1 bg-dark-700/50 rounded-full text-xs font-medium text-dark-300">
//                                 {allInsights.length}
//                             </span>
//                         </div>

//                         <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar pr-2">
//                             {allInsights.length === 0 ? (
//                                 <div className="text-center py-12">
//                                     <div className="w-16 h-16 bg-dark-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                                         <Lightbulb className="w-8 h-8 text-dark-600" />
//                                     </div>
//                                     <p className="text-sm text-dark-400 font-medium">No advice yet</p>
//                                     <p className="text-xs text-dark-600 mt-1">
//                                         Click "Generate New" to create your first insight
//                                     </p>
//                                 </div>
//                             ) : (
//                                 allInsights.map((insight, index) => (
//                                     <motion.button
//                                         key={insight.insightId}
//                                         initial={{ opacity: 0, y: 10 }}
//                                         animate={{ opacity: 1, y: 0 }}
//                                         transition={{ delay: index * 0.03 }}
//                                         onClick={() => selectInsight(insight)}
//                                         className={`
//                                             w-full text-left p-3.5 rounded-xl transition-all duration-200
//                                             ${selectedInsight?.insightId === insight.insightId
//                                                 ? 'bg-gradient-to-r from-ai-500/20 to-ai-600/20 border-2 border-ai-500/50 shadow-lg shadow-ai-500/10'
//                                                 : 'bg-dark-800/30 hover:bg-dark-800/50 border-2 border-transparent hover:border-dark-700/50'
//                                             }
//                                             group relative
//                                         `}
//                                     >
//                                         <div className="flex items-start gap-3">
//                                             <div className={`p-1.5 rounded-lg flex-shrink-0 ${selectedInsight?.insightId === insight.insightId
//                                                 ? 'bg-ai-500/30' : 'bg-dark-700/50'
//                                                 }`}>
//                                                 <Sparkles className={`w-4 h-4 ${selectedInsight?.insightId === insight.insightId
//                                                     ? 'text-ai-400' : 'text-dark-500'
//                                                     }`} />
//                                             </div>

//                                             <div className="flex-1 min-w-0">
//                                                 <p className="text-sm text-dark-200 line-clamp-2 mb-2 leading-relaxed">
//                                                     {(insight.insightText || insight.aiResponse || '').substring(0, 80)}
//                                                     {(insight.insightText || insight.aiResponse || '').length > 80 && '...'}
//                                                 </p>
//                                                 <div className="flex items-center gap-2 text-xs text-dark-500">
//                                                     <Clock className="w-3 h-3" />
//                                                     <span>{formatDate(insight.createdAt)}</span>
//                                                 </div>
//                                             </div>

//                                             <button
//                                                 onClick={(e) => deleteInsight(insight.insightId, e)}
//                                                 className="absolute top-2 right-2 p-1.5 rounded-lg
//                                                            opacity-0 group-hover:opacity-100 hover:bg-danger-500/20
//                                                            transition-all duration-200"
//                                                 title="Delete advice"
//                                             >
//                                                 <Trash2 className="w-3.5 h-3.5 text-danger-400" />
//                                             </button>
//                                         </div>
//                                     </motion.button>
//                                 ))
//                             )}
//                         </div>
//                     </Card>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AIInsights;

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import {
    Sparkles, RefreshCw, Clock, History, Trash2, TrendingUp,
    AlertCircle, Brain, Target, Zap, Send, MessageSquare
} from 'lucide-react';
import { getAIAdvice } from '../../api/ai.api';
import api from '../../api/axios';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';

const AIInsights = () => {
    const [allInsights, setAllInsights] = useState([]);
    const [selectedInsight, setSelectedInsight] = useState(null);
    const [typedText, setTypedText] = useState('');
    const [generating, setGenerating] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    // Chat state
    const [chatInput, setChatInput] = useState('');
    const [chatLoading, setChatLoading] = useState(false);
    const [showChat, setShowChat] = useState(false);

    useEffect(() => {
        loadAllInsights();
    }, []);

    const loadAllInsights = async () => {
        setInitialLoading(true);
        try {
            const response = await api.get('/api/ai-insights');

            if (response.data && response.data.length > 0) {
                const adviceInsights = response.data
                    .filter(insight =>
                        insight.insightType === 'ANALYSIS' ||
                        insight.insightType === 'analysis' ||
                        insight.insightType === 'SAVINGS' ||
                        insight.insightType === 'savings'
                    )
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                setAllInsights(adviceInsights);

                if (adviceInsights.length > 0) {
                    selectInsight(adviceInsights[0]);
                } else {
                    showWelcomeMessage();
                }
            } else {
                showWelcomeMessage();
            }
        } catch (error) {
            console.error('Failed to load insights:', error);
            showWelcomeMessage();
        } finally {
            setInitialLoading(false);
        }
    };

    const showWelcomeMessage = () => {
        const welcomeMsg = `# 👋 Welcome to your AI Financial Advisor!

**Powered by Google Gemini AI**

Click "Generate New" below to get your first personalized financial insight based on your spending patterns, budget status, and financial goals.

## What your AI advisor provides:

- 💡 Smart spending insights
- 📊 Budget optimization tips  
- 💰 Savings recommendations
- 🎯 Custom financial strategies

All your advice history will be saved here for future reference.

---

**Try asking custom questions** like:
- "How can I save more money?"
- "What should I do about my overspending?"
- "Help me plan my budget"`;
        setTypedText(welcomeMsg);
    };

    const selectInsight = (insight) => {
        setSelectedInsight(insight);
        // Don't animate for history items - show immediately
        setTypedText(insight.insightText || insight.aiResponse || 'No advice available');
    };

    // Generate new advice
    const generateNewAdvice = async () => {
        setGenerating(true);

        try {
            const response = await getAIAdvice();
            const aiText = typeof response === 'string' ? response : response?.advice || response?.data || String(response);

            // Save to database
            try {
                await api.post(
                    '/api/ai-insights?insightType=ANALYSIS',
                    aiText,
                    { headers: { 'Content-Type': 'text/plain' } }
                );
            } catch (saveError) {
                console.warn('Failed to save insight:', saveError);
            }

            toast.success('✨ New AI advice generated successfully!');

            // Animate the new response
            animateText(aiText);

            // Reload history
            await loadAllInsights();

        } catch (error) {
            console.error('AI error:', error);
            let message = '❌ AI insights temporarily unavailable.';
            if (error?.response?.status === 429) {
                message = '⚠️ AI quota exceeded. Please try again later.';
            }
            toast.error(message);
        } finally {
            setGenerating(false);
        }
    };

    // ✅ NEW: Handle chat input
    const handleChatSubmit = async (e) => {
        e.preventDefault();

        if (!chatInput.trim()) {
            toast.error('Please enter a question');
            return;
        }

        setChatLoading(true);

        try {
            const response = await api.post(
                '/api/ai/chat',
                chatInput,
                { headers: { 'Content-Type': 'text/plain' } }
            );

            const aiResponse = response.data;

            // Animate the chat response
            animateText(aiResponse);

            toast.success('✨ Response generated!');
            setChatInput('');

            // Reload to show in history
            await loadAllInsights();

        } catch (error) {
            console.error('Chat error:', error);
            toast.error('Failed to get response. Please try again.');
        } finally {
            setChatLoading(false);
        }
    };

    const deleteInsight = async (insightId, e) => {
        e?.stopPropagation();
        if (!confirm('Are you sure you want to delete this advice?')) return;

        try {
            await api.delete(`/api/ai-insights/${insightId}`);
            toast.success('Advice deleted successfully');
            await loadAllInsights();
        } catch (error) {
            toast.error('Failed to delete advice');
        }
    };

    const animateText = (text) => {
        let index = 0;
        setTypedText('');

        const interval = setInterval(() => {
            if (index < text.length) {
                setTypedText((prev) => prev + text[index]);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 10); // Faster animation
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-ai-500 to-ai-700 rounded-2xl shadow-lg shadow-ai-500/20">
                            <Brain className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-display font-bold text-dark-100">
                                AI Financial Advisor
                            </h1>
                            <p className="text-dark-400 text-sm mt-0.5">
                                Powered by Google Gemini AI
                            </p>
                        </div>
                    </div>

                    {/* Chat Toggle Button */}
                    <button
                        onClick={() => setShowChat(!showChat)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${showChat
                                ? 'bg-ai-500 text-white shadow-lg shadow-ai-500/30'
                                : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
                            }`}
                    >
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-sm font-medium">
                            {showChat ? 'Hide Chat' : 'Ask Custom Question'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                {/* Main Content */}
                <div className="xl:col-span-8 space-y-6">

                    {/* ✅ Chat Input Box (when enabled) */}
                    {showChat && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <Card className="border-2 border-ai-500/30 bg-gradient-to-br from-ai-500/5 to-accent-500/5">
                                <form onSubmit={handleChatSubmit} className="space-y-3">
                                    <div className="flex items-center gap-2 mb-3">
                                        <MessageSquare className="w-5 h-5 text-ai-400" />
                                        <h3 className="font-semibold text-dark-100">Ask Your Financial Advisor</h3>
                                    </div>

                                    <div className="flex gap-3">
                                        <input
                                            type="text"
                                            value={chatInput}
                                            onChange={(e) => setChatInput(e.target.value)}
                                            placeholder="Ask anything... e.g., 'How can I save ₹5000 this month?'"
                                            className="flex-1 px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg
                                                     text-dark-100 placeholder-dark-500
                                                     focus:outline-none focus:ring-2 focus:ring-ai-500 focus:border-transparent"
                                            disabled={chatLoading}
                                        />
                                        <button
                                            type="submit"
                                            disabled={chatLoading || !chatInput.trim()}
                                            className="px-6 py-3 bg-ai-500 hover:bg-ai-600 disabled:bg-dark-700
                                                     text-white rounded-lg font-medium transition-colors
                                                     disabled:cursor-not-allowed flex items-center gap-2"
                                        >
                                            {chatLoading ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                    <span>Thinking...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4" />
                                                    <span>Ask</span>
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    <p className="text-xs text-dark-500">
                                        💡 Tip: Be specific! Ask about budgeting, saving, investing, or spending habits.
                                    </p>
                                </form>
                            </Card>
                        </motion.div>
                    )}

                    {/* Current Advice Card */}
                    <Card className="relative overflow-hidden border-2 border-dark-700/50">
                        <div className="absolute inset-0 bg-gradient-to-br from-ai-500/5 via-transparent to-accent-500/5" />

                        <div className="relative">
                            {/* Header */}
                            <div className="flex items-center justify-between pb-6 border-b border-dark-700/50 mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-ai-500/20 rounded-xl">
                                        <Sparkles className="w-5 h-5 text-ai-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-dark-100">
                                            {selectedInsight ? 'Current Insight' : 'Get Started'}
                                        </h2>
                                        {selectedInsight && (
                                            <div className="flex items-center gap-1.5 text-xs text-dark-500 mt-0.5">
                                                <Clock className="w-3.5 h-3.5" />
                                                <span>{formatDate(selectedInsight.createdAt)}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <Button
                                    onClick={generateNewAdvice}
                                    loading={generating}
                                    disabled={generating || initialLoading}
                                    className="shadow-lg shadow-ai-500/20"
                                >
                                    <RefreshCw className={`w-4 h-4 ${generating ? 'animate-spin' : ''}`} />
                                    Generate New
                                </Button>
                            </div>

                            {/* Content with Markdown Rendering */}
                            {initialLoading ? (
                                <div className="flex flex-col items-center justify-center py-16">
                                    <div className="relative">
                                        <div className="w-16 h-16 border-4 border-ai-500/30 border-t-ai-500 rounded-full animate-spin" />
                                        <Brain className="w-6 h-6 text-ai-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                    </div>
                                    <p className="text-dark-400 mt-4">Loading your AI insights...</p>
                                </div>
                            ) : (
                                <div className="min-h-[200px]">
                                    {/* ✅ MARKDOWN RENDERING for better formatting */}
                                    <div className="prose prose-invert prose-sm max-w-none
                                                    prose-headings:text-dark-100 prose-headings:font-semibold
                                                    prose-p:text-dark-200 prose-p:leading-relaxed
                                                    prose-strong:text-ai-400 prose-strong:font-bold
                                                    prose-li:text-dark-200 prose-li:marker:text-ai-400
                                                    prose-ul:my-2 prose-ol:my-2
                                                    prose-hr:border-dark-700">
                                        <ReactMarkdown>{typedText}</ReactMarkdown>
                                        {generating && <span className="inline-block w-0.5 h-5 bg-ai-400 animate-pulse ml-0.5" />}
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card className="hover:border-accent-500/50 transition-all duration-300">
                            <div className="text-center p-2">
                                <div className="w-12 h-12 bg-accent-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <Target className="w-6 h-6 text-accent-400" />
                                </div>
                                <h3 className="font-semibold text-dark-100 text-sm mb-1">Goal Tracking</h3>
                                <p className="text-xs text-dark-500">Smart goal analysis</p>
                            </div>
                        </Card>

                        <Card className="hover:border-ai-500/50 transition-all duration-300">
                            <div className="text-center p-2">
                                <div className="w-12 h-12 bg-ai-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <TrendingUp className="w-6 h-6 text-ai-400" />
                                </div>
                                <h3 className="font-semibold text-dark-100 text-sm mb-1">Trend Analysis</h3>
                                <p className="text-xs text-dark-500">Pattern detection</p>
                            </div>
                        </Card>

                        <Card className="hover:border-danger-500/50 transition-all duration-300">
                            <div className="text-center p-2">
                                <div className="w-12 h-12 bg-danger-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <AlertCircle className="w-6 h-6 text-danger-400" />
                                </div>
                                <h3 className="font-semibold text-dark-100 text-sm mb-1">Smart Alerts</h3>
                                <p className="text-xs text-dark-500">Budget warnings</p>
                            </div>
                        </Card>

                        <Card className="hover:border-yellow-500/50 transition-all duration-300">
                            <div className="text-center p-2">
                                <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <Zap className="w-6 h-6 text-yellow-400" />
                                </div>
                                <h3 className="font-semibold text-dark-100 text-sm mb-1">Quick Insights</h3>
                                <p className="text-xs text-dark-500">Instant analysis</p>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* History Sidebar */}
                <div className="xl:col-span-4">
                    <Card className="sticky top-6 border-2 border-dark-700/50">
                        <div className="flex items-center justify-between pb-4 border-b border-dark-700/50 mb-4">
                            <div className="flex items-center gap-2">
                                <History className="w-5 h-5 text-ai-400" />
                                <h3 className="font-semibold text-dark-100">Advice History</h3>
                            </div>
                            <span className="px-2.5 py-1 bg-dark-700/50 rounded-full text-xs font-medium text-dark-300">
                                {allInsights.length}
                            </span>
                        </div>

                        <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar pr-2">
                            {allInsights.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-dark-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <MessageSquare className="w-8 h-8 text-dark-600" />
                                    </div>
                                    <p className="text-sm text-dark-400 font-medium">No advice yet</p>
                                    <p className="text-xs text-dark-600 mt-1">
                                        Generate advice or ask a question to get started
                                    </p>
                                </div>
                            ) : (
                                allInsights.map((insight, index) => (
                                    <motion.button
                                        key={insight.insightId}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.03 }}
                                        onClick={() => selectInsight(insight)}
                                        className={`
                                            w-full text-left p-3.5 rounded-xl transition-all duration-200
                                            ${selectedInsight?.insightId === insight.insightId
                                                ? 'bg-gradient-to-r from-ai-500/20 to-ai-600/20 border-2 border-ai-500/50'
                                                : 'bg-dark-800/30 hover:bg-dark-800/50 border-2 border-transparent hover:border-dark-700/50'
                                            }
                                            group relative
                                        `}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`p-1.5 rounded-lg flex-shrink-0 ${selectedInsight?.insightId === insight.insightId
                                                    ? 'bg-ai-500/30' : 'bg-dark-700/50'
                                                }`}>
                                                <Sparkles className={`w-4 h-4 ${selectedInsight?.insightId === insight.insightId
                                                        ? 'text-ai-400' : 'text-dark-500'
                                                    }`} />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-dark-200 line-clamp-2 mb-2 leading-relaxed">
                                                    {(insight.insightText || insight.aiResponse || '').substring(0, 80)}
                                                    {(insight.insightText || insight.aiResponse || '').length > 80 && '...'}
                                                </p>
                                                <div className="flex items-center gap-2 text-xs text-dark-500">
                                                    <Clock className="w-3 h-3" />
                                                    <span>{formatDate(insight.createdAt)}</span>
                                                </div>
                                            </div>

                                            <button
                                                onClick={(e) => deleteInsight(insight.insightId, e)}
                                                className="absolute top-2 right-2 p-1.5 rounded-lg
                                                           opacity-0 group-hover:opacity-100 hover:bg-danger-500/20
                                                           transition-all duration-200"
                                                title="Delete advice"
                                            >
                                                <Trash2 className="w-3.5 h-3.5 text-danger-400" />
                                            </button>
                                        </div>
                                    </motion.button>
                                ))
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AIInsights;