import { useEffect, useState } from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  ResponsiveContainer,
} from "recharts";
import { getData } from "../utils/getData";
import { Card } from "./Card";

interface IPlotData {
  date: string;
  T10Y2Y: number;
}

export const AreaChartElement = () => {
  const [plotData, setPlotData] = useState<IPlotData[]>([]);

  useEffect(() => {
    getData({ series_id: "T10Y2Y" })
      .then(({ observations = [] }) => {
        const modifiedData = observations.map((el) => {
          return {
            date: el.date.slice(0, 4),
            T10Y2Y: +el.value,
          };
        });

        setPlotData(modifiedData);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <Card>
      <>
        <h4>
          10-Year Treasury Constant Maturity Minus 2-Year Treasury Constant
          Maturity
        </h4>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={plotData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorT10Y2Y" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0776B5" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0776B5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="T10Y2Y"
              stroke="#0776B5"
              fillOpacity={1}
              fill="url(#colorT10Y2Y)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </>
    </Card>
  );
};
