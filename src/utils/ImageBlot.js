import Quill from 'quill';

// Define a custom blot for images
let BlockEmbed = Quill.import('blots/block/embed');

class ImageBlot extends BlockEmbed {
  static create(value) {
    let node = super.create();
    node.setAttribute('alt', value.alt || ''); // Provide a default value
    node.setAttribute('src', value.url || '');
    node.setAttribute('style', value.style || '');

    if (value.width) {
      node.setAttribute('width', value.width);
    }

    if (value.height) {
      node.setAttribute('height', value.height);
    }

    // Set maxWidth to 100% by default or use provided maxWidth
    node.style.maxWidth = value.maxWidth || '100%';

    return node;
  }

  static value(node) {
    return {
      alt: node.getAttribute('alt'),
      url: node.getAttribute('src'),
      style: node.getAttribute('style'),
      width: node.getAttribute('width'),
      height: node.getAttribute('height'),
      maxWidth: node.style.maxWidth, // Include maxWidth in the value object
    };
  }
}

// Register the custom blot with Quill
ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';

Quill.register(ImageBlot);
