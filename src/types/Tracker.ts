import type {Emotion} from './Emotion';

export interface Tracker {
  id: number;
  description: string;
  createAt: string;
  updateAt: string;
  userID: number;
  emotionID: number;
  emotion: Emotion;
}
