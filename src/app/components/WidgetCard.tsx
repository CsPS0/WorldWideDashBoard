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
  theme?: 'default' | 'dark' | 'accent' | 'light';
}
export function WidgetCard({ title, icon: Icon, children, delay = 0, className = '', id, theme = 'default' }: WidgetCardProps) {
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

  let themeClasses = 'bg-surface-card border-border-subtle text-primary';
  let iconBg = 'bg-accent/15 text-accent';
  let titleColor = 'text-primary';

  if (theme === 'dark') {
    themeClasses = '!bg-surface-inset !border-accent/20 text-primary glow-accent';
    iconBg = 'bg-accent/10 text-accent';
    titleColor = 'text-primary';
  } else if (theme === 'accent') {
    themeClasses = 'gradient-border text-primary';
    iconBg = 'bg-accent-warm/15 text-accent-warm';
    titleColor = 'text-primary';
  } else if (theme === 'light') {
    themeClasses = '!bg-surface-card !border-border-default text-primary';
    titleColor = 'text-primary';
  }

  return (
    <div id={id} ref={cardRef} className={`glass-card p-6 flex flex-col h-full opacity-0 scroll-mt-24 ${themeClasses} ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${iconBg}`}>
          <Icon size={20} />
        </div>
        <h3 className={`text-lg font-semibold tracking-wide ${titleColor}`}>{title}</h3>
      </div>
      <div className="grow flex flex-col justify-center min-h-0">
        {children}
      </div>
    </div>
  );
}
