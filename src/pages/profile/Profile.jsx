// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { User, Mail, MapPin, Globe, Save, CreditCard, Smartphone, Building, Lock } from 'lucide-react';
// import Card from '../../components/common/Card'; // ✅ FIXED PATH
// import toast from 'react-hot-toast';

// const Profile = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         city: '',
//         state: '',
//         country: '',
//     });
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         // Load saved profile data from localStorage
//         const savedProfile = localStorage.getItem('userProfile');
//         if (savedProfile) {
//             setFormData(JSON.parse(savedProfile));
//         }
//     }, []);

//     const handleChange = (field, value) => {
//         setFormData((prev) => ({ ...prev, [field]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             // Save to localStorage
//             localStorage.setItem('userProfile', JSON.stringify(formData));
//             toast.success('Profile updated successfully!');
//         } catch (error) {
//             toast.error('Failed to update profile');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const paymentMethods = [
//         {
//             icon: CreditCard,
//             title: 'Credit / Debit Card',
//             description: 'Link your cards for auto-sync',
//             color: 'text-accent-400',
//             bgColor: 'bg-accent-500/10',
//         },
//         {
//             icon: Smartphone,
//             title: 'UPI',
//             description: 'Connect UPI for instant tracking',
//             color: 'text-ai-400',
//             bgColor: 'bg-ai-500/10',
//         },
//         {
//             icon: Building,
//             title: 'Bank Account',
//             description: 'Sync with your bank account',
//             color: 'text-purple-400',
//             bgColor: 'bg-purple-500/10',
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

//     return (
//         <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="show"
//             className="space-y-8 max-w-4xl"
//         >
//             {/* Header */}
//             <motion.div variants={itemVariants}>
//                 <h1 className="text-3xl font-display font-bold text-dark-100 mb-2">
//                     Profile Settings
//                 </h1>
//                 <p className="text-dark-400">
//                     Manage your account settings and preferences
//                 </p>
//             </motion.div>

//             {/* Profile Information Card */}
//             <motion.div variants={itemVariants}>
//                 <Card>
//                     <div className="mb-6">
//                         <h2 className="text-xl font-semibold text-dark-100 mb-1">
//                             Personal Information
//                         </h2>
//                         <p className="text-sm text-dark-400">
//                             Update your profile details
//                         </p>
//                     </div>

//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             {/* Name */}
//                             <div className="space-y-2">
//                                 <label className="flex items-center gap-2 text-sm font-medium text-dark-300">
//                                     <User className="w-4 h-4" />
//                                     Full Name
//                                 </label>
//                                 <input
//                                     type="text"
//                                     value={formData.name}
//                                     onChange={(e) => handleChange('name', e.target.value)}
//                                     className="w-full px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-ai-500 focus:border-transparent transition-all"
//                                     placeholder="Enter your name"
//                                 />
//                             </div>

//                             {/* Email */}
//                             <div className="space-y-2">
//                                 <label className="flex items-center gap-2 text-sm font-medium text-dark-300">
//                                     <Mail className="w-4 h-4" />
//                                     Email
//                                 </label>
//                                 <input
//                                     type="email"
//                                     value={formData.email}
//                                     onChange={(e) => handleChange('email', e.target.value)}
//                                     className="w-full px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-ai-500 focus:border-transparent transition-all"
//                                     placeholder="your.email@example.com"
//                                 />
//                             </div>

//                             {/* City */}
//                             <div className="space-y-2">
//                                 <label className="flex items-center gap-2 text-sm font-medium text-dark-300">
//                                     <MapPin className="w-4 h-4" />
//                                     City
//                                 </label>
//                                 <input
//                                     type="text"
//                                     value={formData.city}
//                                     onChange={(e) => handleChange('city', e.target.value)}
//                                     className="w-full px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-ai-500 focus:border-transparent transition-all"
//                                     placeholder="Your city"
//                                 />
//                             </div>

//                             {/* State */}
//                             <div className="space-y-2">
//                                 <label className="flex items-center gap-2 text-sm font-medium text-dark-300">
//                                     <MapPin className="w-4 h-4" />
//                                     State
//                                 </label>
//                                 <input
//                                     type="text"
//                                     value={formData.state}
//                                     onChange={(e) => handleChange('state', e.target.value)}
//                                     className="w-full px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-ai-500 focus:border-transparent transition-all"
//                                     placeholder="Your state"
//                                 />
//                             </div>

