import React from 'react';
import styled from 'styled-components';
import Robort from '../assets/robot.gif';

function Welcome({ currUser }) {
  return (
    <Container>
       <img src={Robort} alt="Robort"/>
       <h1>
        Welcome <span>{currUser.username}</span>
       </h1>
       <h3>Select your friend, Let&apos;s start chatting!</h3>

    </Container>
  )
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
color: white;
 img{
 height: 20rem;
 }
 span{
 color:#4e00ff;
 }
`;

export default Welcome
