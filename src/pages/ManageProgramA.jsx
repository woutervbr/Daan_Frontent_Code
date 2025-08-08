import React, { useEffect, useState } from "react";

import book from "../assets/book.png";
import RenewModal from "../Components/RenewModal/RenewModal";
import "../App.css";
import { showErrorToast } from "../Components/Toaster/Toaster";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "../Components/ConfirmModal/ConfirmModal";
import { ReSubs } from "../context/ReSubsContext";
const ManageProgramA = () => {
  const [expireDate, setexpireDate] = useState("");
  const [show, setShow] = useState(false);
  const [confirmShow, setConfirm] = useState(false);
  const [isAddCopies, setIsAddCopies] = useState(false);
  const [reSubs, setReSubs] = useState(false);
  const [loading, setLoading] = useState(false);
  const userDetails = JSON.parse(localStorage.getItem("currentuser"));
  const { isActive } = ReSubs();
  const myCurrId = userDetails?.inviteBy
    ? userDetails?.inviteBy
    : userDetails?._id;

  const navigate = useNavigate();
  useEffect(() => {
    const currentUser = localStorage.getItem("currentuser");
    const parsedUser = currentUser ? JSON.parse(currentUser) : null;
    const myCurrId = parsedUser?.inviteBy
      ? parsedUser?.inviteBy
      : parsedUser?._id;

    const payDate = new Date(parsedUser?.paydate);
    // Add one year to the date
    const nextYearDate = new Date(payDate);

    if (parsedUser?.paydate == parsedUser?.createdAt) {
      nextYearDate.setFullYear(payDate.getFullYear() + 1);
    } else {
      nextYearDate.setFullYear(payDate.getFullYear());
    }
    // Format the date as "14 December 2025"
    const options = { day: "2-digit", month: "long", year: "numeric" };
    const formattedDate = nextYearDate.toLocaleDateString("nl-NL", options);
    setexpireDate(formattedDate);
  }, []);

  const handleRefund = async () => setConfirm(true);

  const userCreateData = userDetails?.createdAt;

  const isLessThan30DaysOld = () => {
    if (!userCreateData) return false;

    const createdDate = new Date(userCreateData);
    const currentDate = new Date();
    const diffInTime = currentDate - createdDate;
    const diffInDays = diffInTime / (1000 * 60 * 60 * 24);

    return diffInDays <= 30; // returns false if more than 30 days
  };

  const result = isLessThan30DaysOld(); // true or false

  return (
    <>
      {show && (
        <RenewModal
          setShow={setShow}
          show={show}
          setIsAddCopies={setIsAddCopies}
          isAddCopies={isAddCopies}
          reSubs={reSubs}
          title="Betalingsinformatie"
          descp={
            reSubs
              ? "Door opnieuw te abonneren, kunt u verdergaan waar u was gebleven en uw boek opnieuw bewerken."
              : "In dit scherm kun je extra boeken bij bestellen – voor jezelf of om cadeau te doen aan familie."
          }
        />
      )}

      <section className="My-profile-sec">
        <div className="container-ar">
          <div className="main-My-profile">
            <div className="My-profile-form">
              {/* <div className="book-img-book">
                <img src={book} alt="" />
              </div> */}
              <h2>Toegang beheren</h2>
              <p>
                Ga door met het bewerken van uw boek en verleng uw toegang,
                zodat u voldoende tijd heeft om het af te ronden. U kunt hier
                ook eenvoudig extra exemplaren bestellen om te delen met uw
                dierbaren.
              </p>
            </div>

            <div className="Manage-Program-main-box">
              {!isActive && (
                <div className="Manage-Program-box">
                  <h2>Klaar om u opnieuw te abonneren?</h2>
                  <p>
                    Door opnieuw te abonneren, kunt u verdergaan waar u was
                    gebleven en uw boek opnieuw bewerken.
                  </p>
                  <button
                    onClick={() => {
                      setShow(true);
                      setReSubs(true);
                    }}
                  >
                    Doorgaan – €82{" "}
                  </button>
                </div>
              )}
              <div className="Manage-Program-box">
                <h2>Meer tijd nodig?</h2>
                <p>
                  U kunt tot {expireDate} wijzigingen aanbrengen in uw boek.
                  Wilt u doorgaan? Verleng dan uw toegang met één jaar. Let op:
                  deze verlenging geeft u alleen extra tijd, het bevat geen
                  extra boek.
                </p>
                <button
                disabled={!isActive}
                  style={{ cursor: !isActive ? "not-allowed" : "pointer" ,backgroundColor: !isActive ? "#ccc" : "" }}
                  onClick={() => {
                    setShow(true);
                    setIsAddCopies(false);
                    setReSubs(false);
                  }}
                >
                  1 jaar verlengen – €30{" "}
                </button>
              </div>

              <div className="Manage-Program-box">
                <h2>Extra exemplaren bestellen</h2>
                <p>
                  Wilt u extra boeken bestellen om cadeau te geven of te
                  bewaren? Klik dan op de knop hieronder om eenvoudig bij te
                  bestellen.
                </p>
                <button
                disabled={!isActive}
                  style={{ cursor: !isActive ? "not-allowed" : "pointer" ,backgroundColor: !isActive ? "#ccc" : "" }}
                  onClick={() => {
                    setShow(true);
                    setIsAddCopies(true);
                    setReSubs(false);
                  }}
                >
                  Extra boeken bestellen{" "}
                </button>
              </div>
              {result && (
                <div className="Manage-Program-box">
                  <h2>Abonnement terugbetaling aanvragen</h2>
                  <p>
                    U kunt binnen 30 dagen na aankoop een terugbetaling
                    aanvragen. Als u dat doet, worden al uw gegevens verwijderd
                    en wordt uw account gesloten.
                  </p>
                  <button onClick={handleRefund}>
                    Terugbetaling aanvragen{" "}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {confirmShow && (
        <ConfirmModal
          setOpenModal={setConfirm}
          openModal={confirmShow}
          deleteData={{ userId: myCurrId }}
          baseurl="refund"
          type="refund"
          text="Weet u zeker dat u wilt doorgaan met de terugbetaling? Hiermee worden de gegevens permanent verwijderd en wordt de terugbetaling gestart."
        />
      )}
    </>
  );
};

export default ManageProgramA;
