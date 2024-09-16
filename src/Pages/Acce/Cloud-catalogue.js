import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Form from '../From-page/From'; // Updated path

const Catalog = () => {
  const [objectives, setObjectives] = useState([]);
  const [selectedObjective, setSelectedObjective] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Fetch the JSON data
    fetch('./json/Acc/Cloud-Catalog.json')
      .then((response) => response.json())
      .then((data) => setObjectives(data))
      .catch((error) => console.error('Error fetching objectives:', error));
  }, []);

  const handleOpenForm = (objective) => {
    setSelectedObjective(objective);
    setOpen(true);
  };

  const handleCloseForm = () => {
    setOpen(false);
    setSelectedObjective(null);
  };

  const handleKnowMoreClick = (link, objective) => {
    if (link.startsWith('/')) {
      // If the link is a path (e.g., '/From'), open the form with data
      handleOpenForm(objective);
    } else {
      // Otherwise, open the link in the same tab
      window.location.href = link;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '0',
        margin: '0',
        backgroundColor: '#f0f0f0',
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
          fontSize: '14px',
          fontWeight: '600',
          lineHeight: '21px',
          textAlign: 'center',
        }}
      >
        Cloud-Catalogue | What we Offer's
      </Typography>

      <Grid container spacing={3} justifyContent="center" sx={{ flexGrow: 1 }}>
        {objectives.map((objective, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
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
                    marginBottom: '0px',
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
                  paddingBottom: '30px',
                }}
              >
                <Typography
                  onClick={() => handleKnowMoreClick(objective.link, objective)}
                  sx={{
                    fontFamily: 'Poppins',
                    fontSize: '14px',
                    fontWeight: '600',
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

      {/* Render Form component as a popup */}
      {selectedObjective && (
        <Form open={open} handleClose={handleCloseForm} objective={selectedObjective} />
      )}
    </Box>
  );
};

export default Catalog;