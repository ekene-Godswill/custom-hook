import React,{useState} from 'react'
import { styled } from 'styled-components';
import {FaTrash as DeleteIcon,FaEdit as EditIcon } from 'react-icons/fa';
import usePopup from '../hooks/usePupup';
import useApp from '../hooks/useApp';
const ViewUser = ({data:user_data}) => {
  const  [disabled,set_disabled] = useState(true);
  const [first_name,set_first_name] = useState(user_data.first_name);
  const [last_name,set_last_name] = useState(user_data.last_name);
  const [address,set_address] = useState(user_data.address);
  const {set_show_modal} = usePopup();
  const {set_data,data} = useApp();

  const handleEdit = (e)=>{
    e.preventDefault();
    if(first_name,last_name,address){
        fetch(`http://localhost:3500/users/${user_data.id}`,{
            method:"PATCH",
            headers:{
                "Content-type":"application/json",
            },
            body:JSON.stringify({first_name,last_name,address})
        })
        .then(res => res.json())
        .then(res2 => {
            fetch(`http://localhost:3500/users`,{
                method:"GET",
                headers:{
                    "Content-type":"application/json",
                },
            }).then(res => res.json())
            .then(result => {
                set_data({...data,users_list:result})
            })
        })
        .catch(err => {
            console.log(err,"err")
        })
        .finally((data,err)=>{
            set_show_modal(false);
        })
       

        

        
    }
  }
  const handleDelete = () =>{
    fetch(`http://localhost:3500/users/${user_data.id}`,{
        method:"Delete",
        headers:{
            "Content-type":"application/json",
        },
    }).then(res => res.json())
    .then(res2 => {
        fetch(`http://localhost:3500/users`,{
                method:"GET",
                headers:{
                    "Content-type":"application/json",
                },
            }).then(res => res.json())
            .then(result => {
                set_data({...data,users_list:result})
            })
        
    })
    .catch(err => console.log(err,'err'))
    .finally((data,err)=>{
        set_show_modal(false);
    })
  }
  return (
    <Wrapper>
        <div>
            <span>{user_data.username || "Username"}</span>
            <span onClick={()=>set_disabled(false)}><EditIcon/></span>
            <span onClick={handleDelete}><DeleteIcon/></span>
        </div>
        <form onSubmit={handleEdit}>
            <div>
                <input type="text" value={first_name} disabled={disabled} onChange={(e)=>set_first_name(e.target.value)}  />
            </div>
            <div>
                <input type="text" value={last_name} disabled={disabled} onChange={(e)=>set_last_name(e.target.value)} />
            </div>
            <div>
                <input type="text" value={address} disabled={disabled} onChange={(e)=>set_address(e.target.value)} />
            </div>
            <p>
                <button disabled={disabled}>Edit User</button>
            </p>

        </form>
    </Wrapper>
  )
}



const Wrapper = styled.div`
    width:500px ;
    & > div{
        display: flex;
        align-items: center;
        margin:15px 0;
        & > span:first-of-type{
            margin-right:auto;
            font-weight: 500;
            font-size:22px;
        }
        & > span:nth-of-type(2){
            margin-right:20px;
        }
        & > span:not(:first-of-type){
            font-size:22px;
            cursor:pointer;
            color:gray;
            &:hover{
                color:#811eb8;
            }
        }
       
    }
    & > form{
        & > div{
            display: flex;
            width:100%;
            margin-top:20px;
            & > input{
                width:100%;
                padding:8px 10px;
                border-radius: 5px;
                outline:none;
                border:1px solid lightgray;
            }
        }
        & > p > button{
            background-color: #811eb8;
            color:white;
            padding:13px 30px;
            font-weight: 500;
            border:none;
            outline:none;
            border-radius: 8px;
            cursor:pointer;
            &:disabled{
                background-color: #ddd;
                cursor:not-allowed
            }
        }
    }


`
export default ViewUser;