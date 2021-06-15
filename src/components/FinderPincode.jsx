import {useState, useRef } from "react";
import Slot from "./Slot";
import axios from "axios";
const FinderPincode = () => {

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
   
    const [slots, setSlots] = useState([]);
    const [renderSlot, setRenderSlot] = useState(false);
    const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?`;
    

    const date = useRef();
    const pin_code = useRef();

    const findSlots = async event => {
        event.preventDefault();
        // console.log(formatDate(date.current.value) + ' ' + pin_code.current.value);
        const pin_min_msg = "Pin Code must be 6 digits long";
        try{
            if(pin_code.current.value.length < 6) throw new Error(pin_min_msg);
            const data = await axios(url + ('pincode='+ pin_code.current.value + '&date=' + formatDate(date.current.value)));
        console.log(data.data);
        
        if(data.data.sessions.length > 0){
            setSlots(data.data.sessions);
        }
        setRenderSlot(true);
        }catch(error) {
            
            if(error.message === pin_min_msg) alert("Pin must be 6 digits long") ;
            else if(error.response.status === 400) alert("Please enter Valid Pin Code");
           
        }
    }

    function formatDate (input) {
        var datePart = input.match(/\d+/g),
        year = datePart[0].substring(), 
        month = datePart[1], day = datePart[2];
      
        return day+'-'+month+'-'+year;
      }


    return (
        <>
        <form onSubmit={findSlots}>
            <div className="input-container">
            <h2>Search for a nearby vaccination centre </h2>
           

                <label htmlFor="pincode">Enter Pin Code</label>
                <input ref={pin_code} minLength="6" type="number"  id="pincode" placeholder="PIN" required/>    

                <label htmlFor="date">Choose Date</label>
                <input ref={date} min= {setDate()} defaultValue= {setDate()} type="date" name="date" id="date"  required  />
                <button type="submit" className="btn btn-find"> <span className="search-icon"></span> Find Centre By PinCode</button>
               
            </div>
        </form>
       <Slot isData={renderSlot} slots={slots}/> 
            
       
    </>
    )
}

export default FinderPincode;