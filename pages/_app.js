import '../styles/globals.css'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../client';
import { useRouter } from 'next/router';


function MyApp({ Component, pageProps }) {

  const [ authenticated, setAuthenticated ] = useState('not-authenticated');
  const router = useRouter()
  useEffect(() => {
    const {data: authListener} = supabase.auth.onAuthStateChange((event, session) => {
      handleAuthChange(event, session)
      if(event === 'SIGNED_IN'){
        setAuthenticated('authenticated');
        router.push('/profile');
      }

      if(event === 'SIGNED_OUT'){
        setAuthenticated('not-authenticated');
        router.push('/login');
      }

    })
    checkUser();
    return () => {
      authListener.unsubscribed()
    }
  }, [])
  
  
  async function handleAuthChange(event, session){
    await fetch('/api/auth', {
      method:'POST',
      headers: new Headers({'Content-Type':'application/json'}),
      credentials: 'same-origin',
      body: JSON.stringify({event, session}),
    })
  }


  async function checkUser(){
    const user = await supabase.auth.user();
    if(user){
      setAuthenticated('authenticated');
    }
  }

  return(
    <>

      <Component {...pageProps} />
    </>
  )
  
  
}

export default MyApp
