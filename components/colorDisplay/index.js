import React, {useState, useEffect} from 'react'
import axios from "axios";
import Palette from '../palette';

export default function ColorDisplay({ palettes, fetchPalettes, setColors, setPaletteName}) {

  const handleGetPalette = async(paletteId) => {
    try {
      const {status, data} = await axios.get(`/api/palettes/${paletteId}`)
      if (status === 200) {
        setPaletteName(data.name)
        setColors(data.colors)
      } else {
        throw new Error("Error connecting to server");
      }
    } catch(err) {
      throw new Error({ error: `An error occured when trying to click on palette: ${err}` })
    }
  }

  const handleDeletePalette = async(paletteId) => {
    try {
      const { status } = await axios.delete(`/api/palettes/${paletteId}`);

      if (status === 200) {
        await fetchPalettes();
      } else {
        throw new Error("Error connecting to server");
      }
    } catch(err) {
        throw new Error({ error: `An error occured when trying to delete palette: ${err}` })
    }
  }

  return (
    <div className='ml-[450px] w-full p-8 drop-shadow-xl'>
      <h1 className='text-2xl mb-4 font-extrabold'>👨🏻‍🎨 SAVED PALETTES</h1>
      {palettes.length ? (
        <div className='grid grid-cols-2 col-auto gap-4 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3'>
        {palettes.map((palette) => {
          return (
            <Palette key={palette.id} palette={palette} handleDeletePalette={handleDeletePalette} handleGetPalette={handleGetPalette} />
          )
        })}
      </div>
      ) : (
        <div> It doesn't look like you have saved palettes yet. </div>
      )}

    </div>
  )
}
