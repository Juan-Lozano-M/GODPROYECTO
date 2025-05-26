
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

const Toast = ({ title, message, show, setShow }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, setShow]);

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 100 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 50, x: 100 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 15,
            exit: { 
              duration: 0.3,
              ease: "easeInOut"
            }
          }}
          className="fixed bottom-6 right-6 flex items-start gap-3 rounded-xl bg-[#2e0c47] px-5 py-4 text-[#d8a8ff] shadow-lg w-[400px] z-[9999]"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#4a1c6f] text-white text-sm font-bold">
            i
          </div>
          <div className="flex flex-col flex-1">
            <span className="font-semibold text-white">{title}</span>
            <span className="text-sm">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
