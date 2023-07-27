import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import  useApp  from '../hooks/useApp';
const Login = () => {
    const [username,set_username] = useState('');
    const [password,set_password] = useState('');
    const {set_user} = useApp();
    const navigate = useNavigate();
    const handleLogin = (e)=>{
        e.preventDefault();
        if(username && password){
            fetch(`http://localhost:3500/users?username=${username}&password=${password}`,{
                headers:{
                    "Content-type":"application/json"
                }
            }).then(res => res.json())
            .then(data =>{
                console.log(data,'data');
                if(data.length > 0){
                    alert("Login successfully");
                    localStorage.setItem('user',JSON.stringify(data[0]));
                    set_user(data[0]);
                    navigate('/dashboard');
                }else{
                    alert("Incorrect Username or Password");
                }
            })
            .catch(err =>{
                console.log(err,"error");
                alert("Check network connectivity and try again");
            })
        }

    }
  return (
    <div className='div-1'>
        <form onSubmit={handleLogin}>
            <div> Log in</div>
            <input type="text" value={username}  placeholder='username'
                onChange={(e)=>set_username(e.target.value)}
            />
            <input type="text" value={password} placeholder='password'
                onChange={(e)=>set_password(e.target.value)}
            />
            <button>login</button>
        </form>
        
    </div>
  )
}

export default Login