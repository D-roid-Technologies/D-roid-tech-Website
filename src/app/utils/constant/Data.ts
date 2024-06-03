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
  EquipmentServices: [
    {
      image: require("../../images/png/imagePlaceHolder.png"),
      title: "Computer and Workstation Set-Up",
      content:
        "We set up desktops, laptops, and workstations, ensuring that all hardware and software components are correctly installed and configured. This includes operating system installation, software setup, and peripheral connection.",
    },
    {
      image: require("../../images/png/imagePlaceHolder.png"),
      title: "Network Configuration",
      content:
        "Our network setup services ensure your internet and local network are configured for maximum speed, security, and reliability. We handle everything from router installation to network security configurations.",
    },
    {
      image: require("../../images/png/imagePlaceHolder.png"),
      title: "Server Installation and Configuration",
      content:
        "We provide comprehensive server setup services, including installation, configuration, and ongoing management. Our services cover a wide range of server types, including web servers, file servers, and application servers.",
    },
    {
      image: require("../../images/png/imagePlaceHolder.png"),
      title: "Peripheral and Accessory Set-Up",
      content:
        "We handle the setup of all your peripherals and accessories, ensuring they are correctly installed and integrated with your main systems. This includes printers, scanners, external drives, and more.",
    },
    {
      image: require("../../images/png/imagePlaceHolder.png"),
      title: "Home Office and Remote Work Set-Up",
      content:
        "With more people working remotely, we offer specialised services to set up home offices that are fully equipped and optimised for productivity. We ensure that your home office setup meets your work requirements and integrates smoothly with your company's network.",
    },
    {
      image: require("../../images/png/imagePlaceHolder.png"),
      title: "Audio-Visual Equipment Set-Up",
      content:
        "We set up audio-visual equipment for both personal and professional use, including home theatres, conference rooms, and multimedia setups. Our services ensure that all components are correctly installed and optimised for the best performance.",
    },
  ],
};
