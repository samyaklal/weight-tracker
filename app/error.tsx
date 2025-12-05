"use client";
import { Button } from "flowbite-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-5">
      <h2 className="text-5xl font-extrabold">Something went wrong!</h2>
      <p>{error.message}</p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
