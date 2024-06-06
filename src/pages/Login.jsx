import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logos.png";
import {toast} from 'react-toastify';
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  // useEffect(()=>{
  //   if(localStorage.getItem('chat-app-user')){
  //     navigate('/')
  //   }
  //   // eslint-disable-next-line
  // }, [])
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handleValidation()){
    
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      
      if(data.status === false){
        toast.error(data.msg);
      }
      if(data.status === true){
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    };
  };

  const handleValidation = () => {
    const { password, username } = values;

    if(username === ""){
      toast.error("Please fill the username field");
      return false;
    }
    else if(password === ""){
      toast.error("Please fill the password field");
      return false;
    }

    return true;
  }

  const handleChange = (event) => {
     setValues({...values,[event.target.name]: event.target.value});
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="logo">
            <img src={ Logo } alt="Chat Time Logo" />
            <h1>Chat Time</h1>
          </div>


          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit"> Login </button>
          <span> You don't have an account ? &nbsp; <Link to = "/signup"> Create an account </Link></span>
        </form>
      </FormContainer>
    </>
  );
}

const FormContainer = styled.div`

height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap:1rem;
aligh-items: center;
background-color: #131324;

.logo{
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;

  img{
    height: 5rem;
  }

  h1{
    color: white;
    text-transform: uppercase;
  }
}
form{
  display:flex;
  flex-direction: column;
  justify-conetnt: center;
  align-items: center;
  gap: 2rem;
  background-color: #00000076;
  border-radius: 2rem;
  padding: 3rem 5rem;

  input{
    background-color: transparent;
    padding:  1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    max-width: 20rem;
    &:focus{
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button{
    background-color: #997af0;
    color: white;
    height: 2rem;
    width: 10rem;
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
  span{
    color: white;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    a{
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
}
`;
export default Login;
