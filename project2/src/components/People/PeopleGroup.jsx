import PeopleModal from './PeopleModal';

const PeopleGroup = ({ pepGroup }) => {
    return (
        <div className="people-list">
            {pepGroup.map(person => (
                <div key={person.username} className="person-card">
                    <img src={person.imagePath} alt={person.name} />
                    <h3>{person.name}</h3>
                    <p>{person.title}</p>
                    <PeopleModal person={person} />
                </div>
            ))}
        </div>
    );
};

export default PeopleGroup;