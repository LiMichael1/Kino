const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Kino = require('../models/Kino');

// @route       GET api/kino/:movieId
// @desc        Get Average Rating & Number of Reviews of a Movie
// @access      Public
router.get('/:id', async (req, res) => {
  try {
    let kino = await Kino.findOne({ movieId: req.params.id }).lean();

    if (!kino) return res.status(404).json({ msg: 'Kino not found' });

    res.json(kino);
  } catch (err) {
    console.err(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// // @route     POST api/kinos
// // @desc      Add a Movie
// // @access    Private
// router.post(
//   '/',
//   [
//     auth,
//     [
//       check('title', 'Title is required').not().isEmpty(),
//       check('date', 'There is no release date?').not().isEmpty(),
//     ],
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const {
//       title,
//       date,
//       genre,
//       description,
//       type,
//       runTime,
//       poster,
//       tmdb_id,
//     } = req.body;

//     try {
//       let findKino = await Kino.findOne({ tmdb_id }, '_id', { lean: true });

//       if (findKino) {
//         return res
//           .status(400)
//           .json({ msg: `${title} already in the database` });
//       }

//       const newKino = new Kino({
//         title,
//         date,
//         tmdb_id,
//         genre,
//         description,
//         type,
//         runTime,
//         poster,
//         type,
//       });

//       const kino = await newKino.save();

//       res.json(kino);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).json({ msg: 'Server Error' });
//     }
//   }
// );

// // @route     GET api/kinos/title/:id
// // @desc      Get a Movie
// // @access    Public
// router.get('/title/:id', async (req, res) => {
//   try {
//     // To Do
//     // let kino = await Kino.findById(req.params.id).lean();

//     let kino = await Kino.findOneAndUpdate(
//       { tmdb_id: req.params.id },
//       { $inc: { viewCount: 1 } }
//     ).lean();

//     if (!kino) return res.status(404).json({ msg: 'Kino Not Found' });

//     res.json(kino);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: 'Server Error' });
//   }
// });

// // @route     GET api/kinos
// // @desc      Get Popular Movies
// // @access    Public
// router.get('/', async (req, res) => {
//   try {
//     kinos = await Kino.find().sort({ viewCount: -1 }).limit(20).lean();

//     res.json(kinos);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: 'Server Error' });
//   }
// });

// // @route     GET api/kinos/search/
// // @desc      Search for Movies
// // @access    Public
// router.get('/search', async (req, res) => {
//   let search = req.query.s;
//   let genre = req.query.genre;

//   if (!search && !genre) {
//     res.status(400).json({ msg: 'Please enter something to search' });
//   }
//   try {
//     if (search) {
//       kinos = await Kino.find({ $text: { $search: search } }, [
//         'tmdb_id',
//         'title',
//         'avgRating',
//         'poster',
//       ])
//         .limit(10)
//         .lean();
//     } else {
//       kinos = await Kino.find({ genre: genre })
//         .sort({ viewCount: -1 })
//         .limit(10)
//         .lean();
//     }

//     res.json(kinos);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: 'Server Error' });
//   }
// });

module.exports = router;
