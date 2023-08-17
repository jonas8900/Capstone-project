import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { styled } from "styled-components";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";

export default function ActivityPlan({ activityCards }) {
  const [dates, setDates] = useLocalStorageState("dates", { defaultValue: [] });
  const router = useRouter();
  const currentId = router.query.activityPlan;
  const currentActivities = activityCards.filter(
    (activityCard) => activityCard.id === currentId
  );

  const currentActivitieObject = activityCards.find(
    (activityCard) => activityCard.id === currentId
  );

  function handleSubmitDates(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const dataObject = {
      id: uid(),
      veranstaltung: currentActivitieObject.name,
      date1: data.date1,
      date2: data.date2,
      date3: data.date3,
      date4: data.date4,
    };
    setDates([...dates, dataObject]);
  }
  console.log(currentActivitieObject);
  console.log(dates);

  return (
    <main>
      <StyledHeadlineSection>
        <StyledHeadlineWithoutBorder>Friends</StyledHeadlineWithoutBorder>
        <StyledBackButtonLink href={"/activities"}>
          <StyledBackIcon icon={faArrowLeft} />
        </StyledBackButtonLink>
      </StyledHeadlineSection>
      <section>
        {currentActivities.map((currentActivity) => (
          <section key={currentId}>
            <StyledSecondHeadline>Welches Datum passt?</StyledSecondHeadline>
            <StyledThirdHeadling>
              Plane die nächste Veranstaltung:
            </StyledThirdHeadling>
            <StyledFormArticle>
              <StyledHeadFormParagraph>
                Veranstaltung: <b>{currentActivity.name}</b>
              </StyledHeadFormParagraph>

              <StyledForm onSubmit={handleSubmitDates}>
                <StyledLabels htmlFor="date1">
                  Datum 1
                  <StyledInputDateField type="date" id="date1" name="date1" />
                </StyledLabels>
                <StyledLabels htmlFor="date2">
                  Datum 2
                  <StyledInputDateField type="date" id="date2" name="date2" />
                </StyledLabels>
                <StyledLabels htmlFor="date3">
                  Datum 3
                  <StyledInputDateField type="date" id="date3" name="date3" />
                </StyledLabels>
                <StyledLabels htmlFor="date4">
                  Datum 4
                  <StyledInputDateField type="date" id="date4" name="date4" />
                </StyledLabels>
                <StyledFormButton type="submit">Bestätigen</StyledFormButton>
              </StyledForm>
            </StyledFormArticle>
          </section>
        ))}
      </section>
    </main>
  );
}

const StyledSecondHeadline = styled.h2`
  font-size: 1rem;
  margin: 2rem;
`;

const StyledThirdHeadling = styled.h3`
  font-size: 15px;
  margin: 2rem;
  font-weight: normal;
`;

const StyledHeadlineSection = styled.section`
  display: grid;
  grid-template-columns: 0.3fr 1fr 0.3fr;
  grid-template-rows: 0.5fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  align-items: center;
  text-align: center;
  border-bottom: 2px solid black;
`;

const StyledHeadlineWithoutBorder = styled.h1`
  text-align: center;
  grid-area: 1 / 2 / 2 / 3;
`;

const StyledBackButtonLink = styled(Link)`
  grid-area: 1 / 1 / 2 / 2;
  display: flex;
  align-items: center;
  justify-content: center;

  color: black;

  &:active {
    background-color: var(--secondary-color);
  }
`;

const StyledFormArticle = styled.article`
  margin: 2rem 2rem 2rem 2rem;
  padding: 0;
  border: 1px solid rgba(181, 181, 181, 0.2);
  border-radius: 9px;
  box-shadow: 6px 9px 17px -3px rgba(0, 0, 0, 0.25);
`;

const StyledHeadFormParagraph = styled.p`
  margin: 1rem auto 3rem 1.5rem;
  font-size: var(--font-size-details);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 1rem auto 3rem auto;
`;

const StyledInputDateField = styled.input`
  margin-left: 4rem;
  border-radius: 10px;
  border: 1px solid #e3e5e8;
  padding: 0.5rem;
`;

const StyledLabels = styled.label`
  font-size: var(--font-size-details);
  color: var(--grey-topics);
  margin: 1rem auto 1rem 1.5rem;
`;

const StyledFormButton = styled.button`
  background-color: #7ae249;
  margin: 2rem auto auto auto;
  color: black;
  width: 6rem;
  height: 3rem;
  border-radius: 10px;
  border: none;

  &:active {
    background-color: green;
  }
`;

const StyledBackIcon = styled(FontAwesomeIcon)`
  width: 30px;
  height: 30px;
`;
