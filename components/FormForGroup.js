import { keyframes, styled } from "styled-components";
import SecondaryColoredButton from "./OrangeButton";

export default function FormForGroup({
  useSecondaryColor,
  children,
  onSubmit,
}) {
  return (
    <StyledForm onSubmit={onSubmit}>
      <label htmlFor="groupname">{children}</label>
      <StyledInputField
        id="groupname"
        name="groupname"
        type="text"
      ></StyledInputField>
      <SecondaryColoredButton
        type={"submit"}
        useSecondaryColor={useSecondaryColor}
      >
        Bestätigen
      </SecondaryColoredButton>
    </StyledForm>
  );
}

const FadeInAnimation = keyframes`
0% {opacity: 0}
100% {opacity: 1}
`;

const StyledForm = styled.form`
  display: grid;
  gap: 2rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  animation-name: ${FadeInAnimation};
  animation-duration: 1s;
`;
const StyledInputField = styled.input`
  width: 14rem;
  height: 3rem;
  margin: auto;
  border-radius: 10px;
  border: none;
  box-shadow: 2px 6px 1px -3px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(181, 181, 181, 0.25);
  background-color: white;
`;
