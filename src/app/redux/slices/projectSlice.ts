import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../../utils/Types";

type ProjectState = {
    projects: Project[];
};

const initialState: ProjectState = {
    projects: [
        {
            id: "1",
            title: "Knowledge City Web App",
            status: "Ongoing",
            descriptionUrl: "https://kcity-c8580.web.app/",
            summary: "Empower your Learning Journey with Knowledge City Whether you're a student, educator, or professional, our platform is designed to deliver an engaging and seamless learning experience.",
            startDate: "2023-01-10",
            client: "RetailNow Inc.",
            team: ["Alice Johnson", "Daniel Okafor", "Wei Lin"],
        },
        {
            id: "2",
            title: "EcoBank Mobile App",
            status: "Completed",
            descriptionUrl: "https://play.google.com/store/apps/details?id=com.app.ecobank&hl=en_GB",
            summary: "The revamped and enhanced Ecobank Mobile app makes it super easy to bank on the go 24/7. Manage your everyday banking needs anywhere anytime directly from your mobile device. Manage your account, send money, make payments and get help from the Ecobank mobile app in all 33 African countries where Ecobank is present.",
            startDate: "2023-03-03",
            endDate: "2023-11-01",
            client: "Ecobank Nigeria",
            team: ["Sandra Kim", "Mohamed Al-Mansoor", "James Liu"],
        },
        {
            id: "3",
            title: "Blockchain Logistics Tracker",
            status: "In Communication",
            descriptionUrl: "/projects/blockchain-logistics",
            summary: "A proposal to develop a blockchain-based system to track international cargo.",
            startDate: "2025-05-01",
            client: "TransGlobe Shipping",
            team: ["Ngozi Obi", "Liam Chen", "Julia Fernandez"],
        },
        {
            id: "4",
            title: "mySME App",
            status: "Completed",
            descriptionUrl: "https://play.google.com/store/apps/details?id=com.mysmeapp&hl=en_GB",
            summary: "mySME App from Ecobank is your one-stop digital platform for all your business needs. It enables your business send and receive payments quickly and securely. You can now complete business and banking transactions at your fingertips. You don’t have an account with Ecobank, no worries. Simply visit the Google Playstore and IOS store for Andriod and Apple devices to download the app, open an account and start transacting.",
            startDate: "2023-09-01",
            endDate: "2024-02-20",
            client: "Ecobank Nigeria",
            team: ["Carlos Rivera", "Amina Yusuf", "Zachary Green"],
        },
        {
            id: "5",
            title: "Health & Wellness App",
            status: "Ongoing",
            descriptionUrl: "/projects/health-wellness-app",
            summary: "A mobile app for tracking workouts, diets, and scheduling virtual consultations.",
            startDate: "2025-01-10",
            client: "WellBody Co.",
            team: ["Chinaza Eze", "Marcus Lee", "Fatima Noor"],
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
