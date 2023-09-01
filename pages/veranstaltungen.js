import { StyledDeleteButton } from "@/components/Activitylist";
import {
  StyledDetailText,
  StyledHeadline2,
  StyledHeadline3,
  StyledSection,
  StyledUl,
} from "@/components/DashboardActivityCard";
import {
  faListCheck,
  faPenToSquare,
  faPlus,
  faSpinner,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import "moment/locale/de";
import { IM_Fell_French_Canon } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { styled } from "styled-components";
import useSWR from "swr";

export default function Events({}) {
  const { data: allEvents, isLoading, mutate } = useSWR("api/finalEvents/");
  const userID = "Marvin-818924";
  const router = useRouter();
  if (isLoading) {
    return (
      <StyledLoadingError>
        <StyledLoadingErrorIcon icon={faSpinner} spin />
      </StyledLoadingError>
    );
  }

  async function handleEdit(id) {
    router.push(`/eventeditor/${id}`);
  }

  async function handleDelete(id) {
    const alertWindow = window.confirm(
      "Bist du dir sicher, dass du das Event löschen möchtest?"
    );
    if (alertWindow) {
      const response = await fetch(`/api/finalEvents/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        mutate();
      }
    }
  }
  return (
    <>
      <h2>Events</h2>
      {allEvents &&
        allEvents.map((date) => (
          <section key={date._id}>
            {date.finalDate && (
              <StyledSection>
                <StyledSectionHeadlineAndButton>
                  <StyledHeadline2>
                    Veranstaltung {date.veranstaltung}
                  </StyledHeadline2>

                  <StyledEditButton onClick={() => handleEdit(date._id)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </StyledEditButton>
                  <StyledDeleteButton onClick={() => handleDelete(date._id)}>
                    <StyledTrashIcon icon={faTrash} />
                  </StyledDeleteButton>
                </StyledSectionHeadlineAndButton>
                <StyledUl>
                  <li>
                    <StyledHeadline3>Veranstaltung:</StyledHeadline3>
                    <StyledDetailText>{date.veranstaltung}</StyledDetailText>
                  </li>
                  <li>
                    <StyledHeadline3>Datum der Veranstaltung:</StyledHeadline3>
                    <StyledDetailText>
                      {moment(date.finalDate).format("lll")}
                    </StyledDetailText>
                  </li>
                  <li>
                    <StyledHeadline3>Ort der Veranstaltung:</StyledHeadline3>
                    <StyledDetailText>{date.ort}</StyledDetailText>
                  </li>
                </StyledUl>
                <StyledIconLink href={`planner/${date._id}`}>
                  <StyledCheckListIcon icon={faListCheck} />
                </StyledIconLink>
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

const StyledEditButton = styled.button`
  background-color: white;
  border: none;
  width: fit-content;
  height: fit-content;
  font-size: 1rem;
  grid-area: 1 / 1 / 2 / 2;
`;

const StyledCheckListIcon = styled(FontAwesomeIcon)`
  width: 2rem;
  height: 2rem;
  color: var(--grey-topics);
`;

const StyledIconLink = styled(Link)`
  align-self: flex-end;
  margin: auto 1rem 1rem auto;
`;

const StyledLoadingErrorIcon = styled(FontAwesomeIcon)`
  width: 4rem;
  height: 4rem;
`;

const StyledLoadingError = styled.h1`
  margin-top: 32vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
