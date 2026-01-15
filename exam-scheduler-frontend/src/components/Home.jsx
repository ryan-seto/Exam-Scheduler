import React from "react";
import './Home.css';

const Home = () => {
  return (
    <div className="intro-container">
      <div className='intro-card'>
        <h2 className="intro-title">Welcome to the UW Exam Scheduler</h2>
        <p className="intro-description">Use the search bar to look up a 
          course code and find exam details.</p>
        <p className="disclaimer">Note: This website is not affiliated with the 
          University of Waterloo, but all data is retrieved from an official UW 
          source:&nbsp;  
          <a href="https://uwaterloo.ca/the-centre/academics/final-examinations/final-examination-schedule" 
             target="_blank" rel="noopener noreferrer">
              https://uwaterloo.ca/the-centre/academics/final-examinations/final-examination-schedule</a>
        </p>
      </div>
    </div>

  );
};

export default Home;