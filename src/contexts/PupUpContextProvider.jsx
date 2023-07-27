import {useState,createContext, useEffect} from 'react';
import { FaTimes as CancelIcon } from 'react-icons/fa';
import React from 'react'
import { styled } from 'styled-components';


export const PupUpContext = createContext({});

const PupUpContextProvider = ({children}) => {
    const [show_modal,set_show_modal] = useState(false);
    const [modal_content,set_modal_content] = useState(<></>);
    const value = {set_modal_content,set_show_modal}
    useEffect(()=>{
        return ()=> set_modal_content(<></>);
    },[]);
  return (
    <>
    <PupUpContext.Provider value={value}>
        { show_modal
        ?
            <Wrapper>
                <section>
                    <span onClick={()=>set_show_modal(false)}>
                        <CancelIcon />
                    </span>
                    <div className='modal-content'>
                        {modal_content}
                    </div>
                </section>
            </Wrapper>
        :<></>
        }
        {children}
    </PupUpContext.Provider>
    </>
  )
}

export default PupUpContextProvider;

const Wrapper = styled.aside`
    width: 100%;
    height:100vh;
    position: fixed;
    left:0;top:0;
    background-color: rgba(0,0,0,0.2);
    z-index: 9000;
    display: flex;
    justify-content: center;
    padding-top:40px;
    & > section{
        width:fit-content;
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: flex-end;
        & > span{
            color:white;
            width:40px;
            height:40px;
            display:flex;
            border-radius: 50%;
            background-color: rgba(255,255,255,0.3);
            justify-content: center;
            align-items:center;
            font-size:35px;
            cursor:pointer;
        }
    }
    & .modal-content{
        background-color: #fff;
        box-shadow: 2px 2px 6px 2px rgba(0,0,0,0.2);
        padding:20px;
        border-radius: 10px;
    }

`