import styled from "styled-components";
import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";

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
  margin-bottom: ${({ isValidInput }) => (isValidInput ? "180px" : "0px")};

  &:focus {
    border: 1px solid ${({ isValidInput }) => (isValidInput ? "blue" : "red")};
  }
`;

const SearchError = styled.p`
  color: red;
  margin-bottom: ${({ isValidInput }) => (isValidInput ? "0px" : "180px")};
  display: ${({ isValidInput }) => (isValidInput ? "none" : "block")};
`;

export default function SearchBar() {
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
    let search = e.target.value.split(" ");
    if (await testIfExists(search)) {
      setValidInput(true);
      router.push(`/classes/${search.join("/")}`);
    } else {
      setValidInput(false);
    }
  };

  return (
    <div>
      <SearchInput
        type="text"
        className="search-input"
        isValidInput={validInput}
        placeholder="Search by name"
        onKeyDown={(e) => handleOnKeyDown(e)}
      />
      <SearchError isValidInput={validInput}>
        That course doesn't exist, please try again.
      </SearchError>
    </div>
  );
}
