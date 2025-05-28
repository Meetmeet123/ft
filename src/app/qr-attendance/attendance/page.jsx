"use client";
import { useEffect, useRef, useState } from 'react';
import { X, Camera, Expand, Shrink } from 'lucide-react';

export default function QRCodeAttendance() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const containerRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      streamRef.current = stream;
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    streamRef.current = null;
  };

  const toggleCamera = () => {
    if (isCameraActive) {
      stopCamera();
    } else {
      startCamera();
    }
    setIsCameraActive(!isCameraActive);
  };

  const closeModal = () => {
    stopCamera();
    console.log("Close modal clicked");
  };

  useEffect(() => {
    if (isCameraActive) {
      startCamera();
    }
    return () => stopCamera();
  }, []);

  // Add fullscreen change event listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };
  
  return (
    <div className="lg:flex justify-center mt-10 inset-0 md:block" ref={containerRef}>
      <div className={`bg-white w-full ${isFullScreen ? 'h-screen' : 'w-full'} rounded-lg shadow-lg overflow-hidden`}>
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b">
          <h2 className="text-xl font-medium text-gray-800">QR Code Attendance</h2>
          <button onClick={toggleFullScreen} className="text-gray-500 hover:text-gray-700">
            {isFullScreen ? <Shrink size={24} /> : <Expand size={24} />}
          </button>
        </div>

        {/* Content */}
        <div className={`flex flex-col md:flex-row ${isFullScreen ? 'h-full' : ''}`}>
          {/* Left - Scanner */}
          <div className="w-full md:w-1/2 p-4 bg-gray-100">
            <div className="mb-4 text-center">
              <h3 className="text-lg font-medium">Scan Your ID Card QR Code / Barcode</h3>
            </div>
            <div className="relative bg-black aspect-video rounded-md overflow-hidden">
              {isCameraActive ? (
                <>
                  <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    muted
                    playsInline
                  />
                  {/* Frame Corners */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white z-10"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white z-10"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white z-10"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white z-10"></div>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={toggleCamera}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    Enable Camera
                  </button>
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-center">
              <button
                onClick={toggleCamera}
                className="btn btn-primary flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                <Camera size={18} />
                {isCameraActive ? 'Stop Camera' : 'Start Camera'}
              </button>
            </div>
          </div>

          {/* Right - Illustration */}
          <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block">
                <svg className="w-48 h-48 md:w-64 md:h-64 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M8 2v2" />
                  <path d="M16 2v2" />
                  <rect x="8" y="9" width="3" height="3" rx="1" />
                  <path d="M13 9h4" />
                  <path d="M13 12h4" />
                  <path d="M8 15h9" />
                  <path d="M8 18h5" />
                  <path d="M16 18h2" />
                  <path d="M18 15v3" />
                </svg>
              </div>
              <p className="mt-4 text-gray-600">Position your ID card QR code within the frame to scan</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <p className="text-center text-sm text-gray-500">
            Please ensure your ID card is clearly visible and properly aligned
          </p>
        </div>
      </div>
    </div>
  );
}