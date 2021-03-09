const Kino = require('../models/Kino');

const getMovie = async (req, res) => {
  try {
    let kino = await Kino.findOne({ movieId: parseInt(req.params.id) }).lean();

    if (!kino) return res.status(404).json({ msg: 'Kino not found' });

    res.json(kino);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = { getMovie };
