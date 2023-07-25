import React from 'react'
import { styled } from 'styled-components';
import { useContext } from 'react';
import { AppContext } from '../App';

const Users = () => {
  const {data:{users_list}} = useContext(AppContext);
  return (
    <Table>
      <div>
        <span>First name</span>
        <span>Last name</span>
        <span>Gender</span>
        <span>Email</span>
        <span>Address</span>
      </div>
      <section>
        {users_list && users_list.length > 0 && users_list.map(({id,first_name,last_name,gender,address,username})=>  <div key={id}>
          <div>{first_name}</div>
          <div>{last_name}</div>
          <div>{gender}</div>
          <div>{username}</div>
          <div>{address}</div>
        </div>
        )}
      
      </section>

    </Table>
  )
}

export default Users


const Table = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 3px;
  background-color: white;

  & > div{
    display: grid;
    grid-template-columns: repeat(5,1fr);
    background-color: rgb(135, 197, 156);
    padding: 10px 0;
    gap: 5px;
      & > span{
      padding: 0 8px;
      color: white;

    }
  }
  
  & > section{
    padding: 0 0 20px 0px;
    display: grid;
    grid-template-columns: 1fr;
    gap:5px;
    &  > div{
      display: grid;
      grid-template-columns: repeat(5,1fr);
      cursor: pointer;
      padding:3px 0;
      gap: 5px;
      &:nth-child(even){
        background-color: #eee;
      }
      &:hover{
        background-color: rgba(130,180,130,0.3);
      }
      & > div{
        padding: 0 8px;
      }
    }
  }
  
  
`