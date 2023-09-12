import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import { keyframes } from "styled-components";
import styled from "styled-components";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Galery() {
  const [clickedInput, setClickedInput] = useState(false);
  const [image, setImage] = useState(null);
  const [groupData, setGroupData] = useState(null);
  const [error, setError] = useState(null);
  const { data: session } = useSession();
  const [reRenderTrigger, setRerenderTrigger] = useState(false);

  function handleClickInput() {
    setClickedInput(!clickedInput);
  }

  async function handleSubmitUploadImage(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const response = await fetch("api/cloudinary/deleteorgetcloudinaryfile", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const { height, width, url, public_id } = await response.json();

      const newImage = {
        height,
        width,
        url,
        public_id,
      };
      setImage(newImage);
    } else {
      console.error(error);
      alert("es wurde kein Bild hochgeladen!");
    }

    event.target.reset();
  }

  useEffect(() => {
    if (session && image) {
      const requestBody = {
        user: session.user,
        cloudyImage: image,
      };
      fetch("api/cloudinary/getupdateordeletegroupdetailswithpictures", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }).then(() => {
        fetch("api/cloudinary/getupdateordeletegroupdetailswithpictures", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }).then((promisedGroupData) => {
          promisedGroupData.json().then((finalGroupData) => {
            setGroupData(finalGroupData.groupPictures);
          });
        });
      });
    }
  }, [image]);

  useEffect(() => {
    const requestBody = {
      user: session.user,
      cloudyImage: image,
    };
    fetch("api/cloudinary/getupdateordeletegroupdetailswithpictures", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }).then((promisedGroupData) => {
      promisedGroupData.json().then((finalGroupData) => {
        setGroupData(finalGroupData.groupPictures);
      });
    });
  }, [reRenderTrigger]);

  async function handleDeletePicture(public_id) {
    const requestBody = {
      public_id: public_id,
      groupData: groupData,
    };
    const alertWindow = window.confirm(
      "Bist du dir sicher, dass du das Bild löschen möchtest?"
    );

    if (alertWindow) {
      await fetch(`api/cloudinary/deletepicturesingroup`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      await fetch("api/cloudinary/deletepicturesfromcloudinary", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_id }),
      });
      setRerenderTrigger(!reRenderTrigger);
    }
  }

  console.log(groupData);
  return (
    <>
      <h2>Bildergalerie</h2>
      {groupData &&
        groupData.map((group) => (
          <ImageContainer key={group._id}>
            <StyledDeleteButton
              onClick={() => handleDeletePicture(group.public_id)}
            >
              X
            </StyledDeleteButton>
            <StyledImage
              src={group.url}
              alt="Uploaded image"
              layout="responsive"
              height={group.height}
              width={group.width}
            />
          </ImageContainer>
        ))}
      {groupData !== null && groupData.length <= 0 && (
        <section>
          <StyledHeadline>Du hast noch keine Bilder</StyledHeadline>
          <StyledParagraphWhenEmpty>
            füge über das + Icon bilder hinzu, alle in deiner Gruppe können
            diese sehen!
          </StyledParagraphWhenEmpty>
        </section>
      )}
      {error && <div>{error.message}</div>}
      {clickedInput ? (
        <StyledForm onSubmit={handleSubmitUploadImage}>
          {/* <StyledExitButton onClick={handleClickInput}>X</StyledExitButton> */}
          <label htmlFor="file" />
          <StyledInputField type="file" name="file" id="file" />

          <StyledButton type="submit">
            <StyledIcon icon={faPlus} />
          </StyledButton>
        </StyledForm>
      ) : (
        <StyledClickToOpenButton onClick={handleClickInput}>
          <StyledIcon icon={faPlus} />
        </StyledClickToOpenButton>
      )}
    </>
  );
}

const FadeInAnimation = keyframes`
0% {opacity: 0}
100% {opacity: 1}
`;
const StyledHeadline = styled.h3`
  color: var(--secondary-color);
  text-align: center;
  margin-top: 4rem;
`;
const StyledParagraphWhenEmpty = styled.p`
  text-align: center;
  margin: 2rem 3rem auto 3rem;
`;

const ImageContainer = styled.div`
  max-width: 40rem;
  margin: 4rem 1rem 6rem 1rem;
  padding: 1rem;
  position: relative;
`;

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 0.3fr 1fr 0.3fr;
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  margin-left: 1rem;
  margin-right: 1rem;
  position: fixed;
  bottom: 5rem;
  background-color: var(--secondary-color);
  padding: 1rem;
  border-radius: 9px;
  animation-name: ${FadeInAnimation};
  animation-duration: 1s;
`;

const StyledImage = styled(Image)`
  border-radius: 9px;
  box-shadow: 6px 9px 17px -3px rgba(0, 0, 0, 0.25);
`;

const StyledDeleteButton = styled.button`
  position: absolute;
  border-radius: 9px;
  border: none;
  width: 3rem;

  height: 2rem;
  background-color: var(--secondary-color);
  color: white;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: white;
  width: 20px;
  height: 20px;
`;

const StyledButton = styled.button`
  grid-area: 1 / 3 / 3 / 4;
  background-color: transparent;
  border: none;
  align-self: center;
`;

const StyledInputField = styled.input`
  grid-area: 1 / 2 / 3 / 3;
  background-color: transparent;
  color: white;
  align-self: center;
`;

const StyledClickToOpenButton = styled.button`
  background-color: var(--primary-color);
  width: 2rem;
  height: 2rem;
  border-radius: 4px;
  gap: 4rem;
  border: none;
  position: fixed;
  bottom: 5rem;
  right: 1rem;
  animation-name: ${FadeInAnimation};
  animation-duration: 1s;
`;
