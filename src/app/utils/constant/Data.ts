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
      link: "Animation Creation",
      path: "/animation",
    },
    {
      link: "Tech Training",
      path: "/training",
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
      video: require("../../videos/dronevideo.mp4"),
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
};
