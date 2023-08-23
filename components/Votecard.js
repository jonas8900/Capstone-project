import moment from "moment";
import { styled } from "styled-components";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
import "moment/locale/de";
import { useRouter } from "next/router";

export default function Votecard({ dates, setDates }) {
  const router = useRouter();
  const [matchedID, setMatchedID] = useLocalStorageState("matchedID", {
    defaultValue: { value: "value" },
  });

  const objectWithTheSameID = dates.find((date) => date.id === matchedID.id);
  const findDateWithoutMatchedID = dates.filter(
    (date) => date.id !== matchedID.id
  );

  function handleSubmitCheckboxes(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const checkBoxData = Object.fromEntries(formData);
    //submit dates to the object with the boolean true or false
    const updateSingleDate = {
      ...objectWithTheSameID,
      ...(checkBoxData.date1 == "on" && { date1IsTrue: true }),
      ...(checkBoxData.date2 == "on" && { date2IsTrue: true }),
      ...(checkBoxData.date3 == "on" && { date3IsTrue: true }),
      ...(checkBoxData.date4 == "on" && { date4IsTrue: true }),
      ...(checkBoxData.noDate == "on" && { noDateMatches: true }),
      vote: true,
    };
    const lengthOfDummyDates = Object.keys(updateSingleDate).length;
    if (lengthOfDummyDates > 8) {
      if (
        updateSingleDate.hasOwnProperty("noDateMatches") &&
        lengthOfDummyDates > 9
      ) {
        alert(
          "Du kannst entweder ein Datum oder keins passt auswählen nicht beides"
        );
      } else {
        setDates([...findDateWithoutMatchedID, updateSingleDate]);
      }
    } else {
      alert("Du musst etwas auswählen!");
    }
  }

  //find the ID which matches with the card i clicked on and set it to the matchedID state
  function handleFindId(id) {
    setMatchedID(dates.find((date) => date.id === id));
  }

  function handleSubmitFinalDate(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const selectData = Object.fromEntries(formData);

    const areYouSureToDelete = window.confirm(
      "Überprüfe die Eingabe bevor du ein Finales Datum setzt!"
    );
    if (areYouSureToDelete) {
      setDates([
        ...findDateWithoutMatchedID,
        {
          objectWithTheSameID,
          finalDate: selectData.dateSelect,
          finalDateID: uid(),
        },
      ]);
      router.push("/veranstaltungen");
    }
  }

  return (
    <>
      {dates.map((date) => (
        <StyledVoteCardWrapper
          key={date.id === undefined ? date.id : date.finalDateID}
        >
          {date.vote && (
            <StyledSectionForLastDate>
              <StyledVoteCardHeadline>
                Veranstaltungsabstimmung
              </StyledVoteCardHeadline>
              <StyledVoteLastDateCardWrapper>
                <StyledVoteCardArticle>
                  <StyledVoteCardHeadline3>Aktivität</StyledVoteCardHeadline3>
                  <StyledSubParagraph>{date.veranstaltung}</StyledSubParagraph>
                </StyledVoteCardArticle>
                <StyledVoteCardUl>
                  <StyledParagraphInList>
                    Bisherige Auswertung:
                  </StyledParagraphInList>
                  {date.date1 !== "" && (
                    <StyledVoteCardLi>
                      {moment(date.date1).format("lll")} Uhr <p>1</p>
                    </StyledVoteCardLi>
                  )}
                  {date.date2 !== "" && (
                    <StyledVoteCardLi>
                      {moment(date.date2).format("lll")} Uhr <p>1</p>
                    </StyledVoteCardLi>
                  )}
                  {date.date3 !== "" && (
                    <StyledVoteCardLi>
                      {moment(date.date3).format("lll")} Uhr <p>0</p>
                    </StyledVoteCardLi>
                  )}
                  {date.date4 !== "" && (
                    <StyledVoteCardLi>
                      {moment(date.date4).format("lll")} Uhr <p>0</p>
                    </StyledVoteCardLi>
                  )}
                  <StyledVoteCardLi>keins passt</StyledVoteCardLi>
                </StyledVoteCardUl>

                <StyledVoteCardNoVoteSection>
                  <StyledVoteCardHeadline3>
                    Keine Abstimmung von:
                  </StyledVoteCardHeadline3>
                  <StyledSubParagraph>3</StyledSubParagraph>
                </StyledVoteCardNoVoteSection>
                <StyledVoteCardFormFinalDatePick
                  onSubmit={handleSubmitFinalDate}
                >
                  <StyledFinalDateLabel htmlFor="dateSelect">
                    Wähle das finale Datum:
                  </StyledFinalDateLabel>
                  <select id="dateSelect" name="dateSelect">
                    {date.date1 !== "" && (
                      <option value={date.date1}>
                        {moment(date.date1).format("lll")} Uhr
                      </option>
                    )}
                    {date.date2 !== "" && (
                      <option value={date.date2}>
                        {moment(date.date2).format("lll")} Uhr
                      </option>
                    )}
                    {date.date3 !== "" && (
                      <option value={date.date3}>
                        {moment(date.date3).format("lll")} Uhr
                      </option>
                    )}
                    {date.date4 !== "" && (
                      <option value={date.date4}>
                        {moment(date.date4).format("lll")} Uhr
                      </option>
                    )}
                  </select>
                  <StyledVoteCardButtonClose type="submit">
                    Abstimmung abschließen
                  </StyledVoteCardButtonClose>
                </StyledVoteCardFormFinalDatePick>
              </StyledVoteLastDateCardWrapper>
            </StyledSectionForLastDate>
          )}
          {date.vote === false && (
            <section>
              <StyledVoteCardHeadline>
                Veranstaltungsabstimmung
              </StyledVoteCardHeadline>
              <StyledVoteCardForm onSubmit={handleSubmitCheckboxes} required>
                <StyledVoteCardArticle>
                  <StyledVoteCardHeadline3>Aktivität</StyledVoteCardHeadline3>
                  <p>{date.veranstaltung}</p>
                </StyledVoteCardArticle>
                <StyledNoDateMatch htmlFor="noDate">
                  Keins passt
                  <input type="checkbox" name="noDate" id="noDate" />
                </StyledNoDateMatch>
                {date.date1 !== "" && (
                  <article>
                    <StyledDateHeadline>Datum 1</StyledDateHeadline>
                    <StyledDateOneLabel htmlFor="date1">
                      {moment(date.date1).format("lll")}
                      <input type="checkbox" id="date1" name="date1" />
                    </StyledDateOneLabel>
                  </article>
                )}
                {date.date2 !== "" && (
                  <article>
                    <StyledDateHeadline>Datum 2</StyledDateHeadline>
                    <StyledDateTwoLabel htmlFor="date2">
                      {moment(date.date2).format("lll")}
                      <input type="checkbox" id="date2" name="date2" />
                    </StyledDateTwoLabel>
                  </article>
                )}
                {date.date3 !== "" && (
                  <article>
                    <StyledDateHeadline>Datum 3</StyledDateHeadline>
                    <StyledDateThreeLabel htmlFor="date3">
                      {moment(date.date3).format("lll")}
                      <input type="checkbox" id="date3" name="date3" />
                    </StyledDateThreeLabel>
                  </article>
                )}
                {date.date4 !== "" && (
                  <article>
                    <StyledDateHeadline>Datum 4</StyledDateHeadline>
                    <StyledDateFourLabel htmlFor="date4">
                      {moment(date.date4).format("lll")}
                      <input
                        type="checkbox"
                        id="date4"
                        name="date4"
                        value={date.date4}
                      />
                    </StyledDateFourLabel>
                  </article>
                )}
                <StyledVoteCardButton
                  type="submit"
                  onClick={() => handleFindId(date.id)}
                >
                  Bestätigen
                </StyledVoteCardButton>
              </StyledVoteCardForm>
            </section>
          )}
        </StyledVoteCardWrapper>
      ))}
    </>
  );
}

const StyledVoteCardWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin: 2rem;
  margin-top: 0px;
  border-radius: 9px;
  box-shadow: 6px 9px 17px -3px rgba(0, 0, 0, 0.25);
`;

const StyledSectionForLastDate = styled.section`
  display: flex;
  flex-direction: column;
  margin: 0px;
`;

const StyledVoteCardHeadline = styled.h2`
  margin: 2rem auto;
  margin-left: 2.5rem;
  font-size: var(--font-size-headline);
  color: var(--secondary-color);
`;

const StyledVoteCardHeadline3 = styled.h3`
  font-size: var(--font-size-details);
  color: var(--grey-topics);
  margin-bottom: 0px;
  grid-area: 1 / 1 / 2 / 2;
`;

const StyledVoteCardArticle = styled.article`
  display: flex;
  flex-direction: column;
  grid-area: 1 / 1 / 2 / 2;
`;

const StyledDateHeadline = styled.p`
  font-size: var(--font-size-details);
  color: var(--grey-topics);
`;

const StyledVoteCardForm = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  margin-left: 2.5rem;
  grid-area: 3 / 1 / 4 / 2;
`;

const StyledVoteLastDateCardWrapper = styled.section`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: 0.4fr 1fr 0.4fr 0.5fr;
  grid-column-gap: 0px;
  margin-left: 2.5rem;
  grid-area: 3 / 1 / 4 / 2;
`;

const StyledNoDateMatch = styled.label`
  grid-area: 1 / 2 / 2 / 3;
  justify-self: flex-start;
  align-self: center;
`;

const StyledDateOneLabel = styled.label`
  grid-area: 2 / 1 / 3 / 2;
`;
const StyledDateTwoLabel = styled.label`
  grid-area: 2 / 2 / 3 / 3;
`;
const StyledDateThreeLabel = styled.label`
  grid-area: 3 / 1 / 4 / 2;
`;
const StyledDateFourLabel = styled.label`
  grid-area: 3 / 2 / 4 / 3;
`;

const StyledVoteCardButton = styled.button`
  grid-area: 4 / 1 / 5 / 3;
  margin-right: 2.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: #7ae249;
  color: black;
  border-radius: 10px;
  border: none;

  &:active {
    background-color: green;
  }
`;

const StyledVoteCardButtonClose = styled.button`
  background-color: #7ae249;
  color: black;
  border-radius: 10px;
  margin-top: 1rem;
  padding: 1rem;
  border: none;

  &:active {
    background-color: green;
  }
`;

const StyledVoteCardUl = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-right: 2.5rem;
  grid-area: 2 / 1 / 3 / 2;
`;

const StyledVoteCardLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: var(--font-size-details);
  padding: 0.5rem;
  border-radius: 10px;
  box-shadow: 6px 9px 17px -3px rgba(0, 0, 0, 0.25);
`;

const StyledVoteCardNoVoteSection = styled.section`
  margin: 0px;
  padding: 0px;
  grid-area: 3 / 1 / 4 / 2;
`;

const StyledVoteCardFormFinalDatePick = styled.form`
  grid-area: 4 / 1 / 5 / 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 2.5rem;
  padding: 0.5rem;
`;

const StyledParagraphInList = styled.p`
  font-size: var(--font-size-details);
  color: var(--grey-topics);
  align-self: center;
`;

const StyledFinalDateLabel = styled.label`
  font-size: var(--font-size-details);
  color: var(--grey-topics);
`;

const StyledSubParagraph = styled.p`
  font-size: var(--font-size-details);
`;
