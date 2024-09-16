import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [objectives, setObjectives] = useState([]);

  useEffect(() => {
    // Fetch the JSON data
    fetch('/json/objectives.json')
      .then((response) => response.json())
      .then((data) => setObjectives(data))
      .catch((error) => console.error('Error fetching objectives:', error));
  }, []);

  return (
    <Box
      sx={{
        padding: { xs: '0', sm: '0' },
        margin: '0',
        backgroundColor: '#f0f0f0',
        Height: '100vh',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '300px',
          marginBottom: '5px',
          marginTop: '65px',
          overflow: 'hidden',
          padding: '0',
          boxSizing: 'border-box',
        }}
      >
        <img
          src="/Images/Home-image2.webp" 
          alt="CloudNxt"
          style={{ 
            width: '100%', 
            marginLeft: '1px',
            height: '100%', 
            objectFit: 'cover',
            display: 'block',
            boxSizing: 'border-box',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '100px',
            left: '20px',
            color: 'white',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Poppins',
              fontSize: '18px',
              fontWeight: '600',
              lineHeight: '24px',
              marginBottom: '10px',
            }}
          >
            Zensar|CloudNxt-Coe
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: 'Poppins',
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: '21px',
              marginBottom: '20px',
            }}
          >
            Your description text here. This will be overlaid on the image.
          </Typography>
          <Button
            variant="contained"
            href="/your-target-page"
            sx={{
              backgroundColor: 'white',
              color: 'black',
              fontFamily: 'Poppins',
              fontSize: '14px',
              fontWeight: '600',
              textTransform: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#f0f0f0',
                boxShadow: 'none',
              }
            }}
          >
            Know More <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '5px' }} />
          </Button>
        </Box>
      </Box>

      <Typography
        variant="h6"
        align="center"
        sx={{
          marginTop: '20px',
          marginBottom: '40px',
          fontFamily: 'Poppins',
          fontSize: '14px',
          fontWeight: '600',
          lineHeight: '21px',
          textAlign: 'center',
        }}
      >
        What we Offer's
      </Typography>

      <Grid container spacing={3} justifyContent="center">
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

export default Home;
