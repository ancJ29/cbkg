export type DataGridColumnProps = {
  key: string;
  header?: string;
  width?: number;
  renderCell?: (record: unknown) => string | number | React.ReactNode;
};

export type DataGridColumnGeneratorProps = (
  tableWidth: number,
) => DataGridColumnProps[];

export type LayoutConfigProps = {
  width?: number;
  header?: string;
};
