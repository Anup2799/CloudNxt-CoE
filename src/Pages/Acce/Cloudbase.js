import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Cloudbase = () => {
  const [objectives, setObjectives] = useState([]);

  useEffect(() => {
    fetch('/json/Acc/Cloudbase.json')
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
        display: 'flex',
        flexDirection: 'column',
        padding: '0',
        margin: '0',
        backgroundColor: '#e1f5fe',
        minHeight: '100vh',
        height: '100%',
      }}
    >
      <Typography
        variant="h6"
        align="center"
        sx={{
          marginTop: '100px',
          marginBottom: '40px',
          fontFamily: 'Poppins',
          fontSize: '16px',
          fontWeight: '600',
          lineHeight: '24px',
          textAlign: 'center',
        }}
      >
        Zen-Cloudbase
      </Typography>

      <Grid container spacing={3} justifyContent="center" sx={{ flexGrow: 1 }}>
        {objectives.map((objective, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ marginBottom: index === objectives.length - 1 ? '40px' : '0' }}>
            <Card
              sx={{
                maxWidth: 345,
                height: '330px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease-in-out',
                borderRadius: '16px',
                margin: '0 auto',
                padding: '16px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#ffffff',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                {/* Title */}
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Poppins',
                    fontSize: '14px',
                    fontWeight: '500',
                    lineHeight: '21px',
                    textAlign: 'center',
                    color: 'black',
                    marginBottom: '10px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
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
                    style={{ maxWidth: '100%', height: 'auto', maxHeight: '100px' }}
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
                    textAlign: 'center',
                    color: 'black',
                    marginBottom: '20px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
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
                    color: '#3956a5',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
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

export default Cloudbase;
