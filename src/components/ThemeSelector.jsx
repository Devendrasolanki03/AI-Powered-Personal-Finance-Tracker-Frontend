import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Card from './Common/Card';

// Define themes locally if not in context
const DEFAULT_THEMES = {
    DARK: {
        id: 'dark',
        name: '🌙 Dark',
        description: 'Classic dark theme',
        preview: { bg: '#0f172a', accent: '#8b5cf6', text: '#f1f5f9' }
    },
    LIGHT: {
        id: 'light',
        name: '☀️ Light',
        description: 'Clean & bright',
        preview: { bg: '#ffffff', accent: '#8b5cf6', text: '#0f172a' }
    },
    MIDNIGHT: {
        id: 'midnight',
        name: '🌌 Midnight Blue',
        description: 'Deep ocean vibes',
        preview: { bg: '#131b2e', accent: '#3b82f6', text: '#e0f2fe' }
    },
    PURPLE_DARK: {
        id: 'purple-dark',
        name: '🔮 Purple Dark',
        description: 'Royal purple',
        preview: { bg: '#1a0b2e', accent: '#a855f7', text: '#f3e8ff' }
    },
    CYBERPUNK: {
        id: 'cyberpunk',
        name: '🎮 Cyberpunk',
        description: 'Neon green matrix',
        preview: { bg: '#0f1419', accent: '#00ff9f', text: '#00ff9f' }
    },
    SUNSET: {
        id: 'sunset',
        name: '🌆 Sunset',
        description: 'Warm orange/pink',
        preview: { bg: '#2d1810', accent: '#f97316', text: '#fff1e6' }
    },
    FOREST: {
        id: 'forest',
        name: '🌲 Forest',
        description: 'Nature green',
        preview: { bg: '#0f1e0d', accent: '#22c55e', text: '#dcfce7' }
    },
    OCEAN: {
        id: 'ocean',
        name: '🌊 Ocean',
        description: 'Deep blue sea',
        preview: { bg: '#04293a', accent: '#3498db', text: '#ecf0f1' }
    },
    FIRE: {
        id: 'fire',
        name: '🔥 Fire',
        description: 'Hot red/orange',
        preview: { bg: '#2d0a0a', accent: '#ef4444', text: '#fee2e2' }
    }
};

const ThemeSelector = () => {
    const themeContext = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    // Use themes from context if available, otherwise use defaults
    const THEMES = themeContext?.themes || DEFAULT_THEMES;
    const currentTheme = themeContext?.theme || 'dark';
    const changeTheme = themeContext?.changeTheme || ((theme) => {
        // Fallback: manually change theme class
        const root = document.documentElement;
        Object.values(THEMES).forEach(t => root.classList.remove(t.id));
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
        window.location.reload(); // Reload to apply
    });

    return (
        <>
            {/* Floating Theme Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 p-4 bg-gradient-to-br from-ai-500 to-accent-500 
                         text-white rounded-full shadow-2xl hover:scale-110 transition-transform
                         z-50 group"
                title="Change Theme"
            >
                <Palette className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ai-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-ai-500"></span>
                </span>
            </button>

            {/* Theme Selection Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                                     w-full max-w-4xl max-h-[80vh] overflow-y-auto z-50 p-4"
                        >
                            <Card className="relative border-2 border-ai-500/30">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6 pb-4 border-b border-dark-700">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-ai-500/20 rounded-lg">
                                            <Palette className="w-6 h-6 text-ai-400" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-dark-100">Choose Your Theme</h2>
                                            <p className="text-sm text-dark-400">Select a theme that matches your style</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 hover:bg-dark-800 rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5 text-dark-400" />
                                    </button>
                                </div>

                                {/* Theme Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {Object.values(THEMES).map((themeOption) => {
                                        const isActive = currentTheme === themeOption.id;

                                        return (
                                            <motion.button
                                                key={themeOption.id}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => {
                                                    changeTheme(themeOption.id);
                                                    setTimeout(() => setIsOpen(false), 500);
                                                }}
                                                className={`relative group overflow-hidden rounded-xl transition-all duration-300 ${isActive
                                                    ? 'ring-4 ring-ai-500 ring-offset-2 ring-offset-dark-900'
                                                    : 'hover:ring-2 hover:ring-ai-400'
                                                    }`}
                                            >
                                                {/* Preview Card */}
                                                <div
                                                    className="p-6 text-left"
                                                    style={{
                                                        backgroundColor: themeOption.preview.bg,
                                                        borderColor: themeOption.preview.accent
                                                    }}
                                                >
                                                    {/* Active Checkmark */}
                                                    {isActive && (
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            className="absolute top-3 right-3 w-8 h-8 bg-ai-500 rounded-full 
                                                                     flex items-center justify-center shadow-lg"
                                                        >
                                                            <Check className="w-5 h-5 text-white" />
                                                        </motion.div>
                                                    )}

                                                    {/* Theme Info */}
                                                    <div className="mb-4">
                                                        <h3
                                                            className="text-lg font-bold mb-1"
                                                            style={{ color: themeOption.preview.text }}
                                                        >
                                                            {themeOption.name}
                                                        </h3>
                                                        <p
                                                            className="text-sm opacity-70"
                                                            style={{ color: themeOption.preview.text }}
                                                        >
                                                            {themeOption.description}
                                                        </p>
                                                    </div>

                                                    {/* Color Preview */}
                                                    <div className="flex gap-2">
                                                        <div
                                                            className="w-12 h-12 rounded-lg shadow-lg"
                                                            style={{ backgroundColor: themeOption.preview.bg }}
                                                            title="Background"
                                                        />
                                                        <div
                                                            className="w-12 h-12 rounded-lg shadow-lg"
                                                            style={{ backgroundColor: themeOption.preview.accent }}
                                                            title="Accent"
                                                        />
                                                        <div
                                                            className="w-12 h-12 rounded-lg shadow-lg"
                                                            style={{ backgroundColor: themeOption.preview.text }}
                                                            title="Text"
                                                        />
                                                    </div>

                                                    {/* Hover Overlay */}
                                                    <div
                                                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                                                        style={{ backgroundColor: themeOption.preview.accent }}
                                                    />
                                                </div>
                                            </motion.button>
                                        );
                                    })}
                                </div>

                                {/* Footer */}
                                <div className="mt-6 pt-4 border-t border-dark-700">
                                    <p className="text-center text-sm text-dark-500">
                                        Your theme preference will be saved automatically
                                    </p>
                                </div>
                            </Card>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default ThemeSelector;