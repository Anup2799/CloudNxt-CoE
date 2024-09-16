import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid, Typography, Box, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'; // Example icon

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    display: 'flex',
    justifyContent: 'center', // Center the title
    alignItems: 'center',
    paddingRight: '40px', // Add padding to ensure the close icon doesn't overlap with the title
  },
  dialogContent: {
    padding: '24px',
    overflow: 'hidden', // Remove scrollbar
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
    instanceName: '',
    instanceType: '',
    region: '',
    keyName: '',
  });
  const [errors, setErrors] = useState({
    instanceName: false,
    instanceType: false,
    region: false,
  });
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (value) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      instanceName: !formData.instanceName,
      instanceType: !formData.instanceType,
      region: !formData.region,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      setProgress(0); // Reset progress
      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress === 100) {
            clearInterval(timer);
            setLoading(false);
            setShowThankYou(true);
          }
          return Math.min(prevProgress + 10, 100);
        });
      }, 800);
    }
  };

  const handleEditForm = () => {
    setShowThankYou(false); // Hide the thank you message
  };

  const handleDone = () => {
    handleClose(); // Close the dialog
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle className={classes.dialogTitle}>
        <Typography variant="h6">AWS EC2 Configuration</Typography>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {loading && !showThankYou ? (
          <div className={classes.progressContainer}>
            <CircularProgressWithLabel value={progress} />
          </div>
        ) : showThankYou ? (
          <div className={classes.thankYouMessage}>
            <FontAwesomeIcon icon={faThumbsUp} size="3x" />
            <Typography variant="h6">Thank you!</Typography>
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
          <form onSubmit={handleSubmit} className={classes.formContainer}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Instance Name *"
                  name="instanceName"
                  value={formData.instanceName}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  required
                  error={errors.instanceName}
                  helperText={errors.instanceName ? 'Instance Name is required' : ''}
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Instance Type *"
                  name="instanceType"
                  value={formData.instanceType}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  required
                  error={errors.instanceType}
                  helperText={errors.instanceType ? 'Instance Type is required' : ''}
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Region *"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  required
                  error={errors.region}
                  helperText={errors.region ? 'Region is required' : ''}
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Key Name"
                  name="keyName"
                  value={formData.keyName}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  className={classes.textField}
                />
              </Grid>
            </Grid>
          </form>
        )}
      </DialogContent>
      <DialogActions>
        {!loading && !showThankYou && (
          <>
            <Button
              onClick={handleClose}
              className={`${classes.button} ${classes.cancelButton}`}
            >
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
  );
};

export default Ec2Form;