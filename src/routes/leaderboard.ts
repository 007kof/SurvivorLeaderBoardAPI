import { Router } from 'express';
import { LeaderboardController } from '../controllers/LeaderboardController.js';

const router = Router();

router.post('/add', LeaderboardController.addScore);
router.get('/top', LeaderboardController.getTopScores);
router.get('/recent', LeaderboardController.getRecentScores);
router.get('/range/:range', LeaderboardController.getTopScoresByRange);

export default router;
