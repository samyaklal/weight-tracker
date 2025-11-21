import App from "./App";
export default function Home() {
  return (
    <App workoutList={[{ name: "Pushups", sets: 3, reps: 8, weight: 0 }]} />
  );
}
