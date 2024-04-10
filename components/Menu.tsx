'use client'
import useCartService from '@/lib/hooks/useCartStore'
import { signIn, signOut, useSession } from 'next-auth/react'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const Menu = () => {
  const { items } = useCartService()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const signoutHandler = () => {
    signOut({ callbackUrl: '/signin' })
  }

  const { data: session } = useSession()


  const handleClick = () => {
    ;(document.activeElement as HTMLElement).blur()
  }

  return (
    <>
   
      <div>
        <div className="flex items-center gap-4">
            <div className='w-full'>
            <Link className="bg-gray-900 text-white inline-flex w-20 justify-center gap-2 items-center py-2 rounded-md relative" href="/cart">
              Cart
              {mounted && items.length != 0 && (
                <div className="bg-red-900 rounded-full mt-[-0.5rem] py-1 px-2 text-sm">
                  {items.reduce((a, c) => a + c.qty, 0)}{' '}
                </div>
              )}
            </Link>
            </div>
        
          {session && session.user ? (
            <>
            
                <div className="relative">
                  <label tabIndex={0} className="inline-flex gap-2">
                    {session.user.name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu absolute t z-[1] p-2 shadow  w-52 "
                  >
                 
                    <li onClick={handleClick}>
                      <Link href="/order-history">Order history </Link>
                    </li>
                    <li onClick={handleClick}>
                      <Link href="/profile">Profile</Link>
                    </li>
                    <li onClick={handleClick}>
                      <button type="button" onClick={signoutHandler}>
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
            
            </>
          ) : (
            <div className='w-full'>
              <button
                className="btn btn-ghost rounded-btn"
                type="button"
                onClick={() => signIn()}
              >
                Sign in
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Menu