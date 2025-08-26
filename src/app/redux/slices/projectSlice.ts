import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../../utils/Types";
import { Assets } from "../../utils/constant/Assets";

type ProjectState = {
  projects: Project[];
};

const initialState: ProjectState = {
  projects: [
    // {
    //   id: "1",
    //   title: "D'roid Web App",
    //   status: "In Communication",
    //   descriptionUrl: "/projects/blockchain-logistics",
    //   summary:
    //     "At D'roid, we transform ideas into reality through groundbreaking projects that blend technology, creativity, and innovation. From AI-driven solutions to dynamic web platforms and immersive animations, every project reflects our commitment to excellence, forward-thinking design, and real-world impact.",
    //   startDate: "2025-05-01",
    //   client: "TransGlobe Shipping",
    //   team: ["Ngozi Obi", "Liam Chen", "Julia Fernandez"],
    //   imageUrl: Assets.images.droidweb,
    //   category: "Company",
    //   price: "",
    //   author: "D'roid",
    // },
    {
      id: "2",
      title: "Knowledge City Web App",
      status: "Ongoing",
      descriptionUrl: "https://kcity-c8580.web.app/",
      summary:
        "Empower your Learning Journey with Knowledge City Whether you're a student, educator, or professional, our platform is designed to deliver an engaging and seamless learning experience.",
      startDate: "2023-01-10",
      client: "Rectail Education Board.",
      team: ["Alice Johnson", "Daniel Okafor", "Wei Lin"],
      imageUrl: Assets.images.knowledgecity,
      category: "Edu Tech",
      price: "",
      author: "D'roid",
    },
    {
      id: "3",
      title: "EcoBank Mobile App",
      status: "Completed",
      descriptionUrl:
        "https://play.google.com/store/apps/details?id=com.app.ecobank&hl=en_GB",
      summary:
        "The revamped and enhanced Ecobank Mobile app makes it super easy to bank on the go 24/7. Manage your everyday banking needs anywhere anytime directly from your mobile device. Manage your account, send money, make payments and get help from the Ecobank mobile app in all 33 African countries where Ecobank is present.",
      startDate: "2023-03-03",
      endDate: "2023-11-01",
      client: "Ecobank Nigeria",
      team: ["Sandra Kim", "Mohamed Al-Mansoor", "James Liu"],
      imageUrl: Assets.images.ecobankmobile,
      category: "Fin Tech",
      price: "",
      author: "Eco Bank",
    },

    {
      id: "4",
      title: "mySME App",
      status: "Completed",
      descriptionUrl:
        "https://play.google.com/store/apps/details?id=com.mysmeapp&hl=en_GB",
      summary:
        "mySME App from Ecobank is your one-stop digital platform for all your business needs. It enables your business send and receive payments quickly and securely. You can now complete business and banking transactions at your fingertips. You don’t have an account with Ecobank, no worries. Simply visit the Google Playstore and IOS store for Andriod and Apple devices to download the app, open an account and start transacting.",
      startDate: "2023-09-01",
      endDate: "2024-02-20",
      client: "Ecobank Nigeria",
      team: ["Carlos Rivera", "Amina Yusuf", "Zachary Green"],
      imageUrl: Assets.images.smeappp,
      category: "E-Commerce",
      price: "",
      author: "Eco Bank",
    },
    {
      id: "5",
      title: "GIG Motors",
      status: "Completed",
      descriptionUrl: "https://gigm.com/",
      summary:
        "The GIGM digital wallet is a seamless way to pay for transactions within our ecosystem. Purchase bus tickets, airtime, data and pay for utility bills using the digital wallet available only on the mobile app",
      startDate: "2025-01-10",
      client: "WellBody Co.",
      team: ["Chinaza Eze", "Marcus Lee", "Fatima Noor"],
      imageUrl: Assets.images.gigMotors,
      category: "Logistics",
      price: "",
      author: "God is Good Motors",
    },
    {
      id: "6",
      title: "Cash Basket",
      status: "Ongoing",
      descriptionUrl: "/projects/health-wellness-app",
      summary:
        "A mobile app for tracking workouts, diets, and scheduling virtual consultations.",
      startDate: "2025-01-10",
      client: "WellBody Co.",
      team: ["Chinaza Eze", "Marcus Lee", "Fatima Noor"],
      imageUrl: Assets.images.cashBasket,
      category: "Fin Tech",
      price: "",
      author: "D'roid",
    },
    {
      id: "7",
      title: "Coastline Micro finance Bank",
      status: "Completed",
      descriptionUrl: "https://coastlinemfb.com/",
      summary:
        "At Coastline Microfinance Bank, we’re transforming how you experience banking. With our latest innovations, we’ve made it easier than ever to manage your finances. Whether you’re a business owner, an entrepreneur, or simply someone looking for financial peace of mind, our new solutions are built to serve you better.",
      startDate: "2025-01-10",
      client: "WellBody Co.",
      team: ["Chinaza Eze", "Marcus Lee", "Fatima Noor"],
      imageUrl: Assets.images.coastlineMicrofinanceBank,
      category: "Banking",
      price: "",
      author: "Coastline Microfinance Bank",
    },
    {
      id: "8",
      title: "E-process",
      status: "Completed",
      descriptionUrl: "https://eprocessconsulting.com/",
      summary:
        "The DroidInput is a highly customizable input component for React applications. It provides a unified interface for various input types including text fields, textareas, and dropdown selects. This component offers extensive styling options and supports both controlled and uncontrolled forms.",
      startDate: "2025-01-10",
      client: "WellBody Co.",
      team: ["Chinaza Eze", "Marcus Lee", "Fatima Noor"],
      imageUrl: Assets.images.eprocess,
      category: "Consulting",
      price: "",
      author: "E-process",
    },
    {
      id: "9",
      title: "Acess More",
      status: "Completed",
      descriptionUrl:
        "https://play.google.com/store/apps/details?id=com.accessbank.nextgen&pcampaignid=web_share",
      summary:
        "The Access More App is an innovative mobile payment application that offers a more than banking experience. The App is built to help our customers consummate their financial transactions, payment solutions and enjoy a lifestyle experience. Prospect customers are welcome to become account holders by downloading the App and onboarding themselves on the platform seamlessly.",
      startDate: "2025-01-10",
      client: "WellBody Co.",
      team: ["Chinaza Eze", "Marcus Lee", "Fatima Noor"],
      imageUrl: Assets.images.accessMore,
      category: "Banking",
      price: "",
      author: "Acess More",
    },
    {
      id: "10",
      title: "Nerve",
      status: "Ongoing",
      descriptionUrl: "/projects/health-wellness-app",
      summary:
        "Nerve offer a wide range of quality products at unbeatable prices, all from the comfort of your home. Whether you're shopping for fashion, electronics, home essentials, or gifts, our secure platform makes buying easy, fast, and convenient. With nationwide delivery, safe payment options, and excellent customer support, we make online shopping simple and enjoyable.",
      startDate: "2025-01-10",
      client: "WellBody Co.",
      team: ["Chinaza Eze", "Marcus Lee", "Fatima Noor"],
      imageUrl: Assets.images.nerveCommerce,
      category: "E-commerce",
      price: "",
      author: "D'roid",
    },
    {
      id: "11",
      title: "Tickle My Fancy",
      status: "Ongoing",
      descriptionUrl: "",
      summary:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo omnis quasi itaque tenetur adipisci sapiente aut consequuntur perferendis. Perspiciatis, aliquid?",
      startDate: "2025-01-10",
      client: "WellBody Co.",
      team: ["Chinaza Eze", "Marcus Lee", "Fatima Noor"],
      imageUrl: Assets.images.tickleMyFancy,
      category: "Development",
      price: "Paid",
      author: "D'roid",
    },
    {
      id: "12",
      title: "D'roid one central platform",
      status: "Ongoing",
      descriptionUrl: "https://droidtechhq.com/auth/join-our-community",
      summary:
        "D’roid One is an all-in-one digital platform designed to simplify management and operations across various sectors. It features a robust Company Admin system and supports multiple organization types, including schools, businesses, and NGOs. Whether you're managing academic records, business workflows, or nonprofit programs, D’roid One provides tailored tools that empower administrators to streamline tasks, enhance communication, and improve overall efficiency, all from a single dashboard.",
      startDate: "2025-01-10",
      client: "WellBody Co.",
      team: ["Chinaza Eze", "Marcus Lee", "Fatima Noor"],
      imageUrl: Assets.images.droidOne,
      category: "Development",
      price: "",
      author: "D'roid",
    },
    {
      id: "13",
      title: "D'roid Input Component",
      status: "Completed",
      descriptionUrl: "/projects/health-wellness-app",
      summary:
        "The DroidInput is a highly customizable input component for React applications. It provides a unified interface for various input types including text fields, textareas, and dropdown selects. This component offers extensive styling options and supports both controlled and uncontrolled forms.",
      startDate: "2025-01-10",
      client: "WellBody Co.",
      team: ["Chinaza Eze", "Marcus Lee", "Fatima Noor"],
      imageUrl: Assets.images.droidinput,
      category: "Development",
      price: "Free",
      author: "D'roid",
    },
    {
      id: "14",
      title: "D'roid Button Component",
      status: "Ongoing",
      descriptionUrl: "https://www.npmjs.com/package/react-ts-droid-button",
      summary:
        "DroidButton is a customizable React component for creating buttons with various styling options. It's written in TypeScript for better type safety and maintainability.",
      startDate: "2025-01-10",
      client: "WellBody Co.",
      team: ["Chinaza Eze", "Marcus Lee", "Fatima Noor"],
      imageUrl: Assets.images.driodButton,
      category: "Development",
      price: "Free",
      author: "D'roid",
    },
    {
      id: "15",
      title: "D'roid Card Component",
      status: "Ongoing",
      descriptionUrl: "https://www.npmjs.com/package/react-ts-droid-card",
      summary:
        "The DriodCard component is a flexible and customizable UI component for displaying content in a card format. It supports various elements such as a title, subtitle, icon, image, content, actions, and tags, making it suitable for a wide range of use cases.",
      startDate: "2025-01-10",
      client: "WellBody Co.",
      team: ["Chinaza Eze", "Marcus Lee", "Fatima Noor"],
      imageUrl: Assets.images.droidCard,
      category: "Development",
      price: "Free",
      author: "D'roid",
    },
    {
      id: "16",
      title: "D'roid Carousel Component",
      status: "Ongoing",
      descriptionUrl: "https://www.npmjs.com/package/react-ts-droid-carousel",
      summary:
        "The Carousel component is a customizable React component that creates a responsive and interactive image slider. It's built with TypeScript and styled-components, providing a smooth sliding experience with navigation controls and indicators.",
      startDate: "2025-01-10",
      client: "WellBody Co.",
      team: ["Chinaza Eze", "Marcus Lee", "Fatima Noor"],
      imageUrl: Assets.images.droidCarousel,
      category: "Development",
      price: "Free",
      author: "D'roid",
    },
  ],
};

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    clearProjects: (state) => {
      state.projects = [];
    },
  },
});

export const { addProject, setProjects, clearProjects } = projectSlice.actions;
export default projectSlice.reducer;
