import CoverNav from "@/components/CoverNav";
import styled from "styled-components";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";

// #region CSS
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: auto;
  width: 600px;
  padding: 10px;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 2rem;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10rem;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const QuestionAndAnswer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
// #endregion

const gradeOptions = [
  "Select grade",
  "A+",
  "A",
  "A-",
  "B+",
  "B",
  "B-",
  "C+",
  "C",
  "C-",
  "D+",
  "D",
  "D-",
  "F",
];
const termOptions = [
  "Select term",
  "Fall 2023",
  "Spring 2023",
  "Fall 2022",
  "Spring 2022",
  "Fall 2021",
  "Spring 2021",
  "Fall 2020",
  "Spring 2020",
  "Fall 2019",
  "Spring 2019",
  "Fall 2018",
  "Spring 2018",
  "Fall 2017",
  "Spring 2017",
  "Fall 2016",
  "Spring 2016",
  "Fall 2015",
  "Spring 2015",
];

export default function CreateReviewPage() {
  const { query } = useRouter();

  // State to manage form inputs
  const [formData, setFormData] = useState({
    professor: "",
    term: "",
    grade: "",
    mandatoryAttendance: null,
    mandatoryTextBook: null,
    difficulty: "0",
    interest: "0",
    description: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const renderRadioQuestion = (label, name) => {
    return (
      <QuestionAndAnswer>
        <label>{label}</label>
        <Row>
          <div className="form-check form-check-inline">
            <input
              checked={formData[name] === "yes"}
              className="form-check-input"
              name={name}
              onChange={handleInputChange}
              type="radio"
              value="yes"
            />
            <label>Yes</label>
          </div>

          <div className="form-check form-check-inline">
            <input
              checked={formData[name] === "no"}
              className="form-check-input"
              name={name}
              onChange={handleInputChange}
              type="radio"
              value="no"
            />
            <label>No</label>
          </div>
        </Row>
      </QuestionAndAnswer>
    );
  };

  const renderDropDown = (label, name, options) => {
    return (
      <QuestionAndAnswer>
        <label>{label}</label>
        <div className="form-group">
          <select
            className="form-control"
            name={name}
            value={formData[name]}
            onChange={handleInputChange}
          >
            {options.map((o) => {
              return <option key={o}>{o}</option>;
            })}
          </select>
        </div>
      </QuestionAndAnswer>
    );
  };

  const renderSlider = (label, name) => {
    return (
      <QuestionAndAnswer>
        <label>{label + ": " + formData[name]}</label>
        <input
          type="range"
          className="form-range"
          value={formData[name]}
          min="0"
          max="5"
          name={name}
          onChange={handleInputChange}
        />
      </QuestionAndAnswer>
    );
  };

  const renderInputField = (label, name, placeHolder, numRows) => {
    return (
      <QuestionAndAnswer>
        <label>{label}</label>
        <textarea
          className="form-control"
          rows={numRows}
          value={formData[name]}
          name={name}
          onChange={handleInputChange}
          placeholder={placeHolder}
        ></textarea>
      </QuestionAndAnswer>
    );
  };

  return (
    <>
      <CoverNav />
      <PageContainer>
        <Title>{`Review for ${query.courseCode}: ${query.title}`}</Title>
        <br></br>
        <Form onSubmit={handleSubmit}>
          {renderInputField(
            "Professor",
            "professor",
            "Enter your professor's name",
            1
          )}
          {renderDropDown("Term", "term", termOptions)}
          {renderDropDown("Grade", "grade", gradeOptions)}

          {renderRadioQuestion("Attendance mandatory", "mandatoryAttendance")}
          {renderRadioQuestion("Text book mandatory", "mandatoryTextBook")}

          {renderSlider("Course difficulty", "difficulty")}
          {renderSlider("Interest level", "interest")}

          {renderInputField(
            "Description",
            "description",
            "Write your review for this course",
            4
          )}

          <Button type="submit" className="btn btn-dark">
            Submit
          </Button>
        </Form>
      </PageContainer>
    </>
  );
}
