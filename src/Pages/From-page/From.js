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
    minHeight: '60px',
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

const formConfigs = {
  ecs: [
    { label: 'ECS Name', name: 'ECS_NAME', required: true },
    { label: 'Task Definition', name: 'TASK_DEFINITION', required: true },
    { label: 'Cluster Name', name: 'CLUSTER_NAME', required: true },
    { label: 'AWS Region', name: 'AWS_REGION', defaultValue: 'us-west-2', readOnly: true },
  ],
  vpc: [
    { label: 'VPC Name', name: 'VPC_NAME', required: true },
    { label: 'CIDR Block', name: 'CIDR_BLOCK', required: true },
    { label: 'AWS Region', name: 'AWS_REGION', defaultValue: 'us-west-2', readOnly: true },
  ],
  ec2: [
    { label: 'EC2 Instance Name', name: 'EC2_INSTANCE_NAME', required: true },
    { label: 'Key-Pair Name', name: 'KEY_PAIR_NAME', required: true },
    { label: 'AWS Region', name: 'AWS_REGION', defaultValue: 'us-west-2', readOnly: true },
  ],
  s3: [
    { label: 'Bucket Name', name: 'BUCKET_NAME', required: true },
    { label: 'AWS Region', name: 'AWS_REGION', defaultValue: 'us-west-2', readOnly: true },
  ],
  sns: [
    { label: 'Topic Name', name: 'TOPIC_NAME', required: true },
    { label: 'Display Name', name: 'DISPLAY_NAME', required: true },
    { label: 'AWS Region', name: 'AWS_REGION', defaultValue: 'us-west-2', readOnly: true },
  ],
  lambda: [
    { label: 'Function Name', name: 'FUNCTION_NAME', required: true },
    { label: 'Runtime', name: 'RUNTIME', required: true },
    { label: 'Handler', name: 'HANDLER', required: true },
    { label: 'AWS Region', name: 'AWS_REGION', defaultValue: 'us-west-2', readOnly: true },
  ],
  kms: [
    { label: 'Key Alias', name: 'KEY_ALIAS', required: true },
    { label: 'Description', name: 'DESCRIPTION', required: false },
    { label: 'AWS Region', name: 'AWS_REGION', defaultValue: 'us-west-2', readOnly: true },
  ],
  rds: [
    { label: 'DB Instance Identifier', name: 'DB_INSTANCE_ID', required: true },
    { label: 'DB Instance Class', name: 'DB_INSTANCE_CLASS', required: true },
    { label: 'AWS Region', name: 'AWS_REGION', defaultValue: 'us-west-2', readOnly: true },
  ],
  eks: [
    { label: 'Cluster Name', name: 'CLUSTER_NAME', required: true },
    { label: 'Role ARN', name: 'ROLE_ARN', required: true },
    { label: 'Kubernetes Version', name: 'K8S_VERSION', required: true },
    { label: 'AWS Region', name: 'AWS_REGION', defaultValue: 'us-west-2', readOnly: true },
  ],
  dynamodb: [
    { label: 'Table Name', name: 'TABLE_NAME', required: true },
    { label: 'Read Capacity Units', name: 'READ_CAPACITY_UNITS', required: true },
    { label: 'Write Capacity Units', name: 'WRITE_CAPACITY_UNITS', required: true },
    { label: 'AWS Region', name: 'AWS_REGION', defaultValue: 'us-west-2', readOnly: true },
  ],
};

const Form = ({ open, handleClose, objective }) => {
  const classes = useStyles();
  const [service] = useState(objective?.service || 'ecs');
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
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
    const newErrors = {};
    const fields = formConfigs[service] || [];
    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = true;
      }
    });
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form and check if the service is defined
    if (!validateForm()) {
      return; // Stop submission if form validation fails
    }

    // Construct payload with all required fields
    const payload = {
      service: service, // e.g., 'ecs', 'ec2', etc.
      AWS_ACCESS_KEY_ID: formData.AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: formData.AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY,
      AWS_DEFAULT_REGION: formData.AWS_DEFAULT_REGION || process.env.AWS_DEFAULT_REGION,
    };

    console.log('Payload:', payload); // Debug log (remove or sanitize in production)

    // Show loading spinner and start progress bar
    setLoading(true);
    setProgress(0); // Reset progress
    setBackendError(''); // Clear previous error messages
    setShowErrorPopup(false); // Hide error popup

    // Set up progress simulation (this should ideally be tied to real progress updates from the backend)
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
      const response = await axios.post('http://localhost:5000/trigger-pipeline', payload);
      // Handle successful response if needed
      console.log('Response:', response.data);
    } catch (error) {
      // Handle error
      clearInterval(timer); // Stop the progress bar if there's an error
      setLoading(false); // Stop loading spinner
      setBackendError(error.response ? error.response.data.message : error.message);
      setShowErrorPopup(true); // Show the error popup
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

  const renderFormFields = () => {
    const fields = formConfigs[service] || [];
    return fields.map((field) => (
      <TextField
        key={field.name}
        label={field.label}
        name={field.name}
        value={formData[field.name] || field.defaultValue || ''}
        onChange={handleChange}
        required={field.required}
        InputProps={{
          readOnly: field.readOnly,
        }}
        fullWidth
        margin="normal"
        error={errors[field.name]}
        helperText={errors[field.name] ? 'Required' : ''}
        className={classes.textField}
      />
    ));
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
            <Typography variant="h6">{`${service.toUpperCase()} Service-Form`}</Typography>
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
                  Your request is being processed. Thank you!
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
              <form onSubmit={handleSubmit} className={classes.formContainer}>
                <Grid container spacing={2}>
                  {renderFormFields()}
                </Grid>
              </form>
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
        <DialogContent>
          <Typography variant="body1" className={classes.errorMessage}>
            {backendError}
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

export default Form;
