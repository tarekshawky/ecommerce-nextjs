'use client'
import toast, { Toaster } from 'react-hot-toast'

export default function ClientProviders({
    children,
}:{
    children: React.ReactNode
}){
    return (
        <>
            <Toaster/>
            {children}
        </>
    )
}