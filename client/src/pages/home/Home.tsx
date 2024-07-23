import { motion } from "framer-motion";
import useLogout from "../../hooks/auth/useLogout";

import Button from "../../components/Button";

import RingMarkings from "../../assets/images/ring-markings.svg";

const Home = () => {
  const { handleLogout, isLoading } = useLogout();
  const user = JSON.parse(localStorage.user) || {};

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-gray-900 flex justify-center items-center relative">
      <div className="absolute top-0 right-3 z-30">
        <Button
          data-testid="btn-logout"
          onClick={handleLogout}
          isLoading={isLoading}
        >
          I wanna back home
        </Button>
      </div>
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
        <h5
          data-testid="username"
          className="font-body text-gold text-4xl text-center"
        >
          {user?.name}
        </h5>
      </div>
    </div>
  );
};

export default Home;
