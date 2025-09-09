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
type ResizeHandle = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w';

const CropToolItem: React.FC = () => {
  const [image, setImage] = useState<ImageData | null>(null);
  const [cropArea, setCropArea] = useState<CropArea>({ x: 0, y: 0, width: 200, height: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, cropStart: { x: 0, y: 0, width: 0, height: 0 } });
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('free');
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [activeHandle, setActiveHandle] = useState<ResizeHandle | 'move' | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const MIN_CROP_SIZE = 50;

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
  const applyAspectRatio = useCallback((newCropArea: CropArea, handle: ResizeHandle | 'move' | null): CropArea => {
    if (aspectRatio === 'free' || !handle || handle === 'move') return newCropArea;
    
    const ratio = aspectRatio === '1:1' ? 1 : 16/9;
    
    // For corner handles, adjust both dimensions
    if (['nw', 'ne', 'se', 'sw'].includes(handle)) {
      const currentRatio = newCropArea.width / newCropArea.height;
      
      if (currentRatio > ratio) {
        const newWidth = newCropArea.height * ratio;
        return { ...newCropArea, width: newWidth };
      } else {
        const newHeight = newCropArea.width / ratio;
        return { ...newCropArea, height: newHeight };
      }
    }
    
    // For edge handles, adjust the other dimension to maintain ratio
    if (['n', 's'].includes(handle)) {
      const newWidth = newCropArea.height * ratio;
      return { ...newCropArea, width: newWidth };
    }
    
    if (['e', 'w'].includes(handle)) {
      const newHeight = newCropArea.width / ratio;
      return { ...newCropArea, height: newHeight };
    }
    
    return newCropArea;
  }, [aspectRatio]);

  // Constrain crop area to image bounds
  const constrainToImage = useCallback((cropArea: CropArea): CropArea => {
    if (!image) return cropArea;
    
    const constrained = { ...cropArea };
    
    // Ensure minimum size
    constrained.width = Math.max(MIN_CROP_SIZE, constrained.width);
    constrained.height = Math.max(MIN_CROP_SIZE, constrained.height);
    
    // Keep within image bounds
    constrained.x = Math.max(0, Math.min(image.width - constrained.width, constrained.x));
    constrained.y = Math.max(0, Math.min(image.height - constrained.height, constrained.y));
    constrained.width = Math.min(image.width - constrained.x, constrained.width);
    constrained.height = Math.min(image.height - constrained.y, constrained.height);
    
    return constrained;
  }, [image]);

  // Get position from mouse or touch event
  const getClientPosition = useCallback((e: MouseEvent | TouchEvent) => {
    if ('touches' in e) {
      return {
        clientX: e.touches[0]?.clientX || 0,
        clientY: e.touches[0]?.clientY || 0
      };
    }
    return {
      clientX: e.clientX,
      clientY: e.clientY
    };
  }, []);

  // Get mouse/touch position relative to image
  const getImageRelativePosition = useCallback((clientX: number, clientY: number) => {
    if (!image || !containerRef.current) return { x: 0, y: 0 };
    
    const rect = containerRef.current.getBoundingClientRect();
    const isMobile = window.innerWidth <= 768;
    const displayWidth = Math.min(isMobile ? window.innerWidth - 80 : 700, image.width);
    const displayHeight = Math.min(isMobile ? 400 : 500, image.height);
    
    const scaleX = image.width / displayWidth;
    const scaleY = image.height / displayHeight;
    
    const relativeX = (clientX - rect.left) * scaleX;
    const relativeY = (clientY - rect.top) * scaleY;
    
    return { x: relativeX, y: relativeY };
  }, [image]);

  // Handle resize start (both mouse and touch)
  const handleResizeStart = useCallback((e: React.MouseEvent | React.TouchEvent, handle: ResizeHandle | 'move') => {
    if (!image) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragging(true);
    setActiveHandle(handle);
    
    const { clientX, clientY } = getClientPosition(e.nativeEvent);
    const { x: mouseX, y: mouseY } = getImageRelativePosition(clientX, clientY);
    
    setDragStart({
      x: mouseX,
      y: mouseY,
      cropStart: { ...cropArea }
    });
  }, [image, cropArea, getClientPosition, getImageRelativePosition]);

  // Handle mouse/touch move for resizing
  const handleMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging || !image || !activeHandle) return;

    e.preventDefault();
    
    const { clientX, clientY } = getClientPosition(e);
    const { x: mouseX, y: mouseY } = getImageRelativePosition(clientX, clientY);
    const deltaX = mouseX - dragStart.x;
    const deltaY = mouseY - dragStart.y;
    const { cropStart } = dragStart;

    let newCropArea = { ...cropStart };

    if (activeHandle === 'move') {
      newCropArea.x = cropStart.x + deltaX;
      newCropArea.y = cropStart.y + deltaY;
    } else {
      // Handle resizing based on active handle
      switch (activeHandle) {
        case 'nw': // Top-left corner
          newCropArea.x = cropStart.x + deltaX;
          newCropArea.y = cropStart.y + deltaY;
          newCropArea.width = cropStart.width - deltaX;
          newCropArea.height = cropStart.height - deltaY;
          break;
          
        case 'n': // Top edge
          newCropArea.y = cropStart.y + deltaY;
          newCropArea.height = cropStart.height - deltaY;
          break;
          
        case 'ne': // Top-right corner
          newCropArea.y = cropStart.y + deltaY;
          newCropArea.width = cropStart.width + deltaX;
          newCropArea.height = cropStart.height - deltaY;
          break;
          
        case 'e': // Right edge
          newCropArea.width = cropStart.width + deltaX;
          break;
          
        case 'se': // Bottom-right corner
          newCropArea.width = cropStart.width + deltaX;
          newCropArea.height = cropStart.height + deltaY;
          break;
          
        case 's': // Bottom edge
          newCropArea.height = cropStart.height + deltaY;
          break;
          
        case 'sw': // Bottom-left corner
          newCropArea.x = cropStart.x + deltaX;
          newCropArea.width = cropStart.width - deltaX;
          newCropArea.height = cropStart.height + deltaY;
          break;
          
        case 'w': // Left edge
          newCropArea.x = cropStart.x + deltaX;
          newCropArea.width = cropStart.width - deltaX;
          break;
      }
    }

    // Apply constraints and update
    const constrainedArea = constrainToImage(applyAspectRatio(newCropArea, activeHandle));
    setCropArea(constrainedArea);
  }, [isDragging, image, activeHandle, dragStart, constrainToImage, applyAspectRatio, getImageRelativePosition, getClientPosition]);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
    setActiveHandle(null);
  }, []);

  useEffect(() => {
    if (isDragging) {
      // Add both mouse and touch event listeners
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleMove, { passive: false });
      document.addEventListener('touchend', handleEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('touchend', handleEnd);
      };
    }
  }, [isDragging, handleMove, handleEnd]);

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

  // Get display dimensions and scaling
  const getDisplayDimensions = useCallback(() => {
    if (!image) return { width: 0, height: 0, scaleX: 1, scaleY: 1 };
    
    const isMobile = window.innerWidth <= 768;
    const maxWidth = isMobile ? window.innerWidth - 80 : 700;
    const maxHeight = isMobile ? 400 : 500;
    
    const displayWidth = Math.min(maxWidth, image.width);
    const displayHeight = Math.min(maxHeight, image.height);
    
    return {
      width: displayWidth,
      height: displayHeight,
      scaleX: displayWidth / image.width,
      scaleY: displayHeight / image.height
    };
  }, [image]);

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

  const { width: displayWidth, height: displayHeight, scaleX, scaleY } = getDisplayDimensions();

  const imageDisplayStyle: React.CSSProperties = {
    width: displayWidth,
    height: displayHeight,
    backgroundImage: image ? `url(${image.src})` : undefined,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'relative',
    cursor: isDragging ? (activeHandle === 'move' ? 'grabbing' : 'grabbing') : 'crosshair',
    minHeight: window.innerWidth <= 768 ? '250px' : 'auto',
    userSelect: 'none',
    touchAction: 'none' // Important for touch devices
  };

  // Calculate crop overlay position and size in display coordinates
  const cropDisplayX = cropArea.x * scaleX;
  const cropDisplayY = cropArea.y * scaleY;
  const cropDisplayWidth = cropArea.width * scaleX;
  const cropDisplayHeight = cropArea.height * scaleY;

  const cropOverlayStyle: React.CSSProperties = {
    position: 'absolute',
    left: cropDisplayX,
    top: cropDisplayY,
    width: cropDisplayWidth,
    height: cropDisplayHeight,
    border: '3px solid #071D6A',
    background: 'rgba(7, 29, 106, 0.1)',
    borderRadius: '8px',
    boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.8), 0 8px 25px rgba(7, 29, 106, 0.3)',
    cursor: isDragging && activeHandle === 'move' ? 'grabbing' : 'grab',
    touchAction: 'none'
  };

  const handleSize = window.innerWidth <= 768 ? 20 : 16;
  const handleOffset = handleSize / 2;

  const baseHandleStyle: React.CSSProperties = {
    position: 'absolute',
    width: `${handleSize}px`,
    height: `${handleSize}px`,
    background: 'linear-gradient(135deg, #071D6A, #4338ca)',
    borderRadius: '50%',
    border: '3px solid white',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    touchAction: 'none'
  };

  const edgeHandleStyle: React.CSSProperties = {
    position: 'absolute',
    background: 'linear-gradient(135deg, #071D6A, #4338ca)',
    border: '2px solid white',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    touchAction: 'none'
  };

  const moveIconContainerStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgba(7, 29, 106, 0.9)',
    color: 'white',
    padding: window.innerWidth <= 768 ? '8px' : '8px',
    borderRadius: '8px',
    opacity: activeHandle === 'move' ? 1 : 0.8,
    pointerEvents: 'none',
    transition: 'opacity 0.2s ease'
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
  const [hoveredHandle, setHoveredHandle] = useState<ResizeHandle | null>(null);

  // Handle crop area move with both mouse and touch
  const handleCropAreaInteraction = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!image) return;
    
    const { clientX, clientY } = getClientPosition(e.nativeEvent);
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = (clientX - rect.left) / scaleX;
    const y = (clientY - rect.top) / scaleY;
    
    // Check if interaction is inside crop area for moving
    if (x >= cropArea.x && x <= cropArea.x + cropArea.width &&
        y >= cropArea.y && y <= cropArea.y + cropArea.height) {
      handleResizeStart(e, 'move');
    }
  }, [image, scaleX, cropArea, handleResizeStart, getClientPosition]);

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
              <div 
                ref={containerRef}
                style={imageDisplayStyle}
                onMouseDown={handleCropAreaInteraction}
                onTouchStart={handleCropAreaInteraction}
              >
                {/* Crop overlay */}
                <div style={cropOverlayStyle}>
                  {/* Corner handles */}
                  <div
                    style={{
                      ...baseHandleStyle,
                      top: `-${handleOffset}px`,
                      left: `-${handleOffset}px`,
                      cursor: 'nw-resize',
                      transform: hoveredHandle === 'nw' ? 'scale(1.3)' : 'scale(1)',
                      zIndex: 10
                    }}
                    onMouseDown={(e) => handleResizeStart(e, 'nw')}
                    onTouchStart={(e) => handleResizeStart(e, 'nw')}
                    onMouseEnter={() => setHoveredHandle('nw')}
                    onMouseLeave={() => setHoveredHandle(null)}
                  />
                  <div
                    style={{
                      ...baseHandleStyle,
                      top: `-${handleOffset}px`,
                      right: `-${handleOffset}px`,
                      cursor: 'ne-resize',
                      transform: hoveredHandle === 'ne' ? 'scale(1.3)' : 'scale(1)',
                      zIndex: 10
                    }}
                    onMouseDown={(e) => handleResizeStart(e, 'ne')}
                    onTouchStart={(e) => handleResizeStart(e, 'ne')}
                    onMouseEnter={() => setHoveredHandle('ne')}
                    onMouseLeave={() => setHoveredHandle(null)}
                  />
                  <div
                    style={{
                      ...baseHandleStyle,
                      bottom: `-${handleOffset}px`,
                      right: `-${handleOffset}px`,
                      cursor: 'se-resize',
                      transform: hoveredHandle === 'se' ? 'scale(1.3)' : 'scale(1)',
                      zIndex: 10
                    }}
                    onMouseDown={(e) => handleResizeStart(e, 'se')}
                    onTouchStart={(e) => handleResizeStart(e, 'se')}
                    onMouseEnter={() => setHoveredHandle('se')}
                    onMouseLeave={() => setHoveredHandle(null)}
                  />
                  <div
                    style={{
                      ...baseHandleStyle,
                      bottom: `-${handleOffset}px`,
                      left: `-${handleOffset}px`,
                      cursor: 'sw-resize',
                      transform: hoveredHandle === 'sw' ? 'scale(1.3)' : 'scale(1)',
                      zIndex: 10
                    }}
                    onMouseDown={(e) => handleResizeStart(e, 'sw')}
                    onTouchStart={(e) => handleResizeStart(e, 'sw')}
                    onMouseEnter={() => setHoveredHandle('sw')}
                    onMouseLeave={() => setHoveredHandle(null)}
                  />

                  {/* Edge handles */}
                  {/* Top edge */}
                  <div
                    style={{
                      ...edgeHandleStyle,
                      top: `-4px`,
                      left: '20%',
                      width: '60%',
                      height: isMobile ? '12px' : '8px',
                      borderRadius: '4px',
                      cursor: 'n-resize',
                      transform: hoveredHandle === 'n' ? 'scaleY(1.5)' : 'scaleY(1)',
                      zIndex: 9
                    }}
                    onMouseDown={(e) => handleResizeStart(e, 'n')}
                    onTouchStart={(e) => handleResizeStart(e, 'n')}
                    onMouseEnter={() => setHoveredHandle('n')}
                    onMouseLeave={() => setHoveredHandle(null)}
                  />
                  
                  {/* Right edge */}
                  <div
                    style={{
                      ...edgeHandleStyle,
                      right: `-4px`,
                      top: '20%',
                      width: isMobile ? '12px' : '8px',
                      height: '60%',
                      borderRadius: '4px',
                      cursor: 'e-resize',
                      transform: hoveredHandle === 'e' ? 'scaleX(1.5)' : 'scaleX(1)',
                      zIndex: 9
                    }}
                    onMouseDown={(e) => handleResizeStart(e, 'e')}
                    onTouchStart={(e) => handleResizeStart(e, 'e')}
                    onMouseEnter={() => setHoveredHandle('e')}
                    onMouseLeave={() => setHoveredHandle(null)}
                  />
                  
                  {/* Bottom edge */}
                  <div
                    style={{
                      ...edgeHandleStyle,
                      bottom: `-4px`,
                      left: '20%',
                      width: '60%',
                      height: isMobile ? '12px' : '8px',
                      borderRadius: '4px',
                      cursor: 's-resize',
                      transform: hoveredHandle === 's' ? 'scaleY(1.5)' : 'scaleY(1)',
                      zIndex: 9
                    }}
                    onMouseDown={(e) => handleResizeStart(e, 's')}
                    onTouchStart={(e) => handleResizeStart(e, 's')}
                    onMouseEnter={() => setHoveredHandle('s')}
                    onMouseLeave={() => setHoveredHandle(null)}
                  />
                  
                  {/* Left edge */}
                  <div
                    style={{
                      ...edgeHandleStyle,
                      left: `-4px`,
                      top: '20%',
                      width: isMobile ? '12px' : '8px',
                      height: '60%',
                      borderRadius: '4px',
                      cursor: 'w-resize',
                      transform: hoveredHandle === 'w' ? 'scaleX(1.5)' : 'scaleX(1)',
                      zIndex: 9
                    }}
                    onMouseDown={(e) => handleResizeStart(e, 'w')}
                    onTouchStart={(e) => handleResizeStart(e, 'w')}
                    onMouseEnter={() => setHoveredHandle('w')}
                    onMouseLeave={() => setHoveredHandle(null)}
                  />
                  
                  {/* Move icon */}
                  <div style={moveIconContainerStyle}>
                    <Move size={isMobile ? 16 : 16} />
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
};

export default CropToolItem;