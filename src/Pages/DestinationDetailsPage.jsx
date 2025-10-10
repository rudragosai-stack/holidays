import React from 'react';
import BreadCumb from '../Components/Common/BreadCumb';
import DestinationDetails from '../Components/DestinationDetails/DestinationDetails';

const DestinationDetailsPage = () => {
    return (
        <div>
             <BreadCumb
                bgimg="/mainimage/banner.jpg"
                Title="Destination Details"
            ></BreadCumb>    
            <DestinationDetails></DestinationDetails>        
        </div>
    );
};

export default DestinationDetailsPage;