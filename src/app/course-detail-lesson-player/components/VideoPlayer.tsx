'use client';

import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';

// BACKEND: lesson.content_url from Supabase Storage — HLS stream URL
const VIDEO_SRC = 'https://www.w3schools.com/html/mov_bbb.mp4';
const THUMBNAIL = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=450&fit=crop';
const THUMBNAIL_ALT = 'Open ancient religious manuscript with illuminated text on wooden desk';

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [volume, setVolume] = useState(1);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
      setHasStarted(true);
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setCurrentTime(cur);
    setProgress((cur / dur) * 100);
    // BACKEND: PATCH /api/v1/progress/:lessonId with { watchTimeSec: cur } on interval
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const val = parseFloat(e.target.value);
    const time = (val / 100) * (videoRef.current.duration || 0);
    videoRef.current.currentTime = time;
    setProgress(val);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) videoRef.current.volume = val;
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const skip = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.currentTime + seconds, duration));
  };

  const handleFullscreen = () => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div
      className="relative bg-foreground rounded-xl overflow-hidden group aspect-video"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Thumbnail overlay before play */}
      {!hasStarted && (
        <div className="absolute inset-0 z-10">
          <AppImage
            src={THUMBNAIL}
            alt={THUMBNAIL_ALT}
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center shadow-modal transition-all scale-click"
              aria-label="Play lesson video"
            >
              <Play size={24} className="text-primary-foreground ml-1" />
            </button>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white/90 text-sm font-600 drop-shadow">
              The Holy Trinity in Tewahido Theology · 28 min
            </p>
          </div>
        </div>
      )}

      {/* Video element */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        className="w-full h-full object-cover"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => { setIsPlaying(false); setShowControls(true); }}
        aria-label="Lesson video: The Holy Trinity in Tewahido Theology"
      />

      {/* Controls overlay */}
      <div
        className={`absolute inset-0 flex flex-col justify-end transition-opacity duration-300 ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)' }}
      >
        {/* Center play/pause */}
        {hasStarted && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center transition-all scale-click"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause size={20} className="text-white" />
              ) : (
                <Play size={20} className="text-white ml-0.5" />
              )}
            </button>
          </div>
        )}

        {/* Bottom controls */}
        <div className="px-4 pb-3 space-y-2">
          {/* Progress bar */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-white/80 tabular-nums w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={progress}
              onChange={handleSeek}
              className="flex-1 h-1 accent-accent cursor-pointer"
              aria-label="Video progress"
            />
            <span className="text-xs font-mono text-white/80 tabular-nums w-10">
              {formatTime(duration)}
            </span>
          </div>

          {/* Control buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => skip(-10)}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Skip back 10 seconds"
              >
                <SkipBack size={16} />
              </button>
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause size={14} className="text-white" />
                ) : (
                  <Play size={14} className="text-white ml-0.5" />
                )}
              </button>
              <button
                onClick={() => skip(10)}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Skip forward 10 seconds"
              >
                <SkipForward size={16} />
              </button>

              {/* Volume */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={toggleMute}
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 accent-accent cursor-pointer"
                  aria-label="Volume"
                />
              </div>
            </div>

            <button
              onClick={handleFullscreen}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Enter fullscreen"
            >
              <Maximize size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}