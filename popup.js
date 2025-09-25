// components/Popup.jsx
import React, { useState, useEffect, useRef } from 'react';

const Popup = ({
  message,
  type = 'info',
  duration = 3000,
  position = 'top-right', // top, top-right, top-center, bottom, bottom-right, bottom-center
  autoDismiss = true,
  onClose,
  showProgress = true,
  icon: customIcon,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(100);
  const timerRef = useRef();
  const animationRef = useRef();

  // Icon mapping
  const getIcon = () => {
    if (customIcon) return customIcon;
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '💬';
    }
  };

  // Clear timers
  const clearTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  };

  // Start progress animation
  const startProgress = () => {
    if (!autoDismiss || !showProgress) return;

    let startTime = Date.now();
    const totalDuration = duration;

    const animateProgress = () => {
      if (isHovered) {
        animationRef.current = requestAnimationFrame(animateProgress);
        return;
      }

      const elapsed = Date.now() - startTime;
      const remaining = totalDuration - elapsed;
      const percent = (remaining / totalDuration) * 100;

      if (percent >= 0) {
        setProgress(percent);
        animationRef.current = requestAnimationFrame(animateProgress);
      } else {
        handleClose();
      }
    };

    animationRef.current = requestAnimationFrame(animateProgress);
  };

  // Show popup
  useEffect(() => {
    if (message) {
      setIsVisible(true);
      setProgress(100);
      startProgress();

      return () => clearTimers();
    }
  }, [message, duration, isHovered]);

  // Auto-dismiss timer
  useEffect(() => {
    if (message && autoDismiss && !isHovered) {
      timerRef.current = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimers();
    }
  }, [message, duration, isHovered, autoDismiss]);

  const handleClose = () => {
    setIsVisible(false);
    clearTimers();
    setTimeout(() => {
      onClose && onClose();
    }, 300); // Match CSS transition duration
  };

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isVisible) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  if (!message) return null;

  return (
    <div 
      className={`popup-overlay ${position} ${isVisible ? 'visible' : ''}`}
      role="alert"
      aria-live="assertive"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`popup ${type} ${isVisible ? 'visible' : ''}`}>
        <div className="popup-body">
          <span className="popup-icon" aria-hidden="true">
            {getIcon()}
          </span>
          <div className="popup-message">{message}</div>
          <button
            className="popup-close"
            onClick={handleClose}
            aria-label="Close notification"
          >
            ×
          </button>
        </div>

        {showProgress && autoDismiss && (
          <div 
            className="popup-progress-bar"
            style={{ 
              width: `${progress}%`,
              animationPlayState: isHovered ? 'paused' : 'running'
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Popup;