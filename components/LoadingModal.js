import React from "react";
import styled from "styled-components";

const Background = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: rgba(211, 211, 211, 0.75);
  z-index: 4;
`;

const Modal = styled.div`
  width: 200px;
  height: 150px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 50ch;
  height: 260px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export default function LoadingModal(props) {
  return (
    <Background>
      <Modal>
        <div>{props.text}</div>
        <div className="spinner-border text-dark" role="status" />
      </Modal>
    </Background>
  );
}
