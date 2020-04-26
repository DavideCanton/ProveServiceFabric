import { createFeatureSelector, createSelector } from '@ngrx/store';
import { comp6FeatureKey, Comp6State } from 'app/comp6/comp6.reducer';
import * as moment from 'moment';

export const selectComp6State = createFeatureSelector<Comp6State>(
    comp6FeatureKey
);

export const dataSelector = createSelector(
    selectComp6State,
    state => state.data
);

export const countsSelector = createSelector(
    selectComp6State,
    state =>
    {
        const counters = {} as { [i: number]: number };

        state.data.forEach(({ start, end }) =>
        {
            let startDate = moment(start);
            let endDate = moment(end);
            while(startDate.isSameOrBefore(endDate))
            {
                const s = startDate.format('YYYYMMDD');
                counters[s] = (counters[s] || 0) + 1;
                startDate = startDate.add(1, 'days');
            }

        });

        return counters;
    }
);
