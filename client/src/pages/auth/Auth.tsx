import { useState } from "react";

import LoginCard from "./components/LoginCard";
import RegisterCard from "./components/RegisterCard";
import RingScene from "./components/RingScene";

import { CardState } from "../../types/enums";

const Auth = () => {
  const [activeCard, setActiveCard] = useState(CardState.Login);
  const [loadingPercentage, setLoadingPercentage] = useState<number>(0);

  const handleToggleCard = () => {
    setActiveCard((current) =>
      current === CardState.Login ? CardState.Register : CardState.Login
    );
  };

  return (
    <>
      {loadingPercentage < 100 && (
        <section className="h-screen w-screen overflow-hidden bg-gray-900 flex justify-center items-center absolute top-0 left-0 z-30">
          <div className="border border-gold rounded-full px-32 py-5">
            <p className="font-body text-gold text-3xl">
              Loading {loadingPercentage}%
            </p>
          </div>
        </section>
      )}
      <div className="h-screen overflow-hidden bg-gray-900 grid grid-cols-2 gap-3 ">
        <section className="hidden md:block">
          <RingScene setLoadingPercentage={setLoadingPercentage} />
        </section>
        <section className="h-full flex justify-center items-center">
          {activeCard === CardState.Register && (
            <RegisterCard handleToggleCard={handleToggleCard} />
          )}
          {activeCard === CardState.Login && (
            <LoginCard handleToggleCard={handleToggleCard} />
          )}
        </section>
      </div>
    </>
  );
};

export default Auth;
