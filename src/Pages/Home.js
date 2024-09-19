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
        backgroundColor: '#e1f5fe',
        height: '100vh',
        overflow: 'auto',
        paddingRight: '16px', // Prevent overlap with sidebar
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '300px',
          marginBottom: '20px',
          marginTop: '65px',
          overflow: 'hidden',
          padding: '0',
          boxSizing: 'border-box',
        }}
      >
        <img
          src="./Image/Home.webp"
          alt="CloudNxt"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            margin: '0 auto',
            padding: '0',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '100px',
            left: '20px',
            color: 'white',
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '80%', // Ensure overlay text fits well on various screen sizes
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
              fontWeight: '400',
              textTransform: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#e1f5fe',
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
          fontSize: '16px',
          fontWeight: '600',
          lineHeight: '24px',
          textAlign: 'center',
        }}
      >
        What We Offer
      </Typography>

      <Grid container spacing={3} justifyContent="center"> {/* Reduced spacing to 2 */}
        {objectives.map((objective, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card
              sx={{
                width: '370px', // Fixed width for cards
                height: '350px', // Fixed height for consistency
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease-in-out',
                borderRadius: '16px',
                padding: '16px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#ffffff',
                overflow: 'hidden', // Hide any overflow
                '&:hover': {
                  transform: 'scale(1.05)',
                },
                // Responsive max-width
                '@media (max-width: 600px)': {
                  width: '90%', // Full width on small screens
                },
              }}
            >
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  textAlign: 'center',
                  overflow: 'hidden', // Hide any overflow within CardContent
                }}
              >
                {/* Title */}
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Poppins',
                    fontSize: '14px',
                    fontWeight: '500',
                    lineHeight: '21px',
                    color: 'black',
                    marginBottom: '10px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis', // Truncate text if it overflows
                    whiteSpace: 'nowrap',
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
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      maxHeight: '100px',
                      marginBottom: '10px',
                      objectFit: 'contain', // Ensure image fits well within the box
                    }}
                  />
                </Box>

                {/* Description */}
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: 'Poppins',
                    fontSize: '14px',
                    fontWeight: '300',
                    lineHeight: '21px',
                    color: 'black',
                    marginBottom: '20px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis', // Truncate text if it overflows
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2, // Limit the number of lines for description
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
                    fontWeight: '400',
                    lineHeight: '21px',
                    textAlign: 'left',
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

      {/* Extra Space for the last card */}
      <Box
        sx={{
          backgroundColor: '#e1f5fe',
          height: '20px',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      />
    </Box>
  );
};

export default Home;
