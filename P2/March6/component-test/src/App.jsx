//import hooks
import {useState} from 'react';

//import in our component
import Welcome from './components/funcComp.jsx'
import Box from './components/box.jsx';

//bring in our CSS
import './App.css'

//build this - a functional component!
function WelcomeInternal({ name }) {
  return <h1 className="myStyle">Hello - there {name}</h1>;
}

function App() {
  //build in my state!
  //const [getter, setter] = useState(init);
  //loaded is a var that flips the switch when I get data!
  const[loaded, setLoaded] = useState(false);
  //myObj is a var that holds my returned data!
  const[myObj, setMyObj] = useState();

  //define all my internal functions!
  const getData = () =>{
    console.log('in the middle of the function');
    setMyObj(
      {
        title:"React is so much fun!",
        description:"lots and lots of words, something meaningful, yada, yada ...",
        age:21,
        address:1234
       
      }
    );
    setLoaded(true);
  }

  //can i do a console.log
  console.log('in the middle of app');

  if (!loaded) return (
    //console.log('fd') No!
    <>
    {console.log('test inside of return!')}
      <h1 >
        Ben's First React Project!
      </h1>

      <button onClick={getData}>Get the data!</button>
    </>
  )

  return(
    <>
      <h1>we now have data</h1>
      <h3>{myObj.title}</h3>
      <h3>{myObj.description}</h3>
      <Box age={myObj.age} address={{myObj}}/>
    </>
  )
}

export default App
