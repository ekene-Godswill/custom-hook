import React,{useState} from 'react'
import { styled } from 'styled-components';
import usePopup from '../hooks/usePupup';
import useApp from '../hooks/useApp';
const AddUser = () => {
  const  [disabled,set_disabled] = useState(false);
  const [first_name,set_first_name] = useState('');
  const [last_name,set_last_name] = useState('');
  const [address,set_address] = useState('');
  const [username,set_username] = useState('');
  const [gender,set_gender] = useState(0);
  const {set_show_modal} = usePopup();
  const {set_data,data} = useApp();

  const handleAdd = (e)=>{
    e.preventDefault();
  
    const body = {gender,username,first_name,last_name,address}
    console.log('body',body)
    if(first_name,last_name,address,username,gender){
       
        fetch(`http://localhost:3500/users`,{
            method:"POST",
            headers:{
                "Content-type":"application/json",
            },
            body:JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res2 => {
           
            set_data({...data,users_list:[res2,...data.users_list]})
        })
        .catch(err => {
            console.log(err,"err")
        })
        .finally((data,err)=>{
            set_show_modal(false);
        })
       

        

        
    }
  }
  
  return (
    <Wrapper>
        <form onSubmit={handleAdd}>
            <h2>Add New User Info</h2>
            <div>
                <input type="text" value={first_name} placeholder="First Name" onChange={(e)=>set_first_name(e.target.value)}  />
            </div>
            <div>
                <input type="text" value={last_name} placeholder="Last Name" onChange={(e)=>set_last_name(e.target.value)} />
            </div>
            <div>
                <input type="email" value={username} placeholder="Email" onChange={(e)=>set_username(e.target.value)} />
            </div>
            <div>
                <select value={gender} onChange={(e)=>set_gender(e.target.value)}>
                    <option value="0">Select Gender ...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            <div>
                <input type="text" value={address} placeholder="Contact Address" onChange={(e)=>set_address(e.target.value)} />
            </div>
            
            <p>
                <button disabled={disabled}>Add User</button>
            </p>

        </form>
    </Wrapper>
  )
}



const Wrapper = styled.div`
    width:500px ;
    & > form{
        & > div{
            display: flex;
            width:100%;
            margin-top:20px;
            & > input,& > select{
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
export default AddUser;