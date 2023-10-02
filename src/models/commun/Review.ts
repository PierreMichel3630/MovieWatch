export interface Review {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: null | string;
    rating: null | number;
  };
  content: string;
  created_at: Date;
  id: string;
  updated_at: Date;
  url: string;
  language: string;
}
