import { useState, useEffect } from 'react';
import './App.css';
import getData from './util/GetData.js';
import NavMenu from './components/NavMenu.jsx';
import AboutSection from './components/About/AboutSection.jsx';
import DegreesTabs from './components/Degrees/DegreesTabs.jsx';
import MinorCourses from './components/Minors/MinorCourses.jsx';
import EmploymentStats from './components/Employment/EmploymentStats.jsx';
import PeopleTabs from './components/People/PeopleTabs.jsx';
import Footer from './components/Footer.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

const App = () => {
    const [loadMain, setLoadMain] = useState(false);
    const [aboutData, setAboutData] = useState(null);

    useEffect(() => {
        getData('about/')
            .then((data) => {
                setAboutData(data);
                setLoadMain(true);
            });
    }, []);

    useEffect(() => {
        // Handle initial scroll if there's a hash in the URL
        const handleInitialScroll = () => {
            const hash = window.location.hash.substring(1);
            if (hash) {
                const element = document.getElementById(hash);
                if (element) {
                    setTimeout(() => {
                        element.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300);
                }
            }
        };

        if (loadMain) {
            handleInitialScroll();
        }
    }, [loadMain]);

    if (!loadMain) return (
        <div>
            <div className="stick">
                <h1>iSchool Portal</h1>
                <NavMenu />
            </div>
            <div className="App">
                <h1>Loading...</h1>
            </div>
            <Footer />
        </div>
    );

    return (
        <div>
            <div className="stick">
                <h1>iSchool Portal</h1>
                <NavMenu />
            </div>
            <div className="App">
                <ErrorBoundary>
                    <AboutSection data={aboutData} />
                    <DegreesTabs />
                    <MinorCourses />
                    <EmploymentStats />
                    <PeopleTabs />
                </ErrorBoundary>
            </div>
            <Footer />
        </div>
    );
};

export default App;