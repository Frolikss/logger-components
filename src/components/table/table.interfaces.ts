import { ReactNode } from 'react';

export interface ColumnItem<T> {
  id: string;
  accessor: keyof T;
  header: string;
  cell: (item: T[keyof T]) => ReactNode;
}
