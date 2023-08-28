import styled from "styled-components";
import "moment/locale/de";
import moment from "moment";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";

export default function DashboardCard({ voteDoneArray }) {
  //voteDoneArray sorted the array by date, so we can get access for the next activity:
  const nextActivity = voteDoneArray[0];

  return (
    <StyledSection>
      <StyledHeadline2>Nächste Aktivität</StyledHeadline2>
      {voteDoneArray.length === 0 && (
        <StyledUl>
          <li>
            <StyledHeadline3>Sieht leer aus...</StyledHeadline3>
            <br />
            <StyledDetailText>
              Starte ein Event um das nächste Event zu sehen!
            </StyledDetailText>
          </li>
        </StyledUl>
      )}
      {voteDoneArray.length > 0 && (
        <StyledSectionForUlAndLink>
          <StyledUl>
            <li>
              <StyledHeadline3>Aktivitäten</StyledHeadline3>
              <StyledDetailText>
                {nextActivity.objectWithTheSameID.veranstaltung}
              </StyledDetailText>
            </li>
            <li>
              <StyledHeadline3>Datum</StyledHeadline3>
              <StyledDetailText>
                {moment(nextActivity.finalDate).format("lll")}
              </StyledDetailText>
            </li>
            <li>
              <StyledHeadline3>Ort</StyledHeadline3>
              <StyledDetailText>
                {nextActivity.objectWithTheSameID.ort}
              </StyledDetailText>
            </li>
            <li>
              <StyledHeadline3>was bringst du mit</StyledHeadline3>
              <StyledDetailText>Popcorn</StyledDetailText>
              <StyledDetailText>Eistee</StyledDetailText>
            </li>
          </StyledUl>
          <StyledIconLink href={`/planner/${nextActivity.finalDateID}`}>
            <StyledCheckListIcon icon={faListCheck} />
          </StyledIconLink>
        </StyledSectionForUlAndLink>
      )}
    </StyledSection>
  );
}

export const StyledHeadline2 = styled.h2`
  font-size: var(--font-size-headline);
  color: var(--secondary-color);
`;

export const StyledHeadline3 = styled.h3`
  font-size: var(--font-size-details);
  color: var(--grey-topics);
  font-weight: var(--font-weight-light);
`;

export const StyledDetailText = styled.p`
  font-size: var(--font-size-details);
  margin-top: -10px;
`;

export const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  margin: 2rem;
  margin-top: 4rem;
  margin-bottom: 6rem;
  border-radius: 9px;
  box-shadow: 6px 9px 17px -3px rgba(0, 0, 0, 0.25);
`;

export const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
`;

const StyledIconLink = styled(Link)`
  align-self: flex-start;
  margin: auto 1rem 1rem auto;
`;

const StyledCheckListIcon = styled(FontAwesomeIcon)`
  width: 2rem;
  height: 2rem;
  color: var(--grey-topics);
`;

const StyledSectionForUlAndLink = styled.section`
  display: flex;
`;
