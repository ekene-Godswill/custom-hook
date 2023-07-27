import React from 'react'
import { styled } from 'styled-components';
import  useApp  from '../hooks/useApp';
import usePupup from '../hooks/usePupup';
import ViewUser from '../Modal/ViewUser';
import AddUser from '../Modal/AddUser';


const Users = () => {
  const {data:{users_list}} = useApp();
  const {set_show_modal,set_modal_content} = usePupup();
  const handleViewUser = (user) =>{
      set_modal_content(<ViewUser data={user}/>);
      set_show_modal(true);
  }
  const handleAddUser = () =>{
      set_modal_content(<AddUser />);
      set_show_modal(true);
  }
  return (
    <>
      <Section>
        <button onClick={handleAddUser}>Add New User</button>
      </Section>
      <Table>
        <div>
          <span>First name</span>
          <span>Last name</span>
          <span>Gender</span>
          <span>Email</span>
          <span>Address</span>
        </div>
        <section>
          {users_list && users_list.length > 0 && users_list.map(({id,first_name,last_name,gender,address,username})=>  <div key={id} onClick={()=>handleViewUser({id,first_name,last_name,gender,address,username})}>
            <div>{first_name}</div>
            <div>{last_name}</div>
            <div>{gender}</div>
            <div>{username}</div>
            <div>{address}</div>
          </div>
          )}
        
        </section>

      </Table>
    </>
  )
}

export default Users

const Section = styled.section`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  & > button{
    background-color: #811eb8;
    color:white;
    border:none;
    border-radius: 5px;
    padding:15px 30px;
    cursor: pointer;
  }
`

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