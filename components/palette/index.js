import React, { useContext } from 'react'

export default function Palette({palette, handleDeletePalette, handleGetPalette}) {
 const {id, name, colors} = palette;
  return (
    <div>
      <h3 className='font-bold mb-1'>{name}</h3>
      <div className='relative border-2 border-black h-[200px]'>
        <div className='absolute mt-2 ml-2'>
          <button className='w-[32px] h-[32px] bg-slate-200 mr-2 hover:bg-slate-300' onClick={() => handleDeletePalette(id)}>🗑️</button>
          <button className='w-[32px] h-[32px] bg-slate-200 mr-2 hover:bg-slate-300' onClick={() => handleGetPalette(id)}>✍🏼</button>
        </div>
        <div className='flex h-full'>
          {colors.map((color) => {
            return (<div style={{backgroundColor: `rgb(${color.RED}, ${color.GREEN}, ${color.BLUE})`}} className='w-full h-full flex items-center justify-center font-bold' key={color.id}> 
              <p className='bg-white/70 p-2'>{color.RED} , {color.GREEN} , {color.BLUE} </p>
            </div>)
          })}
        </div>
      </div>
    </div>
  )
}
