import { useState, useEffect } from "react"

import './People.css'
import getData from "../util/GetData";
//import getData from "../util/GetData.js"

const People = () =>{
    //const [getter,setter]= useState(init);
    const [people, setPeople] = useState();
    const [loaded, setLoaded] = useState(false);

    //go get data
    useEffect( () =>{
        getData('people/')
        .then((json)=>{
            console.log('people got: ', json);
            setPeople(json);
            setLoaded(json);
        })
    }, []);


 
    //render without the people data
    if (!loaded) return(
        <h1>Loading People Data..</h1>
    )

    return(
        <>
            <h1>{people.title}</h1>
            <h3>{people.subTitle}</h3>
            {/* {How do we get all the people to show} */}
            <div className="peopleList">
                {people.faculty.map( (p)=>
                    <div className="peopleListItem">
                        <img alt="person" src={p.imagePath}></img>
                        <h3>{p.name}</h3>
                    </div>
                )}
                
            </div>
            <div className="peopleList">
                {people.staff.map( (p)=>
                    <div className="peopleListItem">
                        <img alt="person" src={p.imagePath}></img>
                        <h3>{p.name}</h3>
                    </div>
                )}
                
            </div>
        </>
    )
}
export default People