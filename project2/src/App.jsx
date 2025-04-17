//import, css, any react state/hook/other
import { useState, useEffect } from 'react';
import './App.css';

//import components
import NavMenu from './components/NavMenu.jsx';
import AboutSection from './components/About/AboutSection.jsx';
import DegreesTabs from './components/Degrees/DegreesTabs.jsx';
import MinorCourses from './components/Minors/MinorCourses.jsx';
import EmploymentStats from './components/Employment/EmploymentStats.jsx';
import PeopleTabs from './components/People/PeopleTabs.jsx';
import Footer from './components/Footer.jsx';

//get my utils
import getData from './util/GetData.js';

const App = () => {
    //state vars
    const [loadMain, setLoadMain] = useState(false);
    const [aboutData, setAboutData] = useState(null);

    //get about data
    useEffect(()=>{
        getData('about/')
            .then((data)=>{
                console.log('got about', data);
                setAboutData(data);
                setLoadMain(true);
            });
    },[]);

    if(!loadMain) return (
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
    )

    return(
        <div>
            <div className="stick">
                <h1>iSchool Portal</h1>
                <NavMenu />
            </div>
            <div className="App">
                <section id="about">
                    <AboutSection data={aboutData} />
                </section>
                <section id="degrees">
                    <DegreesTabs />
                </section>
                <section id="minors">
                    <MinorCourses />
                </section>
                <section id="employment">
                    <EmploymentStats />
                </section>
                <section id="people">
                    <PeopleTabs />
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default App;