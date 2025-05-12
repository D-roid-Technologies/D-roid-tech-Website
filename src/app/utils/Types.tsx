export type RouterType = {
  width: number;
};

export type DimensionType = {
  width: number;
  height: number;
};
export type UserType = {
  firstName: string;
  lastName: string;
  middleName: string;
  initials: string;
  userType: string;
  uniqueId: string;
  email: string;
  phone: string;
  agreeToPolicy: boolean;
  isLoggedIn: boolean;
  gender: string;
  dateOfBirth: string;
  disability: boolean;
  disabilityType: string;
  photoUrl: string;
  educationalLevel: string;
  referralName: string;
  secondaryEmail: string;
  securityQuestion: string;
  securityAnswer: string;
  verifiedEmail: boolean;
  verifyPhoneNumber: boolean;
  agreedToTerms: boolean;
  twoFactorSettings: boolean;
  password: string;
  role?: string; // ✅ Added this field
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
  testimonials: Array<{
    name: string;
    comapanyName: string;
    position: string;
    serviceType: string;
    message: string;
  }>;
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
  // title: React.ReactNode; // Changed this line to accept ReactNode
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

export type Course = { id: number; title: string };

export type AppEntrySliceType = {
  showModal: boolean;
  showToast: boolean;
  appTitle: string;
  appBody: any;
  toastTitle: string;
};

export type ToastSliceType = {
  showToast: boolean;
  toastTitle: string;
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
  correctAnswer: string;
};
export type GeolocatedProps = {
  isGeolocationAvailable: boolean;
  isGeolocationEnabled: boolean;
  coords: {
    latitude: number;
    longitude: number;
  } | null;
};

export type Project = {
  id?: string;
  title: string;
  status?: "Completed" | "Ongoing" | "In Communication";
  descriptionUrl: string;
  summary: string;
  startDate: string;
  endDate?: string;
  client: string;
  team: string[];
  imageUrl?: string;
  category?: string;
  price?: string;
  author?: string;
  isBtn?: boolean;
};

interface LocalityInfo {
  administrative: Array<any>;
  informative: Array<any>;
}

export type LocationState = {
  city: string;
  continent: string;
  continentCode: string;
  countryCode: string;
  countryName: string;
  latitude: number;
  locality: string;
  localityInfo: LocalityInfo;
  localityLanguageRequested: string;
  longitude: number;
  lookupSource: string;
  plusCode: string;
  postcode: string;
  principalSubdivision: string;
  principalSubdivisionCode: string;
}
