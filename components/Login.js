import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { styled } from "styled-components";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <StyledLoginSection>
      {session ? (
        <StyledLoggedInSection>
          <StyledParagrah>Hi {session.user.name}!</StyledParagrah>
          <StyledImage
            src={session.user.image}
            alt="Dein Google Profilbild"
            width={30}
            height={30}
          />

          <StyledLoginButton
            onClick={() => {
              signOut({ redirect: false }).then(() => {
                router.push("/");
              });
            }} //diese Funktion habe ich von google übernommen, hier wird die Startseite angezeigt nach dem logout
          >
            Logout
          </StyledLoginButton>
        </StyledLoggedInSection>
      ) : (
        <StyledLoginButton
          onClick={() => {
            signIn("google", {
              callbackUrl: "http://localhost:3000//validateafterlogin",
            });
          }}
        >
          Login
        </StyledLoginButton>
      )}
    </StyledLoginSection>
  );
}

const StyledLoginButton = styled.button`
  background-color: #ffc44d;
  width: 4rem;
  height: 2rem;
  border-radius: 4px;
  border: none;
`;

const StyledLoginSection = styled.section`
  grid-area: 1 / 3 / 2 / 4;
  align-self: center;
  margin-right: 1rem;
`;

const StyledLoggedInSection = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 0.5fr;
  grid-column-gap: 30px;
  grid-row-gap: 0px;
  margin-left: 3rem;
  align-items: center;
`;

const StyledParagrah = styled.p`
  font-size: var(--font-size-details);
  color: var(--grey-topics);
`;

const StyledImage = styled(Image)`
  border-radius: 9px;
`;
