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
