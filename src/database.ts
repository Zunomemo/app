import { Tag } from "./models/Tag";
import { Tag1735508649585 } from "./migrations/1735508649585-tag";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "db.sqlite",
    synchronize: false,
    migrationsRun: true,
    entities: [Tag],
    migrations: [Tag1735508649585]
});

export async function startDatabase() {
    await AppDataSource.initialize()
        .catch(err => console.error(err));
}
