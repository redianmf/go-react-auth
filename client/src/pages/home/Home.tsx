// Lib
import { motion } from "framer-motion";

// Assets
import RingMarkings from "../../assets/images/ring-markings.svg";

const Home = () => {
  return (
    <div className="h-screen max-h-screen overflow-hidden bg-gray-900 flex justify-center items-center relative">
      <motion.div
        className="markings w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        <RingMarkings />
      </motion.div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-body text-gold text-2xl text-center">
          Welcome to middle earth,
        </h1>
        <h5 className="font-body text-gold text-xl text-center">
          Frodo Baggins
        </h5>
      </div>
    </div>
  );
};

export default Home;
