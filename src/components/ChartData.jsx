import React, { useEffect, useState } from 'react';
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { getChartData } from '../api/Api';


function ChartData() {
  const [chartInfo, setchartInfo] = useState([]);
  useEffect(() => {
    getChartData().then((data) => {
      setchartInfo(data.chartInfo);
    });
  }, []);

  return (
    <>
      <BarChart width={730} height={400} data={chartInfo}>
        <Legend />
        <XAxis interval={0} textAnchor="end" sclaeToFit="true" verticalAnchor="start" angle="-20" dataKey="name" />
        <YAxis />
        <Tooltip />

        <Bar dataKey="total_count" fill="#8884d8" />
      </BarChart>
    </>
  );

}

export default ChartData;