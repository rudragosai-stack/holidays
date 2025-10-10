import React from 'react';
import BreadCumb from '../Components/Common/BreadCumb';
import Contact from '../Components/Contact/Contact';

const ContactPage = () => {
    return (
        <div>
            <BreadCumb
                bgimg="/mainimage/banner.jpg"
                Title="Contact Us"
            ></BreadCumb>
            <Contact></Contact>     
        </div>
    );
};

export default ContactPage;