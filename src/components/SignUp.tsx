import { registration } from '@/actions/registration'
import { AuthProps } from '@/features/authTypes'
import sigUp from '@/firebase/auth/signup'
import { Button, Input } from '@nextui-org/react'
import { LockKeyhole, Mail, User } from 'lucide-react'
import React from 'react'
import { ButtonReg } from './ButtonAuth'

const SignUp: React.FC<AuthProps> = ({ onSwitch, variant }) => {

  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <form className='w-5/6 h-full flex flex-col justify-center' action={
        async (formData) => {
          setName('')
          setEmail('')
          setPassword('')
          await registration(formData)
        }
      }>
        <h1 className='text-xl font-bold mb-5 ml-5 flex items-center justify-start'>
          <span>Registration</span>
        </h1>
        <div className='flex flex-col gap-4'>
          <Input
            type="name"
            name='name'
            placeholder="Display name"
            id='name'
            startContent={
              <User color='black' />
            }
            color='primary'
            autoComplete='name'
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <Input
            type="email"
            name='email'
            placeholder="Email"
            id='email'
            startContent={
              <Mail color='black' />
            }
            color='primary'
            autoComplete='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            type="password"
            name='password'
            placeholder="Password"
            id='password'
            startContent={
              <LockKeyhole color='black' />
            }
            color='primary'
            autoComplete='current-password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <ButtonReg />
        <p className='text-neutral-500 mt-12'>
          Already have an account ?
          <span
            onClick={onSwitch}
            className='text-white ml-1 hover:underline cursor-pointer'>
            Login
          </span>
        </p>
      </form>
    </div>
  )
}

export default SignUp