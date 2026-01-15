import React from 'react';
import "./About.css";
import number1 from '../assets/List/number-1.png';
import number2 from '../assets/List/number-2.png';
import number3 from '../assets/List/number-3.png';
import loginIcon from '../assets/user.png';
import searchIcon from '../assets/search.png';
import eventIcon from '../assets/event.png';

const About = () => {
    return (
        <div className="about-card">
            <div className="about-card-overlay"></div>
            <div className="about-card-inner">
                <div>
                    <p className='about-text'>UW Exam Scheduler is a tool made for  
                        <span className='about-text-bold'>&nbsp;University of Waterloo
                        </span> students to search for exam details and sync this 
                        data to their online calenders with ease. Current searchable
                        data is<span className='about-text-bold'>&nbsp;final exams&nbsp;
                        </span>for the 
                        <span className='about-text-bold'>&nbsp;Spring 2024&nbsp;
                        </span>term.
                    </p>
                </div>
                <div className="divider"></div>
                {/* <div className={`${divider} ${divTransparent}`}></div> */}
                <div className='steps-container'>
                <div className='step'>
                    <img src={number1} alt="Step 1" className="step-number" />
                    <p className="step-description">Login using your Google or 
                        Apple account
                    </p>
                    <img src={loginIcon} alt="Login Icon" className="inline-images" />
                </div>
                <div className='step'>
                    <img src={number2} alt="Step 2" className="step-number" />
                    <p className="step-description">Search for a class to display
                        exam details
                    </p>
                    <img src={searchIcon} alt="Search Icon" className="inline-images" />
                </div>
                <div className='step'>
                    <img src={number3} alt="Step 3" className="step-number" />
                    <p className="step-description">Click on "Create event in 
                        calendar" to export and sync data to your personal schedule
                    </p>
                    <img src={eventIcon} alt="Event Icon" className="inline-images" />
                </div>
            </div>
            </div>
        </div>
    );
};

export default About;