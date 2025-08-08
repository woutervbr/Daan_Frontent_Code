// utils/toastHelpers.js
import { toast } from "react-toastify";
import done from "../../assets/done.png"; // adjust the path as needed

export function showSuccessToast(msg, hideBar = false) {
  toast.success(msg, {
  icon: (
    <img src={done} alt="done" style={{ width: "20px", height: "20px" }} />
  ),
  hideProgressBar: hideBar,
   autoClose: 3000,  

  style: {
    textAlign: "left", // 👈 change to "center" if you want center alignment
    width: "100%", // 👈 adjust width as needed
    padding: "10px 50px", // 👈 adjust padding as needed
  },
});}



export function showErrorToast(msg) {
  toast.error(msg, {
   style: {
    textAlign: "left", // 👈 change to "center" if you want center alignment
    width: "100%", // 👈 adjust width as needed
    padding: "10px 50px", // 👈 adjust padding as needed
  },
  });
}
