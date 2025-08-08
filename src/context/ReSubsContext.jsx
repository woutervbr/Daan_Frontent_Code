import React, { createContext, useContext, useEffect, useState } from "react";
import RenewModal from "../Components/RenewModal/RenewModal";

const ReSubsContext = createContext();

export const ReSubsProvider = ({ children }) => {
  const [openToBlock, setOpenToBlock] = useState(false);
  const currentuserData = JSON.parse(localStorage.getItem("currentuser"));
  const [isActive, setIsActive] = useState(true); // default is true
  const [treeImage, setTreeImage] = useState(null); // default is true

  useEffect(() => {
    const currentuserData = JSON.parse(localStorage.getItem("currentuser"));
    const isUserActive = Boolean(currentuserData?.isActive);
    setIsActive(isUserActive);

    // If inactive, show modal
    // if (!isUserActive) {
    //   setOpenToBlock(true);
    // }
  }, []);

  return (
<ReSubsContext.Provider value={{ openToBlock, setOpenToBlock, isActive, setIsActive , treeImage, setTreeImage}}>
      {children}

      {openToBlock && (
        <RenewModal
          setShow={setOpenToBlock}
          show={openToBlock}
          setIsAddCopies={false}
          isAddCopies={false}
          forBlock={true}
          title="Uw Abonnement Is Verlopen"
          descp="Wij delen u beleefd mede dat uw huidige abonnement is afgelopen. Indien u gebruik wenst te blijven maken van onze diensten zonder onderbreking, verzoeken wij u vriendelijk een nieuw abonnement af te sluiten."
        />
      )}
    </ReSubsContext.Provider>
  );
};

export const ReSubs = () => useContext(ReSubsContext);
