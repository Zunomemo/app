import { Entity, Tree, Column, PrimaryGeneratedColumn, TreeChildren, TreeParent, BaseEntity } from "typeorm";

@Entity("tag")
@Tree("closure-table")
export class Tag extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    declare id: string;

    @Column("varchar")
    declare name: string;

    @TreeChildren()
    declare children: Tag[];

    @TreeParent()
    declare parent: Tag;
}
