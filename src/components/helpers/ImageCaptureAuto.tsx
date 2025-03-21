import html2canvas from 'html2canvas';
import React, { useEffect, useRef } from 'react';

interface ImageCaptureProps {
  className?: string;
  children: React.ReactNode;
}

const ImageCaptureAuto: React.FC<ImageCaptureProps> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const captureImage = async () => {
      if (ref.current) {
        const canvas = await html2canvas(ref.current);
        const dataURL = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'mi-imagen.png';
        link.click();
      }
    };

    captureImage();
  }, [ref]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default ImageCaptureAuto;