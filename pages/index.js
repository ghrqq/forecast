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
        <title>
          {loc.city ? `Forecast for ${loc.city}` : "Theo's Forecast"}
        </title>
        <link rel="icon" href="/favicon.ico" />

        <meta name="title" content="Theo's Forecast" />
        <meta
          name="description"
          content="A single page weather forecast app created by Theo OZ - https://theoz.dev"
        />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_VERCEL_URL} />
        <meta property="og:title" content="Theo's Forecast" />
        <meta
          property="og:description"
          content="A single page weather forecast app created by Theo OZ - https://theoz.dev"
        />
        <meta
          property="og:image"
          content={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/meta.png`}
        />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={process.env.NEXT_PUBLIC_VERCEL_URL}
        />
        <meta property="twitter:title" content="Theo's Forecast" />
        <meta
          property="twitter:description"
          content="A single page weather forecast app created by Theo OZ - https://theoz.dev"
        />
        <meta
          property="twitter:image"
          content={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/meta.png`}
        />
      </Head>
      {isLoading ? <Loader /> : <Displayer />}
    </div>
  );
}
