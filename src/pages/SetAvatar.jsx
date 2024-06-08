import React, { useEffect, useState } from 'react';
import { useNavigate} from "react-router-dom";
import styled from "styled-components";
import loader from "../assets/loader.gif";
import axios from "axios";
import { Buffer } from 'buffer';
import pQueue  from 'p-queue';
import {toast} from 'react-toastify';
import { setAvatarRoute } from '../utils/APIRoutes';

function SetAvatar() {

  const api = "https://api.multiavatar.com/45678945"; //open source avatar api

  // // eslint-disable-next-line
  const navigate = useNavigate();
  const [avatars, SetAvatar] = useState([]);
  // // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  useEffect(()=>{
    if(!localStorage.getItem('chat-app-user')){
      navigate('/login');
    }
    // //eslint-disable-next-line
  }, []);

  const setProfilePic = async ()=> {
    if(selectedAvatar === undefined){
      toast.error("Please select your favorite avatar")
    }
    else{
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
    
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if(data.isSet){
        user.isAvatarImgSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate('/');
      }
      else{
        toast.error("Something went wrong.. Please try again!")
      }
    }
  };

  const apiQueue =  new pQueue({concurrency: 1}); // Limit to 1 concurrent request

  useEffect(() => {
    async function fetchData(){
    const data = [];
      for(let i=0; i<4; i++){
        await new Promise(resolve => setTimeout(resolve, 1000));
        apiQueue.add(() => axios.get(`${api}/${Math.round(Math.random()*1000 )}`))
        .then((image) => {
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"))
      })
      }
      await apiQueue.onIdle();
      SetAvatar(data);
      setIsLoading(false);
    }
    fetchData();
    // //eslint-disable-next-line
  }, []);


  return <>
    {
      isLoading ? <Container>
        <img src={loader} alt="loader" className='loader' />
      </Container> : (
    <Container> 
      <div className="title-container">
        <h1> Pick an avatar as your profile picture</h1>
      </div>
      <div className="avatars">
        {
           avatars.map((avatar, index)=>{
            return (
              <div 
              key={index} 
              className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>

              <img src={`data:image/svg+xml;base64,${avatar} `} alt='Avatar'
              onClick={ ()=> setSelectedAvatar(index)}/>
              </div>
            )
           })
        }
      </div>

<button className='submit-btn' onClick={setProfilePic}> Set as Profile picture</button>
    </Container>
    )
  }
    </>

}


const Container = styled.div`
display:flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 3rem;
background-color: #131324;
height: 100vh;
width:100vw;

.loader{
  max-inline-size: 100%
}
.title-container{
  h1{
    color: white;
  }
}
.avatars{
  display: flex;
  gap: 2rem;
  .avatar{
    border: 0.4rem solid transparent;
    padding: 0.4rem;
    border-radius: 5rem;
    justify-content: center;
    align-items: center;
    transition: 0.5s ease-in-out;
    img{
      height: 6rem;
    }
  }
  .selected{
    border: 0.4rem solid #4e0eff;
  }
}
  .submit-btn{
    background-color: #997af0;
    color: white;
    height: 2rem;
    width: 15rem;
    padding 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover{
      background-color: #4e0eff;
    } 
  }
`;

export default SetAvatar
