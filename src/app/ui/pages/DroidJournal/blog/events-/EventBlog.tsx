import React from "react";
import BlogCards from "../../../../components/blogPosts/BlogCards";
import { eventsPosts } from "../../../../../utils/blogpost";

const EventBlog: React.FC = () => {
  return (
    <div>
      <BlogCards posts={eventsPosts} />
    </div>
  );
};

export default EventBlog;
