import React, { Dispatch, Fragment, ReactNode, SetStateAction, useEffect, useState } from 'react';

import { ColumnItem } from './table.interfaces';

interface Props<T> {
  data: T[];
  columns: ColumnItem<T>[];
  hasDropDown?: boolean;
  dropDownContent?: ReactNode[];
  setSelectedRow?: Dispatch<SetStateAction<string>>;
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
    setSelectedIndex((previousIndex) => (previousIndex === selectedItem ? -1 : selectedItem));
    if (setSelectedRow) {
      setSelectedRow(`${selectedIndex}`);
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
              className="py-4 first:rounded-l-md last:rounded-r-md px-1.5 text-left font-medium">
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
              className="border-b-2 cursor-pointer transition-all rounded-md hover:bg-blue-100/60">
              {columns.map(({ id, accessor, cell }) => (
                <td
                  key={id}
                  className="py-4 px-1.5 font-normal first:rounded-l-md last:rounded-r-md">
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
