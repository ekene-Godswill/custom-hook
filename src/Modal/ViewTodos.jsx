import React,{useState} from 'react'
import { styled } from 'styled-components';
import {FaTrash as DeleteIcon,FaEdit as EditIcon } from 'react-icons/fa';
import usePopup from '../hooks/usePupup';
import useApp from '../hooks/useApp';
const ViewTodos = ({data:user_data}) => {
  const  [disabled,set_disabled] = useState(true);
  const [name,set_name] = useState(user_data.name);
  const [description,set_description] = useState(user_data.description);
  const [date,set_date] = useState(user_data.date);
  const [completed,set_completed] = useState(user_data.completed);
  const {set_show_modal} = usePopup();
  const {set_data,data} = useApp();

  const handleEdit = (e)=>{
    e.preventDefault();
    console.log(name,description,date,completed,
        'data')
    if(name&&description&&date){
        fetch(`http://localhost:3500/todos/${user_data.id}`,{
            method:"PATCH",
            headers:{
                "Content-type":"application/json",
            },
            body:JSON.stringify({name,description,completed,date})
        })
        .then(res => {
            console.log(res,'res')
            return res.json()
        })
        .then(res2 => {
            const result = data.tasks_list.map(eTodo=> eTodo.id== user_data.id?res2:eTodo);
            set_data({...data,tasks_list:result})
            
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
    fetch(`http://localhost:3500/todos/${user_data.id}`,{
        method:"Delete",
        headers:{
            "Content-type":"application/json",
        },
    }).then(res => res.json())
    .then(res2 => {
        fetch(`http://localhost:3500/todos`,{
                method:"GET",
                headers:{
                    "Content-type":"application/json",
                },
            }).then(res => res.json())
            .then(result => {
                set_data({...data,tasks_list:result})
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
                <input type="text" value={name} disabled={disabled} onChange={(e)=>set_name(e.target.value)}  />
            </div>
            <div>
                <input type="text" value={description} disabled={disabled} onChange={(e)=>set_description(e.target.value)} />
            </div>
            <div>
                <input type="date" value={date} disabled={disabled} onChange={(e)=>set_date(e.target.value)} />
            </div>
            <div>
                <input type="checkbox" checked={completed} disabled={disabled} onChange={(e)=>set_completed(!completed)} />
            </div>
            <p>
                <button disabled={disabled}>Edit Task</button>
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
export default ViewTodos;