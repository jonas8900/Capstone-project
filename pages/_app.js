import NavigationBar from "@/components/NavigationBar";
import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";
import { styled } from "styled-components";
import Image from "next/image";
import { SWRConfig } from "swr/_internal";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({ Component, pageProps }) {




  return (
    <>
      <GlobalStyle />
      <StyledHeadline>
        <StyledImage
          alt="Friends-Logo"
          src="/logo2-nobackground-200.png"
          width={120}
          height={120}
          priority={false}
        />
      </StyledHeadline>
      <SWRConfig value={{ fetcher }}>
        <Component
          {...pageProps}
        />
      </SWRConfig>
      <NavigationBar />
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

const StyledImage = styled(Image)`
  margin-bottom: -3rem;
`;
