import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from "../../baseUrl";
import Email from "../../assets/Email.png";
import phone from "../../assets/phone.png";
import { showErrorToast, showSuccessToast } from "../Toaster/Toaster";

const schema = yup.object().shape({
  name: yup.string().required("Naam is verplicht"),
  email: yup.string().email("Voer een geldig e-mailadres in").required("E-mail is verplicht"),
  message: yup.string().required("Bericht is verplicht"),
});

const Hcontact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/contact`, data);
      if (response.status === 200) {
        showSuccessToast("Bedankt! We reageren zo snel mogelijk.");
        reset();
      }
    } catch (error) {
      showErrorToast("Er is iets misgegaan. Probeer het later opnieuw.");
      console.error("Contact form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="Hcontact">
      <ToastContainer />
      <div className="New-container">
        <form className="main-Hcontact" onSubmit={handleSubmit(onSubmit)}>
          <div className="Hcontact-linking">
            <div className="Hcontact-phone-link">
              <img src={Email} alt="" />
              <p> info@ongeschrevenleven.nl</p>
            </div>
            {/* <div className="Hcontact-phone-link">
              <img src={phone} alt="" />
              <p>06 4321 8765</p>
            </div> */}
          </div>
          <div className="Hcontact-input-box">
            <div className="New-h-input">
              <label htmlFor="naam">Naam *</label>
              <input type="text" placeholder="Naam" {...register("name")} />
              <p style={{color: 'red'}}>{errors.name?.message}</p>
            </div>
            <div className="New-h-input">
              <label htmlFor="email">E-mail *</label>
              <input type="text" placeholder="Email" {...register("email")} />
               <p style={{color: 'red'}}>{errors.email?.message}</p>
            </div>
            <div className="New-h-input  Bericht-box">
              <label htmlFor="bericht">Bericht</label>
              <textarea placeholder="Bericht" {...register("message")}></textarea>
               <p style={{color: 'red'}}>{errors.message?.message}</p>
            </div>
          </div>
          <div className="Hcontact-btn">
            <button type="submit" disabled={loading}>
              {loading ? 'VERZENDEN...' : 'VERZENDEN'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Hcontact;
