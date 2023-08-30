import { Table, flexRender } from '@tanstack/react-table';
import React, {Dispatch, Fragment, ReactNode, SetStateAction, useState} from 'react';
import cn from "classnames";

interface Props<T> {
  table: Table<T>;
  hasDropDown?: boolean;
  dropDownItems?: ReactNode[];
  setSelectedRow?: Dispatch<SetStateAction<number>>;
  rowClassName?: string;
}

export const Table = <T,>({ table, hasDropDown, dropDownItems, setSelectedRow, rowClassName }: Props<T>) => {
    const [selectedId, setSelectedId] = useState<number>();

    const onRowClick = <T,>(row: T) => () => {
        setSelectedRow && setSelectedRow(row.index);
        setSelectedId(selectedId !== row.index ? row.index : -1)
    }

    return (
      <table className="w-full select-none">
        <thead
            className="text-xs text-xs 2xl:text-xl"
            style={{
              backgroundColor: '#EBF1FC'
            }}>
        {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                  <th
                      key={header.id}
                      className="py-4 first:rounded-l-md last:rounded-r-md px-1.5 text-left font-medium">
                    {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
              ))}
            </tr>
        ))}
        </thead>
        <tbody className="text-sm">
        {table.getRowModel().rows.map((row) => (
            <Fragment key={row.id}>
            <tr
                className={cn('border-b-2 cursor-pointer transition-all rounded-md', rowClassName)}
                onClick={onRowClick(row)}>
                    {row.getVisibleCells().map((cell) => (
                        <td
                            key={cell.id}
                            className="py-4 px-1.5 font-normal first:rounded-l-md last:rounded-r-md">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
            </tr>
                {hasDropDown && (
                    <tr className="grid transition-all overflow-hidden [&>*]:overflow-hidden" style={{
                        gridTemplateRows: selectedId === row.index ? '1fr' : '0fr'
                    }}>
                        <td>
                            {dropDownItems && dropDownItems[row.index]}
                        </td>
                    </tr>
                )}
            </Fragment>
        ))}
        </tbody>
      </table>
  );
};
