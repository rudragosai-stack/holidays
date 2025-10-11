import React from 'react';
import BreadCumb from '../Components/Common/BreadCumb';
import BlogDetails from '../Components/BlogDetails/BlogDetails';

const BlogDetailsPage = () => {
    return (
        <div>
             <BreadCumb
                bgimg="/mainimage/banner.jpg"
                Title="Blog Details"
            ></BreadCumb>     
            <BlogDetails></BlogDetails>      
        </div>
    );
};

export default BlogDetailsPage;