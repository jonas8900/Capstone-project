import { faBars, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

export default function NavigationBar() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState();
  const sessionTrue = session && true;
  const [checkProperty, setCheckProperty] = useState();
  function getSingleUserByMail() {
    if (session) {
      fetch("api/getsingleuserbymail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(session.user),
      }).then((promisedActivityData) => {
        promisedActivityData.json().then((finalUserData) => {
          setUserData(finalUserData);
        });
      });
    }
  }

  useEffect(() => {
    getSingleUserByMail();
  }, [sessionTrue]);

  useEffect(() => {
    if (userData != undefined) {
      setCheckProperty(userData.activeGroupId !== "");
    }
  }, [userData]);
  return (
    <>
      {session && userData !== undefined && checkProperty && (
        <StyledNavElement>
          <Link href={"/"}>
            <StyledHouseIcon icon={faHouse} />
          </Link>
          <Link href={"/menu"}>
            <StyledMenuIcon icon={faBars} />
          </Link>
        </StyledNavElement>
      )}
    </>
  );
}

const StyledNavElement = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 420px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 40px;
  text-align: center;
  background-color: white;
  box-shadow: 0px -2px 17px 0px rgba(117, 117, 117, 0.5);
`;

const StyledHouseIcon = styled(FontAwesomeIcon)`
  width: 35px;
  height: 35px;
  grid-area: 1 / 1 / 2 / 2;
  padding: 0.8rem;
  color: black;

  &:active {
    color: var(--secondary-color);
  }
`;

const StyledMenuIcon = styled(FontAwesomeIcon)`
  width: 35px;
  height: 35px;
  grid-area: 1 / 2 / 2 / 3;
  padding: 0.8rem;
  color: black;

  &:active {
    color: var(--secondary-color);
  }
`;
