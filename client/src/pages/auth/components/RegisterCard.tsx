import { motion } from "framer-motion";
import InputText from "../../../components/InputText";
import { IAuthCard } from "../../../types/interfaces";

const RegisterCard = ({ handleToggleCard }: IAuthCard) => {
  return (
    <motion.div
      className="w-4/6 px-11 py-7 glass-bg"
      initial={{ opacity: 0 }}
      transition={{ duration: 1 }}
      animate={{ opacity: 100 }}
    >
      <form>
        <h3 className="text-3xl text-gold text-center font-bold font-body my-3">
          Register
        </h3>
        <InputText field="name" label="Your name" />
        <InputText field="email" label="Email" />
        <InputText field="password" label="Password" passwordHelper />
        <InputText
          field="confirmPassword"
          label="Confirm Password"
          passwordHelper
        />
        <button className="w-full my-5 bg-slate-700 hover:bg-gold transition-all duration-700 text-xl font-bold font-body text-white p-3 rounded">
          Submit
        </button>
        <p className="text-center text-white">
          Already have an account?{" "}
          <span onClick={handleToggleCard} className="font-bold cursor-pointer">
            Login
          </span>
        </p>
      </form>
    </motion.div>
  );
};

export default RegisterCard;
