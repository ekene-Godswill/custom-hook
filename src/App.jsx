import './App.css';
import { createContext, useEffect, useState } from 'react';
import {Routes,Route} from 'react-router-dom';
import {Login,Dashboard} from './pages';


export const AppContext = createContext({});

function App() {
  const [user,set_user] = useState({});
  const [data,set_data] = useState({
    users_list:[],
    tasks_list:[]
  })

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
        set_data({
          users_list:temp_users,
          tasks_list:temp_todos
        })
     })
  },[])
   
  

  return (
    <>
    <AppContext.Provider value={{user,set_user,data}}>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login/*' element={<Login />} />
        <Route path='/dashboard/*' element={<Dashboard  />} />
      </Routes>
    </AppContext.Provider>
    </>
  )
}

export default App
