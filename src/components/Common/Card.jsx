import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true, gradient = false }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={hover ? { y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' } : {}}
            className={`
        ${gradient ? 'gradient-border' : 'bg-dark-900 border border-dark-800'}
        rounded-xl p-6
        backdrop-blur-sm
        transition-all duration-300
        ${className}
      `}
        >
            {gradient ? (
                <div className="gradient-border-content p-6">
                    {children}
                </div>
            ) : children}
        </motion.div>
    );
};

export default Card;