import Link from "next/link";
import { Button } from "flowbite-react";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-5">
      <h2 className="text-5xl font-extrabold">Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
}
