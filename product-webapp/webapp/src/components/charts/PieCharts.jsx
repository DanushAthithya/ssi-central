import Stack from '@mui/material/Stack';
import { PieChart } from '@mui/x-charts/PieChart';
import * as React from 'react';
import './PieChart.css';


export default function PieCharts({datas}) {
  const data = [
    { label: 'Equity', value: datas['Equity'] },
    { label: 'Forex', value: datas['Forex'] },
    { label: 'Sovereign Gold Bonds', value: datas['Sovereign Gold Bonds'] },
    { label: 'Mutual Funds', value: datas['Mutual Funds'] },
  ];
  return (
    <div id="chart-container" className='chart-container-pie' >
    <Stack direction="row">
      <PieChart
        series={[
          {
            paddingAngle: 5,
            innerRadius: 100,
            outerRadius: 120,
            data,
          },
        ]}
        margin={{ left: -50 }}
        width={800}
        height={500}
        // label={true}
        // legend={{ hidden: true }}
      />
      
    </Stack>
    </div>
  );
}
