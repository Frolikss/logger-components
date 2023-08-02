import {FC, SVGProps} from "react";

export interface MenuItem {
  path: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  text: string;
}
