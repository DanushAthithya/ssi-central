
import { Container, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import * as React from 'react';
import './LineChart.css';
export default function LineCharts({datas}) {

// const data1 = [2, 8.5, 1.5, 5];
// const data2 = [4, 6, 7, 3];
// const data3 = [1, 3, 2, 6];
// const data4 = [3, 2, 4, 8];
const data1 = [];
const data2 = [];
const data3 = [];
const data4 = [];
// Iterate over the keys of datas object (months)
Object.keys(datas).forEach(month => {
  console.log(month)
  console.log(datas)
  // const monthData = datas[month];
  
  // Push the values for each series into the corresponding arrays
  data1.push(datas[month]['Equity'] ? datas[month]['Equity'].totalCount : 0);
  data2.push(datas[month]['Forex'] ? datas[month]['Forex'].totalCount : 0);
  data3.push(datas[month]['Sovereign Gold Bonds'] ? datas[month]['Sovereign Gold Bonds'].totalCount : 0);
  data4.push(datas[month]['Mutual Funds'] ? datas[month]['Mutual Funds'].totalCount : 0);
});
console.log(data1)

  return (
    <div id="chart-container" className='line-container' style={{ textAlign: 'center' , marginTop: '20px', width:'1100px'}} >
      <Container maxWidth="md">
        <LineChart
          xAxis={[{ data: [1, 2,3,4,5,6,7,8,9,10,11,12], label: 'Months' }]}
          series={[
            { data: data1, label: 'Equity' },
            { data: data2, label: 'Forex' },
            { data: data3, label: 'Sovereign Gold Bonds' },
            { data: data4, label: 'Mutual Funds' },
          ]}
          height={600}
          width={800}
          margin={{ left: 100, right: 10, top: 30, bottom: 50 }}
          legend={{ show: true }}
          tooltip={{ show: true }}
        />
      </Container>
      <Typography variant='subtitle1' >Line Graph to display the count of assets that were transfered in each respective month.</Typography>
    </div>
  );
}