export interface Post {
  id?: number;
  title: string;
  author: string;
  publish_date: string;
  slug: string;
  description: string;
  content: string;
  comments?: [
    {
      user: string;
      comment: string;
    }
  ];
}
