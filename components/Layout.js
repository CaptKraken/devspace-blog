import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";
import Search from "./Search";

const Layout = ({ children, title, keywords, description }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link re="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Search />
      <main className="container mx-auto my-7">{children}</main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Welcome to DevSpace",
  keywords: "development, coding, programming",
  description: "The best info & news in web development.",
};

export default Layout;
