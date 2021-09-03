import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";
import marked from "marked";
import Layout from "../../components/Layout";
import CategoryLabel from "../../components/CategoryLabel";
import GoBackButton from "@/components/GoBackButton";

const PostPage = ({
  frontmatter: { title, category, date, cover_image, author, author_image },
  content,
  slug,
}) => {
  return (
    <Layout title={title}>
      <div className="block ml-4 md:hidden">
        <GoBackButton />
      </div>
      <div className="w-full px-4 md:px-8 lg:px-10 bg-white my-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-4">
          <h1 className="text-3xl md:text-5xl mb-7">{title}</h1>
          <CategoryLabel>{category}</CategoryLabel>
        </div>
        <div className="flex justify-between items-center bg-gray-100 p-2 my-8 rounded-sm">
          <div className="flex items-center gap-2">
            <Image
              src={author_image}
              className="mx-4 object-cover hidden sm:block rounded-full"
              width={40}
              height={40}
            />
            <h4 className="font-bold">{author}</h4>
          </div>
          <div>{date}</div>
        </div>
        <Image
          src={cover_image}
          className="w-full rounded"
          width={800}
          height={500}
          layout="responsive"
        />

        <div className="blog-text mt-2">
          <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
      </div>
    </Layout>
  );
};

export default PostPage;

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      content,
      slug,
    },
  };
}
