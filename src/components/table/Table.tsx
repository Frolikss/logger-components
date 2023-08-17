import cn from 'classnames';
import { FC, Fragment, useEffect, useState } from 'react';
import moment from 'moment';

interface Config<T> {
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
      <table className="text-center w-full">
        <thead className="border-b-2 text-xs">
          <tr>
            {config.map((cfg, index) => (
              <th key={index} className="py-2 font-normal">
                {cfg.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="relative">
          {items.map((item) => (
            <Fragment key={item.id}>
              <tr className="border-b-1">
                {config.map(
                  (cfg, cfgIndex) =>
                    cfg.type !== 'drop' && (
                      <td
                        key={cfgIndex}
                        className={cn(
                          'py-2 font-normal',
                          { 'flex justify-center': cfg.value === 'components' },
                          cfg.classNames && cfg.classNames(item)
                        )}>
                        {cfg.value === 'components' ? (
                          <>
                            {cfg.components?.(item, pageNumber ?? 0) ?? null}
                            <svg
                              className={cn('cursor-pointer hover:fill-gray-300', {
                                'rotate-180': selectedId === item.id
                              })}
                              onClick={onDropDownClick(item.id)}
                              xmlns="http://www.w3.org/2000/svg" fill="#60A5FA" version="1.1" width="30px" height="30px" viewBox="0 0 48 48"
                            >
                              <path  d="
  M 43.93 24.00
  A 19.93 19.93 0.0 0 1 24.00 43.93
  A 19.93 19.93 0.0 0 1 4.07 24.00
  A 19.93 19.93 0.0 0 1 24.00 4.07
  A 19.93 19.93 0.0 0 1 43.93 24.00
  Z"
                              />
                              <path fill="#ffffff" d="
  M 24.16 26.74
  L 31.76 19.41
  A 0.40 0.40 0.0 0 1 32.31 19.41
  L 34.82 21.76
  A 0.40 0.40 0.0 0 1 34.83 22.33
  L 24.27 32.84
  A 0.40 0.40 0.0 0 1 23.71 32.84
  L 13.28 22.41
  A 0.40 0.40 0.0 0 1 13.28 21.85
  L 15.72 19.41
  A 0.40 0.40 0.0 0 1 16.28 19.41
  L 23.60 26.73
  A 0.40 0.40 0.0 0 0 24.16 26.74
  Z"
                              />
                            </svg>

                          </>
                        ) : cfg.value === 'status' ? (
                          <>{cfg.components?.(item, pageNumber ?? 0) ?? null}</>
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
            </Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
};
