import Image from "next/image";
import Link from "next/link";
import { styled } from "styled-components";
import Login from "./Login";

export default function Headline() {
  return (
    <StyledHeadline>
      <Link href={"/"}>
        <StyledImage
          alt="Friends-Logo"
          src="/logo2-nobackground-200.png"
          width={120}
          height={120}
          priority={false}
        />
      </Link>
      <Login />
    </StyledHeadline>
  );
}

const StyledHeadline = styled.section`
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  grid-template-rows: 0.5fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
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

  margin-bottom: 1rem;
`;

const StyledImage = styled(Image)`
  margin-bottom: -2rem;
  grid-area: 1 / 1 / 2 / 2;
`;
