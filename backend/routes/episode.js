import express from 'express'
import episode from '../modules/episode.js'

const router = express.Router()
router.get('/:id' , (req ,res) =>{
    episode.find({SeriesId :req.params.id}).sort({'ep_num' :1})
    .then(episodeInfo => {
        // console.log('episodeInfo', episodeInfo)
        res.send({episodeInfo})})
    .catch(err => res.status(404).json({ nobookfound: 'No Book found' }));
    // 
})
export default router   