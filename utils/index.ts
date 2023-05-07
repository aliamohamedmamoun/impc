import { Data, HeatMapData, MapType } from '../constants/types';

export const mapDataToHeatMapData = (data: Data[]): HeatMapData[] => {
  let dataMap: MapType = {};
  data.forEach((item: Data) => {
    if (dataMap[item.marker_accession_id]) {
      dataMap[item.marker_accession_id].data.push({
        x: item.top_level_phenotype_term.top_level_mp_term_name,
        y: item.phenotype_count,
      });
    } else {
      dataMap[item.marker_accession_id] = {
        id: item.marker_accession_id,
        data: [
          {
            x: item.top_level_phenotype_term.top_level_mp_term_name,
            y: item.phenotype_count,
          },
        ],
      };
    }
  });
  // const heatMapData: HeatMapData[] = Object.values(dataMap)
  //   .sort(
  //     (a: HeatMapData, b: HeatMapData) =>
  //       b.data.reduce((acc, c) => acc + (c.y || 0), 0) -
  //       a.data.reduce((acc, c) => acc + (c.y || 0), 0)
  //   )
  //   .slice(0, 50);

  //   const heatMapData: HeatMapData[] = data
  //     .map((item: Data) => ({
  //       id: item.marker_accession_id,
  //       data: [
  //         {
  //           x: item.top_level_phenotype_term.top_level_mp_term_name,
  //           y: item.phenotype_count,
  //         },
  //       ],
  //     }))
  //     .slice(0, 50);
  return Object.values(dataMap); //.slice(0, 50);
};

export const mapToMostSignificantPhenotypeHeatMap = (
  data: Data[]
): HeatMapData[] => {
  let dataMap: MapType = {};
  data.forEach((item: Data) => {
    if (dataMap[item.top_level_phenotype_term.top_level_mp_term_name]) {
      dataMap[item.top_level_phenotype_term.top_level_mp_term_name].data.push({
        x: item.top_level_phenotype_term.top_level_mp_term_name,
        y: item.phenotype_count,
      });
    } else {
      dataMap[item.top_level_phenotype_term.top_level_mp_term_name] = {
        id: item.top_level_phenotype_term.top_level_mp_term_name,
        data: [
          {
            x: item.top_level_phenotype_term.top_level_mp_term_name,
            y: item.phenotype_count,
          },
        ],
      };
    }
  });
  return Object.values(dataMap); //.slice(0, 50);
};
