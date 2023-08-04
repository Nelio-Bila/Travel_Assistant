import React from 'react';
import { AppProps } from 'next/app';
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '@/components/NavBar';
import { AuthProvider } from 'contexts/authcontext';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <NavBar/>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
