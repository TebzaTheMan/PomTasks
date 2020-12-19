import React from 'react';
import {
  VictoryChart, VictoryBar, VictoryAxis, VictoryTooltip,
} from 'victory';

// eslint-disable-next-line react/prop-types
export default function FocusChart({ data, type }) {
  return (
    <VictoryChart
      domainPadding={20}
    >
      <VictoryAxis />
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
