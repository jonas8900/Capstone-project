import { faArrowLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { StyledBackIcon } from "./[activityPlan]";
import { StyledHeadlineForSubpages } from "@/components/Activitylist";
import { styled } from "styled-components";
import { useRouter } from "next/router";
import useSWR from "swr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

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
      <StyledSectionForHeadlineAndBackButton>
        <StyledBackButtonLink href={"/veranstaltungen"}>
          <StyledBackIcon icon={faArrowLeft} />
        </StyledBackButtonLink>
        <StyledHeadlineForEvents>
          Veranstaltung hinzufügen:
        </StyledHeadlineForEvents>
      </StyledSectionForHeadlineAndBackButton>
      <StyledAddEventForm onSubmit={handleSubmitAddEvent}>
        <StyledArticleForFormItems>
          <StyledLabels htmlFor="veranstaltung">
            <p>Veranstaltung:</p>
          </StyledLabels>
          <StyledInputDateField
            type="text"
            id="veranstaltung"
            name="veranstaltung"
            required
          />
        </StyledArticleForFormItems>
        <StyledArticleForFormItems>
          <StyledLabels htmlFor="ort">Veranstaltungsort:</StyledLabels>
          <StyledInputDateField type="text" id="ort" name="ort" required />
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

const StyledBackButtonLink = styled(Link)`
  color: black;
  width: 100%;
  height: 2rem;
  margin-top: 0;
  grid-area: 1 / 1 / 2 / 2;

  &:active {
    background-color: var(--secondary-color);
  }
`;

const StyledSectionForHeadlineAndBackButton = styled.section`
  display: grid;
  grid-template-columns: 0.25fr 1fr 0.25fr;
  grid-template-rows: 0.5fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;

const StyledHeadlineForEvents = styled.h2`
  font-size: var(--font-size-headline);
  margin-left: 40px;
  grid-area: 1 / 2 / 2 / 3;
  align-content: center;
`;
