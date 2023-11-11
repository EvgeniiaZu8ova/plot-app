import { useEffect, useState } from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";
import { getData } from "../utils/getData";
import { Card } from "./Card";

interface IPlotData {
  date: string;
  "DGS10 - T10YIE": number;
}

export const LineChartElement = () => {
  const [plotData, setPlotData] = useState<IPlotData[]>([]);

  useEffect(() => {
    Promise.all([
      getData({ series_id: "DGS10" }),
      getData({ series_id: "T10YIE" }),
    ])
      .then(
        ([
          { observations: data_DGS10 = [] },
          { observations: data_T10YIE = [] },
        ]) => {
          const modifiedData = data_DGS10.map((DGS10) => {
            const T10YIE_value = +(
              data_T10YIE.find((T10YIE) => {
                return T10YIE.date === DGS10.date;
              })?.value ?? 0
            );

            return {
              date: DGS10.date.slice(0, 4),
              "DGS10 - T10YIE": +(+DGS10.value - T10YIE_value).toFixed(2),
            };
          });

          setPlotData(modifiedData);
        }
      )
      .catch((e) => console.log(e));
  }, []);

  return (
    <Card>
      <>
        <h5>
          Difference between Market Yield on U.S. Treasury Securities at 10-Year
          Constant Maturity, Quoted on an Investment Basis (DGS10) and 10-Year
          Breakeven Inflation Rate(T10YIE)
        </h5>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={plotData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="DGS10 - T10YIE" stroke="#18A44D" />
          </LineChart>
        </ResponsiveContainer>
      </>
    </Card>
  );
};
