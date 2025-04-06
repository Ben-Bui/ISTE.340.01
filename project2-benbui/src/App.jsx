import { useState } from 'react';
import './App.css';
import About from './components/About';
import Degrees from './components/Degrees';
import Minors from './components/Minors';
import Employment from './components/Employment';
import People from './components/People';

const App = () => {
    const [activeTab, setActiveTab] = useState('about');

    return (
        <div className="app-container">
            <header className="stick">
                <h1>iSchool Portal</h1>
                <nav className="menu">
                    <button onClick={() => setActiveTab('about')}>About</button>
                    <button onClick={() => setActiveTab('degrees')}>Degrees</button>
                    <button onClick={() => setActiveTab('minors')}>Minors</button>
                    <button onClick={() => setActiveTab('employment')}>Employment</button>
                    <button onClick={() => setActiveTab('people')}>People</button>
                </nav>
            </header>

            <main>
                {activeTab === 'about' && <About />}
                {activeTab === 'degrees' && <Degrees />}
                {activeTab === 'minors' && <Minors />}
                {activeTab === 'employment' && <Employment />}
                {activeTab === 'people' && <People />}
            </main>
        </div>
    );
};

export default App;