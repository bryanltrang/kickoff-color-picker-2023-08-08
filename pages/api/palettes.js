import knex from "../../clients/knex";

// get palettes and matching colors from DB
const getPalettes = async(req, res) => {
  try {
    const palettes  = await knex("palettes");
    for (let palette of palettes) {
      const colors = await knex('colors').where("palette_id", palette.id);
      palette.colors = colors
    }
    res.status(200).json(palettes);
  } catch(err) {
    res.status(500).json({ error: `An error occured when trying to getPalettes ${err}` });
  }
}

// add palettes and colors to DB
const addPalette = async(req, res) => {
  try {
    const { colors, name } = req.body;
    const [ paletteId ] = await knex('palettes').insert({name: name}).returning('id')
    for (let color of colors) {
      await knex('colors').insert({
        palette_id: paletteId.id,
        RED: color.RED,
        GREEN: color.GREEN,
        BLUE: color.BLUE
      });
    }
    res.send('Palette and colors inserted successfully.')
  } catch (err) {
    res.status(500).json({ error: `An error occured when trying to addPalettes ${err}` });
  }
}

// update palette and colors in the DB
const updatePalette = async(req, res) => {
  try {
    const { updateId, newColors } = req.body;
    
    await knex('colors').delete().where('palette_id', updateId)

    for (let color of newColors) {
      await knex('colors').insert({
        palette_id: updateId,
        RED: color.RED,
        GREEN: color.GREEN,
        BLUE: color.BLUE
      });
    }

    res.send('Palette colors updated successfully.')
 } catch (err) {
    res.status(500).json({ error: `An error occured when trying to updatePalette ${err}` });
 }
}

export default async (req, res) => {
  if (req.method === "GET") {
      await getPalettes(req, res);
  } else if (req.method === "POST") {
      await addPalette(req, res);
  } else if (req.method === "PUT") {
     await updatePalette(req, res);
  } else {
     res.status(404).json({ error: `${req.method} endpoint does not exist` });
  }
};
