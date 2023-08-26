import { StyledDeleteButton } from "@/components/Activitylist";
import {
  StyledDetailText,
  StyledHeadline2,
  StyledHeadline3,
  StyledSection,
  StyledUl,
} from "@/components/DashboardActivityCard";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
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

  return (
    <>
      <h2>Events</h2>
      {dates.map((date) => (
        <section key={date.finalDateID}>
          {date.objectWithTheSameID && (
            <StyledSection>
              <StyledSectionHeadlineAndButton>
                <StyledHeadline2>
                  Veranstaltung {date.objectWithTheSameID.veranstaltung}
                </StyledHeadline2>
                <StyledDeleteButton
                  onClick={() => handleDelete(date.finalDateID)}
                >
                  <StyledTrashIcon icon={faTrash} />
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
          )}
        </section>
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

const StyledTrashIcon = styled(FontAwesomeIcon)`
  color: var(--grey-topics);
`;

const StyledLink = styled(Link)`
  background-color: var(--secondary-color);
  border-radius: 4px;
  gap: 4rem;
  padding: 0.3rem;
  border: none;

  position: fixed;
  right: 1rem;
  bottom: 5rem;
  transition: all 200ms;
  &:hover {
    background-color: var(--third-color);
  }
`;
