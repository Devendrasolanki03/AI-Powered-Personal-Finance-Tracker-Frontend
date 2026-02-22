import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Globe, Save, CreditCard, Smartphone, Building, Lock } from 'lucide-react';
import Card from '../components/common/Card';
import toast from 'react-hot-toast';

const Profile = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        city: '',
        state: '',
        country: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Load saved profile data from localStorage
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
            setFormData(JSON.parse(savedProfile));
        }
    }, []);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Save to localStorage
            localStorage.setItem('userProfile', JSON.stringify(formData));
            toast.success('Profile updated successfully!');
        } catch (error) {
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
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
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-2.5 bg-ai-500 hover:bg-ai-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Save className="w-4 h-4" />
                            {loading ? 'Saving...' : 'Update Profile'}
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
                                <h2 className="text-xl font-semibold text-dark-100 mb-1">
                                    Payment Methods
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
                        {paymentMethods.map((method) => {
                            const Icon = method.icon;
                            return (
                                <div
                                    key={method.title}
                                    className="p-6 border-2 border-dashed border-dark-700 rounded-lg text-center opacity-60 hover:opacity-80 transition-opacity"
                                >
                                    <div className={`w-12 h-12 rounded-lg ${method.bgColor} flex items-center justify-center mx-auto mb-3`}>
                                        <Icon className={`w-6 h-6 ${method.color}`} />
                                    </div>
                                    <h4 className="mb-1 text-dark-100 font-medium">
                                        {method.title}
                                    </h4>
                                    <p className="text-xs text-dark-400">
                                        {method.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700">
                        <p className="text-sm text-dark-400 text-center">
                            🔒 Secure payments integration coming soon. Your financial data will be encrypted and protected with industry-standard security protocols.
                        </p>
                    </div>
                </Card>
            </motion.div>
        </motion.div>
    );
};

export default Profile;