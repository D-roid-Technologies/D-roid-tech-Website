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
    // {
    //   id: "5",
    //   title: "Health & Wellness App",
    //   status: "Ongoing",
    //   descriptionUrl: "/projects/health-wellness-app",
    //   summary:
    //     "A mobile app for tracking workouts, diets, and scheduling virtual consultations.",
    //   startDate: "2025-01-10",
    //   client: "WellBody Co.",
    //   team: ["Chinaza Eze", "Marcus Lee", "Fatima Noor"],
    //   imageUrl: Assets.images.innovationImg,
    //   category: "School",
    //   price: "Free",
    //   author: "D'roid",
    // },
    // {
    //   id: "6",
    //   title: "Cash Basket",
    //   status: "Ongoing",
    //   descriptionUrl: "/projects/health-wellness-app",
    //   summary:
    //     "A mobile app for tracking workouts, diets, and scheduling virtual consultations.",
    //   startDate: "2025-01-10",
    //   client: "WellBody Co.",
    //   team: ["Chinaza Eze", "Marcus Lee", "Fatima Noor"],
    //   imageUrl: Assets.images.cashBasket,
    //   category: "Fin Tech",
    //   price: "Free",
    //   author: "D'roid",
    // },
    // {
    //   id: "7",
    //   title: "@-tech/react-droidinput",
    //   status: "Ongoing",
    //   descriptionUrl: "/projects/health-wellness-app",
    //   summary:
    //     "The DroidInput is a highly customizable input component for React applications. It provides a unified interface for various input types including text fields, textareas, and dropdown selects. This component offers extensive styling options and supports both controlled and uncontrolled forms.",
    //   startDate: "2025-01-10",
    //   client: "WellBody Co.",
    //   team: ["Chinaza Eze", "Marcus Lee", "Fatima Noor"],
    //   imageUrl: Assets.images.droidinput,
    //   category: "Development",
    //   price: "Free",
    //   author: "D'roid",
    // },
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
