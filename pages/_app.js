import NavigationBar from "@/components/NavigationBar";
import GlobalStyle from "../styles";
import styled from "styled-components";
import { SWRConfig } from "swr/_internal";
import { SessionProvider } from "next-auth/react";
import Headline from "@/components/Headline";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({ Component, pageProps, session }) {
  return (
    <>
      <GlobalStyle />

      <SWRConfig value={{ fetcher }}>
        <SessionProvider session={session}>
          <Headline />
          <Component {...pageProps} />
          <NavigationBar />
        </SessionProvider>
      </SWRConfig>
    </>
  );
}

export const StyledHeadline = styled.h1`
  text-align: left;
  border-bottom: 4px solid transparent;
  border-image: linear-gradient(
    90deg,
    rgba(255, 77, 77, 1) 0%,
    rgba(255, 187, 81, 1) 31%,
    rgba(72, 70, 248, 1) 69%,
    rgba(73, 26, 188, 1) 100%
  );
  border-image-slice: 1;
  width: 100%;
  display: flex;
  margin: auto;
  padding: 1rem;
  margin-bottom: 3rem;
`;
