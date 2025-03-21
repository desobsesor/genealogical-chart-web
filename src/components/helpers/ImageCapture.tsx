import html2canvas from 'html2canvas';
import { LoaderCircleIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

type ImageCaptureProps = {
    dataTestId?: string;
    classNames?: string[];
    children?: React.ReactNode;
}

const ImageCapture: React.FC<ImageCaptureProps> = ({ dataTestId, classNames, children }) => {
    const [isCapturing, setIsCapturing] = useState(false);
    const elementRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (classNames) {
            const selector = classNames.map(className => `.${className}`).join('');
            elementRef.current = document.querySelector(selector);
        } else if (dataTestId) {
            elementRef.current = document.querySelector(`[data-testid="${dataTestId}"]`);
        }
    }, [dataTestId, classNames]);

    const handleCapture = async () => {
        setIsCapturing(true);

        if (elementRef.current) {
            try {
                const canvas = await html2canvas(elementRef.current, {
                    scale: 10, // Ajusta la escala
                    useCORS: true, // Habilita CORS si es necesario
                    allowTaint: true, // Permite capturar elementos con contenido externo
                    foreignObjectRendering: true, // Permite capturar elementos SVG
                    logging: true // Habilita el registro
                });
                const dataURL = canvas.toDataURL('image/png');

                const link = document.createElement('a');
                link.href = dataURL;
                link.download = 'familiograma.png';
                link.click();
            } catch (error) {
                console.error('Error al capturar la imagen:', error);
            } finally {
                setIsCapturing(false);
            }
        }
    };

    return (
        <div className='bg-transparent text-gray-500 mx-0' onClick={handleCapture}>
            {isCapturing ? <LoaderCircleIcon className='min-w-6 max-w-6 min-h-6 max-h-6' /> : children}
        </div>
    );
};

export default ImageCapture;