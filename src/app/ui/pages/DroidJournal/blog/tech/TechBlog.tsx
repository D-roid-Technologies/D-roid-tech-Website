import React from "react";
import BlogCards from "../../../../components/blogPosts/BlogCards";
import { blogPosts } from "../../../../../utils/blogpost";



const TechBlog: React.FC = () => {
  return (
    <div>
      <BlogCards posts={blogPosts} />
    </div>
  );
};

export default TechBlog;
