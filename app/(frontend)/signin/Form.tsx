'use client'
import { signIn, useSession } from "next-auth/react"
import {useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
type Inputs = {
    email: string
    password: string
}

const Form = ()=> {
    const {data:session} = useSession()
    const params = useSearchParams()
    let callbackUrl = params.get('callbackUrl') || '/'
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<Inputs>({
        defaultValues:{
            email:'',
            password: '',
        }
    })
    useEffect(()=>{
        if(session && session.user){
            router.push(callbackUrl)
        }
    }, [callbackUrl,params,router,session])
    const formSubmit: SubmitHandler<Inputs> = async (form) =>{
        const {email, password} = form 
        signIn('credentials', {
            email, password
        })
    }
    return(
        <section className="flex  flex-col justify-center items-center my-8 py-8 bg-gray-900 max-w-6xl mx-auto">
            <div>
                <h2 className="text-white text-6xl mt-8">Sign in</h2>
            </div>
            {params.get('error') && (
              <div>
                {params.get('error') === 'CredentialsSignin'
                ? 'Invalid email or password'
                : params.get('error')
                }
              </div>
            )}
            {params.get('success') && (
              <div>{params.get('success')}</div>
            )}
        <form onSubmit={handleSubmit(formSubmit)} action="#" className="mt-8 grid grid-cols-6 gap-6">
    
          <div className="col-span-6">
            <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>

            <input
              type="email"
              id="email"
              className="mt-1 w-full rounded-md p-2 border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
           {...register('email', {
            required: 'Email is required',
            pattern:{
              value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
              message: 'Email is invalid'
            },
           })}
           />
           {errors.email?.message && (
            <div> {errors.email.message}</div>
           )}
          </div>

          <div className="col-span-6">
            <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

            <input
              type="password"
              id="Password"
              className="mt-1 w-full rounded-md p-2 border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              {...register('password', {
                required: 'Password is required',
            
               })}
            />
              {errors.password?.message && (
            <div> {errors.password.message}</div>
           )}
          </div>
    
          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
           disabled={isSubmitting}
           >
            {isSubmitting && (
              <span className="loading loading-spinner"></span>
            )}
              Sign in
              </button>

            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
              Already have an account?
              <a href="#" className="text-gray-700 underline">Log in</a>.
            </p>
          </div>
        </form>
        </section>
    )
       

}
export default Form