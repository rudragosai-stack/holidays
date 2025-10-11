import React from 'react';
import BreadCumb from '../Components/Common/BreadCumb';
import BlogSidebar from '../Components/BlogSidebar/BlogSidebar';

const BlogSidebarPage = () => {
    return (
        <div>
             <BreadCumb
                bgimg="/mainimage/banner.jpg"
                Title="Blog Classic"
            ></BreadCumb> 
            <BlogSidebar></BlogSidebar>          
        </div>
    );
};

export default BlogSidebarPage;