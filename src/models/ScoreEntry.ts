import mongoose, { Document, Schema } from 'mongoose';

export interface IScoreEntry extends Document {
  username: string;
  score: number;
  timestamp: Date;
}

const ScoreEntrySchema = new Schema<IScoreEntry>({
  username: { type: String, required: true },
  score: { type: Number, required: true },
  timestamp: { type: Date, required: true }
});

export const ScoreEntryModel = mongoose.model<IScoreEntry>('ScoreEntry', ScoreEntrySchema);
