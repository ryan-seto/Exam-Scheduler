import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import About from "./components/About";
import { ExamDetails } from "./components/ExamDetails";
import { SearchBar } from './components/SearchBar';
import { SearchResultsList } from './components/SearchResultsList';
import NavBar from './components/NavBar';
import AlertMessage from './components/AlertMessage'; // Update path if needed

import moment from 'moment';
import { gapi } from 'gapi-script';

import Modal from './components/Modal';
import Login from './components/Login';

const clientId = "1044583009091-346on42a7s1rqdplbi3liqssifi7buj3.apps.googleusercontent.com";

function App() {
  const [results, setResults] = React.useState([]);
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [exam, setExam] = useState(null); // State to store exam data
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success'); // or 'error'
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSubMessage, setAlertSubMessage] = useState('');

  React.useEffect(() => {
    setResults([]); // Reset search results when the route changes
  }, [location]);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: 'profile email https://www.googleapis.com/auth/calendar.events',
      }).then(() => {
        console.log('Google API client initialized');
        // Load the Google Calendar API library
        gapi.client.load('calendar', 'v3', () => {
          console.log('Google Calendar API loaded');
        });
      }).catch((error) => {
        console.error('Error initializing Google API client', error);
      });
    }
    gapi.load('client:auth2', start);
  }, []);

  const handleLoginSuccess = (res) => {
    console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
    const profile = res.profileObj;
    setUser({
      name: profile.name,
      imageUrl: profile.imageUrl,
      email: profile.email,
    });
    handleCloseModal(); // Close the modal
  };

  const handleLoginFailure = (res) => {
    console.log('LOGIN FAILED! res:', res);
  };

  const handleLogout = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      setUser(null);
    });
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  // creating the event 

  const createEvent = (eventData) => {
    if (!user) {
      alert('You need to be logged in to create an event.');
      return;
    }

    if (!gapi.client || !gapi.client.calendar) {
      alert('Google API client is not fully initialized.');
      return;
    }

    // Define the format to match the exam.Date and exam.Start
    const format = 'MMMM D, YYYYTHH:mm A';  // Ensure this matches your data format

    // Parse the start and end times using moment, and convert them to ISO strings
    const startDateTime = moment(`${exam.Date}T${exam.Start}`, format);
    const endDateTime = moment(`${exam.Date}T${exam.Finish}`, format);

    // Option 1: Force the time to be in UTC format (Google Calendar expects UTC time)
    const formattedStartDateTime = startDateTime.utc().format('YYYYMMDDTHHmmss') + 'Z';
    const formattedEndDateTime = endDateTime.utc().format('YYYYMMDDTHHmmss') + 'Z';

    console.log("Formatted start time: ", formattedStartDateTime);
    console.log("Formatted end time: ", formattedEndDateTime);

  // Build Google Calendar event URL
  const googleCalendarUrl = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${encodeURIComponent(eventData.summary)}&details=${encodeURIComponent(eventData.description)}&location=${encodeURIComponent(eventData.location)}&dates=${formattedStartDateTime}/${formattedEndDateTime}`;
  // Open the Google Calendar event creation page in a new tab
  window.open(googleCalendarUrl, '_blank');
};

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      <NavBar
        user={user}
        onLoginClick={handleLoginClick}
        onLogout={handleLogout}
        onLoginSuccess={handleLoginSuccess}
        onLoginFailure={handleLoginFailure}
        handleCloseModal={handleCloseModal}
      />
      {/* <Routes>
        <Route path="/login" element={<Login />} />
      </Routes> */}
      {showLoginModal && (
        <Modal show={showLoginModal} onClose={handleCloseModal}>
          <Login
            onLoginSuccess={handleLoginSuccess}
            onLoginFailure={handleLoginFailure}
            handleCloseModal={handleCloseModal}
          />
        </Modal>
      )}
      {showAlert && (
        <AlertMessage
          type={alertType}
          message={alertMessage}
          subMessage={alertSubMessage}
          onClose={handleCloseAlert}
        />
      )}
      {location.pathname === "/" && <Home />}
      <div className="app-container" id="home">
        <div className="search-bar-container">
          <SearchBar setResults={setResults} />
          <SearchResultsList results={results} />
        </div>
        {location.pathname === "/" && <About />}
        <Routes>
          <Route path="/exam/:id" element={<ExamDetails createEvent={createEvent} setExam={setExam}/>} />
        </Routes>
      </div>


    </>

  );
}

function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWithRouter;
