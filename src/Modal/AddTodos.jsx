import React,{useState} from 'react'
import { styled } from 'styled-components';
import usePopup from '../hooks/usePupup';
import useApp from '../hooks/useApp';
const AddTask = () => {
  const  [disabled,set_disabled] = useState(false);
  const [name,set_name] = useState('');
  const [description,set_description] = useState('');
  const [date,set_date] = useState('2023-01-01');
  const [completed,set_completed] = useState('');
  const {set_show_modal} = usePopup();
  const {set_data,data} = useApp();

  const handleAdd = (e)=>{
    e.preventDefault();
  
    const body = {name,description,date,completed}
    console.log('body',body)
    if(name&&description&&date&&completed){
       
        fetch(`http://localhost:3500/todos`,{
            method:"POST",
            headers:{
                "Content-type":"application/json",
            },
            body:JSON.stringify(body)
        })
        .then(res => res.json())
        .then(res2 => {
           
            set_data({...data,tasks_list:[res2,...data.tasks_list]})
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
                <input type="text" value={name} placeholder="Name" onChange={(e)=>set_name(e.target.value)}  />
            </div>
            <div>
                <textarea rows="6" value={description} placeholder="Description" onChange={(e)=>set_description(e.target.value)} />
            </div>
            <div>
                Completed:
                <input type="checkbox" checked={completed} onChange={()=>set_completed(!completed)} />
            </div>
            <div>
                <input type="date" value={date} onChange={(e)=>set_date(e.target.value)} />
            </div>
            
            <p>
                <button disabled={disabled}>Add Task</button>
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
            & > textarea{
                width:100%;
                padding:8px 10px;
                border-radius: 5px;
                outline:none;
                border:1px solid lightgray;
                resize:vertical;
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
export default AddTask;