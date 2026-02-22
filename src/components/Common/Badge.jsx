const Badge = ({ children, variant = 'default', className = '' }) => {
    const variants = {
        default: 'bg-dark-800 text-dark-300',
        primary: 'bg-ai-500/20 text-ai-400',
        success: 'bg-accent-500/20 text-accent-400',
        danger: 'bg-danger-500/20 text-danger-400',
        warning: 'bg-yellow-500/20 text-yellow-400',
    };

    return (
        <span className={`
      inline-flex items-center px-2.5 py-0.5
      rounded-full text-xs font-medium
      ${variants[variant]}
      ${className}
    `}>
            {children}
        </span>
    );
};

export default Badge;