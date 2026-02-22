import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = {
    DARK: {
        id: 'dark',
        name: '🌙 Dark',
        description: 'Classic dark theme',
        preview: {
            bg: '#0f172a',
            accent: '#8b5cf6',
            text: '#f1f5f9'
        }
    },
    LIGHT: {
        id: 'light',
        name: '☀️ Light',
        description: 'Clean & bright',
        preview: {
            bg: '#ffffff',
            accent: '#8b5cf6',
            text: '#0f172a'
        }
    },
    MIDNIGHT: {
        id: 'midnight',
        name: '🌌 Midnight Blue',
        description: 'Deep ocean vibes',
        preview: {
            bg: '#131b2e',
            accent: '#3b82f6',
            text: '#e0f2fe'
        }
    },
    PURPLE_DARK: {
        id: 'purple-dark',
        name: '🔮 Purple Dark',
        description: 'Royal purple',
        preview: {
            bg: '#1a0b2e',
            accent: '#a855f7',
            text: '#f3e8ff'
        }
    },
    CYBERPUNK: {
        id: 'cyberpunk',
        name: '🎮 Cyberpunk',
        description: 'Neon green matrix',
        preview: {
            bg: '#0f1419',
            accent: '#00ff9f',
            text: '#00ff9f'
        }
    },
    SUNSET: {
        id: 'sunset',
        name: '🌆 Sunset',
        description: 'Warm orange/pink',
        preview: {
            bg: '#2d1810',
            accent: '#f97316',
            text: '#fff1e6'
        }
    },
    FOREST: {
        id: 'forest',
        name: '🌲 Forest',
        description: 'Nature green',
        preview: {
            bg: '#0f1e0d',
            accent: '#22c55e',
            text: '#dcfce7'
        }
    },
    OCEAN: {
        id: 'ocean',
        name: '🌊 Ocean',
        description: 'Deep blue sea',
        preview: {
            bg: '#04293a',
            accent: '#3498db',
            text: '#ecf0f1'
        }
    },
    FIRE: {
        id: 'fire',
        name: '🔥 Fire',
        description: 'Hot red/orange',
        preview: {
            bg: '#2d0a0a',
            accent: '#ef4444',
            text: '#fee2e2'
        }
    }
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });

    useEffect(() => {
        // Remove all theme classes
        const root = document.documentElement;
        Object.values(THEMES).forEach(t => {
            root.classList.remove(t.id);
        });

        // Add current theme class
        root.classList.add(theme);

        // Save to localStorage
        localStorage.setItem('theme', theme);
    }, [theme]);

    const changeTheme = (newTheme) => {
        setTheme(newTheme);
    };

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <ThemeContext.Provider value={{
            theme,
            changeTheme,
            toggleTheme,
            themes: THEMES
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};