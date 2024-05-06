import Typography from '@mui/material/Typography';
import { Gauge } from '@mui/x-charts/Gauge';
import * as React from 'react';
import './Gauges.css';

export default function Gauges({datas}) {
  if (!datas) {
    return <div>Loading...</div>; // Render a loading message if data is not available yet
  }
  const key = Object.keys(datas);
  const Equity =key[0];
  const Forex =key[1];
  const Mutual =key[2];
  const Gold =key[3];
  // const data = Object.entries(assetTypeCounts).map(([assetType, count]) => ({ assetType, count }));
  return (
    <div style={{ textAlign: 'center' , marginTop: '20px', width:'1100px'}}    id="chart-container" className="gauges-container" >
      <Typography variant="h4">Performance Gauges</Typography>
      {/* {assetTypeC ounts.stock} */}
      <div className='indiv-gauges-container' style={{ display: 'flex', justifyContent: 'space-around' }}>
      <GaugeWithText text="Equity" value={datas[Equity]} />
      <GaugeWithText text="Forex" value={datas[Forex]}  />
        
        <GaugeWithText text="Sovereign Gold Bonds" value={datas[Mutual]} />
        <GaugeWithText text="Mutual Funds" value={datas[Gold]} />
      </div>
      <br/>
      <br/>
      <Typography variant="body1">
      The gauges above display various metrics for the transactions made in different asset classes.
      </Typography>

    </div>
  );
}

function GaugeWithText({ text, value }) {
  return (
    <div style={{ width: '200px', textAlign: 'center' }}  >
      <Gauge width={200} height={300} value={value} startAngle={-90} endAngle={90}  />
      <Typography variant="h6">{text}</Typography>

      
    </div>
  );
}
