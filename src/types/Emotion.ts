export interface Emotion extends EmotionBase {
  image: string;
  emotionBaseID: number;
  emotionBaseName?: string;
}


export interface EmotionBase {
  id: number;
  name: string;
}
