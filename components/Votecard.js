import { styled } from "styled-components";

export default function Votecard({ dates, setDates }) {
  console.log(dates);
  return (
    <>
      {dates.map((date) => (
        <StyledVoteCardSection key={date.id}>
          <StyledVoteCardHeadline>
            Veranstaltungsabstimmung
          </StyledVoteCardHeadline>
          <StyledVoteCardForm>
            <StyledVoteCardArticle>
              <StyledVoteCardHeadline3>Aktivität</StyledVoteCardHeadline3>
              <p>{date.veranstaltung}</p>
            </StyledVoteCardArticle>
            <StyledNoDateMatch>
              Keins passt <input type="checkbox" />
            </StyledNoDateMatch>
            {date.date1 !== "" && (
              <article>
                <StyledDateHeadline>Datum 1</StyledDateHeadline>
                <StyledDateOneLabel>
                  {date.date1}
                  <input type="checkbox" />
                </StyledDateOneLabel>
              </article>
            )}
            {date.date2 !== "" && (
              <article>
                <StyledDateHeadline>Datum 2</StyledDateHeadline>
                <StyledDateTwoLabel>
                  {date.date2}
                  <input type="checkbox" />
                </StyledDateTwoLabel>
              </article>
            )}
            {date.date3 !== "" && (
              <article>
                <StyledDateHeadline>Datum 3</StyledDateHeadline>
                <StyledDateThreeLabel>
                  {date.date3} <input type="checkbox" />
                </StyledDateThreeLabel>
              </article>
            )}
            {date.date4 !== "" && (
              <article>
                <StyledDateHeadline>Datum 4</StyledDateHeadline>
                <StyledDateFourLabel>
                  {date.date4}
                  <input type="checkbox" />
                </StyledDateFourLabel>
              </article>
            )}
            <StyledVoteCardButton>Bestätigen</StyledVoteCardButton>
          </StyledVoteCardForm>
        </StyledVoteCardSection>
      ))}
    </>
  );
}

const StyledVoteCardSection = styled.section`
  display: flex;
  flex-direction: column;
  margin: 2rem;
  border-radius: 9px;
  box-shadow: 6px 9px 17px -3px rgba(0, 0, 0, 0.25);
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
  grid-row-gap: px;
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
`;
