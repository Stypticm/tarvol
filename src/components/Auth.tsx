'use client'

import React, { useCallback, useState } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import { AuthMode } from '@/features/authTypes'

const Auth = () => {
  const [variant, setVariant] = React.useState<AuthMode>('login')

  const switchAuthMode = () => {
    setVariant(variant === 'login' ? 'register' : 'login')
  }

  return (
    <>
      {
        variant === 'login'
          ? <SignIn onSwitch={switchAuthMode} variant={variant} />
          : <SignUp onSwitch={switchAuthMode} variant={variant} />
      }
    </>
  )
}

export default Auth