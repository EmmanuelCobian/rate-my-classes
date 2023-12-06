import styled from "styled-components";
import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect} from "react";
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const SearchInput = styled.input`
  padding: 15px;
  width: 80%;
  padding: 10px;
  max-width: 800px;
  border: none;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  font-size: 18px;
  text-align: center;
  backdrop-filter: blur(8px);
  margin: 0 auto;
  margin-top: auto;
  margin-bottom: ${({ isValidInput }) => (isValidInput ? "0px" : "20px")};

  &:focus {
    border: 1px solid ${({ isValidInput }) => (isValidInput ? "blue" : "red")};
  }
`;

const SearchError = styled.p`
  color: red;
  margin-bottom: ${({ isValidInput }) => (isValidInput ? "0px" : "20px")};
  display: ${({ isValidInput }) => (isValidInput ? "none" : "block")};
`;

export default function SearchBar() {
  const [departmentsAndCodes, setDepartmentsAndCodes] = useState(new Set());

  useEffect(() => {
      fetchData();
  }, []);

  const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:2000/get-all-departments-and-codes');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setDepartmentsAndCodes(prevSet => new Set([...prevSet, ...Object.values(data).flat()]));
        } catch (error) {
        console.error('Fetch error:', error);
        console.log(departmentsAndCodes);
      }
  };

  const [userInput, setUserInput] = useState("");


  const [validInput, setValidInput] = useState(true);
  const router = useRouter();


  const testIfExists = async (params) => {
    const department = params[0];
    const courseCode = params.join(" ");
    return fetch(`http://localhost:2000/${department}?code=${courseCode}`).then(
      (response) => {
        if (!response.ok) {
          return false;
        } else {
          return true;
        }
      }
    );
  };

  // Handles inputs from search bar.
  const handleOnKeyDown = async (e) => {
    if (e.key != "Enter") {
      return;
    }
    let search = e.target.value.toUpperCase().split(" ");
    if (await testIfExists(search)) {
      setValidInput(true);
      router.push(`/classes/${search.join("/")}`);
    } else {
      setValidInput(false);
    }
  };

  const autoComplete = async (depAndCode) => {
    setUserInput(depAndCode)

    // Extract department and course code from the auto-complete result.
    const [department, ...courseCodeArray] = depAndCode.split(" ");
    const courseCode = courseCodeArray.join(" ");

    // Check if the review for the given department and course code exists.
    if (await testIfExists([department, courseCode])) {
      // Navigate to the review page.
      router.push(`/classes/${department}/${courseCode}`);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <SearchInput
        type="text"
        className="search-input"
        isValidInput={validInput}
        placeholder="Search by name"
        value={userInput}
        onKeyDown={(e) => handleOnKeyDown(e)}
        onChange={event => setUserInput(event.target.value)}
      />
      <SearchError isValidInput={validInput}>
        That course doesn't exist, please try again.
      </SearchError>
      <ListGroup style={{ width: '80%' }}>
        {
          [...departmentsAndCodes]
            .filter(depAndCode => {
              if (userInput === "") {
                return null;
              } else if (depAndCode.toLowerCase().includes(userInput.toLowerCase())) {
                return depAndCode;
              }
            })
            .slice(0, 5) // Take only the first five items
            .map((depAndCode) => (
              <ListGroupItem key={depAndCode} action onClick={() => autoComplete(depAndCode)}>
                {depAndCode}
              </ListGroupItem>
            ))
        }
      </ListGroup>

    </div>
  );
}