//                             {/* Country */}
//                             <div className="space-y-2 md:col-span-2">
//                                 <label className="flex items-center gap-2 text-sm font-medium text-dark-300">
//                                     <Globe className="w-4 h-4" />
//                                     Country
//                                 </label>
//                                 <input
//                                     type="text"
//                                     value={formData.country}
//                                     onChange={(e) => handleChange('country', e.target.value)}
//                                     className="w-full px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-ai-500 focus:border-transparent transition-all"
//                                     placeholder="Your country"
//                                 />
//                             </div>
//                         </div>

//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="flex items-center gap-2 px-6 py-2.5 bg-ai-500 hover:bg-ai-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                             <Save className="w-4 h-4" />
//                             {loading ? 'Saving...' : 'Update Profile'}
//                         </button>
//                     </form>
//                 </Card>
//             </motion.div>

//             {/* Payment Methods Card */}
//             <motion.div variants={itemVariants}>
//                 <Card>
//                     <div className="mb-6">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <h2 className="text-xl font-semibold text-dark-100 mb-1">
//                                     Payment Methods
//                                 </h2>
//                                 <p className="text-sm text-dark-400">
//                                     Securely connect your payment sources for automated expense tracking
//                                 </p>
//                             </div>
//                             <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-800 text-dark-300 text-xs font-medium">
//                                 <Lock className="w-3 h-3" />
//                                 <span>Secure</span>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//                         {paymentMethods.map((method) => {
//                             const Icon = method.icon;
//                             return (
//                                 <div
//                                     key={method.title}
//                                     className="p-6 border-2 border-dashed border-dark-700 rounded-lg text-center opacity-60 hover:opacity-80 transition-opacity"
//                                 >
//                                     <div className={`w-12 h-12 rounded-lg ${method.bgColor} flex items-center justify-center mx-auto mb-3`}>
//                                         <Icon className={`w-6 h-6 ${method.color}`} />
//                                     </div>
//                                     <h4 className="mb-1 text-dark-100 font-medium">
//                                         {method.title}
//                                     </h4>
//                                     <p className="text-xs text-dark-400">
//                                         {method.description}
//                                     </p>
//                                 </div>
//                             );
//                         })}
//                     </div>

//                     <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700">
//                         <p className="text-sm text-dark-400 text-center">
//                             🔒 Secure payments integration coming soon. Your financial data will be encrypted and protected with industry-standard security protocols.
//                         </p>
//                     </div>
//                 </Card>
//             </motion.div>
//         </motion.div>
//     );
// };

// export default Profile;
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Globe, Save, CreditCard, Smartphone, Building, Lock, Loader, Sparkles } from 'lucide-react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import toast from 'react-hot-toast';

