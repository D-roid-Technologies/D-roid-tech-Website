export type Course = {
  id: number;
  title: string;
  description?: string;
  trainings: string;
  //   descriptions: {
  //     [key: string]: {
  //       explanation: string;
  //       procedures: string[];
  //     };
  //   };
};

export const courses: Course[] = [
  {
    id: 1,
    title: "Computer and Workstation Set-Up",
    trainings:
      "We set up desktops, laptops, and workstations, ensuring that all hardware and software components are correctly installed and configured. This includes operating system installation, software setup, and peripheral connection.",
  },
  {
    id: 2,
    title: "Network Configuration",
    trainings:
      "Our network setup services ensure your internet and local network are configured for maximum speed, security, and reliability. We handle everything from router installation to network security configurations.",
  },
  {
    id: 3,
    title: "Server Installation and Configuration",
    trainings:
      "We provide comprehensive server setup services, including installation, configuration, and ongoing management. Our services cover a wide range of server types, including web servers, file servers, and application servers.",
  },
  {
    id: 4,
    title: "Peripheral and Accessory Set-Up",
    trainings:
      "We handle the setup of all your peripherals and accessories, ensuring they are correctly installed and integrated with your main systems. This includes printers, scanners, external drives, and more.",
  },
  {
    id: 5,
    title: "Home Office and Remote Work Set-Up",
    trainings:
      "With more people working remotely, we offer specialised services to set up home offices that are fully equipped and optimised for productivity. We ensure that your home office setup meets your work requirements and integrates smoothly with your company's network.",
  },
  {
    id: 6,
    title: "Audio-Visual Equipment Set-Up",
    trainings:
      "We set up audio-visual equipment for both personal and professional use, including home theatres, conference rooms, and multimedia setups. Our services ensure that all components are correctly installed and optimised for the best performance.",
  },
];
