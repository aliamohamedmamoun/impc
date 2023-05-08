import React from 'react';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { HeatMapData } from '../../constants/types';

interface IHeatMap {
  heatMapData: HeatMapData[];
  maxValue: number;
  minValue: number;
}

export default function HeatMap({ heatMapData, minValue, maxValue }: IHeatMap) {
  return (
    <ResponsiveHeatMap
      data={heatMapData}
      margin={{ top: 100, right: 90, bottom: 25, left: 90 }}
      valueFormat=">-.2s"
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -60,
        legend: '',
        legendOffset: 46,
      }}
      axisRight={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 70,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: -72,
      }}
      colors={{
        type: 'sequential',
        scheme: 'green_blue',
        divergeAt: 0.5,
        minValue: minValue,
        maxValue: maxValue,
      }}
      opacity={1}
      borderWidth={3}
      borderColor={{ theme: 'background' }}
      emptyColor="#c0c0c0"
      inactiveOpacity={0}
      enableLabels={false}
      enableGridX={true}
      enableGridY={true}
    />
  );
}
