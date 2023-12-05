import styled from "styled-components";
import React from "react";
import { useRouter } from "next/router";

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
  margin-bottom: 180px;
`;

export default function SearchBar() {
  const router = useRouter();

  const testIfExists = async (params) => {
    const department = params[0]
    const courseCode = params.join(" ")
    return fetch(`http://localhost:2000/${department}?code=${courseCode}`)
      .then((response) => {
        if (!response.ok) {
          return false
        } else {
          return true
        }
      })
  }

  // Handles inputs from search bar.
  const handleOnKeyDown = async (e) => {
    if (e.key != "Enter") {
      return
    }
    let search = e.target.value.split(" ")
    if (await testIfExists(search)) {
      router.push(`/classes/${search.join("/")}`);
    } else {
      console.log("that class doesn't exist")
    }
  };

  return (
    <SearchInput
      type="text"
      className="search-input"
      placeholder="Search by name, professor, class id..."
      onKeyDown={(e) => handleOnKeyDown(e)}
    />
  );
}
