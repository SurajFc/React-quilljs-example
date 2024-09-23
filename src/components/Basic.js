/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useQuill } from 'react-quilljs';
import { Box, Typography } from '@mui/material';
import 'quill/dist/quill.snow.css';
import Output from './Output';

const Basic = () => {
    const { quill, quillRef } = useQuill();
    const [editorContent, setEditorContent] = useState('<h1>React Hook for Quill!</h1>');

    React.useEffect(() => {
        if (quill) {
            quill.clipboard.dangerouslyPasteHTML('<h1>React Hook for Quill!</h1>');
            quill.on('text-change', () => {
                setEditorContent(quill.root.innerHTML);
            });
        }
    }, [quill]);


    return (
        <Box mt={5}>
            <Typography>Basic</Typography>
            <Box style={{ width: 600, height: 300 }}>
                <Box ref={quillRef} />
            </Box>
            <Output content={editorContent} />
        </Box>
    )
}

export default Basic;
