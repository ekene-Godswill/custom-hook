import React from 'react'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import {FaUsers as UserIcon} from 'react-icons/fa';
import {BsMastodon as TodoIcon} from 'react-icons/bs';
import useApp  from '../hooks/useApp';


const Home = () => {
  const {data} = useApp();
  return (
    <Wrapper>
      <Link to="users">
        <span>
          <UserIcon/>
        </span>
        <div>
          <div>USERS</div>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, tenetur. Autem fugiat sapiente, odit laborum eveniet quis incidunt, facere vitae sed, unde omnis! Dolores facilis beatae debitis voluptate velit consequuntur.</p>
          <span>{data.users_list.length} Total Users</span>
        </div>
      
      </Link>
      <Link to="todos">
        <span>
          <TodoIcon/>
        </span>
        <div>
          <div>TASK</div>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, tenetur. Autem fugiat sapiente, odit laborum eveniet quis incidunt, facere vitae sed, unde omnis! Dolores facilis beatae debitis voluptate velit consequuntur.
          </p>
          <span>{data.tasks_list.length} Total Tasks</span>
        </div>
       
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  gap:30px;
  padding-top:50px;
  & > a{
    flex:1;
    background-color: #fff;
    padding:20px;
    box-shadow: 0px 0px 5px 2px rgba(0,0,0,0.2);
    border-radius: 8px;
    display:flex;
    gap:10px;
    text-decoration:none;
    & > span{
      font-size:40px;
      color:#811eb8;
    }
    & > div{
      color:black;
      & > div{
        font-weight: bold;
        font-size:20px;
        color:#811eb8;
      }
    }


  }
`





export default Home