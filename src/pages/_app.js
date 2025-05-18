import "@/styles/globals.css";
import "../styles/slick.css";
import "../styles/slick-theme.css";
import Layout from "../../components/Layout";
import { Provider } from "react-redux";
import { store } from "../Store";
import { CookiesProvider } from 'react-cookie';
import AuthInitializer from '../../components/AuthInitializerjs';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <AuthInitializer />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CookiesProvider>
    </Provider>
  )
}
