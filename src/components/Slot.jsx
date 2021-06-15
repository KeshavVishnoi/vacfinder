const Slot = props => {
   

    const slots = props.slots;
    if(slots.length === 0 && props.isData === true){
        // console.log(slots);
        return <h2 className="no-avail">No Centers Available, Search for another date</h2>
    }

    if (props.isData){
       
        return (
            <>
            
            
            <h1 id="centres">Centres</h1>
            <div className="slot"  >
           { slots.map((slot, index) => {
             return(
                 
                 <div key={index}>
                        <h5><span className="normal-icon"></span> Center Name : {slot.name }</h5> 
                       <h5><span className="address-icon"></span> Center Address : {slot.address}</h5> 
                        <h5><span className="normal-icon"></span> State : {slot.state_name}</h5> 
                        <h5><span className="normal-icon"></span> District : {slot.district_name}</h5> 
                        <h5><span className="pin-icon"></span> Pin Code : {slot.pincode} </h5> 
                        <h5><span className="syringe-icon syringe--icon"></span> Vaccine : {slot.vaccine}</h5> 
                        <h5><span className="normal-icon"></span> Min Age : {slot.min_age_limit}</h5> 
                        <h5><span className="fee-icon"></span> Fee : {slot.fee}</h5> 
                        <h5><span className="avail-icon"></span> Availability : {slot.available_capacity}</h5> 
                        <h5><span className="avail-icon"></span> Availability DOSE 1: {slot.available_capacity_dose1}</h5> 
                        <h5><span className="avail-icon"></span> Availability DOSE 2: {slot.available_capacity_dose2}</h5> 

                        
                    </div>
            );
           })

         }
         </div>

            {/*            
            <div>
               <h5>Center ID : </h5> 
               <h5>Center Address : </h5> 
               <h5>State : </h5> 
               <h5>District : </h5> 
               <h5>Pin Code : </h5> 
               <h5>Vaccine : </h5> 
               <h5>Min Age : </h5> 
               <h5>Fee : </h5> 

            </div> */}
            
            </>
        
        )
        
    }
    
    // console.log(slots); printing 4 times????
   return null;

}

export default Slot;