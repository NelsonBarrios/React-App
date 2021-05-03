import React from 'react';
import Band from '../components/Band';
import './Home.css';


function Home() {
    
    return (
        //Render Component Band List Group
        <div className="navbar">
            <Band />
        </div>
    )
}

export default Home;