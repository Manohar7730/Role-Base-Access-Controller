import styled from "styled-components";

const Button = styled.button`
  background: #2563eb;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  transition: background 0.2s ease, transform 0.1s ease;

  &:hover {
    background: #1d4ed8;
  }

  &:active {
    transform: scale(0.97);
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid #93c5fd;
    outline-offset: 2px;
  }
`;

export default Button;