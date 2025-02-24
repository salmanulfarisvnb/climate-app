import React from "react";
import { motion } from "framer-motion";

interface AnimationProps {
  className?: string;
  delay?: number;
}

const WithSlideAnimation = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  defaultProps?: AnimationProps
) => {
  return ({ ...props }: P) => (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          delay: defaultProps?.delay || 0.3,
          ease: "easeIn",
        },
      }}
      whileHover={{ scale: 1.01, transition: { delay: 0, duration: 0.5 } }}
      whileTap={{ scale: 0.99 }}
      className={`${defaultProps?.className}`}
    >
      <WrappedComponent {...props} />
    </motion.div>
  );
};

export { WithSlideAnimation };
