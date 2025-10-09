import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Leave } from '@shared/models/leave';

interface LeaveState {
  leaves: Leave[];
}

const initialState: LeaveState = {
  leaves: [],
};

export const LeaveStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setLeaves(leaves: Leave[]): void {
      patchState(store, () => ({ leaves }));
    },
  }))
);
