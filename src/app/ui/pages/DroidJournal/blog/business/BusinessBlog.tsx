import React from "react";
import BlogCards from "../../../../components/blogPosts/BlogCards";
import { businessPosts } from "../../../../../utils/blogpost";

const BusinessBlog: React.FC = () => {
  return (
    <div>
      <BlogCards posts={businessPosts} />
    </div>
  );
};

export default BusinessBlog;
