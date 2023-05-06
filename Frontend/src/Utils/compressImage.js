export const compressImage = async (file, maxWidth, maxHeight, quality) => {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    // Create a new image object
    const image = new Image();
  
    // Load the image file into the image object
    image.src = URL.createObjectURL(file);
  
    // Wait for the image to load
    await new Promise(resolve => {
      image.onload = () => {
        URL.revokeObjectURL(image.src);
        resolve();
      };
    });
  
    // Get the current dimensions of the image
    let width = image.width;
    let height = image.height;
  
    // If the image is too wide, scale it down to the maxWidth while maintaining aspect ratio
    if (width > maxWidth) {
      height *= maxWidth / width;
      width = maxWidth;
    }
  
    // If the image is too tall, scale it down to the maxHeight while maintaining aspect ratio
    if (height > maxHeight) {
      width *= maxHeight / height;
      height = maxHeight;
    }
  
    // Set the canvas dimensions to the scaled down image dimensions
    canvas.width = width;
    canvas.height = height;
  
    // Draw the image onto the canvas at the scaled down size
    ctx.drawImage(image, 0, 0, width, height);
  
    // Convert the canvas image to a blob with the specified quality level
    return new Promise(resolve => {
      canvas.toBlob(blob => {
        resolve(new File([blob], file.name, { type: file.type }));
      }, file.type, quality);
    });
  };