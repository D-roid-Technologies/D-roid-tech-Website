export type Chapter = {
  id: number;
  title: string;
  content: string[]; // paragraphs
};

export type Story = {
  id: string;
  title: string;
  genre: string;
  runtime: string;
  releaseDate: string;
  description: string;
  synopsis: string;
  themes: string[];
  chapters: Chapter[];
};
