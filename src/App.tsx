import "./App.css";
import { AreaChartElement } from "./components/AreaChartElement";
import { BarChartElement } from "./components/BarChartElement";
import { LineChartElement } from "./components/LineChartElement";

function App() {
  return (
    <div className="content">
      <AreaChartElement />
      <BarChartElement />
      <LineChartElement />
    </div>
  );
}

export default App;
