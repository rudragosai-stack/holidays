import React from 'react';
import BreadCumb from '../Components/Common/BreadCumb';
import ActivitiesDetails from '../Components/ActivitiesDetails/ActivitiesDetails';

const ActivitiesDetailsPage = () => {
    return (
        <div>
              <BreadCumb
                bgimg="/mainimage/banner.jpg"
                Title="Activities Details"
            ></BreadCumb>       
            <ActivitiesDetails></ActivitiesDetails>      
        </div>
    );
};

export default ActivitiesDetailsPage;