//@ts-nocheck
// import React from "react";
import { Navigate, useRoutes } from "react-router-dom";

import PDFGenerator from "../Components/Createpdf";
import FontCustomizer from "../Components/EditablePage";
import Dashboard from "../pages/Dashboard";
// import Chat1 from "../Components/Chat1";
import SampleBook from "../pages/SampleBook";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AudioRecorder from "../Components/texttospeech";
import VideoQr from "../Components/videoqr";
import FutureBook from "../pages/FutureBook";
import ReviewBook from "../pages/ReviewBook";
import Billing from "../pages/Billing";
import Payment from "../pages/Payment";
// import Shippingbook from "../Components/Shipping-components/Shippingbook";
import Shipping from "../Components/Shipping-components/Shipping";
import Checkout from "../Components/Shipping-components/Checkout";
import Ongeschreven from "../pages/Ongeschreven";
// import Loginmain from "../pages/Loginmain";
import Myaccount from "../pages/Myaccount";
import PayPalButtonComponent from "../pages/paypal";
import SuccessPage from "../pages/success";
import SuccessCartPage from "../pages/successcart";
import TextToSpeechComponent from "../pages/audiopage";

// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextToSpeechComponentss from "../pages/TextToSpeachComponent";

import Questionoftheweek from "../Components/Questionoftheweek";
import Chaptersfuture from "../Components/Chaptersfuture";
import AllQuestions from "../Components/AllQuestions";
import OngeschrevenMembership from "../Components/OngeschrevenMembership";
import Page404 from "../pages/Page404";
import Chapters from "../Components/Chapters";
import ChatModule from "../pages/ChatModule";
import UserChat from "../Components/UserChat";
import MyBook from "../Components/ExampleBook";
import Meeting from "../pages/Meeting";
import Chapterwithai from "../Components/withAi/Chapterwithai";
import UserChatWithAi from "../Components/withAi/UserChatWithAi";
import Chatwithai from "../Components/withAi/chatwithai";
import Qustionchat from "../pages/Qustionchat";
import ExploreQuestions from "../pages/ExploreQuestions";
import Main_page1 from "../New-from-page/Main_page1";
import Inner_page1 from "../New-from-page/Inner_page1";
import Inner_page2 from "../New-from-page/Inner_page2";
import Inner_page3 from "../New-from-page/Inner_page3";
import Overjou from "../Components/Overjou";
import Successful from "../pages/Successful";
import SuccessfulSubscription from "../pages/SuccessfulSubscription";
import Emailt1 from "../Components/page-email/Emailt1";
import Inner_page4 from "../New-from-page/Inner_page4";
import MyDocumentx from "../Components/MyDocumentx";
import Homepage from "../Components/WebSite_Page/Homepage";
import Producten from "../Components/WebSite_Page/Producten";
import News from "../Components/WebSite_Page/News";
import Works from "../Components/WebSite_Page/works";
import Contact from "../Components/WebSite_Page/Contact";

import Privacypolicy from "../Components/WebSite_Page/Privacypolicy";
import Algemene from "../Components/WebSite_Page/Algemene";
// import Blog2 from "../Components/Blogs/Blog2";
// import Blog3 from "../Components/Blogs/Blog3";
import Blog1 from "../Components/Blogs/Blog1";
import Blog2 from "../Components/Blogs/Blog2";
import Blog3 from "../Components/Blogs/Blog3";
import Blog4 from "../Components/Blogs/Blog4";
import Blog5 from "../Components/Blogs/Blog5";
import Blog6 from "../Components/Blogs/Blog6";
import Blog7 from "../Components/Blogs/Blog7";
import Blog8 from "../Components/Blogs/Blog8";
import Blog9 from "../Components/Blogs/Blog9";
import Blog10 from "../Components/Blogs/Blog10";
import Blog11 from "../Components/Blogs/Blog11";
import Blog12 from "../Components/Blogs/Blog12";
import Blog13 from "../Components/Blogs/Blog13";

