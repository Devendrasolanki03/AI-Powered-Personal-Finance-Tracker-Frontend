import { motion } from 'framer-motion';

const Loader = ({ size = 'md', text = '' }) => {
    const sizes = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <motion.div
                className={`${sizes[size]} relative`}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
                <div className="absolute inset-0 rounded-full border-4 border-ai-500/20" />
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-ai-500" />
            </motion.div>
            {text && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-dark-400 text-sm"
                >
                    {text}
                </motion.p>
            )}
        </div>
    );
};

export default Loader;