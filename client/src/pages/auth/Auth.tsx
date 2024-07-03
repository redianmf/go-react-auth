import { useState } from "react";

import LoginCard from "./components/LoginCard";
import RegisterCard from "./components/RegisterCard";

import { CardState } from "../../types/enums";

const Auth = () => {
  const [activeCard, setActiveCard] = useState(CardState.Login);

  const handleToggleCard = () => {
    setActiveCard((current) =>
      current === CardState.Login ? CardState.Register : CardState.Login
    );
  };

  return (
    <div className="h-screen overflow-hidden bg-gray-900 grid grid-cols-2 gap-3">
      <section className="hidden md:block"></section>
      <section className="h-full flex justify-center items-center">
        {activeCard === CardState.Register && (
          <RegisterCard handleToggleCard={handleToggleCard} />
        )}
        {activeCard === CardState.Login && (
          <LoginCard handleToggleCard={handleToggleCard} />
        )}
      </section>
    </div>
  );
};

export default Auth;