const Profile = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        city: '',
        state: '',
        country: '',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        setLoading(true);
        try {
            const response = await api.get('/api/users/me');
            setFormData({
                name: response.data.name || '',
                email: response.data.email || '',
                city: response.data.city || '',
                state: response.data.state || '',
                country: response.data.country || '',
            });
        } catch (error) {
            console.error('Failed to load profile:', error);
            if (user) {
                setFormData(prev => ({
                    ...prev,
                    name: user.name || '',
                    email: user.email || '',
                }));
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const currentUser = await api.get('/api/users/me');
            const userId = currentUser.data.userId;
            await api.put(`/api/users/${userId}`, formData);

            toast.success('✅ Profile updated successfully!');
            await loadProfile();
        } catch (error) {
            console.error('Failed to update profile:', error);
            toast.error('Failed to update profile. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const paymentMethods = [
        {
            icon: CreditCard,
            title: 'Credit / Debit Card',
            description: 'Link your cards for auto-sync',
            color: 'text-accent-400',
            bgColor: 'bg-accent-500/10',
        },
        {
            icon: Smartphone,
            title: 'UPI',
            description: 'Connect UPI for instant tracking',
            color: 'text-ai-400',
            bgColor: 'bg-ai-500/10',
        },
        {
            icon: Building,
            title: 'Bank Account',
            description: 'Sync with your bank account',
            color: 'text-purple-400',
            bgColor: 'bg-purple-500/10',
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
                    <Loader className="w-12 h-12 text-ai-500 animate-spin mx-auto mb-4" />
                    <p className="text-dark-400">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-8 max-w-4xl"
        >
            {/* Header */}
            <motion.div variants={itemVariants}>
                <h1 className="text-3xl font-display font-bold text-dark-100 mb-2">
                    Profile Settings
                </h1>
                <p className="text-dark-400">
                    Manage your account settings and preferences
                </p>
            </motion.div>

            {/* Profile Information Card */}
            <motion.div variants={itemVariants}>
                <Card>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-dark-100 mb-1">
                            Personal Information
                        </h2>
                        <p className="text-sm text-dark-400">
                            Update your profile details
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-dark-300">
                                    <User className="w-4 h-4" />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-ai-500 focus:border-transparent transition-all"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-dark-300">
                                    <Mail className="w-4 h-4" />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-ai-500 focus:border-transparent transition-all"
                                    placeholder="your.email@example.com"
                                    required
                                />
                            </div>

                            {/* City */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-dark-300">
                                    <MapPin className="w-4 h-4" />
                                    City
                                </label>
                                <input
                                    type="text"
                                    value={formData.city}
                                    onChange={(e) => handleChange('city', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-ai-500 focus:border-transparent transition-all"
                                    placeholder="Your city"
                                />
                            </div>

                            {/* State */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-dark-300">
                                    <MapPin className="w-4 h-4" />
                                    State
                                </label>
                                <input
                                    type="text"
                                    value={formData.state}
                                    onChange={(e) => handleChange('state', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-ai-500 focus:border-transparent transition-all"
                                    placeholder="Your state"
                                />
                            </div>

                            {/* Country */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-dark-300">
                                    <Globe className="w-4 h-4" />
                                    Country
                                </label>
                                <input
                                    type="text"
                                    value={formData.country}
                                    onChange={(e) => handleChange('country', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-ai-500 focus:border-transparent transition-all"
                                    placeholder="Your country"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 px-6 py-2.5 bg-ai-500 hover:bg-ai-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? (
                                <>
                                    <Loader className="w-4 h-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    Update Profile
                                </>
                            )}
                        </button>
                    </form>
                </Card>
            </motion.div>

            {/* Payment Methods Card */}
            <motion.div variants={itemVariants}>
                <Card>
                    <div className="mb-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-dark-100 mb-1 flex items-center gap-2">
                                    Payment Methods
                                    {/* ✅ Coming Soon Badge */}
                                    <span className="px-3 py-1 bg-gradient-to-r from-ai-500 to-accent-500 text-white text-xs font-semibold rounded-full flex items-center gap-1 animate-pulse">
                                        <Sparkles className="w-3 h-3" />
                                        Coming Soon
                                    </span>
                                </h2>
                                <p className="text-sm text-dark-400">
                                    Securely connect your payment sources for automated expense tracking
                                </p>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-800 text-dark-300 text-xs font-medium">
                                <Lock className="w-3 h-3" />
                                <span>Secure</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {paymentMethods.map((method, index) => {
                            const Icon = method.icon;
                            return (
                                <motion.div
                                    key={method.title}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative p-6 border-2 border-dashed border-dark-700 rounded-lg text-center hover:border-ai-500/50 transition-all group cursor-not-allowed"
                                >
                                    {/* ✅ Coming Soon Overlay */}
                                    <div className="absolute top-3 right-3">
                                        <span className="px-2 py-1 bg-ai-500/20 text-ai-400 text-[10px] font-bold rounded uppercase tracking-wide">
                                            Soon
                                        </span>
                                    </div>

                                    <div className={`w-12 h-12 rounded-lg ${method.bgColor} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                                        <Icon className={`w-6 h-6 ${method.color}`} />
                                    </div>
                                    <h4 className="mb-1 text-dark-100 font-medium">
                                        {method.title}
                                    </h4>
                                    <p className="text-xs text-dark-400">
                                        {method.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* ✅ Enhanced Info Card with Future Features */}
                    <div className="space-y-3">
                        <div className="bg-gradient-to-br from-ai-500/10 to-accent-500/10 p-4 rounded-lg border border-ai-500/20">
                            <div className="flex items-start gap-3">
                                <Sparkles className="w-5 h-5 text-ai-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-dark-200 mb-2">
                                        🚀 Upcoming Features
                                    </h4>
                                    <ul className="text-sm text-dark-400 space-y-1.5">
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-ai-400 rounded-full"></span>
                                            <span>Automatic expense syncing from bank transactions</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-accent-400 rounded-full"></span>
                                            <span>Real-time UPI payment tracking</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                                            <span>Credit card statement import & categorization</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                                            <span>Multi-bank account aggregation</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700">
                            <p className="text-sm text-dark-400 text-center">
                                🔒 <strong>Security Promise:</strong> All payment integrations will use bank-grade encryption (256-bit SSL/TLS) and will never store your card details or banking passwords.
                            </p>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </motion.div>
    );
};

export default Profile;