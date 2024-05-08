import { AddRounded, ViewList } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const items = [
  {
    icon: <AddRounded  sx={{ fontSize: '2.5rem' }} />,
    title: 'Add User',
    onClick:() => window.location.replace("/adminHome/createUser"), 
  },
  
  {
    icon: <ViewList  sx={{ fontSize: '2.5rem' }} />,
    title: 'User List',
    onClick:() => window.location.replace("/adminHome/userFilter"), 
  },
  
];

export default function FeaturesAdmin() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
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
          <Typography component="h2" variant="h4"sx={{ color: 'grey.900' ,marginTop:'50px'}}>
            Admin - Home
          </Typography><br></br>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>

          </Typography>
        </Box>
        <Grid container spacing={12} marginBottom={7} justifyContent="center">
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} marginBottom={30}>
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
                  borderRadius: '36px', 
                }}
                onClick={item.onClick}
              >
                <Box sx={{ opacity: '50%',marginTop:'30px' }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight="medium"  sx={{ fontSize: '1.4rem' }} gutterBottom>
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