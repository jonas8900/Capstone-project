import OrangeButton from "@/components/OrangeButton";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { keyframes, styled } from "styled-components";
import { useSession } from "next-auth/react";

export default function GroupMember() {
  const { data: session } = useSession();
  const [groupSelection, setGroupSelection] = useState(false);
  const randomstring = require("randomstring");
  const [userData, setUserData] = useState();

  function getOrCreateUser() {
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
    }
  }

  useEffect(() => {
    getOrCreateUser();
  }, []);

  function handleGroupSelect() {
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
    }

  }

  return (
    <StyledMain>
      <h2>Teilnehmer</h2>
      <StyledSectionForGroupMembers>
        <StyledArticleForHeadDetails>
          <StyledHeadline3>Deine FreundesGruppe:</StyledHeadline3>
          <StyledParagraphForWhichGroupIsActive>
            Coder
          </StyledParagraphForWhichGroupIsActive>
          {groupSelection ? (
            <OrangeButton $useSecondaryColor={true} onClick={handleGroupSelect}>
              Abbrechen
            </OrangeButton>
          ) : (
            <OrangeButton $useSecondaryColor={true} onClick={handleGroupSelect}>
              Gruppe auswählen
            </OrangeButton>
          )}
          {groupSelection && (
            <StyledArticleForHeadDetails>
              <select>
                <option>Freundesgruppe2</option>
                <option>Freundesgruppe3</option>
              </select>

              <OrangeButton type="submit">Gruppe wechseln</OrangeButton>
            </StyledArticleForHeadDetails>
          )}
        </StyledArticleForHeadDetails>
        <StyledHeadline4>Teilnehmer:</StyledHeadline4>
        <StyledList>
          <StyledListItem>Tim</StyledListItem>
          <StyledListItem>Jonas</StyledListItem>
          <StyledListItem>Max</StyledListItem>
          <StyledListItem>Nick</StyledListItem>
          <StyledListItem>Philipp</StyledListItem>
        </StyledList>
        <StyledArticleForButton>
          <OrangeButton $useSecondaryColor={true} onClick={getInviteLink}>
            Copy link to invite friends
            <StyledIcon icon={faCopy} />
          </OrangeButton>
        </StyledArticleForButton>
      </StyledSectionForGroupMembers>
    </StyledMain>
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
