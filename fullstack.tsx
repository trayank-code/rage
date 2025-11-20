import { motion } from "framer-motion";
interface NavbarProps {
  color: string; // Add prop type
}
const Fullstack = ({ color }: NavbarProps) => {
  const arrowVariants = {
    visible: (i: number) => ({
      opacity: [0, 1, 0],
      scale: [1],
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        delay: i * 0.1, // each arrow waits for the previous one
        repeat: Infinity,
        repeatDelay: (10 - 1) * 0.3, // wait until all arrows finish before restarting
      },
    }),
  };

  return (
    <div
      className="w-800 h-auto justify-self-center flex items-center justify-around relative "
      style={{ scale: 0.6 }}
    >
      {/* Left label */}
      <section className="w-100 h-30 right-170 relative bg-transparent justify-self-center flex items-center">
        <motion.p
          className="w-50 h-10 text-gray-700 bg-transparent font-bold text-8xl flex-row items-center text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0, repeatCount: 0 }}
          transition={{ duration: 1, ease: "backInOut", repeat: 0 }}
        >
          FRONTEND
        </motion.p>
      </section>

      {/* Animated arrows */}
      <div className="w-50 h-50 bg-transparent justify-center flex items-center relative top-8 gap-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.span
            key={i}
            className="bg-transparent text-[100px]"
            style={{ color: color }}
            variants={arrowVariants}
            animate="visible"
            custom={i} // pass index for delay
          >
            ➤
          </motion.span>
        ))}
      </div>

      {/* Right label */}
      <section className="w-50 h-30 bg-transparent relative left-150 justify-self-center flex items-center">
        <motion.p
          className="w-50 h-10 flex-row bg-transparent justify-self-center items-center text-center font-bold text-8xl "
          style={{
            color: color,
          }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0, repeatCount: 0 }}
          transition={{ duration: 1, ease: "backInOut", repeat: 0 }}
        >
          FULLSTACK
        </motion.p>
      </section>
    </div>
  );
};

export default Fullstack;
