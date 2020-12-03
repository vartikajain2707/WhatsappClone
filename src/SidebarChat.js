import React, {useState, useEffect} from 'react';
import './SidebarChat.css';
import {Avatar} from  '@material-ui/core';
import db from './firebase';
import {Link} from 'react-router-dom';



function SidebarChat({id, name,addNewChat}) {
    const [seed,setSeed]=useState('');
    const [messages,setMessages]=useState('');

    useEffect(()=>{
        if(id){
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot((snapshot)=>
                setMessages(snapshot.docs.map((doc)=>doc.data()))
            );
        }
    },[id]);
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000));
    },[]);

    const createChat=()=>{
        const roomName=prompt('Add a New Room');
        if (roomName){
            db.collection('rooms').add({
                name:roomName,
            })
        }
    };

    return !addNewChat ? (
        
        <div className='sidebarChat'>
            <Link to={`/rooms/${id}`}>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}></Avatar>
                <div className='sidebarChat__Info'>
                    <h2>{name}</h2>
                    <p> {messages[0]?.message} </p>
                </div>
            </Link>
            
        </div>
    ):(
        <div onClick={createChat} className='sidebarChat'>
            <h2>Add New Chat</h2>
        </div>
    )
}

export default SidebarChat
