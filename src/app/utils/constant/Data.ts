import { title } from "process";
import Button from "../../ui/components/button/Button";

export const DATA = {
  socialLinks: {
    twitter: "https://x.com/Droidtechn?t=LVFJ6SEetP5DD1BHdSK0rQ&s=09",
    linkedin:
      "https://www.linkedin.com/company/d-roid-technologies-international/",
    instagram: "https://www.instagram.com/droidtechn?igsh=ZGUzMzM3NWJiOQ==",
    whatsapp: "https://wa.me/c/447886386437",
    email: "hr@droidtechinternational.com",
  },
  navLinks: [
    {
      link: "About Us",
      path: "/aboutus",
    },
    {
      link: "Software Development",
      path: "/software",
    },
    {
      link: "Tech Training",
      path: "/training",
    },
    {
      link: "Products",
      path: "/products",
    },
    {
      link: "Contact",
      path: "/contact",
    },
    {
      link: "More",
      path: "/more",
    },
  ],
  dropDownLinks: [
    {
      link: "Drone Services",
      path: "/drone",
    },
    {
      link: "Equipment",
      path: "/offices",
    },
    // {
    //   link: "Staff Login",
    //   path: "/staff",
    // },
  ],

  courses: [
    { id: 1, title: "Secondary School Tech Trainings" },
    { id: 2, title: "University Tech Trainings" },
    { id: 3, title: "Organisations / Companies Tech Trainings" },
    { id: 4, title: "Basic Coding Training" },
    { id: 5, title: "Web Development Training" },
    { id: 6, title: "Mobile Development Training" },
    { id: 7, title: "Design Training" },
    { id: 8, title: "Project Management Training" },
  ],

  droneApproach: [
    {
      title: "Customized Solutions",
      content:
        "We understand that every project is unique, which is why we work closely with our clients to develop customized drone solutions that address their specific requirements and objectives. Whether it's aerial photography, mapping, or inspection, we have the expertise to deliver results that exceed expectations.",
      Button: "LEARN MORE",
    },
    {
      title: "State-of-the-Art Technology",
      content:
        "Our drones are equipped with the latest technology, including high-resolution cameras, LiDAR sensors, and thermal imaging capabilities. This allows us to capture detailed and accurate data from the air, providing valuable insights for our clients' projects.",
      Button: "LEARN MORE",
    },
    {
      title: "Safety & Compliance",
      content:
        "Safety is our top priority, and we adhere to strict safety protocols and regulations to ensure the safe operation of our drones. Our team of certified pilots undergoes rigorous training and certification processes to ensure compliance with aviation laws and regulations.",
      Button: "LEARN MORE",
    },
    {
      title: "Data Analysis & Reporting",
      content:
        "In addition to capturing aerial imagery and data, we also offer comprehensive data analysis and reporting services. Our team of data analysts and engineers processes and interprets the data collected by our drones, providing actionable insights and recommendations for our clients.",
      Button: "LEARN MORE",
    },
  ],
  FeaturedDroneServices: [
    {
      video: require("../../images/videos/dronevideo.mp4"),
      title: "AERIAL PHOTOGRAPHY AND VIDEOGRAPHY",
      content:
        "Capture stunning aerial images and videos for marketing, advertising, and promotional purposes.",
    },
  ],
  MappingSurveying: [
    {
      // image: require("../../images/png/drone survey.png"),
      // image: require("../../images/png/dronesurveying.png"),
      title: "MAPPING & SURVEYING",
      content:
        "Generate high-resolution maps and 3D models for land surveying, construction planning, and site analysis.",
    },
  ],
  InfrastructureInspection: [
    {
      image: require("../../images/png/infrastructure.png"),
      title: "INFRASTRUCTURE INSPECTION",
      content:
        "Conduct thorough inspections of infrastructure assets such as buildings, bridges, and power lines to identify defects and maintenance needs.",
    },
  ],
  CropMonitoringAgriculture: [
    {
      image: require("../../images/png/cropmonitorimage.png"),
      title: "CROP MONITORING & AGRICULTURE",
      content:
        "Monitor crop health, assess field conditions, and optimize agricultural operations using aerial imagery and data analysis.",
    },
  ],
  DroneModels: [
    {
      // image: require("../../images/png/dronemodel.png"),
      title: "Drone Models",
      content: " DJI Phantom, DJI Mavic, DJI Inspire, SenseFly eBee",
    },
  ],
  CamerasSensors: [
    {
      // image: require("../../images/png/camerasandsensors.png"),
      title: "Cameras & Sensors",
      content: " RGB cameras, multispectral cameras, LiDAR sensors",
    },
  ],
  SoftwareTools: [
    {
      // image: require("../../images/png/softwaretools.png"),
      title: "Software Tools",
      content: "Pix4D, DroneDeploy, Agisoft Metashape ",
    },
  ],
  equipmentApproach: [
    {
      title: "Consultation & Assessment",
      content:
        "We begin by conducting a thorough consultation with our clients to understand their equipment setup requirements and objectives. Our team assesses the available space, existing infrastructure, and technical specifications to develop a tailored setup plan.",
      Button: "LEARN MORE",
    },
    {
      title: "Hardware Installation",
      content:
        "Our technicians handle the installation of hardware components, including computers, servers, routers, switches, and other devices. We ensure that all equipment is installed correctly and configured to meet our clients' needs.",
      Button: "LEARN MORE",
    },
    {
      title: "Network Configuration",
      content:
        " We configure network settings, including IP addresses, DNS settings, and security protocols, to ensure seamless connectivity and data transfer within our clients' environments. Our goal is to create a stable and secure network infrastructure that supports their business operations.",
      Button: "LEARN MORE",
    },
    {
      title: "Testing & Optimization",
      content:
        "Once the setup is complete, we conduct thorough testing to ensure that all equipment and networks are functioning correctly. We optimize settings and configurations as needed to improve performance and reliability.",
      Button: "LEARN MORE",
    },
    {
      title: "Training & Documentation",
      content:
        "We provide training sessions for our clients' staff to familiarize them with the newly installed equipment and networks. Additionally, we create detailed documentation outlining setup procedures, troubleshooting steps, and best practices for future reference.",
      Button: "LEARN MORE",
    },
  ],

  testimonials: [
    {
      quote:
        "I have had the pleasure of working with D'roid Technologies on several projects, and I can confidently say that their expertise and dedication are unmatched. From the initial consultation to the final delivery, their team demonstrated a deep understanding of our needs and provided innovative solutions that exceeded our expectations. The software they developed for us is robust, user-friendly, and has significantly improved our operational efficiency. Their commitment to quality and customer satisfaction is evident in every interaction. I highly recommend D'roid Technologies to any organization looking for top-tier technology solutions.",
      author: "— Mark Ettan, Founder, LEADPAC Foundation",
    },
    {
      quote:
        "I have had the pleasure of working with D'roid Technologies on several projects, and I can confidently say that their expertise and dedication are unmatched. From the initial consultation to the final delivery, their team demonstrated a deep understanding of our needs and provided innovative solutions that exceeded our expectations. The software they developed for us is robust, user-friendly, and has significantly improved our operational efficiency. Their commitment to quality and customer satisfaction is evident in every interaction. I highly recommend D'roid Technologies to any organization looking for top-tier technology solutions.",
      author: "— Mark Ettan, Founder, LEADPAC Foundation",
    },
  ],
};
