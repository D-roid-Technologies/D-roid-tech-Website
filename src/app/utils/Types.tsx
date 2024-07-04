export type AppEntryType = {
  closeModal?: () => void;
};

export type RouterType = {
  width: number;
};

export type DimensionType = {
  width: number;
  height: number;
};
export type UserType = {
  sixDigitCode: string;
  sixDigitCodeFromUser: string;
  userFName: string;
  userLName: string;
  message: string;
  userEmail: string;
};
export type ContactType = {
  userFullName: string;
  userEmail: string;
  userPhoneNumber: string;
  userSubject: string;
  userMessage: string;
};
export type TestimonialType = {
  name: string;
  comapanyName: string;
  position: string;
  serviceType: string;
  message: string;
};

export type EmailType = {
  emailFromUser: string;
};

export type AppInputType = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  fFamily?: string;
  fWeight?: number;
  color?: string;
  w?: string;
  h?: number;
  mTop?: number;
  mBottom?: number;
  mAll?: number;
  mRight?: number;
  bRadius?: number;
  pAll?: number;
  pLeft?: number;
  pRight?: number;
  bColor?: string;
  bWidth?: number;
  pHolder: string;
  bagColor?: string;
  // added dropdown
  isDropdown?: boolean;
  options?: string[];
  onchangeText?: (e: any) => void;
  inputType?: string;
  icon?: React.ReactNode; // Add icon prop
};

export type AppButtonType = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  bgColor: string;
  mTop: number;
  mBottom: number;
  mLeft: number;
  mRight: number;
  fWeight?: number;
  bRadius?: number;
  bRadiusColor?: string;
  icon?: React.ReactNode; // Added icon
  onClickButton: () => void;
  // color: string;
};

export type TrainingPhoto = {
  image: string;
  text: string;
};

// export type Course = {
//   id: number;
//   level?: string;
//   title: string;
//   subtitle?: string;
//   description?: string;
//   benefits?: {
//     title: string;
//     description: string;
//   }[];
//   projects?: {
//     title: string;
//     description: string;
//   }[];
//   howItWorks: {
//     title: string;
//     content: string;
//   }[];
//   courseDetails: {
//     startDate: string;
//     duration: string;
//     price: number;
//     discountedPrice: number;
//     offerExpiry: string;
//   };
// };

export type Course = { id: number; title: string };

export type AppEntrySliceType = {
  showModal: boolean;
  showToast: boolean;
  appTitle: string;
  appBody: any;
};

export type Testimonailstype = {
  quote: string;
  author: string;
  backgroundImage: string;
  testimonials: string[];
};

export type TechTrainingType = {
  title: string;
  description?: string;
  trainingType?: object[];
  image?: any;
  content?: string;
  trainingProcedure?: {
    stepOne?: string;
    stepTwo?: string;
    stepThree?: string;
  };
  priceNG?: object[];
  priceUK?: object[];
  applicationProcedure?: {
    stepOne?: string;
    stepTwo?: string;
    stepThree?: string;
  };
};

export type SoftwareDevelopmentType = {
  title?: string;
  image?: any;
  desc?: string;
  category?: string[];
  tools?: string[];
  price?: number[];
  currency?: string[];
  procedure?: object[];
  classId?: string;
  path?: string;
  // added
  content?: string;
  description?: string;
};

export type TestimonialTypes = {
  body: string;
  author: string;
  service: string;
  company: string;
  position: string;
  type: string[];
};

export type TestType = {
  question: string;
  options: string[];
  correct: string;
};
