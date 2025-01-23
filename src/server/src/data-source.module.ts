import { Module } from "@nestjs/common";
import { AppDataSource } from "./data-source";

@Module({
  providers: [AppDataSource],
  exports: [AppDataSource]
})
export class DataSourceModule {}