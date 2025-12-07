import { headers } from "next/headers";
import App from "./App";

export default async function Home() {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;
  const response = await fetch(`${baseUrl}/api/workouts`);
  const { workouts } = await response.json();

  if (response.ok) {
    return <App initialList={workouts} />;
  } else {
    throw "Failed to load workouts";
  }
}
