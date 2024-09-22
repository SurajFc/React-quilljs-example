import Quill from 'quill';

// Create a custom font size module
const FontSize = Quill.import('attributors/style/size');

// Define the whitelist of allowed sizes from 4px to 72px
const fontSizeWhitelist = [];
for (let size = 4; size <= 72; size++) {
  fontSizeWhitelist.push(`${size}px`);
}

FontSize.whitelist = fontSizeWhitelist;

// Register the font size module with Quill
Quill.register(FontSize, true);