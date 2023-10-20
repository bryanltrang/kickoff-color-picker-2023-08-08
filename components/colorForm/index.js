import React, { useState, useEffect, createContext } from 'react'
import ColorInput from '../colorInput'
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import ColorDisplay from '../colorDisplay';

// color { id: 0, name: '', RED: 0, GREEN: 0, BLUE: 0}

// palette { id: paletteId, colors: []}

const RGBVal = () => {
  return Math.floor(Math.random() * 255)
}

export default function PaletteForm() {
  const [colors, setColors] = useState([{id: uuidv4(), name: '', RED: 0, GREEN: 0, BLUE: 0}]);
  const [currentPalette, setCurrentPalette] = useState({
    name: '',
    id: null,
  }); //update to also store paletteId if available to edit
  const [palettes, setPalettes] = useState([]);
  const PaletteContext = createContext(null);

  const fetchPalettes = async () => {
    try {
      const { status, data } = await axios.get("/api/palettes");

      if (status === 200) {
        setPalettes(data);
      } else {
        throw new Error("Error connecting to server");
      }
    } catch(err) {
        throw new Error({ error: `An error occured when trying to get palettes: ${err}` })
    }
  }

  useEffect(() => {
    fetchPalettes();
  }, [])

  const handleAddColor = (e) => {
    e.preventDefault();
    const newColor = {
      id: uuidv4(), RED: RGBVal(), GREEN: RGBVal(), BLUE: RGBVal()
    }
    setColors([...colors, newColor])
  }

  const addPalette = async () => {
    try {
      const { status } = await axios.post("/api/palettes", {
        colors: colors,
        name: currentPalette.name
      }, {
        headers: {
          "Content-Type": "application/json",
        }});

      if (status === 200) {
        console.log('successfully added palette')
        setColors([{id: uuidv4(), name: '', RED: 0, GREEN: 0, BLUE: 0}]);
        setCurrentPalette({name: '', id: null})
      } else {
        throw new Error("Error connecting to server");
      }
    } catch(err) {
        throw new Error({ error: `An error occured when trying to add palette: ${err}` })
    }
  }

  const updatePalette = async () => {
    try {
      const { status } = await axios.put("/api/palettes", {
        newColors: colors,
        updateId: currentPalette.id
      }, {
        headers: {
          "Content-Type": "application/json",
        }});

      if (status === 200) {
        console.log('successfully updated palette')
        setColors([{id: uuidv4(), name: '', RED: 0, GREEN: 0, BLUE: 0}]);
        setCurrentPalette({name: '', id: null})
      } else {
        throw new Error("Error connecting to server");
      }
    } catch(err) {
        throw new Error({ error: `An error occured when trying to update palette: ${err}` })
    }
  }


  const handleSavePalette = async (e) => {
    e.preventDefault();
    if (currentPalette.id !== null) {
      console.log('updating palette')
      await updatePalette();
    } else {
      console.log('adding palette')
      await addPalette();
    }
    await fetchPalettes();
  }

  const preventSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  return (
      <div className='100vw 100vh flex'>

        <div className='p-8 bg-slate-100 fixed w-[450px] inset-y-0 overflow-y-auto'>

          <h1 className='text-2xl mb-4 font-extrabold'>🎨 CREATE PALETTE </h1>
          
          <form className='bg-white drop-shadow-xl p-4 border-solid border-black border-2' onSubmit={handleSavePalette}>
            {/* handle errors */}
            <label className='font-bold' htmlFor="Palette NAme">Palette Name*</label> 
            <input className='w-full h-[40px] p-2 mt-2 ring-2 ring-slate-200 focus:ring-indigo-700 focus:outline-none' required placeholder='Enter a palette name' type='string' value={currentPalette.name} onChange={(e) => setCurrentPalette({
              name: e.target.value, id: null})} onKeyDown={preventSubmit}></input>

            <div className='h-[2px] w-full bg-slate-200 mt-8'/>

            {colors.map((color) => {
              return (
                <ColorInput key={color.id} color={color} setColors={setColors} />
              )
            })}
            {(colors.length < 5) ? (
              <button className='bg-white hover:bg-slate-200 w-full h-[40px] font-bold text-indigo-700 border-2 border-indigo-700' onClick={handleAddColor}>+ Add Color</button>
            ) : (
              <p className='red'>Maximum colors per palette reached</p>
            )}
          
          <div className='h-[2px] w-full bg-slate-200 mt-8 mb-8'/>
          <button className='bg-indigo-700 hover:bg-indigo-600 w-full h-[40px] font-bold text-white' type='submit'>Save Palette</button>
          </form>

        </div>

        <ColorDisplay palettes={palettes} fetchPalettes={fetchPalettes} setColors={setColors} setCurrentPalette={setCurrentPalette} />

      </div>
  )
}
