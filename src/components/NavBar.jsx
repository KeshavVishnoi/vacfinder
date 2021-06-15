// import { useState } from 'react';
const NavBar = ({button, setButton}) => {
    

    const toggleButton = () => {
        setButton(!button);
    }

    return (
        <nav className="navigation">
            <div className="container">
                <div>
                 <h1 id="logo"> <span className="syringe-icon"></span> VacFinder</h1>
                <span className="tagline">Your needle awaits</span>
                </div>
                {
                    button  ? <button className="btn btn-find" onClick={toggleButton}>Find By Pincode</button> : <button className="btn btn-find" onClick={toggleButton}>Find By State</button>
                }
                
             </div>

        </nav>
    )
}
export default NavBar;