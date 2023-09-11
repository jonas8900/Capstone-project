import styled from "styled-components";

export default function CreateAndEditForm({
  onSubmit,
  valueVeranstaltung,
  valueOrt,
}) {
  let minDateToday = new Date();
  minDateToday.setMinutes(
    minDateToday.getMinutes() - minDateToday.getTimezoneOffset()
  );
  //convert the date into german date
  const minDateInRightFormat = minDateToday.toISOString().slice(0, 16);

  return (
    <main>
      <StyledAddEventForm onSubmit={onSubmit}>
        <StyledArticleForFormItems>
          <StyledLabels htmlFor="veranstaltung">
            <p>Veranstaltung:</p>
          </StyledLabels>
          <StyledInputDateField
            type="text"
            id="veranstaltung"
            name="veranstaltung"
            defaultValue={valueVeranstaltung}
            maxLength={50}
            required
          />
        </StyledArticleForFormItems>
        <StyledArticleForFormItems>
          <StyledLabels htmlFor="ort">Veranstaltungsort:</StyledLabels>
          <StyledInputDateField
            type="text"
            id="ort"
            name="ort"
            defaultValue={valueOrt}
            maxLength={60}
            required
          />
        </StyledArticleForFormItems>
        <StyledArticleForFormItems>
          <StyledLabels htmlFor="finalDate">Datum:</StyledLabels>
          <StyledInputDateField
            type="datetime-local"
            id="finalDate"
            name="finalDate"
            min={minDateInRightFormat}
            required
          />
        </StyledArticleForFormItems>
        <StyledArticleForFormItemsButton>
          <StyledFormButton type="submit">Hinzufügen</StyledFormButton>
        </StyledArticleForFormItemsButton>
      </StyledAddEventForm>
    </main>
  );
}

const StyledAddEventForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  margin-top: 2rem;
`;

const StyledLabels = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-details);
  color: var(--grey-topics);
  margin: 1rem 2rem 1rem 2rem;
`;

const StyledInputDateField = styled.input`
  align-self: right;
  justify-content: right;
  border-radius: 10px;
  border: 1px solid #e3e5e8;
  padding: 0.5rem;
  width: 12rem;
  height: 2rem;
  margin-right: 2rem;
`;

const StyledArticleForFormItems = styled.article`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin: 1rem;
`;

const StyledArticleForFormItemsButton = styled.article`
  align-self: center;
  justify-self: center;
  margin: 0px;
  margin-top: 2rem;
`;

const StyledFormButton = styled.button`
  background-color: #7ae249;
  color: black;
  width: 6rem;
  height: 3rem;
  border-radius: 10px;
  border: none;

  background-color: ${({ disabled }) =>
    disabled == true ? "green" : "#7ae249"};

  &:active {
    background-color: green;
  }
`;
