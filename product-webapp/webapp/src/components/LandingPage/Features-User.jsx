import { AddRounded, ViewList } from '@mui/icons-material';
import BarChartIcon from '@mui/icons-material/BarChart';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as React from 'react';
const items = [
  {
    icon: <AddRounded sx={{ fontSize: '2rem' }}/>,
    title: 'Generate SSI',
    // description: 'Option 1 description',
    onClick:() => window.location.replace("/userHome/createSSI"), 
  },
  {
    icon: <ViewList sx={{ fontSize: '2rem' }}/>,
    title: 'SSI List',
    // description: 'Option 3 description',
    onClick:() => window.location.replace("/userHome/ssiFilter"), // Example click handler
  },
  {
    icon: <BarChartIcon sx={{ fontSize: '2rem' }}/>,
    title: 'Visualization',
    // description: 'Option 4 description',
    onClick:() => window.location.replace("/userHome/visualization"), // Example click handler
  },
];

export default function FeaturesUser() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: '',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4"sx={{ color: 'grey.900' ,marginTop:"50px",marginBottom:'-50px'}}>
            User - Home
          </Typography><br></br>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            
          </Typography>
        </Box>
        <Grid container spacing={5} marginBottom={30}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} marginTop={10}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.800',
                  background: 'transparent',
                  backgroundColor: 'grey.900',
                  marginBottom:"20px",
                  borderRadius: '36px', 
                  cursor: 'pointer', // Add cursor pointer for clickable effect
                }}
                onClick={item.onClick} // Assign onClick handler
              >
                <Box sx={{ opacity: '60%',marginTop:'40px'  }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight="medium" sx={{ fontSize: '1.4rem' }} >
                    {item.title}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
