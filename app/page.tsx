import { headers } from "next/headers";
import App from "./App";

export default async function Home() {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;
  const response = await fetch(`${baseUrl}/api/workouts`);

  if (response.ok) {
    return <App initialList={await response.json()} />;
  } else {
    throw "Failed to load workouts";
  }
}
