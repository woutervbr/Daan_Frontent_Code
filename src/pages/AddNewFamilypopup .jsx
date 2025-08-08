import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import { toast, ToastContainer } from "react-toastify";
import {
  showErrorToast,
  showSuccessToast,
} from "../Components/Toaster/Toaster";

const AddNewFamilypopup = ({
  setShowPopup,
  toUpdate,
  updateId,
  selectedPerson,
  setSelectedPerson,
}) => {
  const [loading, setLoading] = useState(false);
  const schema = yup.object().shape({
    firstname: yup.string().required("Voornaam is vereist"),
    lastname: yup.string().required("Achternaam is vereist"),
    email: yup
      .string()
      .email("E-mailadres is niet geldig")
      .required("E-mailadres is vereist"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (toUpdate) {
      reset({
        firstname: selectedPerson.name?.split(" ")[0],
        lastname: selectedPerson.name?.split(" ")[1],
        email: selectedPerson.email,
      });
    }
  }, [updateId]);

  const onSubmit = async (data) => {
    setLoading(true);
    const userDetails = JSON.parse(localStorage.getItem("currentuser"));
    const myCurrId = userDetails?.inviteBy
      ? userDetails?.inviteBy
      : userDetails?._id;


    const endPoint = toUpdate
      ? `${baseUrl}/update-person/${selectedPerson?._id}`
      : `${baseUrl}/add-person`;
    const body = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
    };
    if (!toUpdate) {
      body.userId = myCurrId;
    }
    const method = toUpdate ? "put" : "post";




    try {
      const response = await axios[method](endPoint, body);
      setShowPopup(false);
      setSelectedPerson(null);

      // reset();
      showSuccessToast(
        toUpdate
          ? "Uitnodiging succesvol aangepast"
          : "Uitnodiging succesvol verzonden"
      );
    } catch (error) {
      console.error("Error updating user data:", error.response.data.message);
      showErrorToast(
        error.response.data.message ||
          "Er is een fout opgetreden bij het opslaan van de gegevens"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <ToastContainer/> */}
      <section className="AddNew-Family-popup">
        <div className="AddNew-Family-popup-main">
          <h2>Nieuw familielid toevoegen</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="AddNew-Family-popup-form">
              <div className="AddNew-Family-popup-group">
                <label htmlFor="">Voornaam</label>
                <input
                  type="text"
                  placeholder="Voornaam"
                  {...register("firstname")}
                />
                {errors.firstname && (
                  <p style={{ color: "red" }}>{errors.firstname.message}</p>
                )}
              </div>

              <div className="AddNew-Family-popup-group">
                <label htmlFor="">Achternaam</label>
                <input
                  type="text"
                  placeholder="Achternaam"
                  {...register("lastname")}
                />
                {errors.lastname && (
                  <p style={{ color: "red" }}>{errors.lastname.message}</p>
                )}
              </div>

              <div className="AddNew-Family-popup-group">
                <label htmlFor="">E-mailadres</label>
                <input
                  type="email"
                  disabled={toUpdate}
                  placeholder="E-mailadres"
                  {...register("email")}
                />
                {errors.email && (
                  <p style={{ color: "red" }}>{errors.email.message}</p>
                )}
              </div>

              <div className="My-profile-form-btn-box">
                <button disabled={loading} type="submit">
                  {loading ? "Wijziging opslaan..." : "Wijziging opslaan"}
                </button>
                <button
                  onClick={() => {
                    setShowPopup(false);
                    setSelectedPerson(null);
                  }}
                  className="Change"
                  type="button"
                >
                  Annuleren
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddNewFamilypopup;
