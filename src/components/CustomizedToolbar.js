import React, { useState } from 'react'
import { useQuill } from 'react-quilljs';
import { Box, Typography } from '@mui/material';
import Output from './Output';
import 'quill/dist/quill.snow.css';

const CustomizedToolbar = () => {

    const modules = {
        toolbar: {
            container: [
                [{ 'size': ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote'],
                [{ 'header': 1 }, { 'header': 2 }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['clean']
            ],
        }
    }

    const { quill, quillRef, Quill } = useQuill({ theme: "snow", modules });
    const [editorContent, setEditorContent] = useState('<h1>React Hook for Quill!</h1>');  

    if(Quill){
        const icons = Quill.import('ui/icons');
        icons.bold = "Bo"
    }

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
            <Typography>Customized Toolbar</Typography>
            <Box style={{ width: 600, height: 300 }}>
                <Box ref={quillRef} />
            </Box>
            <Output content={editorContent} /> 
        </Box>

    )
}

export default CustomizedToolbar