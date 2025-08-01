export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  authorAvatar: string;
  category: string;
  readTime: string;
  image: string;
  featured?: boolean;
  readMoreLink: string;
  content?: string[];
}

export const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-");
};

// Function to generate blog links
export const generateBlogLink = (category: string, title: string) => {
  return `/more/blog/${category}/${generateSlug(title)}`;
};

// Tech category posts
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of AI in Web Development",
    excerpt: "Discover how artificial intelligence is revolutionizing...",
    date: "June 10, 2023",
    author: "Alex Johnson",
    authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    category: "Tech",
    readTime: "8 min read",
    image:
      "https://plus.unsplash.com/premium_photo-1676637656166-cb7b3a43b81a?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: true,
    readMoreLink: generateBlogLink(
      "tech",
      "The Future of AI in Web Development"
    ),
  },
  {
    id: 2,
    title: "Mastering React Performance Optimization",
    excerpt:
      "Advanced techniques to make your React applications lightning fast and efficient.",
    date: "June 5, 2023",
    author: "Sam Wilson",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    category: "Tech",
    readTime: "12 min read",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    featured: true,
    readMoreLink: generateBlogLink(
      "tech",
      "Mastering React Performance Optimization"
    ),
  },
  {
    id: 3,
    title: "Design Systems for Developers",
    excerpt:
      "How to implement and maintain design systems that scale with your product.",
    date: "May 28, 2023",
    author: "Emma Davis",
    authorAvatar: "https://randomuser.me/api/portraits/women/63.jpg",
    category: "Tech",
    readTime: "9 min read",
    readMoreLink: generateBlogLink("tech", "Design Systems for Developers"),
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
    readMoreLink: generateBlogLink("tech", "TypeScript Best Practices in 2023"),
    authorAvatar: "https://randomuser.me/api/portraits/men/75.jpg",
    category: "Tech",
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
    readMoreLink: generateBlogLink(
      "tech",
      "The Psychology of Color in UI Design"
    ),
    author: "Lisa Rodriguez",
    authorAvatar: "https://randomuser.me/api/portraits/women/82.jpg",
    category: "Tech",
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
    readMoreLink: generateBlogLink("tech", "Building Scalable Microservices"),
    authorAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
    category: "Tech",
    readTime: "14 min read",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  },
];

// Business category posts
export const businessPosts: BlogPost[] = [
  {
    id: 7,
    title: "Startup Funding Strategies in 2023",
    excerpt:
      "Explore the most effective ways to fund your startup in the current economy.",
    date: "June 8, 2023",
    author: "Sarah Williams",
    authorAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
    category: "Business",
    readTime: "10 min read",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    featured: true,
    readMoreLink: generateBlogLink(
      "business",
      "Startup Funding Strategies in 2023"
    ),
  },
  {
    id: 8,
    title: "Remote Team Management Best Practices",
    excerpt:
      "How to effectively lead and manage distributed teams in a post-pandemic world.",
    date: "May 25, 2023",
    author: "James Peterson",
    authorAvatar: "https://randomuser.me/api/portraits/men/51.jpg",
    category: "Business",
    readTime: "9 min read",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    readMoreLink: generateBlogLink(
      "business",
      "Remote Team Management Best Practices"
    ),
  },
];

// Events category posts
export const eventsPosts: BlogPost[] = [
  {
    id: 9,
    title: "Code Verse Tech Conference",
    excerpt:
      "Highlights and key takeaways from this year's premier developer event.",
    date: "June 15, 2023",
    author: "Tech Events Team",
    authorAvatar: "https://randomuser.me/api/portraits/lego/5.jpg",
    category: "Events",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    readMoreLink: generateBlogLink("events", "Code Verse Tech Conference"),
    content: [
      "The Code Verse Tech Conference brought together developers, engineers, and innovators from across the globe to explore the latest advancements in technology.",
      "Keynote sessions covered AI in modern development, emerging web standards, and cloud-native architecture trends.",
      "Attendees participated in hands-on workshops, networking sessions, and panel discussions that explored the future of open-source collaboration.",
      "The event ended with an inspiring closing speech encouraging developers to embrace creativity and continuous learning.",
    ],
  },
  {
    id: 10,
    title: "Front-End Engineering Training",
    excerpt:
      "Don't miss these hands-on learning opportunities happening next month.",
    date: "May 30, 2023",
    author: "Community Team",
    authorAvatar: "https://randomuser.me/api/portraits/lego/2.jpg",
    category: "Events",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1541178735493-479c1a27ed24?auto=format&fit=crop&w=1200&q=80",
    readMoreLink: generateBlogLink("events", "Front-End Engineering Training"),
    content: [
      "This intensive training program focuses on the latest front-end development technologies and best practices.",
      "Participants will work on real-world projects using React, TypeScript, and modern CSS techniques.",
      "Our expert trainers will provide mentorship, feedback, and career guidance to help you become job-ready.",
      "By the end of the training, you'll have built and deployed your own responsive, production-ready web application.",
    ],
  },
  {
    id: 11,
    title: "Clash of Kings - Chess Tournament",
    excerpt:
      "An exciting chess tournament featuring some of the region's top players.",
    date: "May 30, 2023",
    author: "Community Team",
    authorAvatar: "https://randomuser.me/api/portraits/lego/2.jpg",
    category: "Events",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1541178735493-479c1a27ed24?auto=format&fit=crop&w=1200&q=80",
    readMoreLink: generateBlogLink("events", "Clash of Kings Chess Tournament"),
    content: [
      "The Clash of Kings Chess Tournament brought together some of the most talented chess players in the region.",
      "Matches were intense, with each move carefully calculated to outwit the opponent.",
      "The tournament encouraged strategic thinking, patience, and focus among participants of all ages.",
      "Winners received trophies, cash prizes, and recognition within the competitive chess community.",
    ],
  },
  {
    id: 12,
    title: "Rapid Training Conference",
    excerpt:
      "A fast-paced event packed with learning opportunities for tech enthusiasts.",
    date: "May 30, 2023",
    author: "Community Team",
    authorAvatar: "https://randomuser.me/api/portraits/lego/2.jpg",
    category: "Events",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1541178735493-479c1a27ed24?auto=format&fit=crop&w=1200&q=80",
    readMoreLink: generateBlogLink("events", "Rapid Training Conference"),
    content: [
      "The Rapid Training Conference is designed for tech enthusiasts who want to level up their skills quickly.",
      "The program includes lightning talks, live coding sessions, and interactive problem-solving challenges.",
      "Industry experts will share strategies for staying productive, learning faster, and adapting to changing tech trends.",
      "It's the perfect opportunity for both beginners and seasoned developers to gain valuable insights in a short time.",
    ],
  },
];


// All posts combined
export const allPosts: BlogPost[] = [
  ...blogPosts,
  ...businessPosts,
  ...eventsPosts,
];

// Helper function to get posts by category
export const getPostsByCategory = (category: string): BlogPost[] => {
  switch (category.toLowerCase()) {
    case "tech":
      return blogPosts;
    case "business":
      return businessPosts;
    case "events":
      return eventsPosts;
    default:
      return allPosts;
  }
};
