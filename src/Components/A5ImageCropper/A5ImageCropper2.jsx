import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

// Custom toast function (replace with your actual implementation)
const showErrorToast = (message) => {
  alert(message); // Replace with your toast library (e.g., react-toastify)
};

// A5ImageCropper2 Component
const A5ImageCropper2 = forwardRef(({ imageSrc }, ref) => {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({
    unit: "px",
    x: 0,
    y: 0,
    width: 300,
    height: 400,
    aspect: 1440 / 1572,
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (isImageLoaded && completedCrop && previewCanvasRef.current && imgRef.current) {
      const image = imgRef.current;
      const canvas = previewCanvasRef.current;
      const crop = completedCrop;
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const ctx = canvas.getContext("2d");

      canvas.width = crop.width;
      canvas.height = crop.height;

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
    }
  }, [completedCrop, isImageLoaded]);

  useImperativeHandle(ref, () => ({
    getCroppedImage: () => {
      return new Promise((resolve, reject) => {
        if (!completedCrop || !previewCanvasRef.current) {
          reject(new Error("Crop not ready"));
          return;
        }

        previewCanvasRef.current.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Failed to crop image"));
              return;
            }
            const url = URL.createObjectURL(blob);
            resolve(url);
          },
          "image/jpeg",
          1
        );
      });
    },
  }));


  return (
    <div style={{ textAlign: "center", maxWidth: "100%" }}>
      {imageSrc && (
        <>
          <ReactCrop
            image={imageSrc}
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            onImageLoaded={(img) => {
              imgRef.current = img;
              setIsImageLoaded(true);
            }}
            onImageError={(error) => {
              console.error("Image loading error:", error);
              showErrorToast("Failed to load image");
            }}
            style={{ maxWidth: "100%" }} // Removed maxHeight for testing
          />
          <canvas ref={previewCanvasRef} style={{ display: "none" }} />
        </>
      )}
    </div>
  );
});

export default A5ImageCropper2;
