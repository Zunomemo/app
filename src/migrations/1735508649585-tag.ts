import { MigrationInterface, QueryRunner } from "typeorm";

export class Tag1735508649585 implements MigrationInterface {
    name = 'Tag1735508649585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tag" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "parentId" varchar)`);
        await queryRunner.query(`CREATE TABLE "tag_closure" ("id_ancestor" varchar NOT NULL, "id_descendant" varchar NOT NULL, PRIMARY KEY ("id_ancestor", "id_descendant"))`);
        await queryRunner.query(`CREATE INDEX "IDX_32bf6c25aa9e397fe11403b314" ON "tag_closure" ("id_ancestor") `);
        await queryRunner.query(`CREATE INDEX "IDX_e59d05669a7d8259abc4b319d8" ON "tag_closure" ("id_descendant") `);
        await queryRunner.query(`CREATE TABLE "temporary_tag" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "parentId" varchar, CONSTRAINT "FK_5f4effb7cd258ffa9ef554cfbbb" FOREIGN KEY ("parentId") REFERENCES "tag" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_tag"("id", "name", "parentId") SELECT "id", "name", "parentId" FROM "tag"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`ALTER TABLE "temporary_tag" RENAME TO "tag"`);
        await queryRunner.query(`DROP INDEX "IDX_32bf6c25aa9e397fe11403b314"`);
        await queryRunner.query(`DROP INDEX "IDX_e59d05669a7d8259abc4b319d8"`);
        await queryRunner.query(`CREATE TABLE "temporary_tag_closure" ("id_ancestor" varchar NOT NULL, "id_descendant" varchar NOT NULL, CONSTRAINT "FK_32bf6c25aa9e397fe11403b314c" FOREIGN KEY ("id_ancestor") REFERENCES "tag" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_e59d05669a7d8259abc4b319d8a" FOREIGN KEY ("id_descendant") REFERENCES "tag" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("id_ancestor", "id_descendant"))`);
        await queryRunner.query(`INSERT INTO "temporary_tag_closure"("id_ancestor", "id_descendant") SELECT "id_ancestor", "id_descendant" FROM "tag_closure"`);
        await queryRunner.query(`DROP TABLE "tag_closure"`);
        await queryRunner.query(`ALTER TABLE "temporary_tag_closure" RENAME TO "tag_closure"`);
        await queryRunner.query(`CREATE INDEX "IDX_32bf6c25aa9e397fe11403b314" ON "tag_closure" ("id_ancestor") `);
        await queryRunner.query(`CREATE INDEX "IDX_e59d05669a7d8259abc4b319d8" ON "tag_closure" ("id_descendant") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_e59d05669a7d8259abc4b319d8"`);
        await queryRunner.query(`DROP INDEX "IDX_32bf6c25aa9e397fe11403b314"`);
        await queryRunner.query(`ALTER TABLE "tag_closure" RENAME TO "temporary_tag_closure"`);
        await queryRunner.query(`CREATE TABLE "tag_closure" ("id_ancestor" varchar NOT NULL, "id_descendant" varchar NOT NULL, PRIMARY KEY ("id_ancestor", "id_descendant"))`);
        await queryRunner.query(`INSERT INTO "tag_closure"("id_ancestor", "id_descendant") SELECT "id_ancestor", "id_descendant" FROM "temporary_tag_closure"`);
        await queryRunner.query(`DROP TABLE "temporary_tag_closure"`);
        await queryRunner.query(`CREATE INDEX "IDX_e59d05669a7d8259abc4b319d8" ON "tag_closure" ("id_descendant") `);
        await queryRunner.query(`CREATE INDEX "IDX_32bf6c25aa9e397fe11403b314" ON "tag_closure" ("id_ancestor") `);
        await queryRunner.query(`ALTER TABLE "tag" RENAME TO "temporary_tag"`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "parentId" varchar)`);
        await queryRunner.query(`INSERT INTO "tag"("id", "name", "parentId") SELECT "id", "name", "parentId" FROM "temporary_tag"`);
        await queryRunner.query(`DROP TABLE "temporary_tag"`);
        await queryRunner.query(`DROP INDEX "IDX_e59d05669a7d8259abc4b319d8"`);
        await queryRunner.query(`DROP INDEX "IDX_32bf6c25aa9e397fe11403b314"`);
        await queryRunner.query(`DROP TABLE "tag_closure"`);
        await queryRunner.query(`DROP TABLE "tag"`);
    }

}
