import { Container } from '@mui/material';
import { axisClasses } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts/BarChart';
import * as React from 'react';
import './Visualize.css';
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
      stock: datas[month]['Equity'] ? datas[month]['Equity'].totalAmount : 0, // Check if 'stock' exists
      equity: datas[month]['Forex'] ? datas[month]['Forex'].totalAmount : 0, // Check if 'equity' exists
      goldbond: datas[month]['Sovereign Gold Bonds'] ? datas[month]['Sovereign Gold Bonds'].totalAmount : 0, // Check if 'goldbond' exists
      governmentbond: datas[month]['Mutual Funds'] ? datas[month]['Mutual Funds'].totalAmount : 0, // Check if 'govtbond' exists
    };
    console.log(datas[month]['Equity']);

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
        { dataKey: 'stock', label: 'Equity', valueFormatter },
        { dataKey: 'equity', label: 'Forex', valueFormatter },
        { dataKey: 'goldbond', label: 'Soverign Gold Bonds', valueFormatter },
        { dataKey: 'governmentbond', label: 'Mutual Funds', valueFormatter },
      ]}
      {...chartSetting}
    />
    </div>
    
    </Container>
  );
}
