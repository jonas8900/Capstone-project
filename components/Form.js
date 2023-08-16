import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export default function Form({ name, onSubmit, placeholder, type }) {
  return (
    <StyledForm onSubmit={onSubmit}>
      <label htmlFor="inputTextField">
        <StyledInputField
          id="inputTextField"
          type={type}
          name={name}
          placeholder={placeholder}
          required
        ></StyledInputField>
      </label>
      <StyledSubmitButton type="submit">
        <StyledIcon icon={faPlus} />
      </StyledSubmitButton>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  position: sticky;
  left: 0;
  right: 0;
  bottom: 5.5rem;
`;

const StyledInputField = styled.input`
  width: 14rem;
  height: 3rem;
  border-radius: 10px;
  border: none;
  box-shadow: 2px 6px 1px -3px rgba(0, 0, 0, 0.25);
  padding-left: 1rem;
  border: 1px solid rgba(181, 181, 181, 0.25);
  background-color: white;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: white;
  width: 20px;
  height: 20px;
`;

const StyledSubmitButton = styled.button`
  grid-area: 1 / 3 / 2 / 4;
  background-color: #ffc44d;
  width: 2rem;
  height: 2rem;
  border-radius: 4px;
  gap: 4rem;
  border: none;

  &:active {
    background-color: var(--secondary-color);
  }
`;
