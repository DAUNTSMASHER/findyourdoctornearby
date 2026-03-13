"use client";

interface LoadingProgressBarProps {
  className?: string;
}

export function LoadingProgressBar({ className = "" }: LoadingProgressBarProps) {
  return (
    <div className={`w-full overflow-hidden rounded-full bg-teal-100 ${className}`.trim()}>
      <div
        className="h-2 animate-loading-progress rounded-full bg-teal-500"
        role="progressbar"
        aria-valuenow={60}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
