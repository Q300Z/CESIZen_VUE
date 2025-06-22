export interface TrackerReport {
  [month: string]: {
    [emotionName: string]: number;
  };
}
