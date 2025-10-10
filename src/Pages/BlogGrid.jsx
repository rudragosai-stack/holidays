import React from 'react';
import BreadCumb from '../Components/Common/BreadCumb';
import Blog4 from '../Components/Blog/Blog4';

const BlogGrid = () => {
    return (
        <div>
             <BreadCumb
                bgimg="/mainimage/banner.jpg"
                Title="Blog"
            ></BreadCumb> 
            <Blog4></Blog4>          
        </div>
    );
};

export default BlogGrid;