'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type Inputs = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const Form = () => {
  const { data: session } = useSession()

  const params = useSearchParams()
  const router = useRouter()
  let callbackUrl = params.get('callbackUrl') || '/'
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })
  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl)
    }
  }, [callbackUrl, params, router, session])

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password } = form

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })
      if (res.ok) {
        return router.push(
          `/signin?callbackUrl=${callbackUrl}&success=Account has been created`
        )
      } else {
        const data = await res.json()
        throw new Error(data.message)
      }
    } catch (err: any) {
      const error =
        err.message && err.message.indexOf('E11000') === 0
          ? 'Email is duplicate'
          : err.message
      toast.error(error || 'error')
    }
  }
  return(
    <section className="flex  flex-col justify-center items-center my-8 py-8 bg-gray-900 max-w-6xl mx-auto">
    <div>
        <h2 className="text-white text-6xl mt-8">Register</h2>
    </div>

<form onSubmit={handleSubmit(formSubmit)}  className="mt-8 grid grid-cols-6 gap-6">

        <div className="col-span-6">
    <label htmlFor="Name" className="block text-sm font-medium text-gray-700"> Name </label>

    <input
      type="text"
      id="name"
      className="mt-1 w-full rounded-md p-2 border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
   {...register('name', {
    required: 'Name is required',

   })}
   />
   {errors.name?.message && (
    <div> {errors.name.message}</div>
   )}
  </div>  


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
  <div className="col-span-6">
    <label htmlFor="Password" className="block text-sm font-medium text-gray-700">               Confirm Password
</label>

    <input
      type="password"
      id="confirmpassword"
      className="mt-1 w-full rounded-md p-2 border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
      {...register('confirmPassword', {
        required: 'confirm Password is required',
        validate: (value) => {
            const { password } = getValues()
            return password === value || 'Passwords should match!'
          },
       })}
    />
      {errors.confirmPassword?.message && (
    <div> {errors.confirmPassword.message}</div>
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
        Register 
     </button>

  </div>
</form> 
<div>

<p className="mt-4 text-sm text-gray-500 sm:mt-0">
    Already have an account?{' '}
            <Link className="link" href={`/signin?callbackUrl=${callbackUrl}`}>
                 Login
            </Link>
    </p>
</div>
</section>
)
}

export default Form
