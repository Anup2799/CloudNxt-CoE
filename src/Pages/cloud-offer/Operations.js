import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Grid, Breadcrumbs, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

// Styled component for hover animation
const HoverCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
  },
  height: '250px', // Adjusted height for a more balanced look
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  borderRadius: '12px',
  padding: '16px',
  backgroundColor: '#fff',
}));

// Updated styled components for card elements
const CardTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins',
  fontSize: '14px', // Updated font size
  fontWeight: '500', // Updated font weight
  lineHeight: '21px',
  textAlign: 'center',
  color: 'black',
  marginBottom: '10px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

const CardDescription = styled(Typography)(({ theme }) => ({
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
}));

const CardButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Poppins',
  fontSize: '14px',
  fontWeight: '500',
  lineHeight: '21px',
  backgroundColor: '#264e89',
  color: '#fff',
  textTransform: 'capitalize',
  padding: '8px 16px',
  borderRadius: '8px',
  marginTop: 'auto', // Pushes button to the bottom
  alignSelf: 'center', // Centers the button horizontally
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: '#1e3a6b',
  },
}));

// Styled breadcrumbs
const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  marginBottom: '24px',
  fontFamily: 'Poppins',
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '21px',
  color: '#3956a5',
  '& .MuiBreadcrumbs-ol': {
    padding: '0',
    margin: '0',
  },
  '& .MuiBreadcrumbs-li': {
    fontWeight: 'normal',
  },
  '& .MuiBreadcrumbs-separator': {
    color: '#3956a5',
  },
}));

const CurrentPage = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins',
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '21px',
  color: '#3956a5',
}));

const Operations = () => {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/json/cloud-offer/Operations.json')
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
        backgroundColor: '#e0e0e0', // Gray background covering the entire page
        margin: 0,
        padding: 0,
        width: '100%',
        height: 'auto', // Full viewport height
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          padding: { xs: '20px', sm: '40px' },
          maxWidth: '1200px',
          width: '100%', // Ensure full width
        }}
      >
        {/* Breadcrumbs positioned at the top left corner */}
        <Box sx={{ marginBottom: '24px', marginTop: '38px' }}>
          <StyledBreadcrumbs aria-label="breadcrumb">
            <Link href="/">Home</Link>
            <Link href="/Cloudo">Cloud-Offer</Link>
            <CurrentPage>Operations</CurrentPage>
          </StyledBreadcrumbs>
        </Box>

        {/* Title section */}
        <Typography
          variant="h4"
          align="center"
          sx={{
            marginBottom: '24px',
            fontFamily: 'Poppins',
            fontSize: '24px',
            fontWeight: '600',
            lineHeight: '32px',
            color: '#333',
          }}
        >
          Operations Overview
        </Typography>

        {/* Cards section */}
        <Grid container spacing={3} justifyContent="center">
          {cards.map((card, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              sx={{ marginBottom: index === cards.length - 1 ? '40px' : '0' }}
            >
              <HoverCard>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <CardTitle>
                    {card.title}
                  </CardTitle>
                  <CardDescription>
                    {card.description}
                  </CardDescription>
                  <CardButton onClick={handleButtonClick}>
                    {card.buttonText.charAt(0).toUpperCase() + card.buttonText.slice(1).toLowerCase()}
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

export default Operations;
