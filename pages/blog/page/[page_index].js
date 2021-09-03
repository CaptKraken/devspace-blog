import fs from "fs";
import path from "path";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import { POSTS_PER_PAGE } from "@/config/index";
import Pagination from "@/components/Pagination";
import { getPosts } from "@/libs/posts";
import CategoryList from "@/components/CategoryList";

const BlogPage = ({ posts, numPages, currentPage, categories }) => {
  //   if (!posts) return null;
  return (
    <Layout title="Blog Posts | DevSpace Blog">
      <h1 className="text-5xl font-bold border-b-4 p-5">Latest Posts</h1>
      <div className="flex flex-col lg:flex-row justify-between mx-4">
        <div className="w-full lg:w-3/4 lg:mr-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts?.map((post) => (
              <Post key={post.slug} post={post} />
            ))}
          </div>
          <Pagination currentPage={currentPage} numPages={numPages} />
        </div>
        <div className="w-full lg:w-1/4">
          <CategoryList categories={categories} />
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);

  let paths = [];

  for (let i = 1; i <= numPages; i++) {
    paths.push({ params: { page_index: i.toString() } });
  }
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const page = parseInt((params && params.page_index) || 1);
  const files = fs.readdirSync(path.join("posts"));

  const posts = getPosts();

  const categories = posts.map((post) => post.frontmatter.category);
  const uniqueCategeories = [...new Set(categories)];

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);
  const pageIndex = page - 1;
  const orderedPost = posts.slice(
    pageIndex * POSTS_PER_PAGE,
    (pageIndex + 1) * POSTS_PER_PAGE
  );

  return {
    props: {
      posts: orderedPost,
      numPages,
      currentPage: page,
      categories: uniqueCategeories,
    },
  };
}
