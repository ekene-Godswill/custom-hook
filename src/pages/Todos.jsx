import React from 'react'
import styled from 'styled-components';
import useApp from '../hooks/useApp';
import usePupup from '../hooks/usePupup';
import AddTask from '../Modal/AddTodos';
import ViewTodos from '../Modal/ViewTodos';

const Todos = () => {
  const {data:{tasks_list}} = useApp();
  const {set_modal_content,set_show_modal} = usePupup();
  const handleAddTask = () =>{
      set_modal_content(<AddTask />);
      set_show_modal(true);
  }
  const showTask = (task) =>{
     set_modal_content(<ViewTodos data={task}/>);
     set_show_modal(true);

  }
  return (
    <Wrapper>
      <div>
        <button onClick={handleAddTask}>Add New Todod</button>
      </div>
      <Grid>
        {tasks_list && tasks_list.length > 0 ? tasks_list.map((eTask)=>
            <div key={eTask.id} onClick={()=>showTask(eTask)}>
              <div>{eTask.name}</div>
              <div>{eTask.description}</div>
              <div>{eTask.date}</div>
              <div>{eTask.completed?"Completed":"Incomplete"}</div>
            </div>
        ):<>NO TASK AVAILABLE</>}
      </Grid>
    </Wrapper>
  )
}

export default Todos;


const Wrapper = styled.section`
  & > div{
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
  }
`

const Grid = styled.section`
  display:grid;
  background-color: #fff;
  padding:20px 0;
  grid-template-columns: repeat(5,1fr);
  gap:20px;
  & > div{
    background-color: #ddd;
    padding:15px 10px;
    border-radius: 5px;
    cursor:pointer;
    &:hover{
      box-shadow: 2px 2px 6px 2px rgba(0,0,0,0.2);
    }
    & > div{
      margin:5px 0;
    }

  }
`