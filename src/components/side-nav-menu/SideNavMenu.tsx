import cn from "classnames";
import { FC, ReactNode, useState } from "react";
import React from "react";

import { Button } from "../button";

import { ReactComponent as ArrowIcon } from "@svg/menu-arrow.svg";

interface Props {
  children: ReactNode;
}

export const SideNavMenu: FC<Props> = ({ children }) => {
  const [isOpened, setIsOpened] = useState(false);

  const onMenuClick = () => setIsOpened((prevIsOpened) => !prevIsOpened);

  return (
    <nav
      className={cn(
        "grid grid-cols-0 min-h-0 relative grid-rows-nav gap-2 bg-blue-400 p-2 ease-in-out transition-all duration-500",
        {
          "grid-cols-auto": isOpened,
        }
      )}
    >
      <a href="#" className="mb-10 select-none">
        Logo
      </a>
      <Button
        onClick={onMenuClick}
        className="border-none absolute -right-4 top-11 p-2 !rounded-full hover:bg-blue-600 bg-amber-600"
      >
        <ArrowIcon
          className={cn(
            "stroke-white transition-all ease-in-out duration-500 delay-300 w-4 h-4",
            {
              "rotate-180": isOpened,
            }
          )}
        />
      </Button>
      {children}
    </nav>
  );
};
