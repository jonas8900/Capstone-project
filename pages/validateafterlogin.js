import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ValidateAfterLogin() {
  const { data: session } = useSession();

  const sessionTrue = session && true;
  const router = useRouter();

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
          finalUserData;
          console.log(finalUserData);
          if (finalUserData == undefined) {
            fetch("api/createnewuser", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(session.user),
            }).then(router.push("/nogroupscreen"));
          } else {
            router.push("/veranstaltungen");
          }
        });
      });
    }
  }

  useEffect(() => {
    getOrCreateUser();
  }, [sessionTrue]);

  return (
    <>
      <h1>Du wirst weitergeleitet...</h1>
      <StyledLoadingError>
        <StyledLoadingErrorIcon icon={faSpinner} spin />
      </StyledLoadingError>
    </>
  );
}

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
