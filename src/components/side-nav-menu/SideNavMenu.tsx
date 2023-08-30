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
      className="flex basis-1/4 flex-1 flex-col gap-2 p-2 transition-all" style={
        {
            backgroundColor: '#1C1F37'
        }
    }>
      <a href="/" className="self-center text-white">
        Logo
      </a>
        {children}
    </nav>
  );
};
