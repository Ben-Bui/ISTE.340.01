import { useState } from 'react';
import Modal from 'react-modal';

const PeopleModal = ({ person }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <button 
                className="modal-toggle-button"
                onClick={() => setShowModal(true)}
            >
                Show Details
            </button>

            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        transform: 'translate(-50%, -50%)',
                        padding: '20px',
                        borderRadius: '8px',
                        maxWidth: '500px',
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    },
                }}
            >
                <h3>{person.name}</h3>
                <div>
                    <p><strong>Title:</strong> {person.title}</p>
                    <p><strong>Email:</strong> {person.email}</p>
                    <p><strong>Office:</strong> {person.office}</p>
                    {person.website && (
                        <p><strong>Website:</strong> <a href={person.website}>Link</a></p>
                    )}
                </div>
                <button onClick={() => setShowModal(false)}>
                    Close
                </button>
            </Modal>
        </div>
    );
};

Modal.setAppElement('#root');
export default PeopleModal;