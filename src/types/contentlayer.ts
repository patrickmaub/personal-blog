export interface Post {
  _id: string;
  _raw: {
    flattenedPath: string;
    sourceFilePath: string;
    sourceFileName: string;
    sourceFileDir: string;
    contentType: string;
  };
  type: string;
  title: string;
  date: string;
  formattedDate: string;
  url: string;
  featured?: boolean;
  tags?: string[];
  body: {
    code: string;
    raw: string;
  };
} 