import { StyledList } from "@/components/Activitylist";
import { StyledHeadline } from "@/components/Dashboard";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { styled } from "styled-components";

export default function Menu() {
  return (
    <>
      <StyledHeadline>Menu</StyledHeadline>
      <section>
        <StyledList>
          <StyledMenuLink href={"/activities"}>
            <StyledMenuItem>
              <StyledRunIcon icon={faPersonRunning} />
              <StyledListItemText>Aktivitäten</StyledListItemText>
            </StyledMenuItem>
          </StyledMenuLink>
        </StyledList>
      </section>
    </>
  );
}

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
`;