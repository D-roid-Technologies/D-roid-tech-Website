import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, Download, RotateCw, ZoomIn, ZoomOut, Image as ImageIcon, Move } from 'lucide-react';

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ImageData {
  src: string;
  width: number;
  height: number;
}

type AspectRatio = 'free' | '1:1' | '16:9';

const CropToolItem: React.FC = () => {
  const [image, setImage] = useState<ImageData | null>(null);
  const [cropArea, setCropArea] = useState<CropArea>({ x: 0, y: 0, width: 200, height: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('free');
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [activeHandle, setActiveHandle] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setImage({
          src: e.target?.result as string,
          width: img.width,
          height: img.height
        });
        setCropArea({
          x: img.width * 0.1,
          y: img.height * 0.1,
          width: img.width * 0.8,
          height: img.height * 0.8
        });
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Apply aspect ratio constraints
  const applyAspectRatio = useCallback((newCropArea: CropArea): CropArea => {
    if (aspectRatio === 'free') return newCropArea;
    
    const ratio = aspectRatio === '1:1' ? 1 : 16/9;
    const currentRatio = newCropArea.width / newCropArea.height;
    
    if (currentRatio > ratio) {
      const newWidth = newCropArea.height * ratio;
      return { ...newCropArea, width: newWidth };
    } else {
      const newHeight = newCropArea.width / ratio;
      return { ...newCropArea, height: newHeight };
    }
  }, [aspectRatio]);

  // Handle crop area drag
  const handleMouseDown = (e: React.MouseEvent, handle?: string) => {
    if (!image) return;
    
    setIsDragging(true);
    setActiveHandle(handle || null);
    setDragStart({
      x: e.clientX - (handle ? 0 : cropArea.x),
      y: e.clientY - (handle ? 0 : cropArea.y)
    });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !image) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    if (activeHandle) {
      let newCropArea = { ...cropArea };
      
      switch (activeHandle) {
        case 'nw':
          newCropArea = {
            x: Math.max(0, deltaX),
            y: Math.max(0, deltaY),
            width: cropArea.width + cropArea.x - Math.max(0, deltaX),
            height: cropArea.height + cropArea.y - Math.max(0, deltaY)
          };
          break;
        case 'ne':
          newCropArea = {
            ...cropArea,
            y: Math.max(0, deltaY),
            width: Math.min(image.width - cropArea.x, deltaX - cropArea.x),
            height: cropArea.height + cropArea.y - Math.max(0, deltaY)
          };
          break;
        case 'sw':
          newCropArea = {
            x: Math.max(0, deltaX),
            y: cropArea.y,
            width: cropArea.width + cropArea.x - Math.max(0, deltaX),
            height: Math.min(image.height - cropArea.y, deltaY - cropArea.y)
          };
          break;
        case 'se':
          newCropArea = {
            ...cropArea,
            width: Math.min(image.width - cropArea.x, deltaX - cropArea.x),
            height: Math.min(image.height - cropArea.y, deltaY - cropArea.y)
          };
          break;
      }

      if (newCropArea.width > 50 && newCropArea.height > 50) {
        setCropArea(applyAspectRatio(newCropArea));
      }
    } else {
      const newX = Math.max(0, Math.min(image.width - cropArea.width, deltaX));
      const newY = Math.max(0, Math.min(image.height - cropArea.height, deltaY));
      setCropArea(prev => ({ ...prev, x: newX, y: newY }));
    }
  }, [isDragging, dragStart, cropArea, activeHandle, image, applyAspectRatio]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setActiveHandle(null);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Update preview
  useEffect(() => {
    if (!image || !previewCanvasRef.current) return;

    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = 280;
      canvas.height = 200;
      
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      
      if (ctx) {
        const scale = Math.min(canvas.width / cropArea.width, canvas.height / cropArea.height);
        const scaledWidth = cropArea.width * scale;
        const scaledHeight = cropArea.height * scale;
        const offsetX = (canvas.width - scaledWidth) / 2;
        const offsetY = (canvas.height - scaledHeight) / 2;
        
        ctx.save();
        ctx.translate(offsetX + scaledWidth / 2, offsetY + scaledHeight / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.scale(zoom, zoom);
        
        ctx.drawImage(
          img,
          cropArea.x, cropArea.y, cropArea.width, cropArea.height,
          -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight
        );
        ctx.restore();
      }
    };
    
    img.src = image.src;
  }, [image, cropArea, zoom, rotation]);

  // Download cropped image
  const handleDownload = () => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = cropArea.width;
      canvas.height = cropArea.height;
      
      if (ctx) {
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.scale(zoom, zoom);
        
        ctx.drawImage(
          img,
          cropArea.x, cropArea.y, cropArea.width, cropArea.height,
          -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height
        );
        ctx.restore();
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'cropped-image.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }
        });
      }
    };
    
    img.src = image.src;
  };

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',

    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const headerStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '16px 0'
  };

  const headerContentStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '16px'
  };

  const logoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const logoIconStyle: React.CSSProperties = {
    padding: '10px',
    background: 'linear-gradient(135deg, #071D6A, #4338ca)',
    borderRadius: '12px',
    color: 'white'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 'clamp(18px, 4vw, 24px)',
    fontWeight: '700',
    color: '#1a202c',
    margin: 0
  };

  const toolbarStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(8px, 2vw, 24px)',
    background: 'rgba(248, 250, 252, 0.8)',
    borderRadius: '16px',
    padding: 'clamp(8px, 2vw, 12px) clamp(12px, 3vw, 20px)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    flexWrap: 'wrap'
  };

  const toolbarGroupStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(4px, 1vw, 8px)'
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 'clamp(12px, 2.5vw, 14px)',
    fontWeight: '600',
    color: '#475569',
    whiteSpace: 'nowrap'
  };

  const selectStyle: React.CSSProperties = {
    padding: 'clamp(6px, 1.5vw, 8px) clamp(8px, 2vw, 12px)',
    borderRadius: '8px',
    border: '2px solid rgba(203, 213, 225, 0.5)',
    fontSize: 'clamp(12px, 2.5vw, 14px)',
    fontWeight: '500',
    background: 'white',
    color: '#334155',
    outline: 'none',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    minWidth: '80px'
  };

  const buttonStyle: React.CSSProperties = {
    padding: 'clamp(6px, 1.5vw, 8px)',
    borderRadius: '8px',
    border: 'none',
    background: 'rgba(255, 255, 255, 0.8)',
    color: '#475569',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '36px',
    minHeight: '36px'
  };

  const zoomTextStyle: React.CSSProperties = {
    fontSize: 'clamp(10px, 2vw, 12px)',
    color: '#64748b',
    minWidth: 'clamp(30px, 6vw, 40px)',
    textAlign: 'center',
    fontWeight: '600'
  };

  const mainContentStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: 'clamp(20px, 4vw, 40px) clamp(16px, 3vw, 24px)',
    display: 'grid',
    gridTemplateColumns: window.innerWidth > 768 ? '350px 1fr' : '1fr',
    gap: 'clamp(20px, 4vw, 40px)',
    alignItems: 'start'
  };

  const leftPanelStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(16px, 3vw, 24px)'
  };

  const cardStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    padding: 'clamp(20px, 4vw, 32px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(20px)'
  };

  const cardTitleStyle: React.CSSProperties = {
    fontSize: 'clamp(16px, 3.5vw, 20px)',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 'clamp(16px, 3vw, 24px)'
  };

  const uploadAreaStyle: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'clamp(24px, 5vw, 40px) clamp(16px, 3vw, 20px)',
    border: '3px dashed #cbd5e1',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.8), rgba(241, 245, 249, 0.8))',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    minHeight: 'clamp(120px, 20vw, 160px)'
  };

  const uploadAreaHoverStyle: React.CSSProperties = {
    ...uploadAreaStyle,
    borderColor: '#071D6A',
    background: 'linear-gradient(135deg, rgba(7, 29, 106, 0.05), rgba(67, 56, 202, 0.05))',
    transform: 'translateY(-2px)'
  };

  const uploadIconStyle: React.CSSProperties = {
    color: '#94a3b8',
    marginBottom: 'clamp(8px, 2vw, 16px)',
    transition: 'all 0.3s ease'
  };

  const uploadTextStyle: React.CSSProperties = {
    fontSize: 'clamp(14px, 3vw, 16px)',
    fontWeight: '600',
    color: '#475569',
    marginBottom: '4px',
    textAlign: 'center'
  };

  const uploadSubtextStyle: React.CSSProperties = {
    fontSize: 'clamp(10px, 2vw, 12px)',
    color: '#94a3b8',
    textAlign: 'center'
  };

  const infoStyle: React.CSSProperties = {
    fontSize: 'clamp(12px, 2.5vw, 14px)',
    color: '#64748b',
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(6px, 1.5vw, 8px)'
  };

  const infoRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const previewContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 'clamp(16px, 3vw, 20px)'
  };

  const previewCanvasStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '280px',
    height: 'auto',
    borderRadius: '12px',
    border: '2px solid rgba(203, 213, 225, 0.3)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
  };

  const downloadButtonStyle: React.CSSProperties = {
    width: '100%',
    background: 'linear-gradient(135deg, #071D6A, #4338ca)',
    color: 'white',
    fontWeight: '600',
    padding: 'clamp(12px, 2.5vw, 16px)',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'clamp(6px, 1.5vw, 8px)',
    fontSize: 'clamp(14px, 3vw, 16px)',
    boxShadow: '0 8px 25px rgba(7, 29, 106, 0.3)'
  };

  const downloadButtonHoverStyle: React.CSSProperties = {
    ...downloadButtonStyle,
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 35px rgba(7, 29, 106, 0.4)'
  };

  const rightPanelStyle: React.CSSProperties = {
    ...cardStyle,
    minHeight: 'clamp(400px, 60vh, 600px)'
  };

  const emptyStateStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'clamp(300px, 50vh, 500px)',
    color: '#94a3b8'
  };

  const emptyIconStyle: React.CSSProperties = {
    marginBottom: 'clamp(12px, 3vw, 20px)',
    opacity: 0.6
  };

  const emptyTitleStyle: React.CSSProperties = {
    fontSize: 'clamp(16px, 3.5vw, 20px)',
    fontWeight: '600',
    marginBottom: '8px',
    textAlign: 'center'
  };

  const emptySubtitleStyle: React.CSSProperties = {
    fontSize: 'clamp(12px, 2.5vw, 14px)',
    textAlign: 'center'
  };

  const imageContainerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
    maxWidth: '100%'
  };

  const imageDisplayStyle: React.CSSProperties = {
    width: image ? Math.min(window.innerWidth > 768 ? 700 : window.innerWidth - 80, image.width) : 0,
    height: image ? Math.min(window.innerWidth > 768 ? 500 : 400, image.height) : 0,
    backgroundImage: image ? `url(${image.src})` : undefined,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'relative',
    cursor: 'crosshair',
    minHeight: window.innerWidth <= 768 ? '250px' : 'auto'
  };

  const cropOverlayStyle: React.CSSProperties = {
    position: 'absolute',
    border: '3px solid #071D6A',
    background: 'rgba(7, 29, 106, 0.1)',
    borderRadius: '8px',
    boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.8), 0 8px 25px rgba(7, 29, 106, 0.3)',
    cursor: isDragging && !activeHandle ? 'grabbing' : 'grab'
  };

  const handleStyle: React.CSSProperties = {
    position: 'absolute',
    width: window.innerWidth <= 768 ? '18px' : '14px',
    height: window.innerWidth <= 768 ? '18px' : '14px',
    background: 'linear-gradient(135deg, #071D6A, #4338ca)',
    borderRadius: '50%',
    border: '3px solid white',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.2s ease'
  };

  const handleHoverStyle: React.CSSProperties = {
    ...handleStyle,
    transform: 'scale(1.2)',
    boxShadow: '0 6px 20px rgba(7, 29, 106, 0.4)'
  };

  const moveIconContainerStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgba(7, 29, 106, 0.9)',
    color: 'white',
    padding: window.innerWidth <= 768 ? '6px' : '8px',
    borderRadius: '8px',
    opacity: 0.8,
    pointerEvents: 'none'
  };

  // Responsive grid layout
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update main content style based on screen size
  const responsiveMainContentStyle: React.CSSProperties = {
    ...mainContentStyle,
    gridTemplateColumns: isMobile ? '1fr' : '350px 1fr',
    gridTemplateRows: isMobile ? 'auto auto' : 'none'
  };

  // Mobile-specific adjustments
  const mobileToolbarStyle: React.CSSProperties = {
    ...toolbarStyle,
    order: isMobile ? -1 : 0,
    marginBottom: isMobile ? '16px' : 0,
    justifyContent: 'center'
  };

  const [isUploadHovered, setIsUploadHovered] = useState(false);
  const [isDownloadHovered, setIsDownloadHovered] = useState(false);
  const [hoveredHandle, setHoveredHandle] = useState<string | null>(null);

  return (
    <div style={containerStyle}>
      {/* Header */}
      <header style={headerStyle}>
        <div style={headerContentStyle}>
          <div style={logoStyle}>
            <div style={logoIconStyle}>
              <ImageIcon size={24} />
            </div>
            <h1 style={titleStyle}>CropMaster Pro</h1>
          </div>
          
          {/* Toolbar */}
          {image && (
            <div style={isMobile ? mobileToolbarStyle : toolbarStyle}>
              {/* Aspect Ratio */}
              <div style={toolbarGroupStyle}>
                <label style={labelStyle}>Aspect:</label>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
                  style={selectStyle}
                >
                  <option value="free">Free</option>
                  <option value="1:1">Square</option>
                  <option value="16:9">Widescreen</option>
                </select>
              </div>

              {/* Zoom Controls */}
              <div style={toolbarGroupStyle}>
                <button
                  onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                  style={buttonStyle}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'white'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)'}
                >
                  <ZoomOut size={isMobile ? 18 : 16} />
                </button>
                <span style={zoomTextStyle}>
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                  style={buttonStyle}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'white'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)'}
                >
                  <ZoomIn size={isMobile ? 18 : 16} />
                </button>
              </div>

              {/* Rotate */}
              <button
                onClick={() => setRotation((rotation + 90) % 360)}
                style={buttonStyle}
                onMouseEnter={(e) => e.currentTarget.style.background = 'white'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)'}
              >
                <RotateCw size={isMobile ? 18 : 16} />
              </button>
            </div>
          )}
        </div>
      </header>

      <div style={responsiveMainContentStyle}>
        {/* Left Panel */}
        <div style={leftPanelStyle}>
          <div style={cardStyle}>
            <h2 style={cardTitleStyle}>Upload Image</h2>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              style={isUploadHovered ? uploadAreaHoverStyle : uploadAreaStyle}
              onMouseEnter={() => setIsUploadHovered(true)}
              onMouseLeave={() => setIsUploadHovered(false)}
            >
              <Upload 
                size={isMobile ? 28 : 32} 
                style={{
                  ...uploadIconStyle,
                  color: isUploadHovered ? '#071D6A' : '#94a3b8'
                }} 
              />
              <span style={{
                ...uploadTextStyle,
                color: isUploadHovered ? '#071D6A' : '#475569'
              }}>
                Choose Image
              </span>
              <span style={uploadSubtextStyle}>
                PNG, JPG, GIF up to 10MB
              </span>
            </button>

            {image && (
              <div style={{ marginTop: 'clamp(16px, 3vw, 24px)' }}>
                <div style={infoStyle}>
                  <div style={infoRowStyle}>
                    <span>Original:</span>
                    <span style={{ fontWeight: '600' }}>{image.width} × {image.height}</span>
                  </div>
                  <div style={infoRowStyle}>
                    <span>Crop size:</span>
                    <span style={{ fontWeight: '600' }}>
                      {Math.round(cropArea.width)} × {Math.round(cropArea.height)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Preview */}
          {image && (
            <div style={cardStyle}>
              <h3 style={cardTitleStyle}>Live Preview</h3>
              <div style={previewContainerStyle}>
                <canvas
                  ref={previewCanvasRef}
                  style={previewCanvasStyle}
                />
              </div>
              <button
                onClick={handleDownload}
                style={isDownloadHovered ? downloadButtonHoverStyle : downloadButtonStyle}
                onMouseEnter={() => setIsDownloadHovered(true)}
                onMouseLeave={() => setIsDownloadHovered(false)}
              >
                <Download size={isMobile ? 18 : 20} />
                Download Cropped Image
              </button>
            </div>
          )}
        </div>

        {/* Right Panel - Image Editor */}
        <div style={rightPanelStyle}>
          {!image ? (
            <div style={emptyStateStyle}>
              <ImageIcon size={isMobile ? 48 : 64} style={emptyIconStyle} />
              <p style={emptyTitleStyle}>No image selected</p>
              <p style={emptySubtitleStyle}>Upload an image to start cropping</p>
            </div>
          ) : (
            <div style={imageContainerStyle}>
              <div style={imageDisplayStyle}>
                {/* Crop overlay */}
                <div
                  style={{
                    ...cropOverlayStyle,
                    left: (cropArea.x / image.width) * Math.min(isMobile ? window.innerWidth - 80 : 700, image.width),
                    top: (cropArea.y / image.height) * Math.min(isMobile ? 400 : 500, image.height),
                    width: (cropArea.width / image.width) * Math.min(isMobile ? window.innerWidth - 80 : 700, image.width),
                    height: (cropArea.height / image.height) * Math.min(isMobile ? 400 : 500, image.height)
                  }}
                  onMouseDown={(e) => handleMouseDown(e)}
                >
                  {/* Resize handles */}
                  <div
                    style={{
                      ...(hoveredHandle === 'nw' ? handleHoverStyle : handleStyle),
                      top: isMobile ? '-9px' : '-7px',
                      left: isMobile ? '-9px' : '-7px',
                      cursor: 'nw-resize'
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handleMouseDown(e, 'nw');
                    }}
                    onMouseEnter={() => setHoveredHandle('nw')}
                    onMouseLeave={() => setHoveredHandle(null)}
                  />
                  <div
                    style={{
                      ...(hoveredHandle === 'ne' ? handleHoverStyle : handleStyle),
                      top: isMobile ? '-9px' : '-7px',
                      right: isMobile ? '-9px' : '-7px',
                      cursor: 'ne-resize'
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handleMouseDown(e, 'ne');
                    }}
                    onMouseEnter={() => setHoveredHandle('ne')}
                    onMouseLeave={() => setHoveredHandle(null)}
                  />
                  <div
                    style={{
                      ...(hoveredHandle === 'sw' ? handleHoverStyle : handleStyle),
                      bottom: isMobile ? '-9px' : '-7px',
                      left: isMobile ? '-9px' : '-7px',
                      cursor: 'sw-resize'
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handleMouseDown(e, 'sw');
                    }}
                    onMouseEnter={() => setHoveredHandle('sw')}
                    onMouseLeave={() => setHoveredHandle(null)}
                  />
                  <div
                    style={{
                      ...(hoveredHandle === 'se' ? handleHoverStyle : handleStyle),
                      bottom: isMobile ? '-9px' : '-7px',
                      right: isMobile ? '-9px' : '-7px',
                      cursor: 'se-resize'
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handleMouseDown(e, 'se');
                    }}
                    onMouseEnter={() => setHoveredHandle('se')}
                    onMouseLeave={() => setHoveredHandle(null)}
                  />
                  
                  {/* Move icon */}
                  <div style={moveIconContainerStyle}>
                    <Move size={isMobile ? 14 : 16} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hidden canvas for download */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}

export default CropToolItem;