import { useState, useEffect } from 'react';
import { Sparkles, MapPin, DollarSign, Shield, Save } from 'lucide-react';
import adminAPI from '../../api/adminAPI';
import toast from 'react-hot-toast';

const AdminSettings = () => {
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState({
        savingsThreshold: 1000,
        budgetAlertPercentage: 80,
        enableHighImpact: true,
        enableMediumImpact: true,
        enableLowImpact: false,
        locationAware: true,
        enableCityBased: true,
        enableStateBased: true,
        priorityCities: 'Indore, Mumbai, Bangalore, Delhi, Pune',
        twoFactorAuth: true,
        sessionTimeout: 30
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await adminAPI.getSettings();
            setSettings(response.data);
        } catch (error) {
            console.error('Settings error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            await adminAPI.updateSettings(settings);
            toast.success('Settings saved successfully');
        } catch (error) {
            console.error('Save error:', error);
            toast.error('Failed to save settings');
        }
    };

    const handleChange = (field, value) => {
        setSettings(prev => ({ ...prev, [field]: value }));
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
                <h1 className="text-3xl font-bold text-white mb-2">System Settings</h1>
                <p className="text-gray-400">Configure system-wide settings and parameters</p>
            </div>

            {/* AI Configuration */}
            <div className="bg-[#1a2332] border border-gray-800/50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">AI Configuration</h3>
                        <p className="text-sm text-gray-400">Configure AI recommendation thresholds</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Savings Alert Threshold (₹)
                            </label>
                            <input
                                type="number"
                                value={settings.savingsThreshold}
                                onChange={(e) => handleChange('savingsThreshold', Number(e.target.value))}
                                className="w-full px-4 py-2 bg-[#0a0f1e] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Budget Alert Percentage (%)
                            </label>
                            <input
                                type="number"
                                value={settings.budgetAlertPercentage}
                                onChange={(e) => handleChange('budgetAlertPercentage', Number(e.target.value))}
                                className="w-full px-4 py-2 bg-[#0a0f1e] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-gray-800">
                        {[
                            { key: 'enableHighImpact', label: 'Enable High Impact Insights' },
                            { key: 'enableMediumImpact', label: 'Enable Medium Impact Insights' },
                            { key: 'enableLowImpact', label: 'Enable Low Impact Insights' },
                            { key: 'locationAware', label: 'Location-Aware Recommendations' }
                        ].map(({ key, label }) => (
                            <div key={key} className="flex items-center justify-between">
                                <label className="text-gray-300">{label}</label>
                                <button
                                    onClick={() => handleChange(key, !settings[key])}
                                    className={`relative w-12 h-6 rounded-full transition-colors ${settings[key] ? 'bg-purple-500' : 'bg-gray-700'
                                        }`}
                                >
                                    <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${settings[key] ? 'translate-x-6' : ''
                                        }`} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Location Rules */}
            <div className="bg-[#1a2332] border border-gray-800/50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Location Rules</h3>
                        <p className="text-sm text-gray-400">Configure city and state-based logic</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-gray-300">Enable City-Based Insights</label>
                        <button
                            onClick={() => handleChange('enableCityBased', !settings.enableCityBased)}
                            className={`relative w-12 h-6 rounded-full transition-colors ${settings.enableCityBased ? 'bg-emerald-500' : 'bg-gray-700'
                                }`}
                        >
                            <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.enableCityBased ? 'translate-x-6' : ''
                                }`} />
                        </button>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Priority Cities for Analysis
                        </label>
                        <input
                            type="text"
                            value={settings.priorityCities}
                            onChange={(e) => handleChange('priorityCities', e.target.value)}
                            className="w-full px-4 py-2 bg-[#0a0f1e] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                        />
                    </div>
                </div>
            </div>

            {/* Security Settings */}
            <div className="bg-[#1a2332] border border-gray-800/50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Security Settings</h3>
                        <p className="text-sm text-gray-400">Configure security and access controls</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-gray-300">Two-Factor Authentication</label>
                        <button
                            onClick={() => handleChange('twoFactorAuth', !settings.twoFactorAuth)}
                            className={`relative w-12 h-6 rounded-full transition-colors ${settings.twoFactorAuth ? 'bg-red-500' : 'bg-gray-700'
                                }`}
                        >
                            <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.twoFactorAuth ? 'translate-x-6' : ''
                                }`} />
                        </button>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Session Timeout (minutes)
                        </label>
                        <input
                            type="number"
                            value={settings.sessionTimeout}
                            onChange={(e) => handleChange('sessionTimeout', Number(e.target.value))}
                            className="w-full px-4 py-2 bg-[#0a0f1e] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500"
                        />
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end gap-4">
                <button className="px-6 py-3 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800/50 transition-colors">
                    Reset to Defaults
                </button>
                <button
                    onClick={handleSave}
                    className="px-6 py-3 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-medium transition-colors flex items-center gap-2"
                >
                    <Save className="w-5 h-5" />
                    Save Settings
                </button>
            </div>
        </div>
    );
};

export default AdminSettings;