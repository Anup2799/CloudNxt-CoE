import React, { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Button, TextField, Box, Typography, Snackbar, Alert, Breadcrumbs, Link } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

const EditorAccordion = () => {
  const [expanded, setExpanded] = useState(false);
  const [isEditorVisible, setIsEditorVisible] = useState({});
  const [editorContent, setEditorContent] = useState({});
  const [activeSection, setActiveSection] = useState(null); // Track the active section
  const [openSnackbar, setOpenSnackbar] = useState(false); // Control Snackbar visibility

  const navigate = useNavigate();

  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleEditorClick = (section) => {
    setActiveSection(section); // Set the active section
    setIsEditorVisible((prev) => ({
      ...prev,
      [section]: true,
    }));
  };

  const handleContentChange = (section, event) => {
    setEditorContent((prev) => ({
      ...prev,
      [section]: event.target.value,
    }));
  };

  const handleVisualButtonClick = () => {
    setIsEditorVisible({});
    setActiveSection(null); // Clear the active section
  };

  const handleSaveClick = () => {
    // Check if there is content in the editor before showing Snackbar
    if (editorContent[activeSection]) {
      setOpenSnackbar(true); // Show success message
    }
    setIsEditorVisible({}); // Hide the editor
    setExpanded(false); // Collapse the accordion
  };

  const handleValidateClick = () => {
    setIsEditorVisible({}); // Close the editor
    setActiveSection(null); // Clear the active section
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Hide success message
  };

  const breadcrumbs = [
    { text: "Home", href: "/" },
    { text: "Zen-Cloudbase", href: "/Cloudbase" },
    { text: "Standard" }
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        padding: "20px",
        marginTop: "60px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        position: "relative",
      }}
    >
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{
        marginBottom: "20px",
        color: "#3956A5",
        fontSize: "16px",
        '& .MuiBreadcrumbs-ol': {
          padding: 0,
          margin: 0,
        },
        '& .MuiBreadcrumbs-li': {
          display: 'flex',
          alignItems: 'center',
        },
        '& .MuiBreadcrumbs-separator': {
          color: "#3956A5",
        },
      }}>
        {breadcrumbs.map((breadcrumb, index) => (
          <Link
            key={index}
            color="inherit"
            href={breadcrumb.href}
            onClick={(event) => {
              event.preventDefault();
              navigate(breadcrumb.href); // Navigate to the breadcrumb link
            }}
            sx={{
              cursor: "pointer",
              textDecoration: "none", // Remove underline
              color: "#3956A5", // Set text color
              '&:hover': {
                textDecoration: "underline", // Optional: Add underline on hover
              },
              fontWeight: index === breadcrumbs.length - 1 ? 'bold' : 'normal', // Make the last breadcrumb bold
            }}
          >
            {breadcrumb.text}
          </Link>
        ))}
      </Breadcrumbs>

      {[ 
        "Global Configuration",
        "AWS Organization",
        "Account Structure",
        "Network",
        "Security",
        "Identity & Access Management (IAM)",
        "Active Directory Scripts",
        "Policies",
      ].map((section, index) => (
        <Accordion
          expanded={expanded === section}
          onChange={handleExpand(section)}
          key={index}
          sx={{ marginBottom: "10px" }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{section}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ position: "relative" }}>
              {/* Always show the Editor and Visual buttons */}
              <Box sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                marginBottom: "10px",
                gap: "10px",
              }}>
                <Button
                  variant="outlined"
                  onClick={() => handleEditorClick(section)}
                  sx={{
                    backgroundColor: isEditorVisible[section] ? "#3956A5" : "#fff",
                    color: isEditorVisible[section] ? "#fff" : "#000",
                    borderColor: isEditorVisible[section] ? "#3956A5" : "#ccc",
                  }}
                >
                  Editor
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleVisualButtonClick}
                  sx={{
                    backgroundColor: !isEditorVisible[section] ? "#3956A5" : "#fff",
                    color: !isEditorVisible[section] ? "#fff" : "#000",
                    borderColor: !isEditorVisible[section] ? "#3956A5" : "#ccc",
                  }}
                >
                  Visual
                </Button>
              </Box>

              {/* Display the editor if it is visible */}
              {isEditorVisible[section] && (
                <Box sx={{ marginTop: "10px" }}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={4}
                    value={editorContent[section] || ""}
                    onChange={(event) => handleContentChange(section, event)}
                    variant="outlined"
                    placeholder={`Edit ${section}`}
                  />
                  <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "10px", gap: "10px" }}>
                    <Button
                      variant="contained"
                      onClick={handleSaveClick}
                      sx={{
                        backgroundColor: "#fff",
                        color: "#3956A5",
                        border: `1px solid #3956A5`,
                        '&:hover': {
                          backgroundColor: "#e0e0e0",
                        },
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleValidateClick}
                      sx={{
                        backgroundColor: "#fff",
                        color: "#3956A5",
                        border: `1px solid #3956A5`,
                        '&:hover': {
                          backgroundColor: "#e0e0e0",
                        },
                      }}
                    >
                      Validate
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Snackbar for success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Adjust the position here
        sx={{ marginTop: '200px' }} // Adjust vertical position from the top
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Content saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditorAccordion;
