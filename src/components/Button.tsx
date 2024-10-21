'use client';

import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  className = "",
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`text-text-primary grid place-content-center rounded-xl disabled:cursor-not-allowed disabled:text-White/30 disabled:bg-White/40 bg-Primary/400 px-8 py-3 text-White/100 transition-colors duration-300 hover:bg-Primary/500 ${className}`}
      onClick={() => onClick?.()}
      {...props}
    >
      {children}
    </button>
  );
}