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
  onClickButton: () => void;
  // color: string;
};

export type TrainingPhoto = {
  image: string;
  text: string;
};

export type Course = {
  id: number;
  level: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: {
    title: string;
    description: string;
  }[];
  projects: {
    title: string;
    description: string;
  }[];
  howItWorks: {
    title: string;
    content: string;
  }[];
  courseDetails: {
    startDate: string;
    duration: string;
    price: number;
    discountedPrice: number;
    offerExpiry: string;
  };
};

export type AppEntrySliceType = {
  showModal: boolean;
  showToast: boolean;
  appTitle: string;
  appBody: any;
};
