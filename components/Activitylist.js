import styled from "styled-components";
import Form from "./Form";
import { uid } from "uid";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartSolid,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

export default function Activitylist({
  activityCards,
  setActivityCards,
  setDates,
  dates,
}) {
  const userID = "Jonas-818924";

  function handleSubmitActivity(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const newActivity = {
      name: data.activityName,
      id: uid(),
      likedByUser: [],
    };
    setActivityCards([...activityCards, newActivity]);

    event.target.reset();
  }

  function handleDelete(id) {
    const areYouSureToDelete = window.confirm(
      "Bist du dir sicher, dass du diese Aktivität löschen möchtest?"
    );
    if (areYouSureToDelete) {
      const setFilterWithoutDeletedOne = activityCards.filter(
        (activityCard) => activityCard.id !== id
      );
      const setFilterDates = dates.filter((date) => date.id !== id);
      setActivityCards(setFilterWithoutDeletedOne);
      setDates(setFilterDates);
    }
  }

  function handleAddFavoriteButton(id) {
    const activitySuggestionCard = activityCards.find((card) => card.id === id);

    if (activitySuggestionCard) {
      setActivityCards(
        activityCards.map((card) => {
          if (card.id === id) {
            const isAlreadylikedByUser = card.likedByUser.some(
              (user) => user.userID === userID
            );

            if (isAlreadylikedByUser) {
              const unLike = card.likedByUser.filter(
                (user) => user.userID !== userID
              );
              return {
                ...card,
                likedByUser: unLike,
              };
            } else {
              const newUserObject = {
                userID: userID,
              };
              const Like = [...card.likedByUser, newUserObject];
              return {
                ...card,
                likedByUser: Like,
              };
            }
          } else {
            return card;
          }
        })
      );
    }
  }

  return (
    <main>
      <StyledActivitySection>
        <h2>Aktivitäten</h2>
        <StyledList>
          {activityCards.map((activity) => (
            <StyledListItem key={activity.id}>
              <StyledListItemHeadline>{activity.name}</StyledListItemHeadline>
              <StyledDeleteButton onClick={() => handleDelete(activity.id)}>
                <StyledTrashIcon icon={faTrash} />
              </StyledDeleteButton>
              <StyledFavoriteButton
                onClick={() => handleAddFavoriteButton(activity.id)}
              >
                {activity.likedByUser.some((user) => user.userID === userID) ? (
                  <StyledFavoriteIconSolid icon={faHeartSolid} />
                ) : (
                  <StyledFavoriteIconRegular icon={faHeartRegular} />
                )}
                <p>{activity.likedByUser.length}</p>
              </StyledFavoriteButton>
              <StyledActivityLink href={`/${activity.id}`}>
                <StyledPlanButton>planen</StyledPlanButton>
              </StyledActivityLink>
            </StyledListItem>
          ))}
        </StyledList>
      </StyledActivitySection>
      <Form
        name={"activityName"}
        type={"text"}
        onSubmit={handleSubmitActivity}
        placeholder={"hier aktivität eingeben..."}
      />
    </main>
  );
}

export const StyledList = styled.ul`
  list-style: none;
  margin: 2rem 2rem 2rem 2rem;
  padding: 0;
  text-align: center;
`;
const StyledTrashIcon = styled(FontAwesomeIcon)`
  color: var(--grey-topics);
  margin: 5px;
`;

const StyledListItem = styled.li`
  display: grid;
  grid-template-columns: repeat(2, 0.5fr) 2fr 1fr;
  grid-template-rows: repeat(2, 0.8fr);
  grid-auto-flow: column;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  margin-top: 2rem;
  padding: 0;
  border: 1px solid rgba(181, 181, 181, 0.2);
  border-radius: 9px;
  box-shadow: 6px 9px 17px -3px rgba(0, 0, 0, 0.25);
  word-break: break-word;
`;

const StyledListItemHeadline = styled.h3`
  grid-area: 1 / 3 / 2 / 4;
  font-size: var(--font-size-headlines);
`;

const StyledActivitySection = styled.section`
  margin: 1rem auto;
  padding-bottom: 2rem;
`;

export const StyledDeleteButton = styled.button`
  background-color: white;
  border: none;
  width: fit-content;
  height: fit-content;
  font-size: 1rem;
  grid-area: 1 / 1 / 2 / 2;

  &:active {
    color: var(--secondary-color);
  }
`;

const StyledPlanButton = styled.button`
  width: 50%;
  height: 100%;
  max-height: 2rem;
  justify-self: center;
  align-self: center;
  border-radius: 9px;
  border: none;
  background-color: var(--third-color);

  &:active {
    background-color: #ffe89a;
  }
`;

const StyledActivityLink = styled(Link)`
  grid-area: 2 / 3 / 3 / 4;
`;

const StyledFavoriteIconRegular = styled(FontAwesomeIcon)`
  width: 1.5rem;
  height: 1.5rem;
`;

const StyledFavoriteIconSolid = styled(FontAwesomeIcon)`
  width: 1.5rem;
  height: 1.5rem;
  color: red;
`;

const StyledFavoriteButton = styled.button`
  grid-area: 1 / 4 / 3 / 5;
  align-self: center;
  margin-left: 2rem;
  background-color: transparent;
  border: none;
`;
