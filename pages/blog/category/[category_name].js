import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import { getPosts } from "@/libs/posts";
import CategoryList from "@/components/CategoryList";

const BlogPage = ({ posts, categoryName, categories }) => {
  return (
    <Layout title={`Blog Posts in ${categoryName} | DevSpace Blog`}>
      <h1 className="text-5xl font-bold border-b-4 p-5">
        Category: {categoryName}
      </h1>
      <div className="flex flex-col lg:flex-row justify-between mx-4">
        <div className="w-full lg:w-3/4 lg:mr-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts?.map((post) => (
              <Post key={post.slug} post={post} />
            ))}
          </div>
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
  const categories = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);
    return frontmatter.category.toLowerCase();
  });

  const paths = categories.map((category) => ({
    params: { category_name: category },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params: { category_name } }) {
  const posts = getPosts();

  const categories = posts.map((post) => post.frontmatter.category);
  const uniqueCategeories = [...new Set(categories)];

  const categoryPosts = posts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category_name
  );

  return {
    props: {
      posts: categoryPosts,
      categoryName: category_name,
      categories: uniqueCategeories,
    },
  };
}
