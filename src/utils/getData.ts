import { api } from "./api";

// @ts-ignore
const api_key = process.env.API_KEY;

interface ISeriess {
  id: string;
  realtime_start: string;
  realtime_end: string;
  title: string;
  observation_start: string;
  observation_end: string;
  frequency: string;
  frequency_short: string;
  units: string;
  units_short: string;
  seasonal_adjustment: string;
  seasonal_adjustment_short: string;
  last_updated: string;
  popularity: number;
  notes: string;
}

export interface IResponse {
  realtime_start: string;
  realtime_end: string;
  seriess: ISeriess[];
}

export const getData = async ({ series_id }: { series_id: string }) => {
  return (
    await api.get<IResponse>(
      `/series?series_id=${series_id}&api_key=${api_key}&file_type=json`
    )
  )?.data;
};
