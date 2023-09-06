import moment from "moment";
import "moment/locale/de";
import { styled } from "styled-components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Votecard({}) {
  const { data: session } = useSession();
  const userID = session && session.user.email;
  const [votes, setVotes] = useState([]);
  const [matchedID, setMatchedID] = useState({});
  const router = useRouter();
  const sessionTrue = session && true;

  function getActivitySuggestions() {
    if (session) {
      fetch("api/getallvotingstovote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(session.user),
      }).then((promisedActivityData) => {
        promisedActivityData.json().then((finalVoteData) => {
          setVotes(finalVoteData);
        });
      });
    }
  }
  useEffect(() => {
    getActivitySuggestions();
  }, [sessionTrue]);

  const objectWithTheSameID = votes.find(
    (voting) => voting._id === matchedID._id
  );

  function handleFindId(id) {
    setMatchedID(votes.find((voting) => voting._id === id));
  }

  async function handleSubmitCheckboxes(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const checkBoxData = Object.fromEntries(formData);
    //submit dates to the object with the boolean true or false
    const updateSingleDate = {
      ...objectWithTheSameID,
      ...(checkBoxData.date1 == "on" && {
        date1IsTrue: [...objectWithTheSameID.date1IsTrue, { userID: userID }],
      }),
      ...(checkBoxData.date2 == "on" && {
        date2IsTrue: [...objectWithTheSameID.date2IsTrue, { userID: userID }],
      }),
      ...(checkBoxData.date3 == "on" && {
        date3IsTrue: [...objectWithTheSameID.date3IsTrue, { userID: userID }],
      }),
      ...(checkBoxData.date4 == "on" && {
        date4IsTrue: [...objectWithTheSameID.date4IsTrue, { userID: userID }],
      }),
      ...(checkBoxData.noDate == "on" && {
        noDateMatches: [
          ...objectWithTheSameID.noDateMatches,
          { userID: userID },
        ],
      }),
      isInVotingProcess: true,
      votedUser: [...objectWithTheSameID.votedUser, { userID: userID }],
    };

    const checkIfMultipleCheckboxClickedDate1 =
      updateSingleDate.date1IsTrue.filter((user) => userID === user.userID);
    const checkIfMultipleCheckboxClickedDate2 =
      updateSingleDate.date2IsTrue.filter((user) => userID === user.userID);
    const checkIfMultipleCheckboxClickedDate3 =
      updateSingleDate.date3IsTrue.filter((user) => userID === user.userID);
    const checkIfMultipleCheckboxClickedDate4 =
      updateSingleDate.date4IsTrue.filter((user) => userID === user.userID);
    const checkIfMultipleCheckboxClickedNoMatch =
      updateSingleDate.noDateMatches.filter((user) => userID === user.userID);

    if (
      checkIfMultipleCheckboxClickedDate1.length > 0 ||
      checkIfMultipleCheckboxClickedDate2.length > 0 ||
      checkIfMultipleCheckboxClickedDate3.length > 0 ||
      checkIfMultipleCheckboxClickedDate4.length > 0 ||
      checkIfMultipleCheckboxClickedNoMatch.length > 0
    ) {
      if (
        (checkIfMultipleCheckboxClickedNoMatch.length > 0 &&
          checkIfMultipleCheckboxClickedDate1.length > 0) ||
        (checkIfMultipleCheckboxClickedNoMatch.length > 0 &&
          checkIfMultipleCheckboxClickedDate2.length > 0) ||
        (checkIfMultipleCheckboxClickedNoMatch.length > 0 &&
          checkIfMultipleCheckboxClickedDate3.length > 0) ||
        (checkIfMultipleCheckboxClickedNoMatch.length > 0 &&
          checkIfMultipleCheckboxClickedDate4.length > 0)
      ) {
        alert(
          "Du kannst entweder ein Datum oder keins passt auswählen nicht beides"
        );
      } else {
        await fetch("api/createorupdatevotings", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ updateSingleDate }),
        });
        getActivitySuggestions();
      }
    } else {
      alert("Du musst etwas auswählen!");
    }
  }

  //find the ID which matches with the card i clicked on and set it to the matchedID state

  async function handleSubmitFinalDate(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const selectData = Object.fromEntries(formData);

    const areYouSureToDelete = window.confirm(
      "Überprüfe die Eingabe bevor du ein Finales Datum setzt!"
    );
    if (areYouSureToDelete) {
      const finalEventObject = {
        userSessionData: session.user,
        finalDate: selectData.dateSelect,
        name: objectWithTheSameID.name,
        ort: objectWithTheSameID.ort,
        isInVotingProcess: false,
        activitySuggestionId: objectWithTheSameID.activitySuggestionId,
      };

      await fetch("api/createfinaleventanddeletevoting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalEventObject),
      });
      await fetch(`/api/createfinaleventanddeletevoting/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objectWithTheSameID),
      });
      router.push("/eventcollection");
    }
  }
  return (
    <>
      {votes &&
        votes.map((date) => (
          <StyledVoteCardWrapper key={date._id || date.finalDateID}>
            {date.votedUser.find((user) => user.userID === userID) ? (
              <StyledSectionForLastDate>
                <StyledVoteCardHeadline>
                  Veranstaltungsabstimmung
                </StyledVoteCardHeadline>
                <StyledVoteLastDateCardWrapper>
                  <StyledVoteCardArticle>
                    <StyledVoteCardHeadline3>Aktivität</StyledVoteCardHeadline3>
                    <StyledSubParagraph>{date.name}</StyledSubParagraph>
                  </StyledVoteCardArticle>
                  <StyledVoteCardUl>
                    <StyledParagraphInList>
                      Bisherige Auswertung:
                    </StyledParagraphInList>

                    <StyledVoteCardLi>
                      {moment(date.date1).format("lll")} Uhr
                      <p>Personen: {date.date1IsTrue.length}</p>
                    </StyledVoteCardLi>

                    <StyledVoteCardLi>
                      {moment(date.date2).format("lll")} Uhr
                      <p>Personen: {date.date2IsTrue.length}</p>
                    </StyledVoteCardLi>

                    {date.date3 !== null && (
                      <StyledVoteCardLi>
                        {moment(date.date3).format("lll")} Uhr
                        <p>Personen: {date.date3IsTrue.length}</p>
                      </StyledVoteCardLi>
                    )}
                    {date.date4 !== null && (
                      <StyledVoteCardLi>
                        {moment(date.date4).format("lll")} Uhr
                        <p>Personen: {date.date4IsTrue.length}</p>
                      </StyledVoteCardLi>
                    )}
                    <StyledVoteCardLi>
                      keins passt {date.noDateMatches.length}
                    </StyledVoteCardLi>
                  </StyledVoteCardUl>
                  <StyledVoteCardFormFinalDatePick
                    onSubmit={handleSubmitFinalDate}
                  >
                    <StyledFinalDateLabel htmlFor="dateSelect">
                      Wähle das finale Datum:
                    </StyledFinalDateLabel>
                    <select id="dateSelect" name="dateSelect">
                      <option value={date.date1}>
                        {moment(date.date1).format("lll")} Uhr
                      </option>

                      <option value={date.date2}>
                        {moment(date.date2).format("lll")} Uhr
                      </option>

                      {date.date3 !== null && (
                        <option value={date.date3}>
                          {moment(date.date3).format("lll")} Uhr
                        </option>
                      )}
                      {date.date4 !== null && (
                        <option value={date.date4}>
                          {moment(date.date4).format("lll")} Uhr
                        </option>
                      )}
                    </select>
                    <StyledVoteCardButtonClose
                      type="submit"
                      onClick={() => handleFindId(date._id)}
                    >
                      Abstimmung abschließen
                    </StyledVoteCardButtonClose>
                  </StyledVoteCardFormFinalDatePick>
                </StyledVoteLastDateCardWrapper>
              </StyledSectionForLastDate>
            ) : (
              //when you don't voted at all, the voting statistic will disappear
              <section>
                <StyledVoteCardHeadline>
                  Veranstaltungsabstimmung
                </StyledVoteCardHeadline>
                <StyledVoteCardForm onSubmit={handleSubmitCheckboxes} required>
                  <StyledVoteCardArticle>
                    <StyledVoteCardHeadline3>Aktivität</StyledVoteCardHeadline3>
                    <p>{date.name}</p>
                  </StyledVoteCardArticle>
                  <StyledNoDateMatch htmlFor="noDate">
                    Keins passt
                    <input type="checkbox" name="noDate" id="noDate" />
                  </StyledNoDateMatch>
                  {date.date1 !== null && (
                    <article>
                      <StyledDateHeadline>Datum 1</StyledDateHeadline>
                      <StyledDateOneLabel htmlFor="date1">
                        {moment(date.date1).format("lll")}
                        <input type="checkbox" id="date1" name="date1" />
                      </StyledDateOneLabel>
                    </article>
                  )}
                  {date.date2 !== null && (
                    <article>
                      <StyledDateHeadline>Datum 2</StyledDateHeadline>
                      <StyledDateTwoLabel htmlFor="date2">
                        {moment(date.date2).format("lll")}
                        <input type="checkbox" id="date2" name="date2" />
                      </StyledDateTwoLabel>
                    </article>
                  )}
                  {date.date3 !== null && (
                    <article>
                      <StyledDateHeadline>Datum 3</StyledDateHeadline>
                      <StyledDateThreeLabel htmlFor="date3">
                        {moment(date.date3).format("lll")}
                        <input type="checkbox" id="date3" name="date3" />
                      </StyledDateThreeLabel>
                    </article>
                  )}
                  {date.date4 !== null && (
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
                    onClick={() => handleFindId(date._id)}
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
  border-bottom: 1px solid black;
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
