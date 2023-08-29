import React, {FC, ReactNode, SVGProps} from 'react';

export interface MenuItem {
    path: string;
    icon: FC<SVGProps<SVGSVGElement>>;
    text: string;
}

interface Props {
  children: ReactNode;
}

export const SideNavMenu: FC<Props> = ({ children }) => {
  return (
    <nav
      className="flex flex-col gap-2 bg-blue-400 p-2 transition-all">
      <a href="/" className="mb-4">
        Logo
      </a>
        {children}
    </nav>
  );
};
