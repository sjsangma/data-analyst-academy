import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function Reveal({ children, delay = 0, y = 28, className = "", as = "div", style }) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.9, 0.25, 1] }}
    >
      {children}
    </MotionTag>
  );
}
