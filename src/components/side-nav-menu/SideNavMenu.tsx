import cn from "classnames";
import { FC, ReactNode, useState } from "react";
import React from "react";

import { Button } from "../button";
import "./styles.css";

// import ArrowIcon from "./assets/png/test.png";

interface Props {
  children: ReactNode;
}

export const SideNavMenu: FC<Props> = ({ children }) => {
  const [isOpened, setIsOpened] = useState(false);

  const onMenuClick = () => setIsOpened((prevIsOpened) => !prevIsOpened);

  return (
    <nav
      className={cn("grid min-h-0 relative gap-2 p-2 nav-animation", {
        "nav-opened": isOpened,
      })}
    >
      <a href="#" className="mb-10 select-none">
        Logo
      </a>
      <div className="button-wrapper">
        <Button
          onClick={onMenuClick}
          className="border-none absolute button top-11 p-2 hover:bg-blue-600 bg-amber-600 rounded-full"
        >
          <p
            className={cn(
              "stroke-white transition-all text-white ease-in-out duration-500 delay-300",
              {
                "arrow-animation": isOpened,
              }
            )}
          >
            ❯
          </p>
        </Button>
      </div>
      {children}
    </nav>
  );
};
