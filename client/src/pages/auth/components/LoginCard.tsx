import { motion } from "framer-motion";
import InputText from "../../../components/InputText";
import { IAuthCard } from "../../../types/interfaces";

const LoginCard = ({ handleToggleCard }: IAuthCard) => {
  return (
    <motion.div
      className="w-4/6 px-11 py-7 glass-bg"
      initial={{ opacity: 0 }}
      transition={{ duration: 1 }}
      animate={{ opacity: 100 }}
    >
      <InputText field="email" label="Email" />
      <InputText field="password" label="Password" passwordHelper />
      <button className="w-full my-5 bg-slate-700 hover:bg-gold transition-all duration-700 text-xl font-bold font-body text-white p-3 rounded">
        Submit
      </button>
      <p className="text-center text-white">
        Don't have an account?{" "}
        <span onClick={handleToggleCard} className="font-bold cursor-pointer">
          Register
        </span>
      </p>
    </motion.div>
  );
};

export default LoginCard;
