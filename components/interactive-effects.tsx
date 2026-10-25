// "use client";

// import { motion, useReducedMotion, useScroll } from "motion/react";

// export function ScrollProgress() {
//   const { scrollYProgress } = useScroll();
//   const reduceMotion = useReducedMotion();

//   if (reduceMotion) return null;

//   return (
//     <motion.div
//       className="scroll-progress"
//       style={{ scaleX: scrollYProgress }}
//     />
//   );
// }

// export function FloatingGlow() {
//   return (
//     <div aria-hidden="true" className="floating-glow">
//       <span className="floating-glow__ring floating-glow__ring--one" />
//       <span className="floating-glow__ring floating-glow__ring--two" />
//       <span className="floating-glow__dot" />
//     </div>
//   );
// }