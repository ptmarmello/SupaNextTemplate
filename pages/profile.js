import React from 'react'
import { supabase } from '../client'


export default function Profile() {
  return (
    <div>Profile</div>
  )
}


export async function getServersideProps({req}){
    const { user } = await supabase.auth.api.getUserByCookie(req);

    if(!user){
        return {
            props: { },
            redirect: { 
                destination: '/signin'
            }
        }
    }

    return {
        props: { 
            user
         }
    }

}