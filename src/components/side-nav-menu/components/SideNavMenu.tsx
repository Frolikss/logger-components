import cn from 'classnames';
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../../button';

import { MenuItem } from '../types/menu.interfaces';

interface Props {
  config: MenuItem[];
  pathname: string
}

export const SideNavMenu: FC<Props> = ({ config, pathname }) => {
  const [isOpened, setIsOpened] = useState(false);

  const onMenuClick = () => setIsOpened((prevIsOpened) => !prevIsOpened);

  return (
    <nav
      className={cn('grid grid-cols-0 min-h-0 grid-rows-nav gap-2 bg-blue-400 p-2 transition-all', {
        'grid-cols-auto': isOpened
      })}>
      <Link to="#" className="mb-4 select-none">
        Logo
      </Link>
      <Button
        className={cn(
          'w-9 h-9 rounded-full bg-amber-600 hover:bg-gray-300 hover:text-amber-600 rounded-full text-white self-start relative',
          { 'left-[90%]': isOpened },
          { 'left-[67%]': !isOpened }
        )}
        onClick={onMenuClick}>
        {isOpened ? '❮' : '❯'}
      </Button>
      {config.map(({ path, icon: Icon, text }) => (
        <Link
          key={path}
          to={path}
          className={cn(
            'flex gap-2 self-start overflow-hidden transition-all p-1.5 rounded-full',
            {
              'hover:bg-blue-600': isOpened
            },
            { 'bg-amber-600': path === pathname }
          )}>
          <Icon
            className={cn('fill-white transition-all w-6 shrink-0', {
              'hover:fill-blue-600': !isOpened
            })}
          />
          <span className="text-white overflow-hidden">{text}</span>
        </Link>
      ))}
    </nav>
  );
};
