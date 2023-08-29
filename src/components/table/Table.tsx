import cn from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import moment from 'moment';

export interface Config<T> {
  title?: string;
  value: string;
  date?: boolean;
  type?: 'drop';
  img?: boolean;
  classNames?: (item: T) => string;
  components?: (item: T, pageNumber: number) => JSX.Element;
}

interface Props<T> {
  uploadImageSrc?: string;
  tableTitles?: Array<string>;
  items: Array<T>;
  config: Array<Config<T>>;
  rejectButton?: boolean;
  comparisonsButton?: boolean;
  pageNumber?: number;
}

const getFormattedDate = (date: number) => {
  return moment(date).format('DD.MM.YYYY');
};

export const Table: FC<Props<any>> = ({ items, config, pageNumber }) => {
  const [selectedId, setSelectedId] = useState<string>();

  const [isDrop, setIsDrop] = useState(false);

  const [dropDownItems, setDropDownItems] = useState<Config<any>[]>([]);

  const onDropDownClick = (itemId: string) => () => {
    setSelectedId(selectedId !== itemId ? itemId : '');
  };

  useEffect(() => {
    const shouldRenderTable = config.some((item) => item.type === 'drop');
    setIsDrop(shouldRenderTable);
    const filteredDropElements = config.filter((item) => item.type === 'drop').map((item) => item);
    setDropDownItems(filteredDropElements);
  }, []);

  if (!Array.isArray(items)) return <div>No data available</div>;
  return (
      <>
        <table className="w-full">
          <thead className="bg-dim-blue text-xs">
          <tr className="[&>*:nth-last-child(2)]:rounded-r-md [&>*:nth-last-child(2)]:text-center">
            {config.map((cfg, index) => (
                <th
                    key={index}
                    className="py-4 first:rounded-l-md last:hidden px-1.5 text-left font-medium">
                  {cfg.title}
                </th>
            ))}
          </tr>
          </thead>
          <tbody className="relative text-sm">
          {items.map((item) => (
              <React.Fragment key={item.id}>
                <tr
                    className={cn('border-b-1 cursor-pointer transition-all rounded-md', {
                      'hover:bg-dim-blue': isDrop
                    })}
                    onClick={onDropDownClick(item.id)}>
                  {config.map(
                      (cfg, cfgIndex) =>
                          cfg.type !== 'drop' && (
                              <td
                                  key={cfgIndex}
                                  className={cn(
                                      'py-4 px-1.5 font-normal first:rounded-l-md last:rounded-r-md',
                                      { 'flex justify-center': cfg.value === 'components' },
                                      cfg.classNames && cfg.classNames(item)
                                  )}>
                                {cfg.value === 'components' ? (
                                    <>{cfg.components?.(item, pageNumber ? pageNumber : 0) ?? null}</>
                                ) : cfg.value === 'status' || cfg.value === 'type' ? (
                                    <>
                                      {cfg.components?.(item, pageNumber !== undefined ? pageNumber : 0) ??
                                          null}
                                    </>
                                ) : cfg.date ? (
                                    getFormattedDate(item[cfg.value])
                                ) : (
                                    item[cfg.value]
                                )}
                              </td>
                          )
                  )}
                </tr>
                {isDrop && (
                    <tr>
                      <td colSpan={config.length} className="p-0">
                        <div
                            className={cn(
                                'transition-all [&>*]:overflow-hidden [&>*:last-child]:order-first grid grid-rows-0 grid-cols-auto',
                                {
                                  'grid-rows-auto': selectedId === item.id
                                }
                            )}>
                          <div className="flex gap-2 justify-end flex-row-reverse">
                            {dropDownItems.map((dropItem, index) => (
                                <div
                                    key={item.id + index}
                                    className="px-4 flex flex-row-reverse items-center">
                                  {!dropItem.img ? (
                                      <div dangerouslySetInnerHTML={{ __html: item[dropItem.value] }} />
                                  ) : (
                                      <div className="[&>*]:h-28 [&>*]:w-44 [&>*]:flex [&>*]:justify-center [&>*]:items-center">
                                        {item[dropItem.value] ? (
                                            <img
                                                className="object-contain"
                                                src={`${process.env.REACT_APP_IMAGES_URL}${
                                                    item[dropItem.value]
                                                }`}
                                                alt="banner"
                                            />
                                        ) : (
                                            <p>No Image</p>
                                        )}
                                      </div>
                                  )}
                                </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                )}
              </React.Fragment>
          ))}
          </tbody>
        </table>
      </>
  );
};
