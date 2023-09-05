import { styled } from "styled-components";

export default function OrangeButton({
  children,
  type,
  onClick,
  $useSecondaryColor,
}) {
  return (
    <>
      <StyledButton
        type={type}
        onClick={onClick}
        $useSecondaryColor={$useSecondaryColor}
      >
        {children}
      </StyledButton>
    </>
  );
}

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  margin: auto;
  background-color: ${({ $useSecondaryColor }) =>
    $useSecondaryColor ? "var(--secondary-color)" : "var(--third-color)"};

  color: White;
  width: fit-content;
  height: 3rem;
  border-radius: 10px;
  border: none;
  font-size: 15px;
  padding: 1rem;

  &:active {
    background-color: var(--primary-color);
  }
`;
