import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../../utils/Types";

type ProjectState = {
    projects: Project[];
};

const initialState: ProjectState = {
    projects: [
        {
            id: "1",
            title: "Smart Retail Dashboard",
            status: "Completed",
            descriptionUrl: "/projects/smart-retail-dashboard",
            summary: "Developed a real-time analytics dashboard for a retail chain using React and Node.js.",
            startDate: "2024-01-15",
            endDate: "2024-04-30",
            client: "RetailNow Inc.",
            team: ["Alice Johnson", "Daniel Okafor", "Wei Lin"],
        },
        {
            id: "2",
            title: "AI Customer Support Assistant",
            status: "Ongoing",
            descriptionUrl: "/projects/ai-customer-assistant",
            summary: "An AI-powered assistant integrated with support ticketing systems to automate responses.",
            startDate: "2025-02-01",
            client: "HelpDesk Solutions",
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
            title: "EdTech Learning Platform",
            status: "Completed",
            descriptionUrl: "/projects/edtech-platform",
            summary: "Built a scalable e-learning platform for interactive video lessons and live quizzes.",
            startDate: "2023-09-01",
            endDate: "2024-02-20",
            client: "BrightFuture Academy",
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
