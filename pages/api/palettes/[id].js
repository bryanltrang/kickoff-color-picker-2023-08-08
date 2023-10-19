import knex from "../../../clients/knex";

// delete palette and matching colors in the DB
const deletePalette = async(req, res) => {
  try {
    const { id } = req.query;
    await knex('palettes').delete().where('id', id)
    await knex('colors').delete().where('palette_id', id)
    res.send('Palette and colors deleted successfully.')
 } catch (err) {
    res.status(500).json({ error: `An error occured when trying to deletePalette ${err}` });
 }
}

// get one palette and matching colors from DB
const getPalette = async(req, res) => {
  try {
    const { id } = req.query
    const palette  = await knex("palettes").where('id', id);
    const colors = await knex('colors').where("palette_id", palette[0].id);
    palette[0].colors = colors
    res.status(200).json(palette[0]);
  } catch(err) {
    res.status(500).json({ error: `An error occured when trying to getPalette ${err}` });
  }
}


export default async (req, res) => {
  if (req.method === "DELETE") {
     await deletePalette(req, res); 
  } else if (req.method === 'GET') {
    await getPalette(req, res); 
  }
   else {
     res.status(404).json({ error: `${req.method} endpoint does not exist` });
  }
};