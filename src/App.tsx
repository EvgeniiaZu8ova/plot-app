import { useEffect, useState } from "react";
import "./App.css";
import { IResponse, getData } from "./utils/getData";

const T10Y2Y = "T10Y2Y";
const GDPCA = "GDPCA";
const DGS10 = "DGS10";
const T10YIE = "T10YIE";

// @ts-ignore
const api_key = process.env.API_KEY;

function App() {
  const [data_T10Y2Y, setData_T10Y2Y] = useState<IResponse | null>(null);
  const [data_GDPCA, setData_GDPCA] = useState<IResponse | null>(null);
  const [data_DGS10, setData_DGS10] = useState<IResponse | null>(null);
  const [data_T10YIE, setData_T10YIE] = useState<IResponse | null>(null);

  useEffect(() => {
    Promise.all([
      getData({ series_id: T10Y2Y }),
      getData({ series_id: GDPCA }),
      getData({ series_id: DGS10 }),
      getData({ series_id: T10YIE }),
    ])
      .then((res) => {
        setData_T10Y2Y(res[0]);
        setData_GDPCA(res[1]);
        setData_DGS10(res[2]);
        setData_T10YIE(res[3]);
      })
      .catch((e) => console.log(e));
  }, []);

  return <></>;
}

export default App;
