import { faArrowLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";
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
import { useRouter } from "next/router";
import useSWR from "swr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Addevent({}) {
  const router = useRouter();
  const { mutate, isLoading } = useSWR("api/finalEvents");
  let minDateToday = new Date();
  minDateToday.setMinutes(
    minDateToday.getMinutes() - minDateToday.getTimezoneOffset()
  );
  //convert the date into german date
  const minDateInRightFormat = minDateToday.toISOString().slice(0, 16);

  if (isLoading) {
    return (
      <StyledLoadingError>
        <StyledLoadingErrorIcon icon={faSpinner} spin />
      </StyledLoadingError>
    );
  }

  async function handleSubmitAddEvent(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const addEventData = Object.fromEntries(formData);

    const addEventObject = {
      finalDate: addEventData.finalDate,
      isInVotingProcess: false,
      ort: addEventData.ort,
      parentId: "newCreated",
      products: [],
      veranstaltung: addEventData.veranstaltung,
    };
    const response = await fetch("api/finalEvents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addEventObject),
    });

    if (response.ok) {
      mutate();
    }
    alert("Du hast eine neues Event hinzugefügt!");
    router.push("/veranstaltungen");
    event.target.reset();
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
            required
          />
        </StyledLabels>
        <StyledLabels htmlFor="ort">
          Veranstaltungsort:
          <StyledInputDateField type="text" id="ort" name="ort" required />
        </StyledLabels>
        <StyledLabels htmlFor="finalDate">
          Datum:
          <StyledInputDateField
            type="datetime-local"
            id="finalDate"
            name="finalDate"
            min={minDateInRightFormat}
            required
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

const StyledLoadingErrorIcon = styled(FontAwesomeIcon)`
  width: 4rem;
  height: 4rem;
`;

const StyledLoadingError = styled.h1`
  margin-top: 32vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
