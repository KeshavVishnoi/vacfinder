import { useState } from "react";
import Finder from "./components/Finder";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import FinderPincode from "./components/FinderPincode";
function App() {
  const [button, setButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="App">
      <NavBar button={button} setButton={setButton} />
      <div className="bga"></div>
      {button ? (
        <Finder isLoading={isLoading} setIsLoading={setIsLoading} />
      ) : (
        <FinderPincode isLoading={isLoading} setIsLoading={setIsLoading} />
      )}
      <Footer />
    </div>
  );
}

export default App;
