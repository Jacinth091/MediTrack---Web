import React from 'react'

export default function Heart() {
    const [isActive, setIsActive] = useState(false);
  const controls = useAnimation();

  const handleClick = async () => {
    setIsActive(!isActive);
    if (!isActive) {
      await controls.start({
        pathLength: 1,
        transition: { duration: 1.5 }
      });
      controls.start({
        opacity: [1, 0.8, 1],
        transition: { repeat: Infinity, duration: 1.5 }
      });
    } else {
      controls.stop();
      controls.start({
        pathLength: 0,
        opacity: 1,
        transition: { duration: 0.5 }
      });
    }
  };
  return (
    <motion.div 
      className="w-64 h-32 bg-gray-100 rounded-lg p-4 cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
    >
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path
          d="M3 12H21"
          className="stroke-gray-400 stroke-1"
          strokeLinecap="round"
        />
        <motion.path
          d="M3 12H5L6 8L8 16L10 6L12 18L14 10L16 14L18 8L19 12H21"
          className="stroke-blue-500 stroke-2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={controls}
        />
      </svg>
    </motion.div>
  )
}
