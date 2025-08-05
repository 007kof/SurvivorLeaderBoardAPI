import type { Request, Response } from 'express';
import { ScoreEntryModel } from '../models/ScoreEntry.js';
import type { TimeRange } from '../types';

export class LeaderboardController {
  static async addScore(req: Request, res: Response) {
    try {
      const { username, score, timestamp } = req.body;
      const entry = new ScoreEntryModel({ username, score, timestamp });
      await entry.save();
      res.status(201).json({ message: 'Score added' });
    } catch (err) {
      res.status(500).send((err as Error).message);
    }
  }

  static async getTopScores(req: Request, res: Response) {
    const limit = parseInt(req.query.limit as string) || 10;
    try {
      const topScores = await ScoreEntryModel.find()
        .sort({ score: -1 })
        .limit(limit);
      res.json(topScores);
    } catch (err) {
      res.status(500).send((err as Error).message);
    }
  }

  static async getRecentScores(req: Request, res: Response) {
    const limit = parseInt(req.query.limit as string) || 10;
    try {
      const recentScores = await ScoreEntryModel.find()
        .sort({ timestamp: -1 })
        .limit(limit);
      res.json(recentScores);
    } catch (err) {
      res.status(500).send((err as Error).message);
    }
  }

  static async getTopScoresByRange(req: Request, res: Response) {
    const { range } = req.params;
    const limit = parseInt(req.query.limit as string) || 10;

    const now = new Date();
    let fromDate: Date;

    switch (range as TimeRange) {
      case 'day':
        fromDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case 'week':
        fromDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        fromDate = new Date(now);
        fromDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        fromDate = new Date(now);
        fromDate.setFullYear(now.getFullYear() - 1);
        break;
      case 'forever':
        fromDate = new Date(0);
        break;
      default:
        return res.status(400).send('Invalid range');
    }

    try {
      const scores = await ScoreEntryModel.find({ timestamp: { $gte: fromDate } })
        .sort({ score: -1 })
        .limit(limit);
      res.json(scores);
    } catch (err) {
      res.status(500).send((err as Error).message);
    }
  }
}
