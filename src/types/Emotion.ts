export interface Emotion extends EmotionBase {
  emotionBaseID: number;
  emotionBaseName?: string;
}


export interface EmotionBase {
  id: number;
  name: string;
}
