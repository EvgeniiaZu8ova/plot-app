import { useEffect, useState } from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { getData } from "../utils/getData";
import { Card } from "./Card";

interface IPlotData {
  date: string;
  GDPCA: number;
}

export const BarChartElement = () => {
  const [plotData, setPlotData] = useState<IPlotData[]>([]);

  useEffect(() => {
    getData({ series_id: "GDPCA" })
      .then(({ observations = [] }) => {
        const modifiedData = observations.map((el) => {
          return {
            date: el.date.slice(0, 4),
            GDPCA: +el.value,
          };
        });

        setPlotData(modifiedData);
      })
      .catch((e) => console.log(e));
  }, []);

  const values = plotData.map((el) => el.GDPCA);

  const minYAxisValue = Math.round(Math.min(...values) / 1000) * 1000 - 1000;
  const maxYAxisValue = Math.round(Math.max(...values) / 1000) * 1000 + 1000;

  return (
    <Card>
      <>
        <h4>Real Gross Domestic Product</h4>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={plotData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[minYAxisValue, maxYAxisValue]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="GDPCA" fill="#6E4C91" />
          </BarChart>
        </ResponsiveContainer>
      </>
    </Card>
  );
};
