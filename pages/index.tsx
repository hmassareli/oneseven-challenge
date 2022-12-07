import Head from "next/head";
import { MdOutlineSell } from "react-icons/md";
import { BsArrowRightCircleFill } from "react-icons/bs";
import Link from "next/link";
export default function Home() {
  return (
    <div className=" bg-gray-200 font-roboto">
      <Head>
        <title>One Seven</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          http-equiv="Cache-Control"
          content="no-cache, no-store, must-revalidate"
        />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="0" />
      </Head>
      <main className="h-screen flex justify-center text-black">
        <section className="bg-white h-3/6 w-[600px] mt-10 rounded-lg p-10 shadow-2xl">
          <nav className=" mb-5 flex justify-center items-center flex-col font-semibold">
            <div className=" p-5 w-fit m-auto border-cyan-700 rounded-full h-auto">
              <MdOutlineSell className="m-auto text-8xl  text-cyan-700" />
            </div>
            <h1 className=" text-5xl text-center">
              FullStack Ecommerce Application
            </h1>
          </nav>

          <main className="text-center text-2xl m-10">
            <p>
              This is a simple fullstack application that uses Next.js and
              Nest.js to list and buy products.
            </p>
            <Link href="/products">
              <button className=" bg-cyan-800 hover:bg-cyan-700 text-white px-10 py-5 rounded-md flex m-auto mt-10 items-center justify-between gap-5 ">
                {" "}
                See the products <BsArrowRightCircleFill />
              </button>
            </Link>
          </main>
        </section>
      </main>
    </div>
  );
}
