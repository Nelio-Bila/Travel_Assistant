import React,{useEffect} from 'react';
import { AppProps } from 'next/app';
import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '@/components/NavBar';
import { AuthProvider } from 'contexts/authcontext';


function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <AuthProvider>
      <NavBar/>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
