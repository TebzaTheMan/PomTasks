import React from 'react';
import {
  VictoryChart, VictoryBar, VictoryAxis, VictoryTooltip,
} from 'victory';
import format from 'date-fns/format';

// eslint-disable-next-line react/prop-types
export default function FocusChart({ data, type }) {
  return (
    <VictoryChart
      domainPadding={30}
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
          data: { fill: '#1976d2' },

        }}
        barRatio={type === 'today' ? 15 : 0.9}
      />
    </VictoryChart>
  );
}
