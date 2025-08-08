import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Routes from "./Routes/Routes";
import "../src/App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      <Routes />
      {mounted && <ToastContainer position="top-center" autoClose={2000} />}
    </div>
  );
};

export default App;
