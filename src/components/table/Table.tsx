import React, { Dispatch, Fragment, ReactNode, SetStateAction, useEffect, useState } from 'react';

import { ColumnItem } from './table.interfaces';
import './table.css';

interface Props<T> {
  data: T[];
  columns: ColumnItem<T>[];
  hasDropDown?: boolean;
  dropDownContent?: ReactNode[];
  setSelectedRow?: Dispatch<SetStateAction<number>>;
}

export const Table = <T extends { id: string }>({
  data,
  columns,
  hasDropDown,
  dropDownContent,
  setSelectedRow
}: Props<T>) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const onRowClick = (selectedItem: number) => () => {
    if (setSelectedRow) {
      setSelectedRow(selectedItem);
    }

    if (hasDropDown) {
      setSelectedIndex((previousIndex) => (previousIndex === selectedItem ? -1 : selectedItem));
    }
  };

  useEffect(() => {
    setSelectedIndex(-1);
  }, [data]);

  if (!data) return null;
  return (
    <table className="w-full select-none">
      <thead
        className="text-xs text-xs 2xl:text-xl"
        style={{
          backgroundColor: '#EBF1FC'
        }}>
        <tr>
          {columns.map(({ id, header }) => (
            <th
              key={id}
              className="first:rounded-l-md last:rounded-r-md text-left font-medium"
              style={{
                padding: '1rem 0.375rem'
              }}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-sm">
        {data.map((dataItem, dataIndex) => (
          <Fragment key={dataItem.id}>
            <tr
              onClick={onRowClick(dataIndex)}
              className="row border-b-2 cursor-pointer transition-all rounded-md hover:bg-blue-100/60">
              {columns.map(({ id, accessor, cell }) => (
                <td
                  key={id}
                  className="font-normal first:rounded-l-md last:rounded-r-md"
                style={{
                  padding: '1rem 0.375rem'
                }}>
                  {cell(dataItem[accessor])}
                </td>
              ))}
            </tr>
            {hasDropDown && dropDownContent && (
              <tr>
                <td colSpan={columns.length}>
                  <div
                    className="grid transition-all [&>*]:overflow-hidden"
                    style={{
                      gridTemplateRows: selectedIndex === dataIndex ? '1fr' : '0fr'
                    }}>
                    {dropDownContent[dataIndex]}
                  </div>
                </td>
              </tr>
            )}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};
