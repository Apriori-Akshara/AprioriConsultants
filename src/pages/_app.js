import "@/styles/globals.css";
import "../styles/slick.css"; 
import "../styles/slick-theme.css";
import Layout from "../../components/Layout";

export default function App({ Component, pageProps }) {
  return <Layout>
    <Component {...pageProps} />;
  </Layout>

}
