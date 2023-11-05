import { BaseType } from "@mcanaleta/fieldtypes";

export type Column<T> = {
  name: string;
  type: BaseType<T>;
  editable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
};
