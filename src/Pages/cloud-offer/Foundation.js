import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

// Styled component for hover animation
const HoverCard = styled(Card)({
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)'
  },
  height: '220px', // Fixed height for the cards
  width: '100%', // Ensure full width inside the grid container
  display: 'flex', // To make content stretch evenly
  flexDirection: 'column',
  justifyContent: 'space-between' // Space out the content evenly
});

// Styled components for card elements
const CardTitle = styled(Typography)({
  fontFamily: 'Poppins',
  fontSize: '14px',
  fontWeight: '500',
  lineHeight: '21px',
  textAlign: 'left',
  marginBottom: '25px' 
});

const CardDescription = styled(Typography)({
  fontFamily: 'Poppins',
  fontSize: '14px',
  fontWeight: '300',
  lineHeight: '21px',
  textAlign: 'left',
  flexGrow: 1, 
  marginBottom: '25px' 
});

const CardButton = styled(Button)({
  fontFamily: 'Poppins',
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '21px',
  textAlign: 'left',
  backgroundColor: '#264e89', // Set button color
  color: '#fff', // Set button text color for contrast
  alignSelf: 'flex-start', // Button stays at the bottom
  marginTop: 'auto' // Ensures it stays at the bottom with a gap above it if content grows
});


const Foundation = () => {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('./json/cloud-offer/Foundation.json')
      .then(response => response.json())
      .then(data => setCards(data))
      .catch(error => console.error('Error fetching card data:', error));
  }, []);

  const handleButtonClick = () => {
    navigate('/form');
  };

  return (
    <Box
      sx={{
        padding: { xs: '20px', sm: '40px' },
        backgroundColor: '#f8f8f8', // Gray background
        marginTop: '20px',
        minHeight: '100vh' // Set minimum height of the background
      }}
    >
      <Box
        sx={{
          backgroundColor: '#ffffff',
          padding: { xs: '20px', sm: '40px' },
          maxWidth: '100%',
          margin: '0 auto',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '16px',
          marginTop: '50px',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            marginBottom: '20px',
            fontFamily: 'Poppins',
            fontSize: '14px',
            fontWeight: '500',
            lineHeight: '21px',
            textAlign: 'left'
          }}
        >
          Foundation Overview
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{
            marginBottom: '40px',
            fontFamily: 'Poppins',
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '22px',
            textAlign: 'left'
          }}
        >
          Here is an overview of our Foundation objectives. Explore the details and take action through the buttons provided.
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <HoverCard>
                <CardContent>
                  <CardTitle variant="h6" gutterBottom>
                    {card.title}
                  </CardTitle>
                  <CardDescription variant="body2" color="textSecondary">
                    {card.description}
                  </CardDescription>
                  <CardButton variant="contained" onClick={handleButtonClick} style={{ marginTop: '10px' }}>
                    {card.buttonText}
                  </CardButton>
                </CardContent>
              </HoverCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Foundation;
