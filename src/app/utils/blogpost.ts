import { Assets } from "./constant/Assets";

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
    title: "Calabar Tech Mixer (MUST Company) 2025",
    excerpt:
      "The Calabar Tech Mixer 2025 was a technology-focused gathering hosted by Must Company, aimed at fostering collaboration, learning, and partnership among developers.",
    date: "Wednesday, 12th November 2025",
    author: "D'roid Technologies",
    authorAvatar: "https://randomuser.me/api/portraits/lego/5.jpg",
    category: "Events",
    readTime: "5 min read",
    image: Assets.images.mustTechEvent,
    readMoreLink: generateBlogLink(
      "events",
      "Calabar Tech Mixer (MUST Company) 2025"
    ),
    content: [
      "The Calabar Tech Mixer 2025 was a technology-focused gathering hosted by Must Company, aimed at fostering collaboration, learning, and partnership among developers.",

      "Tech companies, startup founders, and community members within the Calabar ecosystem.",

      "I attended the event as a representative of Droid Technologies, with the goal of understanding ecosystem trends, identifying partnership opportunities, and strengthening our company’s visibility in South-South Nigeria’s tech landscape.",

      "The event featured keynote speeches from industry leaders, panel discussions on emerging technologies, and networking sessions designed to connect attendees with potential collaborators and mentors.",
    ],
  },
  {
    id: 10,
    title: "Clash of Kings - Chess Tournament[2025/2026]",
    excerpt:
      "An exciting chess tournament featuring some of the region's top players.",
    date: "Sunday, 30th November 2025",
    author: "D'roid Technologies",
    authorAvatar: "https://randomuser.me/api/portraits/lego/2.jpg",
    category: "Events",
    readTime: "5 min read",
    image: Assets.images.chessOne,
    readMoreLink: generateBlogLink(
      "events",
      "Clash of Kings - Chess Tournament[2025/2026]"
    ),
    content: [
      "Clash of Kings, organized by D'roid Technologies, is a premier annual chess competition dedicated to empowering minds through strategy, focus, and creativity. The event brings together chess enthusiasts, learners, and masters from across communities, creating an atmosphere of inspiration, competition, and excellence.",

      "Every round is designed as a battlefield — from intense opening moves to decisive endgames — participants are challenged to test their skills, resilience, and tactical brilliance. Players not only sharpen their chess strategies but also gain valuable lessons in patience, discipline, and problem-solving that extend beyond the board.",

      "Beyond the matches, Clash of Kings emphasizes values of resilience, intelligence, and creativity. It offers participants an opportunity to network, collaborate, and grow while being supported by a community of like-minded competitors and learners.",

      "Winners receive exciting rewards: 1st Place — ₦15,000 + crowned the Chess King 2025 + named Ambassador of D'roid Technologies; 2nd Place — ₦10,000; 3rd Place — ₦5,000. Other prizes include books, pens, and chess boards.",

      "Registration is open to all with a participation fee of ₦1000. Hurry, registration closes on November 30, 2025. Secure your spot, make your moves, and claim your crown in the ultimate Clash of Kings!",
    ],
  },
  {
    id: 11,
    title: "CUMSA Financial Summit 2025 – Money Meets Medicine",
    excerpt: "Think Health, Think Wealth, Think Global.",
    date: "Wednesday, 17th September 2025",
    author: "Medical/Tech Events Team",
    authorAvatar: "https://randomuser.me/api/portraits/lego/5.jpg",
    category: "Events",
    readTime: "6 min read",
    image: Assets.images.cumsaEvent,
    featured: true,
    readMoreLink: generateBlogLink(
      "events",
      "CUMSA Financial Summit 2025 – Money Meets Medicine"
    ),
    content: [
      "The Calabar University Medical Students’ Association (CUMSA) through the Office of the Financial Secretary proudly presents the CUMSA Financial Summit 2025. This forward-thinking event is designed to empower medical students and young professionals with the knowledge and tools to merge health, wealth, and global opportunities in today’s fast-evolving world.",
    ],
  },
  {
    id: 12,
    title: "Lift Off - Tech Conference",
    excerpt:
      "Highlights and key takeaways from this year's premier developer event.",
    date: "Monday, 15th June 2026",
    author: "D'roid Technologies",
    authorAvatar: "https://randomuser.me/api/portraits/lego/5.jpg",
    category: "Events",
    readTime: "6 min read",
    image:
      "https://media.istockphoto.com/id/1271984096/vector/help-to-succeed.jpg?s=612x612&w=0&k=20&c=X4MT1Uk3i70u-XOJE1phLMOcAkhjVAFvMA-bKOMLiDQ=",
    featured: true,
    readMoreLink: generateBlogLink("events", "Lift Off - Tech Conference"),
    content: [
      "LiftOff - Tech Conference, organized by D'roid Technologies, is a premier annual event dedicated to empowering individuals and helping them stand on their own two feet through the power of technology. The conference brings together innovators, professionals, entrepreneurs, and learners from across industries, creating an atmosphere of inspiration, collaboration, and transformation.",

      "Every session is designed as a launchpad — from keynote speeches by industry leaders to hands-on workshops and panel discussions — participants are guided to explore cutting-edge innovations, practical tools, and success strategies that can fuel their personal and professional growth. Attendees not only gain valuable insights but also learn actionable skills to apply in real-world scenarios.",

      "Beyond the talks and workshops, LiftOff emphasizes values of independence, resilience, and creativity. It offers participants an opportunity to network, collaborate, and challenge themselves while being supported by a community of like-minded innovators and changemakers.",

      "Individuals register with a participation fee, and the most outstanding participants — including entrepreneurs with innovative solutions, developers with impactful projects, and learners who demonstrate exceptional growth — receive awards, monetary prizes, and recognition on stage. Hosted twice each year, LiftOff stands as a beacon of empowerment, showcasing how technology can inspire people of all ages to rise, stand strong, and create their own path to success.",
    ],
  },
  {
    id: 13,
    title: "Tech Conference Calabar",
    excerpt:
      "A fast-paced event packed with learning opportunities for tech enthusiasts.",
    date: "Friday, 5th December 2025",
    author: "Calabar Tech Community",
    authorAvatar: "https://randomuser.me/api/portraits/lego/2.jpg",
    category: "Events",
    readTime: "5 min read",
    image: Assets.images.CTC2025,
    readMoreLink: generateBlogLink("events", "Tech Conference Calabar"),
    content: [
      "The Tech Conference Calabar is a premier gathering for innovators, developers, entrepreneurs, and tech enthusiasts from across Nigeria and beyond.",
      "This event features keynote sessions, workshops, and panel discussions focused on emerging technologies, digital transformation, and real-world applications.",
      "Attendees will learn directly from industry leaders, connect with startups and established companies, and explore how technology is shaping the future of Africa.",
      "Hosted in the vibrant city of Calabar, the conference also provides rich networking opportunities, cultural experiences, and inspiration for both beginners and seasoned professionals.",
    ],
  },

  {
    id: 14,
    title: "Clash of Kings - Chess Tournament[2022/2023]",
    excerpt:
      "A fast-paced event packed with learning opportunities for tech enthusiasts.",
    date: "Thursday, 30th November 2023",
    author: "Community Team",
    authorAvatar: "https://randomuser.me/api/portraits/lego/2.jpg",
    category: "Events",
    readTime: "5 min read",
    image: Assets.images.chessOne,
    readMoreLink: generateBlogLink(
      "events",
      "Clash of Kings - Chess Tournament[2022/2023]"
    ),
    content: [
      "The Rapid Training Conference is designed for tech enthusiasts who want to level up their skills quickly.",
      "The program includes lightning talks, live coding sessions, and interactive problem-solving challenges.",
      "Industry experts will share strategies for staying productive, learning faster, and adapting to changing tech trends.",
      "It's the perfect opportunity for both beginners and seasoned developers to gain valuable insights in a short time.",
    ],
  },
  {
    id: 15,
    title: "Clash of Kings - Chess Tournament[2021/2022]",
    excerpt:
      "A fast-paced event packed with learning opportunities for tech enthusiasts.",
    date: "Wednesday, 30th November 2022",
    author: "Community Team",
    authorAvatar: "https://randomuser.me/api/portraits/lego/2.jpg",
    category: "Events",
    readTime: "5 min read",
    image: Assets.images.chessOne,
    readMoreLink: generateBlogLink(
      "events",
      "Clash of Kings - Chess Tournament[2021/2022]"
    ),
    content: [
      "The Rapid Training Conference is designed for tech enthusiasts who want to level up their skills quickly.",
      "The program includes lightning talks, live coding sessions, and interactive problem-solving challenges.",
      "Industry experts will share strategies for staying productive, learning faster, and adapting to changing tech trends.",
      "It's the perfect opportunity for both beginners and seasoned developers to gain valuable insights in a short time.",
    ],
  },
  {
    id: 16,
    title: "National ICT Competition 2020",
    excerpt:
      "A fast-paced event packed with learning opportunities for tech enthusiasts.",
    date: "May 30, 2023",
    author: "Community Team",
    authorAvatar: "https://randomuser.me/api/portraits/lego/2.jpg",
    category: "Events",
    readTime: "5 min read",
    image: Assets.images.nationalICT,
    readMoreLink: generateBlogLink("events", "National ICT Competition 2020"),
    content: [
      "The Rapid Training Conference is designed for tech enthusiasts who want to level up their skills quickly.",
      "The program includes lightning talks, live coding sessions, and interactive problem-solving challenges.",
      "Industry experts will share strategies for staying productive, learning faster, and adapting to changing tech trends.",
      "It's the perfect opportunity for both beginners and seasoned developers to gain valuable insights in a short time.",
    ],
  },
  {
    id: 17,
    title: "National ICT Competition 2022",
    excerpt:
      "A fast-paced event packed with learning opportunities for tech enthusiasts.",
    date: "May 30, 2023",
    author: "Community Team",
    authorAvatar: "https://randomuser.me/api/portraits/lego/2.jpg",
    category: "Events",
    readTime: "5 min read",
    image: Assets.images.nationalICT2,
    readMoreLink: generateBlogLink("events", "National ICT Competition 2022"),
    content: [
      "The Rapid Training Conference is designed for tech enthusiasts who want to level up their skills quickly.",
      "The program includes lightning talks, live coding sessions, and interactive problem-solving challenges.",
      "Industry experts will share strategies for staying productive, learning faster, and adapting to changing tech trends.",
      "It's the perfect opportunity for both beginners and seasoned developers to gain valuable insights in a short time.",
    ],
  },
  {
    id: 18,
    title: "Outreach at State Primary School Rukpokwu, Rivers State",
    excerpt:
      "Photos of the outreach held on 07/10/25 at State Primary School Rukpokwu, Rivers State — supported by D'ROID Technologies. It was all shades of amazing!",
    date: "October 7, 2025",
    author: "Community Team",
    authorAvatar: "https://randomuser.me/api/portraits/lego/2.jpg",
    category: "Outreach",
    readTime: "3 min read",
    image: Assets.images.PrimarySchoolRukpokwu,
    readMoreLink: generateBlogLink(
      "events",
      "Outreach at State Primary School Rukpokwu Rivers State"
    ),
    content: [
      "Our team, supported by D'ROID Technologies, held an inspiring outreach program at State Primary School, Rukpokwu, Rivers State, on October 7, 2025.",
      "The event was filled with excitement, learning, and community spirit as pupils engaged in tech awareness activities and motivational sessions.",
      "It was a day to remember — filled with smiles, shared knowledge, and positive energy.",
      "A huge thank you to everyone who made this outreach possible. It was truly all shades of amazing!",
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
