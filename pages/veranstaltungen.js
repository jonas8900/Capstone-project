import {
  StyledDeleteButton,
  StyledHeadlineForSubpages,
} from "@/components/Activitylist";
import {
  StyledDetailText,
  StyledHeadline2,
  StyledHeadline3,
  StyledSection,
  StyledUl,
} from "@/components/DashboardActivityCard";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import "moment/locale/de";
import Link from "next/link";
import { styled } from "styled-components";

export default function Events({ dates, setDates }) {
  function handleDelete(id) {
    const alertWindow = window.confirm(
      "Bist du dir sicher, dass du das Event löschen möchtest?"
    );
    if (alertWindow) {
      setDates(dates.filter((date) => date.finalDateID !== id));
    }
  }

  console.log(dates);

  return (
    <>
      <StyledHeadlineForSubpages>Events</StyledHeadlineForSubpages>
      {dates.map((date) => (
        <StyledSection key={date.finalDateID}>
          <StyledSectionHeadlineAndButton>
            <StyledHeadline2>
              Veranstaltung {date.objectWithTheSameID.veranstaltung}
            </StyledHeadline2>
            <StyledDeleteButton onClick={() => handleDelete(date.finalDateID)}>
              X
            </StyledDeleteButton>
          </StyledSectionHeadlineAndButton>
          <StyledUl>
            <li>
              <StyledHeadline3>Veranstaltung:</StyledHeadline3>
              <StyledDetailText>
                {date.objectWithTheSameID.veranstaltung}
              </StyledDetailText>
            </li>
            <li>
              <StyledHeadline3>Datum der Veranstaltung:</StyledHeadline3>
              <StyledDetailText>
                {moment(date.finalDate).format("lll")}
              </StyledDetailText>
            </li>
            <li>
              <StyledHeadline3>Ort der Veranstaltung:</StyledHeadline3>
              <StyledDetailText>
                {date.objectWithTheSameID.ort}
              </StyledDetailText>
            </li>
          </StyledUl>
        </StyledSection>
      ))}

      <StyledLink href={"/addevent"}>
        <StyledIcon icon={faPlus} />
      </StyledLink>
    </>
  );
}

const StyledSectionHeadlineAndButton = styled.section`
  display: flex;
  justify-content: space-between;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: white;
  width: 1.5rem;
  height: 1.5rem;
`;

const StyledLink = styled(Link)`
  background-color: var(--secondary-color);
  width: 2rem;
  height: 2rem;
  border-radius: 4px;
  gap: 4rem;
  padding: 1rem;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 1rem;
  bottom: 5rem;
`;
