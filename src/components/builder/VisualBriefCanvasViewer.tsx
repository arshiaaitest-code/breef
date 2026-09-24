import React, { useState, useRef, useEffect } from 'react';
import { VisualBriefData } from '../../types/brief';
import websiteImg from '../../assets/images/service_website_editorial_1790256432316.jpg';

interface VisualBriefCanvasViewerProps {
  briefData: VisualBriefData;
  className?: string;
}

export const VisualBriefCanvasViewer: React.FC<VisualBriefCanvasViewerProps> = ({
  briefData,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0.6);

  const canvasWidth = briefData.resolution?.width || 1280;
  const canvasHeight = briefData.resolution?.height || 800;

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        if (width > 0) {
          const computedScale = width / canvasWidth;
          setScale(computedScale);
        }
      }
    };

    updateScale();

    let resizeObserver: ResizeObserver | null = null;
    if (containerRef.current && window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        updateScale();
      });
      resizeObserver.observe(containerRef.current);
    } else {
      window.addEventListener('resize', updateScale);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', updateScale);
      }
    };
  }, [canvasWidth]);

  return (
    <div ref={containerRef} className={`w-full overflow-hidden ${className}`}>
      {/* Outer Scaled Neo-Brutalist Frame */}
      <div
        style={{
          width: `${canvasWidth * scale}px`,
          height: `${canvasHeight * scale}px`,
          position: 'relative',
        }}
        className="mx-auto rounded-2xl border-3 border-black shadow-[6px_6px_0px_#000] overflow-hidden bg-white select-none transition-all"
      >
        {/* Scaled Artboard Canvas */}
        <div
          style={{
            width: `${canvasWidth}px`,
            height: `${canvasHeight}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            backgroundColor: briefData.backgroundColor || '#FAF7EF',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          className="canvas-grid-pattern relative select-none pointer-events-none"
        >
          {briefData.elements.map((el) => (
            <div
              key={el.id}
              style={{
                position: 'absolute',
                left: `${el.x}px`,
                top: `${el.y}px`,
                width: `${el.width}px`,
                height: `${el.height}px`,
                transform: el.rotation ? `rotate(${el.rotation}deg)` : undefined,
                zIndex: el.zIndex || 10,
              }}
              className="select-none"
            >
              {/* Washi Tape */}
              {el.hasTape && <div className="washi-tape washi-tape-pink font-mono text-[8px] font-bold text-center flex items-center justify-center">SPEC</div>}

              {/* Pin for Note */}
              {el.type === 'note' && <div className="paper-pin" />}

              {/* Element Type: Navbar */}
              {el.type === 'navbar' && (
                <div
                  style={{
                    backgroundColor: el.secondaryColor || '#FFFFFF',
                    color: el.color || '#000000',
                    borderRadius: `${el.borderRadius ?? 8}px`,
                  }}
                  className="w-full h-full px-6 border-2 border-black flex items-center justify-between shadow-[2px_2px_0px_#000] font-editorial-sans"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#FF2A85] border border-black" />
                    <span className="font-black tracking-wider text-sm font-display uppercase">
                      {el.content}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono font-bold text-black/70">
                    <span>{el.subtitle}</span>
                    <span className="px-3 py-1 rounded-full bg-black text-[#E8FF54] text-[10px] font-black uppercase">
                      ACTION
                    </span>
                  </div>
                </div>
              )}

              {/* Element Type: Hero */}
              {el.type === 'hero' && (
                <div
                  style={{
                    backgroundColor: el.secondaryColor || '#FFFFFF',
                    color: el.color || '#000000',
                    borderRadius: `${el.borderRadius ?? 16}px`,
                  }}
                  className="w-full h-full p-8 border-2 border-black flex flex-col justify-between shadow-[3px_3px_0px_#000]"
                >
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-mono font-black tracking-widest uppercase mb-3 text-black">
                      <span className="w-2 h-2 rounded-full bg-[#FF2A85] border border-black" />
                      <span>INDEX // 01 · POP EDITORIAL</span>
                    </div>
                    <h2
                      style={{ fontSize: `${el.fontSize || 34}px` }}
                      className="font-black font-display leading-[1.08] text-black text-balance uppercase tracking-tight"
                    >
                      {el.content}
                    </h2>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t-2 border-black">
                    <p className="text-xs text-black/80 font-editorial-serif italic max-w-lg">
                      {el.subtitle}
                    </p>
                    <span className="px-4 py-2 rounded-full bg-[#FF2A85] text-white text-xs font-black uppercase tracking-wider border border-black shadow-[1.5px_1.5px_0px_#000]">
                      START →
                    </span>
                  </div>
                </div>
              )}

              {/* Element Type: Text */}
              {el.type === 'text' && (
                <div
                  style={{
                    color: el.color || '#000000',
                    fontSize: `${el.fontSize || 28}px`,
                    textAlign: el.textAlign || 'left',
                  }}
                  className={`w-full h-full flex items-center font-black leading-tight uppercase tracking-tight ${
                    el.fontStyle === 'serif' ? 'font-editorial-serif' : 'font-display'
                  }`}
                >
                  {el.content}
                </div>
              )}

              {/* Element Type: Image */}
              {el.type === 'image' && (
                <div
                  style={{ borderRadius: `${el.borderRadius ?? 12}px` }}
                  className="w-full h-full overflow-hidden border-2 border-black relative bg-stone-200 flex flex-col shadow-[3px_3px_0px_#000]"
                >
                  <img
                    src={el.content || websiteImg}
                    alt="visual reference"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {el.subtitle && (
                    <div className="absolute bottom-0 inset-x-0 bg-black/85 backdrop-blur-xs p-2.5 text-[11px] font-mono font-bold text-white/95">
                      {el.subtitle}
                    </div>
                  )}
                </div>
              )}

              {/* Element Type: Palette */}
              {el.type === 'palette' && (
                <div
                  style={{
                    backgroundColor: el.secondaryColor || '#FAF7EF',
                    borderRadius: `${el.borderRadius ?? 12}px`,
                  }}
                  className="w-full h-full p-4 border-2 border-black flex flex-col justify-between shadow-[3px_3px_0px_#000]"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-9 h-9 rounded-full border-2 border-black shadow-[1.5px_1.5px_0px_#000]"
                      style={{ backgroundColor: el.color || '#FF2A85' }}
                    />
                    <span
                      className="w-9 h-9 rounded-full border-2 border-black shadow-[1.5px_1.5px_0px_#000]"
                      style={{ backgroundColor: '#0D0D0D' }}
                    />
                    <span
                      className="w-9 h-9 rounded-full border-2 border-black shadow-[1.5px_1.5px_0px_#000]"
                      style={{ backgroundColor: '#E8FF54' }}
                    />
                    <span
                      className="w-9 h-9 rounded-full border-2 border-black shadow-[1.5px_1.5px_0px_#000]"
                      style={{ backgroundColor: '#FFFFFF' }}
                    />
                  </div>
                  <span className="text-[11px] font-mono font-black text-black uppercase tracking-tight">
                    {el.content || 'PALETTE SPEC.'}
                  </span>
                </div>
              )}

              {/* Element Type: Card */}
              {el.type === 'card' && (
                <div
                  style={{
                    backgroundColor: el.secondaryColor || '#FFFFFF',
                    color: el.color || '#000000',
                    borderRadius: `${el.borderRadius ?? 12}px`,
                    fontSize: `${el.fontSize || 13}px`,
                  }}
                  className="w-full h-full p-5 border-2 border-black shadow-[3px_3px_0px_#000] flex flex-col justify-between whitespace-pre-line leading-relaxed font-sans"
                >
                  {el.subtitle && (
                    <span className="text-[10px] font-mono font-black text-[#FF2A85] uppercase tracking-wider block mb-1">
                      {el.subtitle}
                    </span>
                  )}
                  <span className="flex-1 font-bold text-black">{el.content}</span>
                  <span className="text-[10px] font-mono font-black text-black/60 uppercase tracking-wider mt-2 pt-2 border-t border-black">
                    ✦ THE ART 24 // SPEC
                  </span>
                </div>
              )}

              {/* Element Type: Button */}
              {el.type === 'button' && (
                <div
                  style={{
                    backgroundColor: el.secondaryColor || '#0D0D0D',
                    color: el.color || '#FFFFFF',
                    borderRadius: `${el.borderRadius ?? 999}px`,
                    fontSize: `${el.fontSize || 13}px`,
                  }}
                  className="w-full h-full flex items-center justify-center font-black uppercase tracking-wider shadow-[3px_3px_0px_#000] border-2 border-black px-5"
                >
                  {el.content}
                </div>
              )}

              {/* Element Type: Sticky Note */}
              {el.type === 'note' && (
                <div
                  style={{
                    backgroundColor: el.secondaryColor || '#E8FF54',
                    color: el.color || '#000000',
                    borderRadius: `${el.borderRadius ?? 10}px`,
                    fontSize: `${el.fontSize || 13}px`,
                  }}
                  className="w-full h-full p-5 border-2 border-black shadow-[4px_4px_0px_#000] flex flex-col justify-between whitespace-pre-line leading-relaxed font-sans font-bold"
                >
                  <span>{el.content}</span>
                  <span className="text-[10px] font-mono font-black text-black/60 uppercase">
                    CLIENT VISION NOTE
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
