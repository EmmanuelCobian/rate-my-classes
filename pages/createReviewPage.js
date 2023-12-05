import CoverNav from "@/components/CoverNav";
import styled from "styled-components";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import styles from "@/styles/CreateReview.module.css";
import LoadingModal from "@/components/LoadingModal";

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

const ErrorWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
`;

const Error = styled.p`
  color: red;
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
const ratingToColor = {
  1: "#FF5733",
  2: "#FF8054",
  3: "#FF8C33",
  4: "#A2D870",
  5: "#4CAF50",
};

const ratingToColorReverse = {
  1: "#4CAF50",
  2: "#A2D870",
  3: "#FF8C33",
  4: "#FF8054",
  5: "#FF5733",
};

export default function CreateReviewPage() {
  const { data: session, status } = useSession();
  const userName = session?.user?.name;
  const router = useRouter();
  const query = router.query;

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    Attendance: null,
    Author: status == "authenticated" ? userName : "Anonymous",
    CourseCode: query.courseCode,
    Difficulty: 3,
    Grade: "",
    Interest: 3,
    OverallRating: 3,
    Professor: "",
    Review: "",
    Term: "",
    Textbook: null,
    ThumbsDown: 0,
    ThumbsUp: 0,
  });

  useEffect(() => {
    if (!query) return;

    setFormData({
      ...formData,
      CourseCode: query.courseCode,
    });
  }, [query]);

  // Handle input changes and clear error if there is one.
  const handleInputChange = (e) => {
    setError(null);

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePostRequest = async (e) => {
    e.preventDefault();

    // Check if all fields are filled out.
    const emptyFields = Object.entries(formData).filter(
      ([key, value]) => value === null || value === ""
    );

    if (emptyFields.length > 0) {
      setError("Please fill out all fields.");
      window.scroll({
        bottom: document.body.scrollHeight, // or document.scrollingElement || document.body
        left: 0,
        behavior: "smooth",
      });
      return;
    }

    setIsSubmitting(true);

    const queryString = Object.entries(formData)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");

    const apiUrl = "http://localhost:2000/add-review";
    const finalUrl = `${apiUrl}?${queryString}`;
    fetch(finalUrl, {
      method: "POST",
    })
      .then((response) => {
        setIsSubmitting(false);
        if (!response.ok) {
          setError(
            "There was a problem submitting your review. Please try again later."
          );
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        let search = query.courseCode.split(" ");
        router.push(`/classes/${search.join("/")}`);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error);
      });
  };

  const renderError = () => {
    const errorMsg = error ?? "";
    return (
      <ErrorWrapper>
        <Error>{errorMsg}</Error>
      </ErrorWrapper>
    );
  };

  const renderSubmittingModal = () => {
    return <LoadingModal text="Submitting review..." />;
  };

  const renderRadioQuestion = (label, name) => {
    return (
      <QuestionAndAnswer>
        <label>{label}</label>
        <Row>
          <div className="form-check form-check-inline">
            <input
              checked={formData[name] === "yes"}
              className={`${styles.customRadio}`}
              name={name}
              onChange={handleInputChange}
              type="radio"
              value="Yes"
            />
            <label>Yes</label>
          </div>

          <div className="form-check form-check-inline">
            <input
              checked={formData[name] === "no"}
              className={`${styles.customRadio}`}
              name={name}
              onChange={handleInputChange}
              type="radio"
              value="No"
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
    const color =
      name == "difficulty"
        ? ratingToColorReverse[formData[name]]
        : ratingToColor[formData[name]];
    return (
      <QuestionAndAnswer>
        <label>
          {`${label}: `}
          <span style={{ fontWeight: "bold", color: color }}>
            {formData[name]}
          </span>
        </label>
        <input
          type="range"
          value={formData[name]}
          className={`${styles.customRange}`}
          min="1"
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
        <Form onSubmit={handlePostRequest}>
          {renderInputField(
            "Professor",
            "Professor",
            "Enter your professor's name",
            1
          )}
          {renderDropDown("Term", "Term", termOptions)}
          {renderDropDown("Grade", "Grade", gradeOptions)}

          {renderRadioQuestion("Attendance mandatory", "Attendance")}
          {renderRadioQuestion("Text book mandatory", "Textbook")}

          {renderSlider("Course difficulty", "Difficulty")}
          {renderSlider("Interest level", "Interest")}
          {renderSlider("Overall rating", "OverallRating")}

          {renderInputField(
            "Review",
            "Review",
            "Write your review for this course",
            4
          )}

          <Button type="submit" className="btn btn-dark">
            Submit
          </Button>
        </Form>

        {renderError()}
        <br></br>
        <br></br>
      </PageContainer>

      {isSubmitting && renderSubmittingModal()}
    </>
  );
}
