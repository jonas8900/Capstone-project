import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  styled  from "styled-components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
//this page is only for validating the userData
export default function ValidateAfterLogin() {
  const [checkIfObjectFilled, setCheckIfObjectFilled] = useState(false);
  const { data: session } = useSession();

  const sessionTrue = session && true;
  const router = useRouter();
  const [finalUserObject, setFinalUserObject] = useState();

  //This function gets through the database and check if the user exist,
  //if not create one

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
          setFinalUserObject(finalUserData);
          if (finalUserData == undefined) {
            fetch("api/createorupdateuser", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(session.user),
            }).then(router.push("/nogroupscreen"));
          } else {
            setCheckIfObjectFilled(true);
          }
        });
      });
    }
  }
  //in this special case we dont want to re-render in every session dependency,
  //so we need to check if the singIn is already done so we can call the function once
  useEffect(() => {
    getOrCreateUser();
  }, [sessionTrue, checkIfObjectFilled]);

  useEffect(() => {
    if (checkIfObjectFilled === true) {
      if (finalUserObject.joinedGroupList.length > 0) {
        router.push("/");
      } else if (
        finalUserObject.joinedGroupList.length == 0 ||
        finalUserObject.joinedGroupList.length == undefined
      ) {
        router.push("/nogroupscreen");
      }
    }
  }, [sessionTrue, checkIfObjectFilled]);

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
