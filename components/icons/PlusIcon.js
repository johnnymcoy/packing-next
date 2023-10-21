export const PlusIcon = ({
    fill,
    size,
    height,
    width,
    ...props
  }) => {
    return (
        <svg         
        width={size || width || 24}
        height={size || height || 24}
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" 
          stroke={fill}
          stroke-width="1.5"
        />
        <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" 
          stroke={fill}
          stroke-width="1.5" 
          stroke-linecap="round"/>
        </svg>
    );
  };