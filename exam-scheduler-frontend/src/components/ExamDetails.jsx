import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ExamDetails.css";

import calendarIcon from '../assets/exam_details/calendar.png';
import clockIcon from '../assets/exam_details/clock.png';
import locationIcon from '../assets/exam_details/location.png';
import arrowIcon from '../assets/exam_details/arrow.png';

export const ExamDetails = ({ createEvent, setExam }) => {
    const { id } = useParams();
    const [exam, setExamData] = useState(null);

    useEffect(() => {
        console.log("Exam ID from URL:", id);
        if (id) {
            fetch(`http://localhost:5001/api/exams/${id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Received exam data:", data);
                    setExamData(data);
                    setExam(data); // Update the exam data in App component
                })
                .catch(error => console.error("Error fetching exam data:", error));
        }
    }, [id, setExam]);

    const handleCreateEvent = () => {
        if (!exam) {
            alert('Exam data is not loaded yet.');
            return;
        }

        const eventDetails = {
            summary: `${exam.Exam}: Final Exam`,
            location: exam.Location,
            description: `Final Exam for ${exam.Exam}`,
            startDateTime: `${exam.Date}T${exam.Start}:00`,
            endDateTime: `${exam.Date}T${exam.Finish}:00`,
        };
        createEvent(eventDetails);
    };

    if (!exam) {
        // return <div>Loading...</div>;
        return (
            <div className="loading-container">
                <svg className="spinner" viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r="20"></circle>
                </svg>
            </div>
        );
    }

    return (
        <div class="exam-card">
            <div class="exam-title-block">
                <h1 className="exam-title">{exam.Exam}: Final Exam</h1>
            </div>
            <div class="exam-info-container">
                <div className='exam-info-line'>
                    <img src={calendarIcon} alt="Exam Time" className="exam-info-icon" />
                    <p className="exam-info-description">Time: &nbsp;{exam.Start} - {exam.Finish}
                    </p>
                </div>
                <div className='exam-info-line'>
                    <img src={clockIcon} alt="Exam Date" className="exam-info-icon" />
                    <p className="exam-info-description">Date: &nbsp;{exam.Day}, {exam.Date}
                    </p>
                </div>
                <div className='exam-info-line'>
                    <img src={locationIcon} alt="Exam Location" className="exam-info-icon" />
                    <p className="exam-info-description">Location: &nbsp;{exam.Location}
                    </p>
                </div>
            </div>
            <div class="exam-card-footer">
                <button type="button" class="google-event-button" 
                    onClick={handleCreateEvent}>Create Event in Google Calendar
                    <img src={arrowIcon} alt="Arrow Icon" className="exam-inline-images" />
                </button>
            </div>
        </div>
    );
};