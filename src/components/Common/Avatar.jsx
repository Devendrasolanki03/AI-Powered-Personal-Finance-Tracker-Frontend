import { getInitials } from '../../utils/helpers';


const Avatar = ({ src, name, size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  return (
    <div className={`
      ${sizes[size]}
      rounded-full bg-gradient-to-br from-ai-500 to-ai-700
      flex items-center justify-center
      font-semibold text-white
      overflow-hidden
    `}>
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        getInitials(name)
      )}
    </div>
  );
};

export default Avatar;