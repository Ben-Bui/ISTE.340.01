//import hooks

//import in our component
import Welcome from './components/funcComp.jsx'

//bring in our CSS
import './App.css'

//build this - a functional component!
function WelcomeInternal({ name }) {
  return <h1 className="myStyle">Hello - there {name}</h1>;
}

function App() {
  return (
    <>
      <h1 >
        Ben's First React Project!
      </h1>
      <WelcomeInternal name="Ben" />
      <Welcome name="Dean" job="talking" someStyle="otherStyle" />
      <Welcome name="Sam" job="boss" someStyle="myStyle" />
      <p>some test</p>
    </>
  )
}

export default App
