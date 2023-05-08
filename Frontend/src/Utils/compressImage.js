export function compressImageFunction(file) {
  const maxWidth = 800
  const maxHeight = 800
  const quality = 0.7

  // Convert input to a File object if it's not already one
  if (!(file instanceof File)) {
    file = new File([file], 'image.jpg', { type: 'image/jpeg' });
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const width = img.width;
      const height = img.height;
      let newWidth = width;
      let newHeight = height;

      // calculate the new width and height
      if (width > height && width > maxWidth) {
        newWidth = maxWidth;
        newHeight = height * (maxWidth / width);
      } else if (height > width && height > maxHeight) {
        newHeight = maxHeight;
        newWidth = width * (maxHeight / height);
      } else if (width === height && width > maxWidth) {
        newWidth = maxWidth;
        newHeight = maxHeight;
      }

      // set canvas dimensions
      canvas.width = newWidth;
      canvas.height = newHeight;

      // draw image on canvas
      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      // get the compressed data URL
      canvas.toBlob(
        (blob) => {
          const compressedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: file.lastModified,
          });
          resolve(compressedFile);
        },
        file.type,
        quality
      );
    };
    img.onerror = reject;
  });
}
