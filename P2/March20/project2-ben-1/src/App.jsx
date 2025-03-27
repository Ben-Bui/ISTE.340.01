//import, css, any react state/hook/other
//import React from 'react';
//React.useState;
import { useState, useEffect } from 'react';

//import components
import People from './components/People.jsx'

//get the css
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PeopleTabs from './components/PeopleTabs.jsx';

//get my utils
import getData from './util/GetData.js'; 
import BootAcc from './components/BootAcc.jsx';

const App=()=>{
  //set up my state vars
  //const [var, setVar] = useState(init);
  const [loadAbout, setLoadAbout] = useState(false);
  const [aboutObj, setAboutObj] = useState(null);

  useEffect(()=>{
    getData('about/')
      .then((json)=>{
        console.log('worked', json);
        //load the data into the obj
        setAboutObj(json);
        //flip the bit on loaded
        setLoadAbout(true);
      })
  },[]);

  if(!loadAbout) return(
    <div>
      <div className="stick">
        <h1>Welcome to the iSchool Website!</h1>
        <div>...Menu Component...</div>
      </div>
      <div className="App">
        <h1>Loading...</h1>
      </div>
    </div>
  )

  return(
    <div>
      <div className='stick'>
        <h1>Welcome to the iSchool Website!</h1>
        <div>...Menu Component...</div>
      </div>
      <div className='App'>
        <div className='About'></div>
        <h3>{aboutObj.title}</h3>
        <h6>{aboutObj.description}</h6>
        <div className='quote'>{aboutObj.quote}</div>
        <h5>--about a newly hired Co-op--</h5>
        
        <hr/>
        <PeopleTabs/>
        {/* <BootAcc/> */}
        {/* {First, let's build something to grab people} */}
        {/* <People/> */}
      </div>
    </div>
  )
}

export default App;