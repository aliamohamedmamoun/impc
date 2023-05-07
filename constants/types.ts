export type PhenotypeSystem = {
  top_level_mp_term_id: string;
  top_level_mp_term_name: string;
};

export type PhenotypeTerm = {
  mp_term_id: string;
  mp_term_name: string;
};

export type Data = {
  marker_accession_id: string;
  marker_symbol: string;
  top_level_phenotype_term: PhenotypeSystem;
  phenotype_terms: PhenotypeTerm[];
  phenotype_count: number;
  procedures: string[];
};

export type HeatMapData = {
  id: string;
  data: {
    x: string | number;
    y: number | null;
  }[];
};

export type MapType = {
  [id: string]: HeatMapData;
};
