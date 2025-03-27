//import 
import PeopleModal from "./PeopleModal.jsx";

const PeopleGroup=({title, pepGroup})=>{

    return(
        <>
            <h1>{title}</h1>
            <div className="peopleList" >
                {pepGroup.map( (p)=>
                    <div className="peopleListItem">
                        <img alt="person" src={p.imagePath}></img>
                        <h3>{p.name}</h3>
                        <PeopleModal {...p}/>
                    </div>
                )}

            </div>
        </>
    );
}

export default PeopleGroup;