import { AuthProps } from '@/features/authTypes'
import sigUp from '@/firebase/auth/signup'
import { Input } from '@nextui-org/react'
import { LockKeyhole, Mail, User } from 'lucide-react'
import React from 'react'
import { ButtonReg } from './ButtonAuth'
import { useRouter } from 'next/navigation'

const SignUp: React.FC<AuthProps> = ({ onSwitch }) => {

  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const router = useRouter()

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if ((name !== '' || name !== undefined) || (email !== '' || email !== undefined) || (password !== '' || password !== undefined)) {

        const { result, error } = await sigUp(email, name, password);
        if (error) {
          console.error('Registration failed:', error);
        } else {
          console.log('Registration successful:', result);
          router.push('/main');
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="h-screen w-screen bg-sky-950 overflow-auto flex justify-center items-center">
      <form className='w-5/6 h-full flex flex-col justify-center'
        onSubmit={handleRegistration}
      >
        <h1 className='text-xl font-bold mb-5 flex justify-center'>
          Registration
        </h1>
        <section className='flex flex-col gap-4'>
          <Input
            type="name"
            name='name'
            placeholder="Display name"
            id='name'
            startContent={
              <User color='black' />
            }
            autoComplete=''
            color='primary'
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
            autoComplete=''
            color='primary'
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
            autoComplete=''
            color='primary'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </section>
        <section className='flex justify-center mt-5'>
          <ButtonReg />
        </section>
        <section className='text-neutral-500 mt-12'>
          Already have an account ?
          <span
            onClick={onSwitch}
            className='text-white ml-1 hover:underline cursor-pointer'>
            Login
          </span>
        </section>
      </form>
    </div>
  )
}

export default SignUp