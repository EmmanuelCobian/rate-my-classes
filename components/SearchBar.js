import styled from "styled-components";
import React from "react";
import { useRouter } from "next/navigation";

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

  // Handles inputs from search bar.
  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("Searched for: " + e.target.value);
      router.push(`/classpage?courseCode=${e.target.value}`);
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
