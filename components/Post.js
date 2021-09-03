import Image from "next/image";
import Link from "next/link";
import CategoryLabel from "./CategoryLabel";

const Post = ({ post, compact = false }) => {
  return (
    <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6 flex flex-col hover:-translate-y-1 transition-all duration-300">
      {!compact && (
        <Image
          src={post.frontmatter.cover_image}
          width={600}
          height={420}
          className="mb-4 rounded"
        />
      )}
      <div className="mt-2 flex justify-between items-center">
        <span className="front-light text-gray-600">
          {post.frontmatter.date}
        </span>
        <CategoryLabel>{post.frontmatter.category}</CategoryLabel>
      </div>

      <div className="mt-2 lg:mb-4">
        <Link href={`/blog/${post.slug}`}>
          <a className="text-2xl text-gray-700 font-bold hover:underline">
            {post.frontmatter.title}
          </a>
        </Link>
        <p className="mt-2 text-gray-600">{post.frontmatter.excerpt}</p>
      </div>
      {!compact && (
        <div className="flex justify-between items-center mt-auto">
          <Link href={`/blog/${post.slug}`}>
            <a className="text-gray-900 hover:text-blue-600">
              Read More &rarr;
            </a>
          </Link>
          <div className="flex items-center">
            <Image
              src={post.frontmatter.author_image}
              width={40}
              height={40}
              className="mx-4 object-cover rounded-full hidden sm:block"
              alt=""
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
