// Utilities
import {defineStore} from 'pinia';
import {type Tracker} from '@/types';
import {useStorage} from '@vueuse/core';

export const useTrackerStore = defineStore('tracker', {
  state: () => ({
    trackers: useStorage("trackers", [] as Tracker[], localStorage),
  }),

  getters: {
    getTrackerById: (state) => {
      return (id: number) => state.trackers.find((tracker: Tracker) => tracker.id === id);
    },
  },

  actions: {
    addTracker(tracker: Tracker) {
      this.trackers.push(tracker);
    },

    setTrackers(newTrackers: Tracker[]) {
      this.trackers = newTrackers;
    },

    updateTracker(tracker: Tracker) {
      const index = this.trackers.findIndex(a => a.id === tracker.id);
      if (index !== -1) {
        this.trackers[index] = tracker;
      }
    },

    removeTracker(tracker: Tracker) {
      const index = this.trackers.findIndex(a => a.id === tracker.id);
      if (index !== -1) {
        this.trackers.splice(index, 1);
      }
    }
  },
});
