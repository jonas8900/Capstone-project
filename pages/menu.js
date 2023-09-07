import { StyledList } from "@/components/Activitylist";
import {
  faCalendar,
  faPeopleGroup,
  faPersonRunning,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styled, { keyframes } from "styled-components";

export default function Menu() {
  return (
    <>
      <section>
        <StyledList>
          <StyledMenuLink href={"/activities"}>
            <StyledMenuItem>
              <StyledRunIcon icon={faPersonRunning} />
              <StyledListItemText>Aktivitäten</StyledListItemText>
            </StyledMenuItem>
          </StyledMenuLink>
          <StyledMenuLink href={"/eventcollection"}>
            <StyledMenuItem>
              <StyledRunIcon icon={faCalendar} />
              <StyledListItemText>Events</StyledListItemText>
            </StyledMenuItem>
          </StyledMenuLink>
          <StyledMenuLink href={"/groupmember"}>
            <StyledMenuItem>
              <StyledRunIcon icon={faUserGroup} />
              <StyledListItemText>Teilnehmer</StyledListItemText>
            </StyledMenuItem>
          </StyledMenuLink>
          <StyledMenuLink href={"/nogroupscreen"}>
            <StyledMenuItem>
              <StyledRunIcon icon={faPeopleGroup} />
              <StyledListItemText>Gruppen</StyledListItemText>
            </StyledMenuItem>
          </StyledMenuLink>
        </StyledList>
      </section>
    </>
  );
}

const FadeInAnimation = keyframes`
0% {opacity: 0}
100% {opacity: 1}
`;

const StyledMenuItem = styled.li`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 0.5fr;
  grid-column-gap: 0px;
  grid-row-gap: 40px;
  margin-top: 2rem;
  padding: 2rem;
  border: 1px solid rgba(181, 181, 181, 0.2);
  border-radius: 9px;
  box-shadow: 6px 9px 17px -3px rgba(0, 0, 0, 0.25);
  color: black;
  font-style: normal;
  text-align: center;
  align-items: center;
  animation-name: ${FadeInAnimation};
  animation-duration: 0.7s;

  &:active {
    background-color: rgba(255, 59, 23, 0.8);
  }
`;

const StyledRunIcon = styled(FontAwesomeIcon)`
  grid-area: 1 / 1 / 2 / 2;
  margin-left: 2rem;
  width: 2rem;
  height: 2rem;
  color: var(--grey-topics);
`;

const StyledListItemText = styled.p`
  grid-area: 1 / 2 / 2 / 3;
`;

const StyledMenuLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
