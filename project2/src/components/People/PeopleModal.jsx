import { useState } from 'react';

const PeopleModal = ({ person }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="people-modal-container">
            <button 
                className="modal-toggle-button"
                onClick={() => setShowModal(!showModal)}
            >
                {showModal ? 'Hide Details' : 'Show Details'}
            </button>
            
            {showModal && (
                <div className="people-modal">
                    <p><strong>Office:</strong> {person.office}</p>
                    <p><strong>Email:</strong> {person.email}</p>
                    <p><strong>Phone:</strong> {person.phone}</p>
                    {person.website && <p><strong>Website:</strong> <a href={person.website}>Link</a></p>}
                    <div dangerouslySetInnerHTML={{ __html: person.tagline }} />
                </div>
            )}
        </div>
    );
};

export default PeopleModal;