import {
  faArrowRotateLeft,
  faPlus,
  faSpinner,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import FormForGroup from "./FormForGroup";
import SecondaryColoredButton from "./OrangeButton";
import Link from "next/link";

export default function CreateOrJoinGroup({}) {
  const { data: session } = useSession();
  const { isLoading, mutate } = useSWR("api/group/createNewGroup");
  const userID = session && session.user.email;
  const userName = session && session.user.name;
  const sessionTrue = session && true;
  const [checkProperty, setCheckProperty] = useState();
  const [createGroup, setCreateGroup] = useState(false);
  const [joinGroup, setjoinGroup] = useState(false);
  const [userData, setUserData] = useState();
  const [fetchedGroup, setFetchedGroup] = useState();
  const fetchedGroupTrue = fetchedGroup && fetchedGroup;
  const router = useRouter();
  const [newGroupId, setNewGroupId] = useState();
  const newGroupAfterPost = newGroupId;
  function getSingleUserByMail() {
    if (session) {
      fetch("api/user/getsingleuserbymail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(session.user),
      }).then((promisedActivityData) => {
        promisedActivityData.json().then((finalVoteData) => {
          setUserData(finalVoteData);
        });
      });
    }
  }

  useEffect(() => {
    getSingleUserByMail();
  }, [sessionTrue]);

  useEffect(() => {
    fetch("api/user/createorupdateuser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGroupAfterPost),
    });
  }, [newGroupAfterPost]);

  useEffect(() => {
    if (fetchedGroup !== undefined) {
      const requestBody = {
        userData,
        fetchedGroup,
      };
      fetch("api/user/getsingleuserbymail", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
    }
    mutate();
  }, [fetchedGroupTrue]);

  useEffect(() => {
    if (userData != undefined) {
      setCheckProperty(userData.activeGroupId !== "");
    }
  }, [userData]);

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
    fetch("api/group/createNewGroup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGroupDetails),
    })
      .then((promisedUserData) => promisedUserData.json())
      .then((finalUserData) => {
        setNewGroupId(finalUserData);

        fetch("api/user/createorupdateuser", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalUserData),
        });
      });
    mutate();
    alert("Du hast eine Gruppe erstellt!");
    router.push("/").then(() => {
      router.reload();
    });
  }

  function handleSubmitJoin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const joinData = Object.fromEntries(formData);

    fetch("api/group/getgroupwithinvitelink", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(joinData),
    }) // because of the timing in this function, i need help and used stackoverflow and chatGPT a lot for this result.
      .then((promisedUserData) => promisedUserData.json())
      .then((fetchedGroupData) => {
        if (
          userData.joinedGroupList.find((group) => {
            return group === fetchedGroupData._id;
          })
        ) {
          return alert("du bist bereits in dieser Gruppe");
        } else {
          setFetchedGroup(fetchedGroupData);
          if (fetchedGroupData != undefined) {
            alert("Deine Gruppe wurde hinzugefügt");
            router.push("/").then(() => {
              router.reload();
            });
          } else {
            alert("Ungültiger Einladungslink!");
          }
        }
        const requestBody = {
          userData,
          fetchedGroupData,
        };
        fetch("api/group/updategroupafterjoin", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
      })
      .then(() => {
        mutate();
      });
  }

  return (
    <>
      <h2>Gruppenauswahl</h2>
      <StyledSectionForUpcomingScreen>
        <StyledHeadline3>
          Erstelle oder trete jetzt einer Gruppe bei!
        </StyledHeadline3>

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
            <FormForGroup
              $useSecondaryColor={false}
              onSubmit={handleSubmitJoin}
            >
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
          {joinGroup === false && createGroup === false && checkProperty && (
            <StyledLink href={"/groupmember"}>
              <SecondaryColoredButton>
                Gruppe Wechseln
                <StyledIcon icon={faArrowRotateLeft} />
              </SecondaryColoredButton>
            </StyledLink>
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

const StyledLink = styled(Link)`
  text-decoration: none;
`;
