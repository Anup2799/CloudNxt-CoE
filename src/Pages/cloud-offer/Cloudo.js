import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material'; // Removed Button import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Main = () => {
  const [objectives, setObjectives] = useState([]);

  useEffect(() => {
    // Fetch the JSON data
    fetch('/json/cloud-offer/Offer.json')
      .then((response) => response.json())
      .then((data) => {
        console.log('Data fetched:', data); // Debugging line
        setObjectives(data);
      })
      .catch((error) => console.error('Error fetching objectives:', error));
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',  // Ensures that it takes full height and properly aligns content
        flexDirection: 'column',
        padding: '0',  // Remove padding
        margin: '0',  // Remove any margin from the container
        backgroundColor: '#f0f0f0',  // Light gray background
        minHeight: '100vh',  // Ensure full height
        height: '100%',  // Ensures full page height for the background
      }}
    >
      <Typography
        variant="h6"
        align="center"
        sx={{
          marginTop: '100px',
          marginBottom: '40px',
          fontFamily: 'Poppins',
          fontSize: '14px',
          fontWeight: '600',
          lineHeight: '21px',
          textAlign: 'center',
        }}
      >
        Cloud-Offer's
      </Typography>

      <Grid container spacing={3} justifyContent="center" sx={{ flexGrow: 1 }}>
        {objectives.map((objective, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                maxWidth: 345,
                height: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease-in-out',
                borderRadius: '16px',
                margin: '0 auto',
                '&:hover': {
                  transform: 'scale(1.05)',
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                {/* Title */}
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Poppins',
                    fontSize: '14px',
                    fontWeight: '600',
                    lineHeight: '21px',
                    textAlign: 'center',
                    color: 'black',
                    marginBottom: '10px',
                  }}
                >
                  {objective.title}
                </Typography>

                {/* Image */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '20px',
                  }}
                >
                  <img
                    src={objective.image}
                    alt={objective.title}
                    style={{ maxWidth: '100%', height: 'auto', maxHeight: '100px' }}
                  />
                </Box>

                {/* Description */}
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: 'Poppins',
                    fontSize: '14px',
                    fontWeight: '400',
                    lineHeight: '21px',
                    textAlign: 'center',
                    color: 'black',
                    marginBottom: '20px',
                  }}
                >
                  {objective.description}
                </Typography>
              </CardContent>

              {/* Know More Text aligned to the right */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingRight: '16px',
                  paddingBottom: '16px',
                }}
              >
                <Typography
                  component="a"
                  href={objective.link}
                 
                  sx={{
                    fontFamily: 'Poppins',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#3956a5',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  Know More <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '5px' }} />
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Main;
