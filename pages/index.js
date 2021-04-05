import Head from "next/head";
import Loader from "../components/Loader";
import Displayer from "../components/Displayer";
import { useSelector, useDispatch } from "react-redux";

export default function Home() {
  const { msg, process, isLoading } = useSelector((state) => state.loader);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading ? <Loader /> : <Displayer />}
    </div>
  );
}
