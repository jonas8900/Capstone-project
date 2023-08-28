import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import Link from "next/link";
import { styled } from "styled-components";
import "moment/locale/de";
import Form from "./Form";

export default function PartyPlannerCard({ dates, setDates }) {
  function handleSubmitPlanning(event) {
    event.preventDefault();
  }

  return (
    <main>
      <StyledBackLink href={"/veranstaltungen"}>
        <StyledBackIcon icon={faArrowLeft} />
      </StyledBackLink>
      <h2>Party Planer</h2>

      <StyledThirdEventHeadline>
        anstehende Aktivitäten:
      </StyledThirdEventHeadline>

      <StyledPlannerSectionWrapper>
        {dates.map((date) => (
          <StyledFormCardWrapper key={date.finalDateID}>
            <StyledShowActivityWrapper>
              <StyledFourthHeadline>Aktivität:</StyledFourthHeadline>
              <StyledParagraphForDetails>
                {date.objectWithTheSameID.veranstaltung}
              </StyledParagraphForDetails>
            </StyledShowActivityWrapper>
            <StyledShowLocationWrapper>
              <StyledFourthHeadline>Ort:</StyledFourthHeadline>
              <StyledParagraphForDetails>
                {date.objectWithTheSameID.ort}
              </StyledParagraphForDetails>
            </StyledShowLocationWrapper>
            <StyledShowDateWrapper>
              <StyledFourthHeadline>Datum:</StyledFourthHeadline>
              <StyledParagraphForDetails>
                {" "}
                {moment(date.finalDate).format("lll")}
              </StyledParagraphForDetails>
            </StyledShowDateWrapper>
          </StyledFormCardWrapper>
        ))}

        <h4>Wer holt was:</h4>
        <StyledDisplayFormArticle>
          <StyledFourthHeadline>Name</StyledFourthHeadline>
          <StyledUlForNames></StyledUlForNames>
          <StyledFourthHeadline2>nimmt mit</StyledFourthHeadline2>
          <StyledUlForProducts></StyledUlForProducts>
        </StyledDisplayFormArticle>
      </StyledPlannerSectionWrapper>
      <Form
        name={"eventname"}
        type={"text"}
        onSubmit={handleSubmitPlanning}
        placeholder={"hier aktivität eingeben..."}
      />
    </main>
  );
}

const StyledThirdEventHeadline = styled.h3`
  font-size: 15px;
  margin: 2rem;
  font-weight: normal;
`;

const StyledBackLink = styled(Link)`
  justify-content: left;
  color: black;
  width: 2rem;
  height: 2rem;
`;

const StyledBackIcon = styled(FontAwesomeIcon)`
  width: 2rem;
  height: 2rem;
`;

const StyledPlannerSectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin: 2rem;
  margin-top: 0px;
  border-radius: 9px;
  box-shadow: 6px 9px 17px -3px rgba(0, 0, 0, 0.25);
`;

const StyledFormCardWrapper = styled.article`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  margin-left: 1rem;
  border-bottom: 1px solid var(--grey-topics);
`;

const StyledShowActivityWrapper = styled.article`
  grid-area: 1 / 1 / 2 / 2;
`;

const StyledShowLocationWrapper = styled.article`
  grid-area: 1 / 2 / 2 / 3;
`;

const StyledShowDateWrapper = styled.article`
  grid-area: 2 / 1 / 3 / 2;
`;

const StyledFourthHeadline = styled.h4`
  font-size: var(--font-size-details);
  color: var(--grey-topics);
  grid-area: 1 / 1 / 2 / 2;
`;

const StyledFourthHeadline2 = styled.h4`
  font-size: var(--font-size-details);
  color: var(--grey-topics);
  grid-area: 1 / 2 / 2 / 3;
`;

const StyledParagraphForDetails = styled.p`
  font-size: var(--font-size-details);
`;

const StyledDisplayFormArticle = styled.article`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  margin-left: 1rem;
`;

const StyledUlForNames = styled.ul`
  grid-area: 2 / 1 / 3 / 2;
  display: flex;
  flex-direction: column;
`;

const StyledUlForProducts = styled.ul`
  grid-area: 2 / 1 / 3 / 3;
  display: flex;
  flex-direction: column;
`;
