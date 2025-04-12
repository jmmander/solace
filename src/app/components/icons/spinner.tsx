import React from "react";
import { IconProps } from './types';

export default function Spinner({ className = "h-12 w-12" }: IconProps) {
  return (
    <div className="relative">
      <div className={`${className} rounded-full border-4 border-primary/30 border-t-primary animate-spin`}></div>
    </div>
  );
}