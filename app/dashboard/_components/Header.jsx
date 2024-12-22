'use client';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

function Header() {
  const path = usePathname();
  useEffect(() => {
    console.log('path is:', path);
  }, []);
  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-md '>
      <Image src={'/logo.svg'} width={50} height={50} alt={'logo'} />
      <ul className='hidden md:flex gap-6'>
        <li
          className={`hover:font-bold hover:text-primary transition-all cursor-pointer ${
            path === '/dashboard' && 'font-bold text-primary'
          }`}
        >
          Dashboard
        </li>
        <li
          className={`hover:font-bold hover:text-primary transition-all cursor-pointer ${
            path === '/questions' && 'font-bold text-primary'
          }`}
        >
          Questions
        </li>
        <li
          className={`hover:font-bold hover:text-primary transition-all cursor-pointer ${
            path === '/upgrade' && 'font-bold text-primary'
          }`}
        >
          Upgrade
        </li>
        <li
          className={`hover:font-bold hover:text-primary transition-all cursor-pointer ${
            path === '/howitworks' && 'font-bold text-primary'
          }`}
        >
          How it Works?
        </li>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
