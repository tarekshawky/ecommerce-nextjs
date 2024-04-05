import React from 'react'
import Form from './Form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign in'
}
export default async function signIn() {
  return (
    <div>
        <Form/>
    </div>
  )
}
