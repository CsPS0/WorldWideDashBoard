"use client";

import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { LucideIcon } from 'lucide-react';

interface WidgetCardProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  delay?: number;
  className?: string;
  id?: string;
}

export function WidgetCard({ title, icon: Icon, children, delay = 0, className = '', id }: WidgetCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      animate(cardRef.current, {
        translateY: [20, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 800,
        delay: delay,
      });
    }
  }, [delay]);

  return (
    <div id={id} ref={cardRef} className={`glass-card p-6 flex flex-col h-full opacity-0 scroll-mt-24 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-orange/20 text-orange rounded-lg">
          <Icon size={20} />
        </div>
        <h3 className="text-lg font-semibold text-white tracking-wide">{title}</h3>
      </div>
      <div className="grow flex flex-col justify-center min-h-0">
        {children}
      </div>
    </div>
  );
}
