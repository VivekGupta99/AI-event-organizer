'use client'

import { SignInButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Authenticated, Unauthenticated } from 'convex/react'

const Header = () => {
    return (
        <>
            <nav className=' fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-xl z-20 border-b'>
                <div className=' max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
                    {/* logo */}
                    <Link href={"/"} className='flex items-center'>
                        <Image
                            src="/spott.png"
                            alt='Spott logo'
                            width={500}
                            height={500}
                            className='w-full h-11'
                            priority
                        />
                        {/* Pro badge */}
                    </Link>
                    {/* search & location - Desktop only */}

                    {/* Right side actins */}
                    <div className=' flex items-center'>
                        <Authenticated>
                            {/* Create event */}
                            <UserButton />
                        </Authenticated>

                        <Unauthenticated>
                            <SignInButton mode='modal'>
                                <Button size="sm">Sign In</Button>
                            </SignInButton>

                        </Unauthenticated>
                    </div>
                </div>
                {/* mobile search & location - Below header  */}
            </nav>

            {/* Models  */}
        </>
    )
}

export default Header
