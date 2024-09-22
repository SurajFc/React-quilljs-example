/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { Box, Typography } from '@mui/material';

const Basic = () => {
    const { quill, quillRef } = useQuill();

    React.useEffect(() => {
        if (quill) {
            quill.clipboard.dangerouslyPasteHTML('<h1>React Hook for Quill!</h1>');
        }
    }, [quill]);

    React.useEffect(() => {
        if (quill) {
            quill.on('text-change', (delta, oldDelta, source) => {
                console.log('Text change!');
                console.log(quill.getText()); // Get text only
                console.log(quill.getContents()); // Get delta contents
                console.log(quill.root.innerHTML); // Get innerHTML using quill
                console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
            });
        }
    }, [quill]);

    return (
        <Box mt={10}>
            <Typography>Basic</Typography>
            <Box style={{ width: 600, height: 300 }}>
                <Box ref={quillRef} />
            </Box>
        </Box>
    )
}

export default Basic