import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  StyledBackButtonLink,
  StyledBackIcon,
  StyledForm,
  StyledFormButton,
  StyledInputDateField,
  StyledLabels,
} from "./[activityPlan]";
import { StyledHeadlineForSubpages } from "@/components/Activitylist";
import { styled } from "styled-components";
import { uid } from "uid";
import { useRouter } from "next/router";

export default function Addevent({ dates, setDates }) {
  const router = useRouter();
  let minDateToday = new Date();
  minDateToday.setMinutes(
    minDateToday.getMinutes() - minDateToday.getTimezoneOffset()
  );
  //convert the date into german date
  const minDateInRightFormat = minDateToday.toISOString().slice(0, 16);
  function handleSubmitAddEvent(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const addEventData = Object.fromEntries(formData);

    const addEventObject = {
      objectWithTheSameID: {
        date1: "",
        date2: "",
        date3: "",
        date4: "",
        id: uid(),
        ort: addEventData.ort,
        veranstaltung: addEventData.veranstaltung,
        vote: true,
      },
      finalDate: addEventData.finalDate,
      finalDateID: uid(),
    };
    setDates([...dates, addEventObject]);
    alert("Du hast eine neues Event hinzugefügt!");
    router.push("/veranstaltungen");
  }

  return (
    <main>
      <StyledBackButtonLink href={"/veranstaltungen"}>
        <StyledBackIcon icon={faArrowLeft} />
      </StyledBackButtonLink>
      <h2>Veranstaltung hinzufügen:</h2>
      <StyledAddEventForm onSubmit={handleSubmitAddEvent}>
        <StyledLabels htmlFor="veranstaltung">
          <p>Veranstaltung:</p>
          <StyledInputDateField
            type="text"
            id="veranstaltung"
            name="veranstaltung"
          />
        </StyledLabels>
        <StyledLabels htmlFor="ort">
          Veranstaltungsort:
          <StyledInputDateField type="text" id="ort" name="ort" />
        </StyledLabels>
        <StyledLabels htmlFor="finalDate">
          Datum:
          <StyledInputDateField
            type="datetime-local"
            id="finalDate"
            name="finalDate"
            min={minDateInRightFormat}
          />
        </StyledLabels>
        <StyledFormButton type="submit">Hinzufügen</StyledFormButton>
      </StyledAddEventForm>
    </main>
  );
}

const StyledAddEventForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 2rem 0 0 2rem;
`;
