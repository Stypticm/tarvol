'use client'
import { Button, Input } from '@nextui-org/react'
import { LockKeyhole, Mail } from 'lucide-react'
import React, { useState } from 'react'
import { AuthProps } from '../features/authTypes'
import { ButtonAuth } from './ButtonAuth'
import { useRouter } from 'next/navigation'
import signIn from '@/firebase/auth/signin'
import InstallPWAButton from './AddToHomeScreen'

const SignIn: React.FC<AuthProps> = ({ onSwitch }) => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if ((email !== '' || email !== undefined) || (password !== '' || password !== undefined)) {
                const { result, error } = await signIn(email, password);
                if (error) {
                    console.error('Login failed:', error);
                } else {
                    console.log('Login successful:', result);
                    router.push('/main');
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="h-screen w-screen bg-sky-950 overflow-auto flex flex-wrap justify-center items-center">
            <form
                className='w-5/6 h-5/6 flex flex-col justify-center'
                onSubmit={handleLogin}
            >
                <section className='flex justify-center mb-5'>
                    <InstallPWAButton />
                </section>
                <h1 className='text-xl font-bold mb-5 flex justify-center'>
                    Authentication
                </h1>
                <section className='flex flex-col gap-4'>
                    <Input
                        type="email"
                        name="email"
                        id='email'
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
                        id='password'
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
                </section>
                <section className='flex justify-center mt-5'>
                    <ButtonAuth />
                </section>
                <section className='text-neutral-500 mt-12'>
                    First time using Tarvol ?
                    <span
                        onClick={onSwitch}
                        className='text-white ml-1 hover:underline cursor-pointer'>
                        Create an account
                    </span>
                </section>
            </form>
        </div>
    )
}

export default SignIn