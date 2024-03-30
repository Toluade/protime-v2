import { twMerge } from "tailwind-merge";
import "./App.css";
// import Clock from "./components/Clock";
// import Timer from "./components/Timer";
import Selector from "./Screens/Selector";

function App() {
  return (
    <div className={twMerge("h-svh w-svw flex justify-center items-center")}>
      {/* <Clock /> */}
      {/* <Timer /> */}
      <Selector />
    </div>
  );
}

export default App;
