import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import Axios from "axios";
import Slot from './Slot';

const Finder = props => {
    const [states, setStates] = useState(null);
    const [districts, setDistricts] = useState(null);
    const [district, setDistrict] = useState(); 
    const [renderSlot, setRenderSlot] = useState(false);
    const [slots, setSlots] = useState([]);
    const date = useRef();
    
    useEffect( () => {
        const source = Axios.CancelToken.source();
        // if(states !== null )document.getElementById("states").value = states[0];
        const getStates = async url => {
            try{
            const data = await axios(url , {cancelToken : source.token});
            setStates(data.data.states);
            // console.log(data.data);
            }catch(error) {
                if(Axios.isCancel(error))
                console.log(error);
                else throw error;
            }
        }
        getStates("https://cdn-api.co-vin.in/api/v2/admin/location/states");

        return () => {
            console.log("unmounted");
            source.cancel();
        }
    },[]);

    useEffect(() => { // sets District
        const district = document.getElementById("districts").value;
        setDistrict(district);
    },[districts]);

    useEffect(() => { //sets districts to first State's value
        const source = Axios.CancelToken.source();
        const states = document.getElementById("states").value;
        
            if(states) getDistricts("https://cdn-api.co-vin.in/api/v2/admin/location/districts/" + states, {cancelToken : source.token});
        
        return () => {
            source.cancel();
        }
    },[states]);

    

    const getDistricts = async (url, obj) => {
        try{
            const data = await axios(url, obj);
        setDistricts(data.data.districts);
        }catch(error){
            if(Axios.isCancel(error))
            console.log(error);
            else throw error;
        }
        // console.log(data.data.districts);
    }

    const printStates = () => {

        if(states !== null){
            
            return states.map((el,index) => {
                return (
                    <option key={index}  value={el.state_id} >{el.state_name}</option>
                );
            })
        }else 
        return [];
    }

    
    const printDistricts = () => {
        if(districts !== null){
            document.getElementById("date").disabled = false;
            return districts.map((el,index) => {
                return (
                    <option key={index} value={el.district_id} >{el.district_name}</option>
                );
            })
        }else 
        return [];
    }

     // tests
    const fetchDistricts = async event => {
        // event.preventDefault();
        const district_id = event.target.value;
        // alert(event.target.value );
        // console.log(event.target.value);
        getDistricts("https://cdn-api.co-vin.in/api/v2/admin/location/districts/" + district_id);
        

    }

    function formatDate (input) {
        var datePart = input.match(/\d+/g),
        year = datePart[0].substring(), 
        month = datePart[1], day = datePart[2];
      
        return day+'-'+month+'-'+year;
      }
      
      

    const findSlots = async event => {
        event.preventDefault();
        const finalDate = formatDate (date.current.value); // "18/01/10";
        const data = await axios(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district}&date=${finalDate }`);
        // console.log(data.data);
        if(data.data.sessions.length > 0){
            setSlots(data.data.sessions);
        }
        setRenderSlot(true);
        
        // console.log(date.current.value);
        // console.log(event.target);
    }

    const setDate = () => {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        if(dd<10){
                dd='0'+dd
            } 
            if(mm<10){
                mm='0'+mm
            } 

        today = yyyy+'-'+mm+'-'+dd;
        return today;
    }
    
    return (
    <>
        <form onSubmit={findSlots}>
            <div className="input-container">
                <h2>Search for a nearby vaccination centre </h2>

                <label htmlFor="states">Select State</label>
                <select className="select-menu" name="selectState" id="states" onChange={fetchDistricts}>
                    {printStates().map(el => el)}
                </select>

                <label htmlFor="districts">Select District</label>
                <select className="select-menu" name="selectDistrict" id="districts"  onChange={event => {
                    setDistrict(event.target.value);
                }}>
                    {printDistricts().map(el => el)}
                </select>
                
                <label htmlFor="date">Choose Date</label>
                <input ref={date} min= {setDate()} defaultValue= {setDate()} type="date" name="date" id="date"  required  disabled/>
                <button type="submit" className="btn btn-find"> <span className="search-icon"></span> Find Center By State</button>
            </div>
        </form>
        
        <Slot isData={renderSlot} slots={slots}/> 
            
       
    </>
    );
          
}


export default Finder;