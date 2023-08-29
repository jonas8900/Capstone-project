import { faArrowLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { styled } from "styled-components";
import useSWR from "swr";

export default function ActivityPlan({}) {
  const {
    data: votedActivitys,
    isLoading,
    mutate,
  } = useSWR("api/voteForActivityDate");

  const { data: activitiesBeforeVoting } = useSWR("api/activitySuggestion");

  const router = useRouter();
  if (isLoading) {
    return (
      <h1>
        <FontAwesomeIcon icon={faSpinner} spin />
      </h1>
    );
  }

  const currentId = router.query.activityPlan;

  const currentActivity = activitiesBeforeVoting.filter(
    (activityCard) => activityCard._id === currentId
  );
  const currentActivitieObject = activitiesBeforeVoting.find(
    (activityCard) => activityCard._id === currentId
  );

  let minDateToday = new Date();
  minDateToday.setMinutes(
    minDateToday.getMinutes() - minDateToday.getTimezoneOffset()
  );
  //convert the date into german date
  const minDateInRightFormat = minDateToday.toISOString().slice(0, 16);

  // to check if we already had a submitevent with generate an object
  const currentActivityObjectConvertToArray = votedActivitys.filter(
    (date) => date.parentId === currentActivitieObject._id
  );

  const currentActivityObjectUpdated = currentActivityObjectConvertToArray.find(
    (date) => date
  );

  const dateformat = currentActivityObjectUpdated.date1.slice(0, -8);
  console.log(currentActivity);

  async function handleSubmitDates(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    let count = 0;
    const allDates = [];
    const dateObject = {
      parentId: currentActivitieObject._id,
      veranstaltung: currentActivitieObject.name,
      isInVotingProcess: false,
      ort: data.ort,
      date1: data.date1,
      date2: data.date2,
      date3: data.date3,
      date4: data.date4,
    };

    //to check if we have the same date twice by clicking submit, i put the dates in a array, sort the array, and loop over it to check if there's a same date
    for (let key in dateObject) {
      ++count;
      if (key.includes("date")) {
        allDates.push(dateObject[key]);
      }
    }
    // if we have choosen the same date twice if true, we get an alert
    const sortedArray = [...allDates].sort();
    for (let i = 0; i < sortedArray.length; i++) {
      if (sortedArray[i + 1] === sortedArray[i] && sortedArray[i] !== "") {
        return alert("Sie können nicht zwei gleiche Daten angeben");
      }
    }
    const response = await fetch("api/voteForActivityDate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dateObject),
    });
    if (response.ok) {
      mutate();
    }
    alert("Glückwunsch ! Sie haben eine Abstimmung gestartet.");
    router.push("/");
  }

  // when we already have an submitevent with an object, the button and the dates get disabled
  return (
    <main>
      <StyledBackButtonLink href={"/activities"}>
        <StyledBackIcon icon={faArrowLeft} />
      </StyledBackButtonLink>
      <section>
        {currentActivity.map((currentActivity) => (
          <section key={currentId}>
            <h2>Welches Datum passt?</h2>
            <StyledThirdHeadling>
              Plane die nächste Veranstaltung:
            </StyledThirdHeadling>
            <StyledFormArticle>
              <StyledHeadFormParagraph>
                Veranstaltung: <b>{currentActivity.name}</b>
              </StyledHeadFormParagraph>

              <StyledForm onSubmit={handleSubmitDates}>
                <StyledLabels htmlFor="date1">
                  Ort:
                  <StyledInputDateField
                    type="text"
                    id="ort"
                    name="ort"
                    disabled={
                      currentActivityObjectConvertToArray.length > 0
                        ? true
                        : false
                    }
                    defaultValue={
                      currentActivityObjectConvertToArray.length > 0
                        ? currentActivityObjectUpdated.ort
                        : ""
                    }
                    required
                  />
                </StyledLabels>
                <StyledLabels htmlFor="date1">
                  Datum 1
                  <StyledInputDateField
                    type="datetime-local"
                    id="date1"
                    name="date1"
                    min={minDateInRightFormat}
                    disabled={
                      currentActivityObjectConvertToArray.length > 0
                        ? true
                        : false
                    }
                    defaultValue={
                      currentActivityObjectConvertToArray.length > 0
                        ? currentActivityObjectUpdated.date1.slice(0, -8)
                        : ""
                    }
                    required
                  />
                </StyledLabels>
                <StyledLabels htmlFor="date2">
                  Datum 2
                  <StyledInputDateField
                    type="datetime-local"
                    id="date2"
                    name="date2"
                    min={minDateInRightFormat}
                    disabled={
                      currentActivityObjectConvertToArray.length > 0
                        ? true
                        : false
                    }
                    defaultValue={
                      currentActivityObjectConvertToArray.length > 0
                        ? currentActivityObjectUpdated.date2.slice(0, -8)
                        : ""
                    }
                    required
                  />
                </StyledLabels>
                <StyledLabels htmlFor="date3">
                  Datum 3
                  <StyledInputDateField
                    type="datetime-local"
                    id="date3"
                    name="date3"
                    min={minDateInRightFormat}
                    disabled={
                      currentActivityObjectConvertToArray.length > 0
                        ? true
                        : false
                    }
                    defaultValue={
                      currentActivityObjectConvertToArray.length > 0 &&
                      currentActivityObjectConvertToArray.hasOwnProperty(
                        "date3"
                      )
                        ? currentActivityObjectUpdated.date3.slice(0, -8)
                        : ""
                    }
                  />
                </StyledLabels>
                <StyledLabels htmlFor="date4">
                  Datum 4
                  <StyledInputDateField
                    type="datetime-local"
                    id="date4"
                    name="date4"
                    min={minDateInRightFormat}
                    disabled={
                      currentActivityObjectConvertToArray.length > 0
                        ? true
                        : false
                    }
                    defaultValue={
                      currentActivityObjectConvertToArray.length > 0 &&
                      currentActivityObjectConvertToArray.hasOwnProperty(
                        "date4"
                      )
                        ? currentActivityObjectUpdated.date4.slice(0, -8)
                        : ""
                    }
                  />
                </StyledLabels>
                <StyledFormButton
                  disabled={
                    currentActivityObjectConvertToArray.length > 0
                      ? true
                      : false
                  }
                  type="submit"
                >
                  Bestätigen
                </StyledFormButton>
              </StyledForm>
            </StyledFormArticle>
          </section>
        ))}
      </section>
    </main>
  );
}

const StyledThirdHeadling = styled.h3`
  font-size: 15px;
  margin: 2rem;
  font-weight: normal;
`;

export const StyledBackButtonLink = styled(Link)`
  justify-content: left;
  color: black;
  width: 2rem;
  height: 2rem;

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

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 1rem auto 3rem auto;
`;

export const StyledInputDateField = styled.input`
  margin-left: 5rem;
  border-radius: 10px;
  border: 1px solid #e3e5e8;
  padding: 0.5rem;
  margin-left: 0.5rem;
`;

export const StyledLabels = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-details);
  color: var(--grey-topics);
  margin: 1rem 0 1rem 1.5rem;
`;

export const StyledFormButton = styled.button`
  background-color: #7ae249;
  margin: 2rem auto auto auto;
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

export const StyledBackIcon = styled(FontAwesomeIcon)`
  width: 2rem;
  height: 2rem;
`;
