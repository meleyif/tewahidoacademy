'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export default function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeMap = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg' };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className={`relative bg-card rounded-xl shadow-modal w-full ${sizeMap[size]} fade-in`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 id="modal-title" className="text-base font-700 text-foreground">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
