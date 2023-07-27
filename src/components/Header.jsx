import React,{useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {BsPersonCircle as ProfileIcon} from 'react-icons/bs';
import { styled } from 'styled-components';
import  useApp  from '../hooks/useApp';

const Header = () => {
    const {user,set_user} = useApp();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!user){
            navigate('/login');
        }
    },[])

    const handleLogout = ()=>{
        localStorage.removeItem('user');
        set_user(null);
        navigate("/login");

    }
  return (
    <Wrapper>
        <a>
            <img src="" width="60" />
        </a>
        <nav>
            <a onClick={handleLogout}>
                <ProfileIcon />
                {user?.first_name}
            </a>
        </nav>
    </Wrapper>
  )
}

export default Header

const Wrapper = styled.header`
    display: flex;
    background-color: rgb(70,30,80);
    justify-content: space-between;
    padding:15px 30px;
    gap:30px;
    position: fixed;
    top:0;
    left:0;
    width:100%;
    
    &  a{
    color:white;
    cursor: pointer;
    display: flex;
    gap:5px;
    align-items: center;
  } 

`
