const Slot = props => {
   

    const slots = props.slots;
    if(slots.length === 0 && props.isData === true){
        
        return <h2 className="no-avail">No Centres Available, Search for another date</h2>
    }

    if (props.isData){
       
        return (
            <>
            
            
            <h1 id="centres">Centres</h1>
            <div className="slot"  >
           { slots.map((slot, index) => {
             return(
                 
                 <div key={index}>
                        <h5><span className="normal-icon"></span> Centre Name : {slot.name }</h5> 
                       <h5><span className="address-icon"></span> Centre Address : {slot.address}</h5> 
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

            
            </>
        
        )
        
    }
    
    // console.log(slots); printing 4 times????
   return null;

}

export default Slot;