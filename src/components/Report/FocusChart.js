/* eslint-disable react/prop-types */
import React from 'react';
import {
  VictoryChart, VictoryBar, VictoryAxis, VictoryTooltip,
} from 'victory';
import format from 'date-fns/format';
import { useTheme } from '@material-ui/core/styles';

export default function FocusChart({ data, type }) {
  const theme = useTheme();
  return (
    <>
      <VictoryChart
        domainPadding={30}
        maxDomain={type === 'today' && data[0].focusedHours < 1 ? { y: 1 } : null}
      >
        <VictoryAxis
          tickFormat={(x) => format(new Date(x), 'dd-MMM')}
        />
        <VictoryAxis
          dependentAxis
        />
        <VictoryBar
          data={data}
          labels={({ datum }) => `${Number.isInteger(datum.focusedHours) ? datum.focusedHours : datum.focusedHours.toFixed(2)} hours`}
          labelComponent={<VictoryTooltip />}
          x="date"
          y="focusedHours"
          style={{
            data: { fill: theme.palette.secondary.main },

          }}
          barRatio={type === 'today' ? 15 : 0.9}
        />
      </VictoryChart>
    </>
  );
}
