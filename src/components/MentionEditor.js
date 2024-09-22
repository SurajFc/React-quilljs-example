/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useQuill } from 'react-quilljs';
import { Box, Typography } from '@mui/material';
import "quill-mention/autoregister";
import 'quill-mention/dist/quill.mention.css';
import 'quill/dist/quill.snow.css';

const atValues = [
  { id: 1, value: 'John Doe' },
  { id: 2, value: 'Jane Smith' },
  { id: 3, value: 'Michael Johnson' },
  { id: 4, value: 'Emily Davis' },
  { id: 5, value: 'Robert Brown' },
  { id: 6, value: 'Jessica White' },
  { id: 7, value: 'Chris Taylor' },
  { id: 8, value: 'Patricia Green' },
  { id: 9, value: 'David Miller' },
  { id: 10, value: 'Sarah Wilson' },
];

const hashValues = [
  { id: 1, value: 'Trending' },
  { id: 2, value: 'Technology' },
  { id: 3, value: 'Health' },
  { id: 4, value: 'Education' },
  { id: 5, value: 'Science' },
  { id: 6, value: 'Sports' },
  { id: 7, value: 'Entertainment' },
  { id: 8, value: 'Art' },
  { id: 9, value: 'Travel' },
  { id: 10, value: 'Food' },
];

const MentionEditor = () => {

  const modules = {
    mention: {
      allowedChars: /^[A-Za-z\s]*$/,
      mentionDenotationChars: ['@', '#'],
      source: (searchTerm, renderList, mentionChar) => {
        const values = mentionChar === '@' ? atValues : hashValues;
        const matches = values.filter(item =>
          item.value.toLowerCase().includes(searchTerm.toLowerCase())
        );
        renderList(matches, searchTerm);
      },
    },
  }

  const formats = ['mention']; // Explicitly include the 'mention' format

  const { quill, quillRef } = useQuill({ theme: "snow", modules, formats });

  React.useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML('<p>React Hook for Quill!!</p>');

    }
  }, [quill]);

  return (
    <Box mt={10}>
      <Typography>Mention</Typography>
      <Box style={{ width: 600, height: 300 }}>
        <Box ref={quillRef} />
      </Box>
    </Box>
  )
}

export default MentionEditor