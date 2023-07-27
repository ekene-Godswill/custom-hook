import './App.css';
import { useEffect } from 'react';
import {Routes,Route} from 'react-router-dom';
import {Login,Dashboard} from './pages';

import  useApp  from './hooks/useApp';

function App() {
  const {set_data} = useApp();

  useEffect(()=>{
     let fetch_users = fetch('http://localhost:3500/users')
     .then(res => res.json())
     .catch(err => err);
     let fetch_todos = fetch('http://localhost:3500/todos')
     .then(res => res.json())
     .catch(err => err);
     Promise.allSettled([fetch_users,fetch_todos])
     .then(data =>{
        let temp_users = data[0].value;
        let temp_todos = data[1].value;
        console.log(temp_todos,'todos');
        set_data({
          users_list:temp_users,
          tasks_list:temp_todos
        })
     })
  },[])
   
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login/*' element={<Login />} />
        <Route path='/dashboard/*' element={<Dashboard  />} />
      </Routes>
    </>
  )
}

export default App
