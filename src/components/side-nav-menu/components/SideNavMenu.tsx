import cn from 'classnames';
import React, { FC, SVGProps } from 'react';

export interface MenuItem {
    path: string;
    icon: FC<SVGProps<SVGSVGElement>>;
    text: string;
}

interface Props {
  config: MenuItem[];
  pathname: string
}

export const SideNavMenu: FC<Props> = ({ config, pathname }) => {
  return (
    <nav
      className="flex flex-col gap-2 bg-blue-400 p-2 transition-all">
      <a href="/" className="mb-4">
        Logo
      </a>
      {config.map(({ path, icon: Icon, text }) => (
        <a
          key={path}
          href={path}
          className={cn(
            'flex gap-2 self-start transition-all p-1.5 rounded-full',
            { 'bg-amber-600': path === pathname }
          )}>
          <Icon
            className="fill-white transition-all w-6 shrink-0"
          />
          <span className="text-white">{text}</span>
        </a>
      ))}
    </nav>
  );
};
