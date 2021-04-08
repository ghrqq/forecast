import Head from "next/head";
import Loader from "../components/Loader";
import Displayer from "../components/Displayer";
import { useSelector } from "react-redux";

export default function Home() {
  const { isLoading } = useSelector((state) => state.loader);
  const { loc } = useSelector((state) => state.data);

  return (
    <div>
      <Head>
        <title>Forecast for {loc.city}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading ? <Loader /> : <Displayer />}
    </div>
  );
}
