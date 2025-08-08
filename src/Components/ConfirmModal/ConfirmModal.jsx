import axios from "axios";
import React from "react";
import { baseUrl } from "../../baseUrl";
import { useNavigate } from "react-router-dom";

export function ConfirmModal({
  openModal,
  setOpenModal,
  deleteData,
  handleSubmit,
  baseurl = "delete-question-user",
  type = "",
  text = "Weet je zeker dat je deze vraag wilt verwijderen",
}) {
  const handleClose = () => setOpenModal(false);
  const navigate = useNavigate();

  const handleConfirm = async () => {
    try {
      const response = await axios.post(`${baseUrl}/${baseurl}`, deleteData);
      if (response.status === 200) {
        if (handleSubmit) handleSubmit(); // Refresh the chapters data
        if (type === "refund") {
          navigate("/login");
          localStorage.removeItem("author");
          localStorage.removeItem("chapters");
          localStorage.removeItem("chaptersPDF");
          localStorage.removeItem("covertype");
          localStorage.removeItem("currentuser");
          localStorage.removeItem("groupedData");
          localStorage.removeItem("image");
          localStorage.removeItem("imagePublicId");
          localStorage.removeItem("loglevel");
          localStorage.removeItem("savedImage");
          localStorage.removeItem("storyPreference");
          localStorage.removeItem("title");
          localStorage.removeItem("totalPages");
          localStorage.removeItem("userId");
        }
      } else {
        throw new Error("Het verwijderen van de vraag is mislukt");
      }
    } catch (error) {
      console.error(error);
      showErrorToast(
        "Er is een fout opgetreden bij het verwijderen van de vraag."
      );
    } finally {
      setOpenModal(false);
    }
  };

  return (
    <div className={`confirm-modal modal-overlay ${openModal ? "active" : ""}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Verwijdering bevestigen</h2>
          <button className="close-button new" onClick={handleClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <div className="warning-icon"></div>
          <p>{text}</p>
        </div>
        <div className="modal-footer">
          <button className="confirm-button" onClick={handleConfirm}>
            Ja, ik weet het zeker
          </button>
          <button className="cancel-button" onClick={handleClose}>
            Nee, annuleren
          </button>
        </div>
      </div>
    </div>
  );
}
