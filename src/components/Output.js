import React from 'react';
import { Box, Typography } from '@mui/material';

const Output = ({ content }) => {
    return (
        <Box mt={5}>
            <Typography variant="h6" mt={10}>Output</Typography>
            <Box
                dangerouslySetInnerHTML={{ __html: content }}  // Use the passed HTML content
                style={{
                    border: '1px solid #ccc',
                    padding: '10px',
                    height: '300px',
                    overflowY: "auto",
                    backgroundColor: '#f9f9f9'
                }}
            />
        </Box>
    );
};

export default Output;
