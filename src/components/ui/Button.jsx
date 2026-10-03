import React from 'react'
import { twMerge } from 'tailwind-merge'

const Button = ({text, classNames, icon, onClick}) => {
  return (
    <button className={twMerge( `px-8 py-2 border border-zinc-300 bg-zinc-200/30 text-sm tracking-wider font-semibold w-fit flex gap-2 items-center rounded-lg cursor-pointer ${classNames || ''}` )}
    onClick={onClick}
    >
      {text}

        {icon}
    </button>
  )
}

export default Button