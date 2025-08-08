import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";

export const getCroppedImg = (imageSrc, pixelCrop) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas size to cropped dimensions
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      // Ensure we're working with integer coordinates to avoid sub-pixel rendering issues
      const x = Math.round(pixelCrop.x);
      const y = Math.round(pixelCrop.y);
      const width = Math.round(pixelCrop.width);
      const height = Math.round(pixelCrop.height);

      // Clear the canvas first
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the cropped section
      ctx.drawImage(
        image,
        x,                    // Source x coordinate
        y,                    // Source y coordinate  
        width,                // Source width
        height,               // Source height
        0,                    // Destination x
        0,                    // Destination y
        width,                // Destination width
        height                // Destination height
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        const fileUrl = URL.createObjectURL(blob);
        resolve(fileUrl);
      }, "image/jpeg", 0.95);
    };

    image.onerror = () => {
      reject(new Error("Failed to load image"));
    };
  });
};

const A5ImageCropper = ({ imageSrc, onCropDone }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const onCropComplete = useCallback((croppedArea, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  useEffect(() => {
    if (croppedAreaPixels) {
      const runAutoCrop = async () => {
        try {
          const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
          onCropDone(croppedImage);
        } catch (e) {
          console.error("Auto crop failed", e);
        }
      };
      runAutoCrop();
    }
  }, [croppedAreaPixels, imageSrc, onCropDone]);

  // Adjust container size to match aspect ratio
  const containerWidth = isMobile ? 300 : 500; 
  const containerHeight = Math.round(containerWidth * (1440 / 1470));

  const onMediaLoaded = useCallback((mediaSize) => {
    setImageSize({ width: mediaSize.naturalWidth, height: mediaSize.naturalHeight });
    
    // Reset zoom to 1 initially to avoid coordinate issues
    setZoom(1);
    
    // Center the crop
    setCrop({ x: 0, y: 0 });
  }, [containerWidth, containerHeight]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        className="relative border-2 border-gray-300 rounded-lg overflow-hidden"
        style={{
          width: containerWidth,
          height: containerHeight,
        }}
      >
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1440 / 1470}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          onMediaLoaded={onMediaLoaded}
          showGrid={false}
          cropShape="rect"
          objectFit="horizontal-cover"
          restrictPosition={true}
        />
      </div>
      
      {/* <div className="flex items-center space-x-4">
        <label className="text-sm font-medium text-gray-700">
          Zoom:
        </label>
        <input
          type="range"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-32"
        />
        <span className="text-sm text-gray-500">
          {zoom.toFixed(1)}x
        </span>
      </div> */}
    </div>
  );
};

export default A5ImageCropper;