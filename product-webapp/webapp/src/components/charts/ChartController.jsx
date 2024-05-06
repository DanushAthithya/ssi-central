import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import DonutLargeRoundedIcon from '@mui/icons-material/DonutLargeRounded';
import DownloadIcon from '@mui/icons-material/Download';
import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded';
import SsidChartRoundedIcon from '@mui/icons-material/SsidChartRounded';
import { Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import html2canvas from 'html2canvas';
import React, { useEffect, useState } from 'react';
import './ChartController.css'; // Import CSS file for styling
import Gauges from './Gauges';
import LineCharts from './LIneChart';
import PieCharts from './PieCharts';
import Visualize from './Visualize';
export default function ChartController() {
  const [selectedChart, setSelectedChart] = useState('gauge');

  const handleChartChange = (event) => {
    setSelectedChart(event.target.value);
  };

  const [imageSrc, setImageSrc] = React.useState('');

  const [data, setData] = useState([]);
  const [assetTypeCounts, setAssetTypeCounts] = useState({});
  const [assetCount, setAssetCount] = useState({});
  const [assetTypeamt, setAssetTypeAmt] = useState({});
  const [monthlyAssetCounts, setMonthlyAssetCounts] = useState({});
  const emailId=JSON.parse(localStorage.getItem("user")).emailId;
 useEffect(() => {
  console.log('inside useEffect hook')
  fetchData();
}, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:9092/api/v1/ssi/${emailId}`);
      setData(response.data);
      console.log("asset - " + response.data[0].assetType+ response.data[0].createdDate);
      const aggregatedData = {};
      response.data.forEach(item => {
              const assetType = item.assetType;
              // Updating assetTypeCounts
              assetTypeCounts[assetType] = (assetTypeCounts[assetType] || 0) + 1;
            // Updating assetTypeamt
            assetTypeamt[assetType] = (assetTypeamt[assetType] || 0) + item.amount;
            assetCount[assetType] = (assetCount[assetType] || 0) + item.numberOfAsset;
        
               const createdDate = new Date(item.createdDate);
              // const monthYear = createdDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
              const month = createdDate.toLocaleString('en-US', { month: 'long' });

              // Initialize count for the month if it doesn't exist
              if (!aggregatedData[month]) {
                aggregatedData[month] = {};
              }
      
              // Increment count for the asset type within the month
              if (!aggregatedData[month][assetType]) {
                aggregatedData[month][assetType] = {
                  count: 1,
                  totalAmount: item.amount,
                  totalCount: item.numberOfAsset
                };
              } else {
                aggregatedData[month][assetType].count++;
                aggregatedData[month][assetType].totalAmount += item.amount;
                aggregatedData[month][assetType].totalCount += item.numberOfAsset;
              }
            });
      console.log(aggregatedData)
            // Set the aggregated data to state
      setMonthlyAssetCounts(aggregatedData);
      
      console.log('Asset Type Counts:', assetTypeCounts);
      console.log('Asset Type amt:', assetTypeamt);
      console.log('Asset  count:', assetCount);
      setAssetTypeAmt(assetTypeamt)
      setAssetCount(assetCount);
      // Set state directly with the assetTypeCounts
      setAssetTypeCounts(assetTypeCounts);
      console.log(assetTypeCounts.stock);
    }catch (error) {
      console.error('Error fetching data:', error);
      // You may need to handle error cases based on your application's requirements
    }
  };

  const handleDownloadImage = () => {
    const chartElement = document.getElementById('chart-container');
  
    html2canvas(chartElement).then(canvas => {
      const dataUrl = canvas.toDataURL('image/png');
      setImageSrc(dataUrl);
  
      // Trigger download
      const link = document.createElement('a');
      link.download = 'chart.png';
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <div className="chart-container" style={{marginTop:"15vh"}}>

      
{/* data={jsonData} */}<Card sx={{position:'relative',width:'65vw',marginLeft:'3vw', height:'80vh', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1), 0px 8px 16px rgba(0, 0, 0, 0.1)' }}>
        {selectedChart === 'gauge' && <Gauges  datas={assetTypeCounts}/>}
        {selectedChart === 'bar' && <Visualize datas={monthlyAssetCounts}/>}
        {selectedChart === 'line' && <LineCharts datas={monthlyAssetCounts}/>}
        {selectedChart === 'pie' && <PieCharts datas={assetCount} />}
        </Card>
      {/* </div> */}
      <div className="chart-card">
        <Card sx={{  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1), 0px 8px 16px rgba(0, 0, 0, 0.1)' }}>
          <CardContent>
            {/* <Typography variant="h6" className="card-title">Select Chart</Typography> */}
            <div className="chart-options">
            <ToggleButtonGroup
  value={selectedChart}
  exclusive
  onChange={handleChartChange}
  aria-label="chart type"
  orientation="vertical"
  sx={{ width: '250px', marginLeft: '4vw' ,marginTop:'30px'}}
>
  <ToggleButton value="gauge" sx={{ marginBottom: '20px', color: selectedChart === 'gauge' ? 'green' : 'blue', backgroundColor: selectedChart === 'gauge' ? 'lightgreen' : 'lightblue'}}>
    <SpeedRoundedIcon />Gauges
  </ToggleButton>
  <ToggleButton value="bar" sx={{ marginBottom: '20px', color: selectedChart === 'bar' ? 'green' : 'blue', backgroundColor: selectedChart === 'bar' ? 'lightgreen' : 'lightblue' }}>
    <BarChartRoundedIcon />Bar Chart
  </ToggleButton>
  <ToggleButton value="line" sx={{ marginBottom: '20px', color: selectedChart === 'line' ? 'green' : 'blue', backgroundColor: selectedChart === 'line' ? 'lightgreen' : 'lightblue' }}>
    <SsidChartRoundedIcon />Line Chart
  </ToggleButton>
  <ToggleButton value="pie" sx={{ marginBottom: '18px', color: selectedChart === 'pie' ? 'green' : 'blue', backgroundColor: selectedChart === 'pie' ? 'lightgreen' : 'lightblue' }}>
    <DonutLargeRoundedIcon />Pie Chart
  </ToggleButton>
      {/* <ToggleButton value="gauge" sx={{ marginBottom: '20px' }}>
        <SpeedRoundedIcon/>Gauges
      </ToggleButton>
      <ToggleButton value="bar" sx={{ marginBottom: '20px' }}>
        <BarChartRoundedIcon/>Bar Chart
      </ToggleButton>
      <ToggleButton value="line" sx={{ marginBottom: '20px' }}>
        <SsidChartRoundedIcon/>Line Chart
      </ToggleButton>
      <ToggleButton value="pie" sx={{ marginBottom: '18px' }}>
        <DonutLargeRoundedIcon/>Pie Chart
      </ToggleButton> */}
      <Button 
          className="chart-button" 
          sx={{ marginLeft: '90px' ,width:"100px"}}
          onClick={handleDownloadImage}
          style={{backgroundColor:"steelblue", color:"white",
            marginBottom:'40px',
            border: "1px solid blue",
            }}

        >
          <DownloadIcon/>
        </Button>
    </ToggleButtonGroup>
                
              {/* <FormControl>

              <FormControlLabel value="gauge" control={<Radio />} label="Gauges" 
                  
                  checked={selectedChart === 'gauge'}
                  onChange={handleChartChange}/>
              
              <FormControlLabel value="bar" control={<Radio />} label="Bar Chart" 
                  
                  checked={selectedChart === 'bar'}
                  onChange={handleChartChange}/>

              <FormControlLabel value="line" control={<Radio />} label="Line Chart" 
                  
                  checked={selectedChart === 'line'}
                  onChange={handleChartChange}/>
              <FormControlLabel value="pie" control={<Radio />} label="Pie Chart" 
                  
                  checked={selectedChart === 'pie'}
                  onChange={handleChartChange}/>
                  </FormControl> */}
                  

            </div>
          </CardContent>
        </Card>
        
        
      </div>
    </div>
  );
}


