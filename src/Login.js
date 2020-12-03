import React from 'react';
import './Login.css';
import {Button} from '@material-ui/core';
import { auth, provider } from './firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Login() {
    const [{},dispatch]=useStateValue();

    const signIn=()=>{
        auth.signInWithPopup(provider)
        .then((result)=>{
            dispatch({
                type:actionTypes.SET_USER,
                user:result.user,
            });
        })
        .catch((err)=>alert(err.message))
    };
    return (
        <div className='login'>
            <div className='login__container'>
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/897px-WhatsApp.svg.png'></img>
            
            <div className='login__text'>
                <h2>Sign in to Whatsapp</h2>
            </div>
            <Button onClick={signIn}>Sign In with Google</Button> 
            </div>
        </div>
    )
}

export default Login
