import { useEffect, useRef, useState } from 'react';

interface TransparentLogoProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  threshold?: number;
}

export default function TransparentLogo({ src, alt = 'Logo', className, style, threshold = 45 }: TransparentLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = (r + g + b) / 3;

        if (brightness < threshold) {
          data[i + 3] = 0;
        } else if (brightness < threshold + 30) {
          const fade = (brightness - threshold) / 30;
          data[i + 3] = Math.round(data[i + 3] * fade);
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setDataUrl(canvas.toDataURL('image/png'));
    };
    img.src = src;
  }, [src, threshold]);

  return (
    <>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {dataUrl ? (
        <img src={dataUrl} alt={alt} className={className} style={style} />
      ) : (
        <img src={src} alt={alt} className={className} style={{ ...style, opacity: 0 }} />
      )}
    </>
  );
}
