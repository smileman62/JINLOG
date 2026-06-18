import postsJson from "../../.velite/posts.json";

export type VelitePost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
  cover?: string;
  body: string;
};

export function readVelitePosts(): VelitePost[] {
  return postsJson as VelitePost[];
}
