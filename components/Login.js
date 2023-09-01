import { useSession, signIn, signOut } from "next-auth/react";
import { styled } from "styled-components";

export default function Login() {
  const { data: session } = useSession();

  return (
    <StyledLoginSection>
      {session ? (
        <>
          <StyledLoginButton onClick={signOut}>Logout</StyledLoginButton>
          <p>Hi {session.user.email}!</p>
        </>
      ) : (
        <StyledLoginButton onClick={() => signIn()}>Login</StyledLoginButton>
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
`;
