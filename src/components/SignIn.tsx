'use client'
import { Input } from '@nextui-org/react'
import { LockKeyhole, Mail } from 'lucide-react'
import React, { useState } from 'react'
import { AuthProps } from '../features/authTypes'
import { login } from '@/actions/authorization'
import { ButtonAuth } from './ButtonAuth'
import { useRouter } from 'next/navigation'
import signIn from '@/firebase/auth/signin'

const SignIn: React.FC<AuthProps> = ({ onSwitch }) => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 

        try {
            const { result, error } = await signIn(email, password);
            if (error) {
                console.error('Login failed:', error);
            } else {
                console.log('Login successful:', result);
                router.push('/main');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <form
                className='w-5/6 h-full flex flex-col justify-center'
                onSubmit={handleLogin}
            >
                <h1 className='text-xl font-bold mb-5 ml-5 flex items-center justify-start'>
                    <span>Authentication</span>
                </h1>
                <div className='flex flex-col gap-4'>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        startContent={
                            <Mail color='black' />
                        }
                        color='primary'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete='username'
                        required
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        startContent={
                            <LockKeyhole color='black' />
                        }
                        color='primary'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete='current-password'
                        required
                    />
                </div>
                <ButtonAuth />
                <p className='text-neutral-500 mt-12'>
                    First time using Tarvol ?
                    <span
                        onClick={onSwitch}
                        className='text-white ml-1 hover:underline cursor-pointer'>
                        Create an account
                    </span>
                </p>
            </form>
        </div>
    )
}

export default SignIn