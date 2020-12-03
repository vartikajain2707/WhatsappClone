import React ,{useEffect,useState} from 'react';
import './Chat.css';
import {Avatar, IconButton} from  '@material-ui/core';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import InsertEmoticonOutlinedIcon from '@material-ui/icons/InsertEmoticonOutlined';
import MicIcon from '@material-ui/icons/Mic';
import {useParams} from 'react-router-dom';
import db from './firebase';
import firebase from 'firebase';
import {useStateValue} from './StateProvider'; 

function Chat() {
    const [seed,setSeed]=useState('');
    const [input, setInput]=useState('');
    const { roomid } =useParams();
    const [roomName,setRoomName]=useState('');
    const [messages,setMessages]=useState([]);
    const [{user},dispatch]=useStateValue();


    useEffect(()=>{
        if (roomid){
            db.collection('rooms')
            .doc(roomid)
            .onSnapshot((snapshot)=>setRoomName(snapshot.data().name))

            db.collection('rooms').doc(roomid).collection('messages').orderBy('timestamp','asc').onSnapshot((snapshot)=>setMessages(snapshot.docs.map((doc)=>doc.data()))
            );
        }
    },[roomid]);

    

    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000));
    },[roomid]);

    const sendMessage=(e)=>{
        e.preventDefault();
        setInput('');
        db.collection('rooms').doc(roomid).collection('messages').add({
            message:input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        })
    }
    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar  src={`https://avatars.dicebear.com/api/human/${seed}.svg`}></Avatar>
                <div className='chat__headerInfo'>
                    <h3>{roomName}</h3>
                    <p>Last Seen {""}
                    {
                        new Date(
                            messages[messages.length -1]?.timestamp?.toDate()
                        ).toUTCString()
                    } 
                    </p>
                </div>
                <div className='chat__headerRight'>
                    <IconButton>
                        <SearchOutlined></SearchOutlined>
                    </IconButton>
                    <IconButton>
                        <AttachFile></AttachFile>
                    </IconButton>
                    <IconButton>
                        <MoreVert></MoreVert>
                    </IconButton>
                </div>
            </div>
            <div className='chat__body'>
                {messages.map((message)=>(
                    <p className={`chat__message 
                    ${message.name===user.displayName && 'chat__receiver'}`}>
                    <span className='chat__name'>{message.name}</span>
                    {message.message}
                    <span className='chat__timestamp'>{new Date(message.timestamp ?.toDate()).toUTCString()}</span>
                    
                </p>
                ))}
                
                
            </div>
            <div className='chat__footer'>
                <InsertEmoticonOutlinedIcon></InsertEmoticonOutlinedIcon>
                <form>
                    <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder='Type a message'></input>
                    <button onClick={sendMessage} type='submit'>Send a message</button>
                </form>
                <MicIcon></MicIcon>
            </div>
        </div>
    )
}

export default Chat
