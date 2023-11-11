import { api } from "./api";

// @ts-ignore
const api_key = process.env.API_KEY;

interface IObservation {
  realtime_start: string;
  realtime_end: string;
  date: string;
  value: string;
}

interface IResponse {
  realtime_start: string;
  realtime_end: string;
  observation_start: string;
  observation_end: string;
  units: string;
  output_type: number;
  file_type: "xml" | "json" | "txt" | "xls";
  order_by: string;
  sort_order: "asc" | "desc";
  count: number;
  offset: number;
  limit: number;
  observations: IObservation[];
}

export const getData = async ({ series_id }: { series_id: string }) => {
  return (
    await api.get<IResponse>(
      `/series/observations?series_id=${series_id}&api_key=${api_key}&observation_start=2003-11-10&frequency=a&file_type=json`
    )
  )?.data;
};
