import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../assets/logos.png";

function Contacts({ contacts, currUser, changeChat }) {
  const [currUserName, setCurrUserName] = useState(undefined);
  const [currUserImg, setCurrUserImg] = useState(undefined);
  // // eslint-disable-next-line
  const [currSelected, setCurrSelected] = useState(undefined);

  useEffect(() => {
    if (currUser) {
      setCurrUserImg(currUser.avatarImage);
      setCurrUserName(currUser.username);
    }
    // // eslint-disable-next-line
  }, [currUser]);

  // // eslint-disable-next-line
  const changeCurrentChat = (index, contact) => {
    setCurrSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currUserImg && currUserName && (
        <Container>
          <div className="brand">
            <img src={logo} alt="logo" />
            <h3>Chat Time</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currSelected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={()=> changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage} `}
                      alt="Avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
            
          </div>

          <div className="curr-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currUserImg} `}
                alt="Avatar"
              />
            </div>
            <div className="username">
              <h2>{currUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff39;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }
  .curr-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          fontsize: 1rem;
        }
      }
    }
  }
`;
export default Contacts;
