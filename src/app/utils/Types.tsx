export type ProjectType = {
  icon: any;
  title: string;
  header: string;
  company: string;
  date: string;
  aboutApp: string;
  jobDescriptionTitle: string;
  jobDescription: string[];
  techTitle: string;
  techUsed: string[];
};

export type AppEntryType = {
  showModal?: boolean;
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
  onClickButton: () => void;
  // color: string;
};
