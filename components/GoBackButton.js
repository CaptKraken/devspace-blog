import Link from "next/link";

const GoBackButton = () => {
  return (
    <Link href="/blog">
      <a className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2">
        &larr; Go Back
      </a>
    </Link>
  );
};

export default GoBackButton;
