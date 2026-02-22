import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 border border-dark-700 transition-colors group"
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-dark-300 group-hover:text-accent-400 transition-colors" />
            ) : (
                <Moon className="w-5 h-5 text-dark-300 group-hover:text-ai-400 transition-colors" />
            )}
        </button>
    );
};

export default ThemeToggle;