export interface IRunReportResponse {
  rows?: IRow[];
}

export interface IRow {
  dimensionValues?: IDimensionValue[];
  metricValues?: IMetricValue[];
}

export interface IDimensionValue {
  value?: string;
}

export interface IMetricValue {
  value?: string;
}
