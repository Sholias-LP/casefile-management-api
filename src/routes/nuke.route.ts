import express from 'express';
import NukeApplication from '../handlers/nuke'

const router = express.Router()

router.post('/', NukeApplication.deployNuke);

export default router;