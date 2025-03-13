// contentlayer.d.ts
declare module 'contentlayer/generated' {
  export interface Post {
    _id: string;
    _raw: {
      flattenedPath: string;
    };
    title: string;
    date: string;
    formattedDate: string;
    tags?: string[];
    featured?: boolean;
    url: string;
    body: {
      code: string;
    };
  }

  export const allPosts: Post[];
}

declare module 'next-contentlayer/hooks' {
  export function getMDXComponent(code: string): React.ComponentType;
}

export interface Post {
  _id: string;
  _raw: {
    flattenedPath: string;
  };
  title: string;
  date: string;
  formattedDate: string;
  tags?: string[];
  featured?: boolean;
  url: string;
  body: {
    code: string;
  };
} 