import React from "react";
import BlogCards from "../../../../components/blogPosts/BlogCards";

const blogPosts = [
  {
    id: 1,
    title: "The Future of AI in Web Development",
    excerpt: "Discover how artificial intelligence is revolutionizing...",
    date: "June 10, 2023",
    author: "Alex Johnson",
    authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    category: "Events",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1677442135136-760c813a743e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    featured: true,
    readMoreLink: "/blog/ai-web-development",
  },
  {
    id: 2,
    title: "Mastering React Performance Optimization",
    excerpt:
      "Advanced techniques to make your React applications lightning fast and efficient.",
    date: "June 5, 2023",
    author: "Sam Wilson",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    category: "Events",
    readTime: "12 min read",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    featured: true,
    readMoreLink: "/blog/ai-web-development",
  },
  {
    id: 3,
    title: "Design Systems for Developers",
    excerpt:
      "How to implement and maintain design systems that scale with your product.",
    date: "May 28, 2023",
    author: "Emma Davis",
    authorAvatar: "https://randomuser.me/api/portraits/women/63.jpg",
    category: "Events",
    readTime: "9 min read",
    readMoreLink: "/blog/ai-web-development",
    image:
      "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title: "TypeScript Best Practices in 2023",
    excerpt:
      "The definitive guide to writing clean, maintainable TypeScript code.",
    date: "May 20, 2023",
    author: "Michael Chen",
    readMoreLink: "/blog/ai-web-development",
    authorAvatar: "https://randomuser.me/api/portraits/men/75.jpg",
    category: "Events",
    readTime: "10 min read",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    title: "The Psychology of Color in UI Design",
    excerpt:
      "How color choices impact user behavior and perception of your product.",
    date: "May 15, 2023",
    readMoreLink: "/blog/ai-web-development",

    author: "Lisa Rodriguez",
    authorAvatar: "https://randomuser.me/api/portraits/women/82.jpg",
    category: "Events",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    title: "Building Scalable Microservices",
    excerpt:
      "Architecture patterns for creating resilient and scalable microservices.",
    date: "May 10, 2023",
    author: "David Kim",
    readMoreLink: "/blog/ai-web-development",
    authorAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
    category: "Events",
    readTime: "14 min read",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  },
];

const TechBlog: React.FC = () => {
  return (
    <div>
      <BlogCards posts={blogPosts} />
    </div>
  );
};

export default TechBlog;
