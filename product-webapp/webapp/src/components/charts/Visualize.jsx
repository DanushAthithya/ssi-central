import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import './Visualize.css';
import { Button, Container } from '@mui/material';
import html2canvas from 'html2canvas';
const chartSetting = {
  yAxis: [
    {
      label: 'Amount Per month',
    },
  ],
  margin:{ left: 100 },
  width: 700,
  height: 700,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-50px, 0)', // Adjust the translation values as needed
    },
  },
};



const valueFormatter = (value) => `${value}`;

export default function Visualize({datas}) {
  // console.log(datas[Object.keys(datas)[0]])
  // console.log("in bar",datas.February.stock.totalAmount )

  const dataset = [];

  // Iterate over the keys of datas object (months)
  Object.keys(datas).forEach(month => {
    // console.log(datas[month].stock.count)
    console.log(datas[month])
    // Access the data for the current month
    // const dataForMonth = datas[month];

    // Create an object for the current month
    const monthData = {
      month: month,
      stock: datas[month].stock ? datas[month].stock.totalAmount : 0, // Check if 'stock' exists
      equity: datas[month].equity ? datas[month].equity.totalAmount : 0, // Check if 'equity' exists
      goldbond: datas[month].goldbond ? datas[month].goldbond.totalAmount : 0, // Check if 'goldbond' exists
      governmentbond: datas[month].governmentbond ? datas[month].governmentbond.totalAmount : 0, // Check if 'govtbond' exists
    };
    console.log(monthData);

    // Add the monthData object to the dataset array
    dataset.push(monthData);
  });
  return (
    <Container maxWidth="md" >
    <div id="chart-container"   >
        
    <BarChart className="chart-container-bar"
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' , label:"Month" }]}
      series={[
        { dataKey: 'stock', label: 'Stock', valueFormatter },
        { dataKey: 'equity', label: 'Equity', valueFormatter },
        { dataKey: 'goldbond', label: 'Gold Bond', valueFormatter },
        { dataKey: 'governmentbond', label: 'Government Bond', valueFormatter },
      ]}
      {...chartSetting}
    />
    </div>
    
    </Container>
  );
}
