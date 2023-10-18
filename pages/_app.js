import '../styles/globals.css'
import Layout from "../components/layout/Layout"
import Sidebar from "../components/layout/Sidebar";
import Head from "next/head"
import {Provider} from "react-redux";
import store from "../store/store";
import { SessionProvider } from "next-auth/react"
import Modal from '@components/UI/Modal';
import { NextUIProvider } from '@nextui-org/react';



function MyApp({ Component, pageProps }) {
    
  return (
<NextUIProvider>
<SessionProvider session={pageProps.session}>
<Provider store={store}>

    <Layout>
        <Head>
            <title>Parcel Pro</title>
            <meta name="description" content="Packing Production"/>
            <meta name="description" content="Packing Production"/>
            <link rel="icon" href="static/favicon.ico"></link>
        </Head>
        <Sidebar />
        <div className="content">
            <Component {...pageProps} />
        </div>
    </Layout>

</Provider>
</SessionProvider>
</NextUIProvider>
)}

export default MyApp;