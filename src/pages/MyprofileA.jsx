import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import { toast, ToastContainer } from "react-toastify";
import { showSuccessToast } from "../Components/Toaster/Toaster";
import { ReSubs } from "../context/ReSubsContext";

const MyprofileA = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    UserImage: "",
    dob: "",
  });
  const [initialData, setInitialData] = useState({});
  const [loading, setLoading] = useState();
  const userDetails = JSON.parse(localStorage.getItem("currentuser"));
  const myCurrId = userDetails?.inviteBy
    ? userDetails?.inviteBy
    : userDetails?._id;


  const [selectedFile, setSelectedFile] = useState(null);
  const { isActive, setOpenToBlock } = ReSubs();

  const fetchUserData = async () => {
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.get(`${baseUrl}/user/${myCurrId}`);
      const userData = {
        firstname: response.data.firstname,
        lastname: response.data.lastname,
        email: response.data.email,
        UserImage: response.data.UserImage,
        dob: response.data.dob?.split("T")[0],
      };
      setFormData(userData);
      setInitialData(userData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    if (!isActive) {
      setOpenToBlock(true);
      return;
    }
    e.preventDefault();

    try {
      setLoading(true);
      let uploadedImageUrl = formData.UserImage;

      if (selectedFile) {
        try {
          const imageData = new FormData();
          imageData.append("file", selectedFile);
          const uploadRes = await axios.post(`${baseUrl}/upload-file`, imageData);
          uploadedImageUrl = uploadRes.data?.s3Url;
        } catch (error) {
          console.error("Error uploading image:", error);
          toast.error("Error uploading image. Please try again.");
          setLoading(false);
          return;
        }
      }

      const updatedData = {};
      // Only include fields that have changed
      if (formData.firstname !== initialData.firstname) updatedData.firstname = formData.firstname;
      if (formData.lastname !== initialData.lastname) updatedData.lastname = formData.lastname;
      if (formData.email !== initialData.email) updatedData.email = formData.email;
      if (formData.dob !== initialData.dob) updatedData.dob = formData.dob;
      if (uploadedImageUrl !== initialData.UserImage) updatedData.UserImage = uploadedImageUrl;

      if (Object.keys(updatedData).length > 0) {
        const response = await axios.put(
          `${baseUrl}/user/${myCurrId}`,
          updatedData
        );
        localStorage.setItem("currentuser", JSON.stringify(response.data.user));
        showSuccessToast("profiel succesvol bijgewerkt");
        setInitialData({ ...formData, UserImage: uploadedImageUrl });
        setSelectedFile(null);
      } else {
        showSuccessToast("Geen wijzigingen om bij te werken.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Error updating profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <>
      <section className="My-profile-sec">
        {/* <ToastContainer /> */}
        <div className="container-ar">
          <div className="main-My-profile">
            <div className="My-profile-form">
              <h2>Profiel informatie</h2>

              <div className="My-profile-form-group-box">
                <div className="My-profile-form-group imger-uploder-box">
                  <label htmlFor="">Upload uw afbeelding</label>

                  <input
                    type="file"
                    accept="image/*"
                    id="userImageInput"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setSelectedFile(file);
                      }
                    }}
                  />

                  {selectedFile || formData.UserImage ? (
                    <div className="uploaded-image-preview text-center">
                      <img
                        src={
                          selectedFile
                            ? URL.createObjectURL(selectedFile)
                            : formData.UserImage
                        }
                        alt="Uploaded"
                        style={{
                          width: "120px",
                          height: "120px",
                          borderRadius: "8px",
                          objectFit: "cover",
                          margin: "0px auto",
                          display: "block",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          document.getElementById("userImageInput").click()
                        }
                        title="Click to change"
                      />
                    </div>
                  ) : (
                    <div
                      className="imger-uploder-icon"
                      onClick={() =>
                        document.getElementById("userImageInput").click()
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="47"
                        height="47"
                        viewBox="0 0 47 47"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_4689_314)">
                          <path
                            d="M47 19.0173V27.9827C47 28.6576 46.4532 29.2053 45.7774 29.2053H29.2054V45.7773C29.2054 46.4531 28.6577 46.9999 27.9828 46.9999H19.0173C18.3428 46.9999 17.7948 46.453 17.7948 45.7773V29.2053H1.22257C0.547119 29.2053 0 28.6576 0 27.9827V19.0173C0 18.3422 0.547119 17.7947 1.22257 17.7947H17.7948V1.22256C17.7948 0.546848 18.3427 0 19.0173 0H27.9828C28.6577 0 29.2054 0.546848 29.2054 1.22256V17.7947H45.7774C46.4533 17.7947 47 18.3422 47 19.0173Z"
                            fill="black"
                            fillOpacity="0.2"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_4689_314">
                            <rect width="47" height="47" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  )}
                </div>

                <div className="My-profile-form-group">
                  <label htmlFor="firstname">Voornaam</label>
                  <input
                    type="text"
                    id="firstname"
                    placeholder="Voornaam"
                    name="firstname"
                    value={formData.firstname || ""}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className="My-profile-form-group">
                  <label htmlFor="lastname">Achternaam</label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder="Achternaam"
                    value={formData.lastname || ""}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className="My-profile-form-group">
                  <label htmlFor="email">E-mailadres</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="E-mailadres"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
                <div className="My-profile-form-group">
                  <label htmlFor="dob">Geboortedatum</label>
                  <input
                    type="date"
                    id="dob"
                    placeholder="Geboortedatum"
                    name="dob"
                    value={formData.dob || ""}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                {/* <div className="My-profile-form-group">
                  <label htmlFor="">Interface taal</label>
                  <select name="cars" id="cars">
                    <option value="" selected disabled>select</option>
                    <option value="Option1">Option1</option>
                    <option value="Option2">Option2</option>
                    <option value="Option3">Option3</option>
                    <option value="Option4">Option4</option>
                  </select>

                </div> */}
              </div>
              <div className="My-profile-form-btn-box">
                <button 
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? 'Bezig met opslaan...' : 'Opslaan'}
                </button>
                {/* <button className="Change">Wachtwoord aanpassen</button> */}
              </div>
            </div>
            {/* 
            <div className="Email-Settings-box">
              <h2>Email Settings</h2>

              <div className="Email-Settings-group">
                <div className="Email-Settings-group-box">
                  <p>Email subscription status</p>
                </div>
                <button> <svg xmlns="http://www.w3.org/2000/svg" width="13" height="10" viewBox="0 0 13 10" fill="none">
                  <path d="M5.30827 10L4.34972 8.59137C3.47141 7.29993 0.911828 5.89602 0 5.46417L0.686563 3.98473C0.808844 4.0424 3.18277 5.17662 4.76369 6.63205C5.6483 4.85171 7.81727 1.64775 12.4646 0L13 1.54205C7.26131 3.57649 5.80552 8.31407 5.79109 8.3619L5.30827 10Z" fill="black" />
                </svg>Subscribed</button>
              </div>

              <div className="History-box">
                <h2>Email History</h2>
                <p>The following table lists all the emails sent to you. If you can’t find an email, please search for the Email subject in your  inbox and check your spam folder</p>
              </div>


              <div className="Question-box">
                <div className="Question-card">
                  <h3>Question of the week</h3>
                  <p>12/16/2024</p>
                </div>

                <div className="Question-card">
                  <h3>Confirmation gift email</h3>
                  <p>12/16/2024</p>
                </div>


                <div className="Question-card">
                  <h3>Log in to your account</h3>
                  <p>12/16/2024</p>
                </div>


                <div className="Question-card">
                  <h3>Purchase confirmation</h3>
                  <p>12/16/2024</p>
                </div>


      

              </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default MyprofileA;
