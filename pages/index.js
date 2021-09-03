import Layout from "../components/Layout";
import Link from "next/link";
import Post from "../components/Post";
import { getPosts } from "@/libs/posts";

export default function Home({ posts }) {
  return (
    <Layout>
      <h1 className="text-5xl font-bold border-b-4 p-5">Latest Posts</h1>
      <div className="mx-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <Post key={post.slug} post={post} />
          ))}
        </div>
        <Link href="/blog">
          <a className="block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full">
            All Posts
          </a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: { posts: getPosts().slice(0, 6) },
  };
}
