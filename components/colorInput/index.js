import React, { useState } from 'react'

export default function ColorInput({color, setColors}) {

  const handleColor = (e) => {
    e.preventDefault();
    if (e.target.value >= 0 && e.target.value <= 255) {
      // visual feedback for fields under or over
      setColors((prev) => {
        return prev.map(col => {
          if (col.id === color.id) {
            return {...col, [e.target.id]: e.target.value}
          } else {
            return col
          }
        })
      })
   }
  }

  const handleDelete = (e) => {
    e.preventDefault();
    // only allow if length of color is larger than 1
    setColors((prev) => {
      if (prev.length > 1) {
       return prev.filter((col) => col.id !== color.id)
      } else {
       return prev
      }
    })
  }

  const preventDelete = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }
  const styles = {
    div: 'w-[70px]',
    label: 'font-bold',
    input: 'w-[50px] h-[32px] ring-2 ring-slate-200 focus:ring-indigo-700 focus:outline-none mt-1',
  }
  return (
    <div className='flex mt-6 mb-6 w-full items-end' >

      <button className='w-[32px] h-[32px] bg-slate-200 mr-4 hover:bg-slate-300' onClick={handleDelete}> 🗑️ </button>

      <div className={styles.div}>
      <label className={styles.label} htmlFor="RED">Red</label> 
      <input className={styles.input} id="RED" value={color.RED} type='number' onChange={handleColor} onKeyDown={preventDelete}/>
      </div>

      <div className={styles.div}>
      <label className={styles.label} htmlFor="GREEN">Green</label>
      <input className={styles.input} id="GREEN" value={color.GREEN} type='number' onChange={handleColor}
       onKeyDown={preventDelete}/>
      </div>

      <div className={styles.div}>
      <label className={styles.label} htmlFor="BLUE">Blue</label>
      <input className={styles.input} id="BLUE" value={color.BLUE} type='number' onChange={handleColor}
       onKeyDown={preventDelete}/>
      </div>

      <div className='w-[40px] h-[40px] rounded-full' style={{backgroundColor: `rgb(${color.RED}, ${color.GREEN}, ${color.BLUE})`}} />
   </div>
  )
}
