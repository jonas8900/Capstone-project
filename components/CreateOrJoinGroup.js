import { styled } from "styled-components";
import SecondaryColoredButton from "./OrangeButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSpinner,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import FormForGroup from "./FormForGroup";
import useSWR from "swr";
import { useRouter } from "next/router";

export default function CreateOrJoinGroup({}) {
  const { data: session } = useSession();
  const { isLoading, mutate } = useSWR("api/createNewGroup");
  const userID = session && session.user.email;
  const userName = session && session.user.name;
  const [createGroup, setCreateGroup] = useState(false);
  const [joinGroup, setjoinGroup] = useState(false);
  const router = useRouter();
  const [newGroupId, setNewGroupId] = useState();
  const newGroupAfterPost = newGroupId && newGroupId;

  useEffect(() => {
    fetch("api/createorupdateuser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGroupAfterPost),
    });
  }, [newGroupAfterPost]);

  if (isLoading) {
    return (
      <StyledLoadingError>
        <StyledLoadingErrorIcon icon={faSpinner} spin />
      </StyledLoadingError>
    );
  }

  function handleToggleInputCreate() {
    setCreateGroup(!createGroup);
  }

  function handleToggleInputJoin() {
    setjoinGroup(!joinGroup);
  }

  function handleSubmitCreate(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const newGroupDetails = {
      groupname: data.groupname,
      members: [{ userID: userID, userName: userName }],
      ownerID: userID,
    };
    fetch("api/createNewGroup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGroupDetails),
    })
      .then((promisedUserData) => promisedUserData.json())
      .then((finalUserData) => setNewGroupId(finalUserData));
    mutate();
    alert("you Added a Group!");
    router.push("/");
  }

  return (
    <>
      <h2>Gruppenauswahl</h2>
      <StyledSectionForUpcomingScreen>
        <StyledHeadline3>Du hast noch keine bestehende Gruppe</StyledHeadline3>

        <StyledArticleForButton>
          {createGroup ? (
            <FormForGroup
              $useSecondaryColor={true}
              onSubmit={handleSubmitCreate}
            >
              Erstelle deine Gruppe:
            </FormForGroup>
          ) : (
            <SecondaryColoredButton
              $useSecondaryColor={false}
              onClick={handleToggleInputJoin}
            >
              Gruppe beitreten
              <StyledGroupIcon icon={faUserGroup} />
            </SecondaryColoredButton>
          )}
          {joinGroup ? (
            <FormForGroup $useSecondaryColor={false}>
              Füge hier den Link ein
            </FormForGroup>
          ) : (
            <SecondaryColoredButton
              $useSecondaryColor={true}
              onClick={handleToggleInputCreate}
            >
              Gruppe erstellen
              <StyledIcon icon={faPlus} />
            </SecondaryColoredButton>
          )}
        </StyledArticleForButton>
      </StyledSectionForUpcomingScreen>
    </>
  );
}

const StyledSectionForUpcomingScreen = styled.section`
  display: flex;
  flex-direction: column;
  margin: 2rem;
  margin-top: 8rem;
  border-radius: 9px;
  margin-bottom: 10rem;
  box-shadow: 6px 9px 17px -3px rgba(0, 0, 0, 0.25);
`;

const StyledIcon = styled(FontAwesomeIcon)`
  background-color: white;
  color: var(--secondary-color);
  border-radius: 2rem;
  padding: 3px;
  margin-left: 1rem;
`;

const StyledGroupIcon = styled(FontAwesomeIcon)`
  padding: 3px;
  margin-left: 1rem;
`;

const StyledArticleForButton = styled.article`
  display: grid;
  gap: 3rem;
  margin-top: 4rem;
  margin-bottom: 4rem;
`;

const StyledHeadline3 = styled.h3`
  font-size: 14px;
  font-weight: 400;
  align-self: center;
`;

const StyledLoadingError = styled.h1`
  margin-top: 32vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLoadingErrorIcon = styled(FontAwesomeIcon)`
  width: 4rem;
  height: 4rem;
`;
