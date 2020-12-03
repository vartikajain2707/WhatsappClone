import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat.js';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Login from './Login';
import {useStateValue} from './StateProvider';



function App() {
  const [{user},dispatch]=useStateValue();

  return (
    <div className="app">
      {!user?(
        <Login></Login>
      ):(
        <div className='app__body'>
                <Router>
                  <Sidebar></Sidebar> 
                  <Switch>
                    
                    <Route path='/rooms/:roomid'>
                      <Chat></Chat>
                    </Route>
                    <Route path='/'>
                      <Chat></Chat>
                    </Route>
                    
                    
                  </Switch>
                </Router>
                

        </div>
      )}
      
    </div>
  );
}

export default App;
