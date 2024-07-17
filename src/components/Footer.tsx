import React from 'react'

export const Footer = () => {
  return (
    <footer className='flex flex-col justify-center items-center bg-[#0c1933]'>
        <div className="flex flex-col justify-center items-center text-white p-4 xl:w-[900px]">
            <p className='flex p-2 font-medium justify-center  text-[18px]'>AI Detecta estafas</p>
            <p className='text-[14px]'>Todos los resultados mostrados en este sitio son generados por una inteligencia artificial.</p>
            <p className='text-[14px]'>
            Este proyecto se ha inspirado en algunos componentes de una <a className='hover:text-green-600' href="https://vercel.com/templates/next.js/ai-code-translator" target="_blank" rel="noreferrer">plantilla de Vercel</a>
            </p>
            <p className='text-[14px]'>Desarrollado por <a className='hover:text-green-600' href="https://www.linkedin.com/in/yessenia22/" target="_blank" rel="noreferrer">Yessenia Villarte</a></p>
        </div>
    </footer>
  )
}
