import { Expose } from "class-transformer";

export class BaseSerializer {
  @Expose()
  id: number;

  @Expose()
  createAt: Date;

  @Expose()
  updatedAt: Date;
}
