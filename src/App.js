import { useState } from 'react';
import Finder from './components/Finder';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import FinderPincode from './components/FinderPincode';
function App() {
  const [button, setButton] = useState(true);
  return (
    <div className="App">
      
      <NavBar button={button} setButton={setButton}/>
      <div className="bga"></div>
      {button ?  <Finder /> : <FinderPincode />}
     <Footer />
    </div>
  );
}

export default App;
