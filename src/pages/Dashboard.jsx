import React,{useEffect, useState} from 'react'
import Header from '../components/Header';
import { Route,Routes,Link,useLocation } from 'react-router-dom';
import {Users,Todos,Home} from '.';
import styled from 'styled-components';
import {BiSolidHomeSmile as HomeIcon} from 'react-icons/bi';
import {FaUsers as UserIcon} from 'react-icons/fa';
import {BsMastodon as TodoIcon} from 'react-icons/bs';
import {AiOutlineDoubleLeft as LeftIcon,AiOutlineDoubleRight as RightIcon} from 'react-icons/ai';

const LinkArray = [
   {name:"Dashboard",path:"/dashboard",icon:<HomeIcon />},
   {name:"Users",path:"users",icon:<UserIcon/>},
   {name:"Todos",path:"todos",icon:<TodoIcon/>},

]

const Dashboard = () => {
  const location = useLocation();
  const [active,set_active] = useState('dashboard');
  const [collapse,set_collapse] = useState(false);
  const computeClass = (name) =>active == name.toLowerCase()?'active':'';

   useEffect(()=>{
    const {pathname } = location;
    const lastPath = pathname.split('/').at(-1);
    // console.log(lastPath,"last")
    set_active(lastPath);

  },[location.pathname])
  return (
    <>
        <Header />
        <Wrapper>
          <Aside style={collapse?{width:"40px"}:{width:"220px"}}>
            <span onClick={()=>set_collapse(!collapse)}>
              {collapse?<RightIcon/>:<LeftIcon/>}
            </span>
            {LinkArray.map(({name,path,icon})=><Link key={name} to={path} className={computeClass(name)}><span>{icon}</span>{!collapse?name:""}</Link>
            )}
            
           
          </Aside>
          <section>
            <Routes>
              <Route index element={<Home />}/>
              <Route path="/users/*" element={<Users />}/>
              <Route path="/todos/*" element={<Todos />} />
            </Routes>
          </section>
        </Wrapper>
    </>
  )
}

export default Dashboard;

const Wrapper = styled.main`
  display:flex;
  position: fixed;
  top:46px;
  width: 100%;
  left:0;
  min-height: 100vh;
  & > section{
    width:100%;
    padding:15px 30px;
  }
`

const Aside = styled.aside`
    width:220px;
    flex-shrink: 0;
    background-color: #ededed;
    padding:20px 3px;
    display: flex;
    flex-direction: column;
    position:relative;
    transition: all 0.15s linear;
    box-shadow: -2px -5px 9px 5px rgba(0,0,0,0.3);
    gap:2px;
    & > span{
      position:relative;
      right:-20px;
      align-self: end;
      font-size:25px;
      display:flex;
      justify-content: center;
      align-items: center;
      width:36px;
      height: 36px;
      border-radius: 50%;
      background-color: #811eb8;
      color:white;
      cursor:pointer;
    }
    & > a{
      padding:10px 5px;
      background-color: transparent;
      cursor: pointer;
      text-decoration:none;
      font-weight: 500;
      color:black;
      display: flex;
      align-items: center;
      gap:5px;
      transition: all 0.15s linear;
      &:hover{
        background-color: #ddd;
        color:#811eb8;
      }
      &.active{
        background-color: #ddd !important;
        color:#811eb8 !important;
      }
      & > span{
        font-size:22px;
      }
    }
`
