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
    title:
      "Bridging the Gap: How We are Removing the Price Tag on Nigerian Tech Talent",
    excerpt: "​Let us be blunt about the current state of the Nigerian tech ecosystem...",
    date: "Jan 22, 2026",
      author: "D'roid Technologies",
    authorAvatar: "https://randomuser.me/api/portraits/lego/5.jpg",
    category: "Tech",
    readTime: "8 min read",
    image:
      "https://plus.unsplash.com/premium_photo-1676637656166-cb7b3a43b81a?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: true,
    content: [
      "​Let us be blunt about the current state of the Nigerian tech ecosystem: while the rhetoric encourages young people to 'learn a skill,' the reality is that the barrier to entry has become insurmountable for the majority. We frequently ignore the hefty price tag attached to this advice. Between the crippling costs of mobile data, unreliable electricity, and securing decent hardware, adding a commercial bootcamp fee often ranging from ₦689,000 to ₦5.9 million for a 3-12 month program or strapping graduates with significant future debt through income-sharing agreements makes a tech career an impossible dream for some of our brightest minds. At Droid Technologies, we have decided to stop ignoring this systemic failure. We are launching DevDive, a comprehensive, six-month internship program that is entirely tuition-free. This is not a marketing maneuver; it is a necessary correction to an ecosystem that is rapidly becoming exclusionary. We are seeking individuals who possess the raw hunger and logical aptitude for software development but simply lack the funds for a commercial academy.",
      "The problem extends beyond finances; it is deeply rooted in how tech is currently taught. Too many aspiring developers are stuck in a cycle of passive learning following endless online guides and replicating generic class projects without ever understanding how to engineer a deployable, scalable solution from scratch. They can follow instructions, but they cannot solve novel problems. Furthermore, alternative models that promise 'pay later' structures often saddle juniors with immense financial pressure the moment they enter the workforce, stifling their ability to take risks or choose the right initial roles. Our founders recognized that Droid Technologies needed to be the bridge that connects raw potential with professional reality, without the burden of debt. Our motivation is simple: we are not optimizing for 'students' to fill seats in a classroom we are optimizing for future colleagues who can contribute to our projects.",
      "​We designed DevDive to be the antithesis of a traditional school environment. It is a full-scale work simulation meant to bridge the infamous experience paradox where you need a job to get experience, but need experience to get a job. From week one, our interns are treated like junior staff members within an agile development environment. They do not just write isolated lines of code; they manage real tickets, participate in intense sprint reviews, handle complex merge conflicts, and face the pressure of deploying live features for real organizations. The crucial differentiator of our approach is the focus on creating usable products. We move beyond theoretical exercises; interns work on building solutions that actual users will interact with. This hands-on immersion is the only way to transform a theoretical understanding of syntax into the practical competence required by employers. This approach also addresses the pressing issue of learning context by having novices engage with real product backlogs, not simulations, while working around unstable electricity and bandwidth.",
      "​The ultimate win for attendees is a CV that actually holds weight in a competitive labor market. Employers are increasingly skeptical of generic certificates that only prove attendance. Therefore, we have introduced a Dual Certification model. Upon successful completion of the six months, interns receive a Certificate of Learning, proving mastery of the stack, alongside an essential Certificate of Work Experience, a verifiable professional reference letter confirming six months of hands-on history at Droid Technologies. This includes a verifiable portfolio with linked repositories, merged PRs, sprint boards, demo decks, and stakeholder feedback artefacts hiring managers can audit quickly. Our eligibility criteria are focused on grit and logical potential rather than previous credentials. We are looking for the underdogs who are ready to work. The process to join is rigorous but transparent: interested candidates must first complete a detailed application form to demonstrate their drive, followed by a technical and behavioral interview. Successful applicants are then immediately inducted into the free cohort. We provide the senior mentorship, the professional environment, and the opportunity; the interns provide the relentless effort required to succeed.",
  `​Click apply now to join the next cohort` 
],
    readMoreLink: generateBlogLink(
      "tech",
      "Bridging the Gap: How We are Removing the Price Tag on Nigerian Tech Talent",
    ),
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
      "Startup Funding Strategies in 2023",
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
      "Remote Team Management Best Practices",
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
      "Calabar Tech Mixer (MUST Company) 2025",
    ),
    content: [
      "The Calabar Tech Mixer 2025 was a technology-focused gathering hosted by Must Company, aimed at fostering collaboration, learning, and partnership among developers.",

      "Tech companies, startup founders, and community members within the Calabar ecosystem.",

      "Droid Technologies attended with the goal of understanding ecosystem trends, identifying partnership opportunities, and strengthening our company’s visibility in South-South Nigeria’s tech landscape.",

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
      "Clash of Kings - Chess Tournament[2025/2026]",
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
      "CUMSA Financial Summit 2025 – Money Meets Medicine",
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
      "Clash of Kings - Chess Tournament[2022/2023]",
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
      "Clash of Kings - Chess Tournament[2021/2022]",
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
      "Outreach at State Primary School Rukpokwu Rivers State",
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