const Routes = () => {
  const currentUser = localStorage.getItem("currentuser");

  return useRoutes([
    {
      path: "*",
      element: <Page404 />,
    },
    {
      path: "/chat",
      element: <Dashboard />,
    },
    {
      path: "/chat-module/:questionId",
      element: <ChatModule />,
    },
    {
      path: "/exploreQuestion",
      element: <ExploreQuestions />,
    },
    {
      path: "/chat-moduleai/:questionId",
      element: <Chatwithai />,
    },
    {
      path: "/chapter/:userId",
      element: <Chapters />,
    },
    {
      path: "/chapterai/:userId",
      element: <Chapterwithai />,
    },

    {
      path: "/samplebook",
      element: <SampleBook />,
    },
    {
      path: "/dashboard",
      element: <FutureBook />,
    },
    {
      path: "/Login",
      element: <Login />,
      // element: currentUser ? <Navigate to="/dashboard" /> : <Login />,
    },
    {
      path: "/test",
      element: <TextToSpeechComponentss />,
    },
    {
      path: "/MyBook",
      element: <MyBook />,
    },
    {
      path: "/Qustionchat",
      element: <Qustionchat />,
    },

    {
      path: "/questionOfWeek",
      element: <Questionoftheweek />,
    },
    // {
    //   path: "/chapter",
    //   element: <Chaptersfuture/>,
    // },
    {
      path: "/Overjou",
      element: <Overjou />,
    },
    {
      path: "/allQuestions",
      element: <AllQuestions />,
    },
    // {
    //   path: "/",
    //   element: <Loginmain/>,
    // },
    {
      path: "/signup",
      element: <Signup />,
    },

    {
      path: "/Meeting",
      element: <Meeting />,
    },
    {
      path: "/Billing",
      element: <Billing />,
    },
    {
      path: "/Payment",
      element: <Payment />,
    },
    // {
    //   path: "/chat",
    //   element: <Chat1 />,
    // },
    // {
    //   path: "/chat2",
    //   element: <UserChat />,
    // },
    {
      path: "/pdf",
      element: <PDFGenerator />,
    },
    {
      path: "/userchatwithai",
      element: <UserChatWithAi />,
    },
    {
      path: "/font",
      element: <FontCustomizer />,
    },
    {
      path: "/speechtotext",
      element: <AudioRecorder />,
    },
    {
      path: "/videoqr",
      element: <VideoQr />,
    },
    {
      path: "/ReviewBook",
      element: <ReviewBook />,
    },
    {
      path: "/Myaccount",
      element: <Myaccount />,
    },
    {
      path: "/Shipping",
      element: <Shipping />,
    },
    {
      path: "/Checkout",
      element: <Checkout />,
    },
    {
      path: "/paypal",
      element: <PayPalButtonComponent />,
    },
    {
      path: "/onge-schreven",
      element: <Ongeschreven />,
    },

    {
      path: "/success",
      element: <SuccessPage />,
    },
    {
      path: "/success_cart",
      element: <SuccessCartPage />,
    },
    {
      path: "/audio",
      element: <TextToSpeechComponent />,
    },

    {
      path: "/OngeschrevenMembership",
      element: <OngeschrevenMembership />,
    },

    /* my-new-code-from */ /* my-new-code-from */ /* my-new-code-from */ /* my-new-code-from */ /* my-new-code-from */ /* my-new-code-from */
    /* my-new-code-from */ /* my-new-code-from */ /* my-new-code-from */ /* my-new-code-from */ /* my-new-code-from */ /* my-new-code-from */
    /* my-new-code-from */ /* my-new-code-from */ /* my-new-code-from */ /* my-new-code-from */ /* my-new-code-from */ /* my-new-code-from */
    /* my-new-code-from */ /* my-new-code-from */ /* my-new-code-from */ /* my-new-code-from */ /* my-new-code-from */ /* my-new-code-from */
    {
      path: "/Main_page1",
      element: <Main_page1 />,
    },

    {
      path: "/Inner_page1",
      element: <Inner_page1 />,
    },

    {
      path: "/MyDocumentx",
      element: <MyDocumentx />,
    },
    {
      path: "/Inner_page2",
      element: <Inner_page2 />,
    },
    {
      path: "/Inner_page3",
      element: <Inner_page3 />,
    },

    {
      path: "/Inner_page4",
      element: <Inner_page4 />,
    },

    {
      path: "/Emailt1",
      element: <Emailt1 />,
    },

    {
      path: "/Successful",
      element: <Successful />,
    },
    {
      path: "/Successful_Subscription",
      element: <SuccessfulSubscription />,
    },
    /* my-new-code-from */ /* my-new-code-from */ /* my-new-code-from */ /* my-new-code-from */ /* my-new-code-from */ /* my-new-code-from */
    /* my-new-code-from */ /* my-new-code-from */ /* my-new-code-from */ /* my-new-code-from */ /* my-new-code-from */ /* my-new-code-from */
    /* my-new-code-from */ /* my-new-code-from */ /* my-new-code-from */ /* my-new-code-from */ /* my-new-code-from */ /* my-new-code-from */
    /* my-new-code-from */ /* my-new-code-from */ /* my-new-code-from */ /* my-new-code-from */ /* my-new-code-from */ /* my-new-code-from */

    // New-Website-Routes-New-Website-Routes-New-Website-Routes-New-Website-Routes-New-Website-Routes
    // New-Website-Routes-New-Website-Routes-New-Website-Routes-New-Website-Routes-New-Website-Routes
    // New-Website-Routes-New-Website-Routes-New-Website-Routes-New-Website-Routes-New-Website-Routes
    // New-Website-Routes-New-Website-Routes-New-Website-Routes-New-Website-Routes-New-Website-Routes
    // New-Website-Routes-New-Website-Routes-New-Website-Routes-New-Website-Routes-New-Website-Routes
    {
      path: "/",
      element: <Homepage />,
    },

    {
      path: "/Producten",
      element: <Producten />,
    },
    {
      path: "/News",
      element: <News />,
    },
    {
      path: "/Works",
      element: <Works />,
    },
    {
      path: "/Contact",
      element: <Contact />,
    },
    {
      path: "/Algemene",
      element: <Algemene />,
    },
    {
      path: "/Privacypolicy",
      element: <Privacypolicy />,
    },
     
    {
      path: "/Blog2",
      element: <Blog2 />,
    },
    {
      path: "/Blog3",
      element: <Blog3 />,
    },
    {
      path: "/Blog5",
      element: <Blog1 />,
    },
    {
      path: "/Blog4",
      element: <Blog4 />,
    },
    {
      path: "/Blog1",
      element: <Blog5 />,
    },

    {
      path: "/Blog6",
      element: <Blog6 />,
    },
    {
      path: "/Blog7",
      element: <Blog7 />,
    },
    {
      path: "/Blog8",
      element: <Blog8 />,
    },
    {
      path: "/Blog9",
      element: <Blog9 />,
    },
    {
      path: "/Blog10",
      element: <Blog10 />,
    },
    {
      path: "/Blog11",
      element: <Blog11 />,
    },
    {
      path: "/Blog12",
      element: <Blog12 />,
    },
    {
      path: "/Blog13",
      element: <Blog13 />,
    },


     

    // New-Website-Routes-New-Website-Routes-New-Website-Routes-New-Website-Routes-New-Website-Routes
    // New-Website-Routes-New-Website-Routes-New-Website-Routes-New-Website-Routes-New-Website-Routes
    // New-Website-Routes-New-Website-Routes-New-Website-Routes-New-Website-Routes-New-Website-Routes
    // New-Website-Routes-New-Website-Routes-New-Website-Routes-New-Website-Routes-New-Website-Routes
    // New-Website-Routes-New-Website-Routes-New-Website-Routes-New-Website-Routes-New-Website-Routes
  ]);
};

export default Routes;
