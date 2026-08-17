"use client";

import { useEffect, useState } from "react";

export default function Countdown({
  deadline,
}: {
  deadline: string;
}) {
  const calculateTimeLeft = () => {
    const difference = new Date(deadline).getTime() - Date.now();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        expired: true,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      ),
      minutes: Math.floor(
        (difference / (1000 * 60)) % 60
      ),
      seconds: Math.floor(
        (difference / 1000) % 60
      ),
      expired: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  if (timeLeft.expired) {
    return (
      <div className="mt-10 border border-white/10 bg-white/[0.03] p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
          Order Window
        </p>

        <p className="mt-3 text-3xl font-bold uppercase">
          Orders Closed
        </p>

        <p className="mt-2 text-white/50">
          This personalized order window has ended.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
        Order Window Closes In
      </p>

      <div className="mt-5 grid max-w-2xl grid-cols-4 gap-3">
        <TimeBlock value={timeLeft.days} label="Days" />
        <TimeBlock value={timeLeft.hours} label="Hours" />
        <TimeBlock value={timeLeft.minutes} label="Minutes" />
        <TimeBlock value={timeLeft.seconds} label="Seconds" />
      </div>
    </div>
  );
}

function TimeBlock({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="border border-white/10 bg-white/[0.03] px-4 py-5 text-center">
      <p className="text-3xl font-bold tabular-nums">
        {String(value).padStart(2, "0")}
      </p>

      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/40">
        {label}
      </p>
    </div>
  );
}