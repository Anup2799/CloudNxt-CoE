import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid, Typography, Box, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'; // Example icon

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: '40px',
    minHeight: '60px', // Adjust the height of the dialog title
  },
  dialogContent: {
    padding: '24px',
    overflow: 'hidden',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  textField: {
    marginBottom: '16px',
  },
  button: {
    marginRight: '8px',
    textTransform: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#d32f2f',
    },
  },
  submitButton: {
    backgroundColor: '#4caf50',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#388e3c',
    },
  },
  doneButton: {
    backgroundColor: '#2196f3',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#1976d2',
    },
  },
  editButton: {
    backgroundColor: '#ff9800',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#f57c00',
    },
  },
  progressContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '150px',
  },
  thankYouMessage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '16px',
  },
  errorMessage: {
    color: '#f44336',
    textAlign: 'center',
    marginBottom: '16px',
  },
}));

const CircularProgressWithLabel = (props) => (
  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
    <CircularProgress variant="determinate" {...props} />
    <Box
      sx={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography
        variant="caption"
        component="div"
        sx={{ color: 'text.secondary' }}
      >
        {`${Math.round(props.value)}%`}
      </Typography>
    </Box>
  </Box>
);

const Ec2Form = ({ open, handleClose }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    EC2_INSTANCE_NAME: '',
    KEY_PAIR_NAME: '',
    AWS_DEFAULT_REGION: 'us-west-2',
  });
  const [errors, setErrors] = useState({
    EC2_INSTANCE_NAME: false,
  });
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);
  const [backendError, setBackendError] = useState('');
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (value || name === 'KEY_PAIR_NAME') {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      EC2_INSTANCE_NAME: !formData.EC2_INSTANCE_NAME,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      setProgress(0); // Reset progress
      setBackendError(''); // Clear previous error messages
      setShowErrorPopup(false); // Hide error popup

      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress === 100) {
            clearInterval(timer);
            setLoading(false);
            if (!backendError) {
              setShowThankYou(true);
            }
          }
          return Math.min(prevProgress + 10, 100);
        });
      }, 800);

      try {
        await axios.post('http://localhost:5000/trigger-pipeline', formData);
      } catch (error) {
        clearInterval(timer); // Stop the progress bar if there's an error
        setLoading(false); // Stop loading spinner
        setBackendError(error.response ? error.response.data.message : error.message);
        setShowErrorPopup(true); // Show the error popup
      }
    }
  };

  const handleEditForm = () => {
    setShowThankYou(false); // Hide the thank you message
  };

  const handleDone = () => {
    handleClose(); // Close the dialog
  };

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
    handleClose(); // Optionally close the main dialog
  };

  return (
    <>
      {/* Main Form Dialog */}
      {!showErrorPopup && (
        <Dialog
          open={open}
          onClose={(e) => e.stopPropagation()} // Prevent closing when clicking outside
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle className={classes.dialogTitle}>
            <Typography variant="h6">EC2 Configuration</Typography>
          </DialogTitle>
          <DialogContent className={classes.dialogContent}>
            {loading && !showThankYou ? (
              <div className={classes.progressContainer}>
                <CircularProgressWithLabel value={progress} />
              </div>
            ) : showThankYou ? (
              <div className={classes.thankYouMessage}>
                <FontAwesomeIcon icon={faThumbsUp} size="3x" />
                <Typography variant="h6" style={{ marginTop: '16px' }}>
                  Success!
                </Typography>
                <Typography variant="body1">
                  Your EC2 instance request is being processed. Thank you!
                </Typography>
                <div className={classes.buttonContainer}>
                  <Button
                    onClick={handleDone}
                    className={`${classes.button} ${classes.doneButton}`}
                  >
                    Done
                  </Button>
                  <Button
                    onClick={handleEditForm}
                    className={`${classes.button} ${classes.editButton}`}
                  >
                    Edit Form
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit} className={classes.formContainer}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="EC2 Instance Name"
                        name="EC2_INSTANCE_NAME"
                        value={formData.EC2_INSTANCE_NAME}
                        onChange={handleChange}
                        error={errors.EC2_INSTANCE_NAME}
                        helperText={errors.EC2_INSTANCE_NAME && "Required"}
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Key-Pair Name"
                        name="KEY_PAIR_NAME"
                        value={formData.KEY_PAIR_NAME}
                        onChange={handleChange}
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="AWS Default Region"
                        name="AWS_DEFAULT_REGION"
                        value={formData.AWS_DEFAULT_REGION}
                        InputProps={{ readOnly: true }}
                        className={classes.textField}
                      />
                    </Grid>
                  </Grid>
                </form>
              </>
            )}
          </DialogContent>
          <DialogActions>
            {!loading && !showThankYou && (
              <>
                <Button onClick={handleClose} className={`${classes.button} ${classes.cancelButton}`}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  className={`${classes.button} ${classes.submitButton}`}
                >
                  Submit
                </Button>
              </>
            )}
          </DialogActions>
        </Dialog>
      )}

      {/* Error Popup Dialog */}
      <Dialog
        open={showErrorPopup}
        onClose={handleCloseErrorPopup}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle className={classes.dialogTitle}>
          <Typography variant="h6">Error</Typography>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Typography variant="body1" className={classes.errorMessage}>
            {backendError || 'An unexpected error occurred. Please try again.'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseErrorPopup}
            className={`${classes.button} ${classes.doneButton}`}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Ec2Form;
