import React, { useState, useRef } from 'react';
import './ImageComparison.css';

const ImageComparison = ({ children }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  
  const images = React.Children.toArray(children);
  const beforeImage = images[0]?.props;
  const afterImage = images[1]?.props;

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const containerWidth = rect.width;
      const percentage = Math.min(Math.max((x / containerWidth) * 100, 0), 100);
      setSliderPosition(percentage);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="comparison-container"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
    >
      {/* After image */}
      <div className="image-container">
        <img
          src={afterImage?.src}
          alt={afterImage?.label || "After"}
          className="comparison-image"
        />
        <div className="label label-after">After</div>
      </div>

      {/* Before image */}
      <div 
        className="image-container"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
        }}
      >
        <img
          src={beforeImage?.src}
          alt={beforeImage?.label || "Before"}
          className="comparison-image"
        />
        <div className="label label-before">Before</div>
      </div>

      {/* Slider */}
      <div 
        className="slider"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
      >
        <div className="slider-button">
          ⇄
        </div>
      </div>
    </div>
  );
};

export default ImageComparison;