import OrangeButton from "@/components/OrangeButton";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { keyframes, styled } from "styled-components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function GroupMember() {
  const { data: session } = useSession();
  const [groupSelection, setGroupSelection] = useState(false);
  const randomstring = require("randomstring");
  const [userData, setUserData] = useState();
  const [activeGroupData, setActiveGroupData] = useState();
  const [generatedLink, setGeneratedLink] = useState();
  const [alluserGroups, setAllUserGroups] = useState();
  const sendUserData = userData && userData;
  const sessionTrue = session && true;
  const router = useRouter();

  function getSingleUserByMail() {
    if (session) {
      fetch("api/getsingleuserbymail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(session.user),
      }).then((promisedUserData) => {
        promisedUserData.json().then((finalUserData) => {
          setUserData(finalUserData);
        });
      });
      getAllGroupsForUser();
    }
  }

  useEffect(() => {
    getSingleUserByMail();
  }, [sessionTrue]);

  function getGroupDetails() {
    if (session) {
      fetch("api/getorupdategroupdetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }).then((promisedUserData) => {
        promisedUserData.json().then((finalUserData) => {
          setActiveGroupData(finalUserData);
        });
      });
    }
  }

  useEffect(() => {
    getGroupDetails();
  }, [sendUserData]);
  function handleGroupSelect() {
    getAllGroupsForUser();
    setGroupSelection(!groupSelection);
  }

  function getInviteLink() {
    let groupId = null;
    let generatedURL = null;
    const generatedRandomString = randomstring.generate();
    if (userData != undefined) {
      groupId = userData.activeGroupId;
    }
    if (groupId != null) {
      generatedURL = `${generatedRandomString}/${groupId}`;
      setGeneratedLink(generatedURL);
      navigator.clipboard.writeText(generatedURL);
    }
  }

  function addInviteLinkToGroup() {
    if (generatedLink != undefined) {
      const splitLink = generatedLink.split("/");
      const groupIdFromLink = splitLink[1];

      const requestBody = {
        groupIdFromLink,
        generatedLink,
      };
      fetch("api/getorupdategroupdetails", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
    }
  }
  useEffect(() => {
    addInviteLinkToGroup();
  }, [generatedLink]);

  async function getAllGroupsForUser() {
    await fetch("api/getallusergroups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then((promisedUserData) => {
      promisedUserData.json().then((finalGroupData) => {
        setAllUserGroups(finalGroupData);
      });
    });
  }

  function handleSubmitGroupChange(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const selectData = Object.fromEntries(formData);
    const confirmToChangeGroup = window.confirm(
      "Möchtest du wirklich die Gruppe wechseln?"
    );
    if (confirmToChangeGroup) {
      const changeUserActiveGroupId = {
        userSessionData: userData,
        activeGroupId: selectData,
      };

      fetch("api/updateactivegroupidinuser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(changeUserActiveGroupId),
      });
      router.reload();
    }
  }

  return (
    <>
      {session && (
        <StyledMain>
          <h2>Teilnehmer</h2>
          <StyledSectionForGroupMembers>
            <StyledArticleForHeadDetails>
              <StyledHeadline3>Deine FreundesGruppe:</StyledHeadline3>
              <StyledParagraphForWhichGroupIsActive>
                {activeGroupData != undefined && activeGroupData.groupname}
              </StyledParagraphForWhichGroupIsActive>
              {groupSelection ? (
                <OrangeButton
                  $useSecondaryColor={true}
                  onClick={handleGroupSelect}
                >
                  Abbrechen
                </OrangeButton>
              ) : (
                <OrangeButton
                  $useSecondaryColor={true}
                  onClick={handleGroupSelect}
                >
                  Gruppe auswählen
                </OrangeButton>
              )}
              {groupSelection && (
                <StyledForm onSubmit={handleSubmitGroupChange}>
                  <label htmlFor="selectGroup">Wähle deine Gruppe aus:</label>

                  <select id="selectGroup" name="selectGroup">
                    {alluserGroups.map((userGroup) => (
                      <option value={userGroup._id} key={userGroup._id}>
                        {userGroup.groupname}
                      </option>
                    ))}
                  </select>

                  <OrangeButton type="submit">Gruppe wechseln</OrangeButton>
                </StyledForm>
              )}
            </StyledArticleForHeadDetails>
            <StyledHeadline4>Teilnehmer:</StyledHeadline4>
            <StyledList>
              {activeGroupData != undefined &&
                activeGroupData.members.map((user) => (
                  <StyledListItem key={user._id}>
                    {user.userName}
                  </StyledListItem>
                ))}
            </StyledList>
            <StyledArticleForButton>
              <OrangeButton $useSecondaryColor={true} onClick={getInviteLink}>
                Copy link to invite friends
                <StyledIcon icon={faCopy} />
              </OrangeButton>
            </StyledArticleForButton>
          </StyledSectionForGroupMembers>
        </StyledMain>
      )}
    </>
  );
}

const FadeInAnimation = keyframes`
0% {opacity: 0}
100% {opacity: 1}
`;

const StyledMain = styled.main`
  animation-name: ${FadeInAnimation};
  animation-duration: 1s;
`;

const StyledSectionForGroupMembers = styled.section`
  display: flex;
  flex-direction: column;
  margin: 2rem;

  border-radius: 9px;
  margin-bottom: 10rem;
  box-shadow: 6px 9px 17px -3px rgba(0, 0, 0, 0.25);
  animation-name: ${FadeInAnimation};
  animation-duration: 2s;
`;

const StyledArticleForHeadDetails = styled.article`
  border-bottom: 1px solid var(--grey-topics);
  display: grid;
  align-items: center;
  text-align: center;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  padding: 2rem;
  margin-top: 0rem;
`;

const StyledForm = styled.form`
  border-bottom: 1px solid var(--grey-topics);
  display: grid;
  align-items: center;
  text-align: center;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  padding: 2rem;
  margin-top: 0rem;
`;

const StyledHeadline3 = styled.h3`
  grid-area: 1 / 1 / 2 / 2;
`;

const StyledParagraphForWhichGroupIsActive = styled.p`
  grid-area: 2 / 1 / 3 / 2;
  color: var(--fifth-color);
  font-weight: 500;
`;

const StyledHeadline4 = styled.h4`
  margin: 4rem;
  margin-left: 1rem;
  margin-bottom: 0rem;
`;

const StyledList = styled.ul`
  list-style: none;
  margin-bottom: 4rem;
`;
const StyledListItem = styled.li`
  font-size: var(--font-size-details);
  margin-bottom: 0.4rem;
`;

const StyledArticleForButton = styled.article`
  margin-bottom: 2rem;
  display: grid;
  gap: 1rem;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  padding: 3px;
  margin-left: 1rem;
`;

const StyledGeneratedLink = styled.p`
  word-break: break-all;
  margin: 2rem;
  width: 20rem;
  height: 4rem;
  border-radius: 9px;
  box-shadow: 6px 9px 17px -3px rgba(0, 0, 0, 0.25);
`;
