/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { useQuill } from 'react-quilljs';
import Select from "react-select"
import BlotFormatter from 'quill-blot-formatter';
import { Box, Stack, Typography } from '@mui/material';
import { bold, bulletpoints, italic, numberedpoints, underline } from '../assets';
import Output from './Output';
import { Toaster } from '../Toaster';
import "../utils/fontSizeModule";
import "../utils/ImageBlot";

const CustomToolbar = () => {
    const colorRef = useRef()

    // Generate font size options dynamically
    const generateFontSizeOptions = (start, end, step) => {
        const options = [];
        for (let size = start; size <= end; size += step) {
            options.push({ value: `${size}px`, label: `${size}` });
        }
        return options;
    };

    const fontSizeOptions = generateFontSizeOptions(4, 72, 1); // Sizes from 4px to 72px in steps of 1

    const defaultFontSize = '14'; // Default font size

    const modules = {
        toolbar: "#toolbar",
        blotFormatter: {}
    }
    const { quill, quillRef, Quill } = useQuill({ theme: "snow", modules });
    const [selectedFontSize, setSelectedFontSize] = useState({ value: defaultFontSize, label: defaultFontSize });
    const [textColor, setTextColor] = useState("#000");
    const [range, setRange] = useState();
    const [editorContent, setEditorContent] = useState('<p>React Hook for Quill!</p>');  

    if (Quill && !quill) {
        Quill.register('modules/blotFormatter', BlotFormatter);
      }

    // Helper function to toggle active class
    const toggleButtonActiveClass = (buttonId, isActive) => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.classList.toggle('active', isActive);
        }
    };

    // Define handlers for toolbar buttons
    const handleBoldClick = () => {
        if (quill) {
            const isActive = !quill.getFormat().bold;
            quill.format('bold', isActive);
            toggleButtonActiveClass(`bold-button`, isActive);
        }
    };

    const handleItalicClick = () => {
        if (quill) {
            const isActive = !quill.getFormat().italic;
            quill.format('italic', isActive);
            toggleButtonActiveClass(`italic-button`, isActive);
        }
    };

    const handleUnderlineClick = () => {
        if (quill) {
            const isActive = !quill.getFormat().underline;
            quill.format('underline', isActive);
            toggleButtonActiveClass(`underline-button`, isActive);
        }
    };

    const handleBulletPointsClick = () => {
        if (quill) {
            const isActive = quill.getFormat().list !== 'bullet';
            quill.format('list', isActive ? 'bullet' : false);
            toggleButtonActiveClass(`bulletpoints-button`, isActive);
        }
    };

    const handleNumberedPointsClick = () => {
        if (quill) {
            const isActive = quill.getFormat().list !== 'ordered';
            quill.format('list', isActive ? 'ordered' : false);
            toggleButtonActiveClass(`numberedpoints-button`, isActive);
        }
    };

    const handleFontSizeChange = (selectedOption) => {
        if (quill && selectedOption) {
            quill.format('size', selectedOption.value);
            setSelectedFontSize(selectedOption);
        }
    };

    const handleTextColorChange = val => {
        if (quill && val) {
            quill.format('color', val)
            setTextColor(val)
        }
    }

    const handleColorPickerClick = () => {
        colorRef.current.click()
    }

    useEffect(() => {
        if (quill) {
            quill.clipboard.dangerouslyPasteHTML('<p>React Hook for Quill!</p>');

            quill.on('text-change', (delta, oldDelta, source) => {
                setEditorContent(quill.root.innerHTML); 
                const currentRange = quill.getSelection();
                if (currentRange) {
                    setRange(currentRange);
                }
            });

            quill.on('selection-change', (range, oldRange, source) => {
                if (range) {
                    if (range.length === 0) {
                        setRange(range)
                    } else {
                        const text = quill.getText(range.index, range.length);
                        console.log('User has highlighted', text);
                    }
                } else {
                    // console.log('Cursor not in the editor');
                }
            });
        }
        return () => {
            quill?.off("text-change")
            quill?.off("selection-change")
        }
    }, [quill]);

    useEffect(() => {
        if (textColor) {
            handleTextColorChange(textColor)
        }
    }, [textColor])

    useEffect(() => {
        if (quill) {
            // Set default font size
            quill.format('size', defaultFontSize);
            quill.blur();
            // Add event listeners with unique IDs for each editor instance
            document.getElementById(`bold-button`)?.addEventListener('click', handleBoldClick);
            document.getElementById(`italic-button`)?.addEventListener('click', handleItalicClick);
            document.getElementById(`underline-button`)?.addEventListener('click', handleUnderlineClick);
            document.getElementById(`bulletpoints-button`)?.addEventListener('click', handleBulletPointsClick);
            document.getElementById(`numberedpoints-button`)?.addEventListener('click', handleNumberedPointsClick);
        }

        // Clean up event listeners on unmount
        return () => {
            document.getElementById(`bold-button`)?.removeEventListener('click', handleBoldClick);
            document.getElementById(`italic-button`)?.removeEventListener('click', handleItalicClick);
            document.getElementById(`underline-button`)?.removeEventListener('click', handleUnderlineClick);
            document.getElementById(`bulletpoints-button`)?.removeEventListener('click', handleBulletPointsClick);
            document.getElementById(`numberedpoints-button`)?.removeEventListener('click', handleNumberedPointsClick);
        };
    }, [quill]);

    const uploadImage = async () => {
        // Simultae api call and return url
        return "https://picsum.photos/200"
    }

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate file type and size
            if (!file.type.startsWith('image/')) {
                Toaster("error", 'Please select an image file.');
                return;
            }

            if (file.size > 1 * 1024 * 1024) { // 1MB size limit
                Toaster("error", 'File size should not exceed 1MB.');
                return;
            }

            // Simulate image upload and get URL
            const imageURL = await uploadImage(file);
            
            if (quill && imageURL) {
                quill.insertEmbed(range?.index ? range.index : 0, 'image',
                    {
                        url: imageURL,
                        alt: file?.name
                        // width: `100px`, 
                        // height: `100px` 
                    });

            }
        }
    };


    return (
        <Box mt={5}>
            <Typography>Custom Toolbar</Typography>
            <Box style={{ width: 600, height: 300 }}>
                <Box overflow={"hidden"} ref={quillRef} />
                <Stack gap={3} alignItems={"center"} border={1} borderTop={0} p={1} borderColor={"#ccc"} flexDirection="row" id={`toolbar`}>
                    <img id={`bold-button`} title="Bold" className='toolbar-button' src={bold} alt='Bold' />
                    <img id={`italic-button`} title="Italic" className='toolbar-button' src={italic} alt='Italic' />
                    <img id={`underline-button`} title="Underline" className='toolbar-button' src={underline} alt='Underline' />
                    <Box title="Font Size">
                        <Select
                            id={`font-size`}
                            className='font-size-select'
                            options={fontSizeOptions}
                            value={selectedFontSize}
                            onChange={handleFontSizeChange}
                            placeholder="Font Size"
                            classNamePrefix="fontSize"
                            isSearchable
                            menuPlacement='top'
                        />
                    </Box>
                    <Box title="Font Color" id="ql-picker" className='ql-color-picker'>
                        <input type="color" style={{ display: "none" }} ref={colorRef} value={textColor} onChange={e => setTextColor(e.target.value)} />
                        <Typography
                            className='cursor-pointer'
                            style={{
                                borderBottom: `2px solid ${textColor}`,
                                width: "14px",
                                lineHeight: "18px",
                                paddingLeft: "2px",
                            }}
                            onClick={handleColorPickerClick}>
                            A
                        </Typography>
                    </Box>
                    <img id={`bulletpoints-button`} style={{ width: "28px" }} title="Unordered List" className='toolbar-button' src={bulletpoints} alt='Bullet Points' />
                    <img id={`numberedpoints-button`} style={{ width: "30px" }} title="Ordered List" className='toolbar-button' src={numberedpoints} alt='Numbered Points' />
                    <Typography color='primary' className='cursor-pointer' onClick={() => document.getElementById(`image-upload`).click()}> +Image</Typography>
                    <input type="file" accept="image/*" id={`image-upload`} style={{ display: 'none' }} onChange={handleImageUpload} />
                </Stack>
            </Box>
            <Output content={editorContent} /> 
        </Box >
    )
}

export default CustomToolbar