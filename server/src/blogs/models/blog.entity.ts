import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('blogs')
export class BlogEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: "" })
    body: string;

    @Column({ default: "" })
    title: string;

    @Column({ default: "" })
    image: string;

    @Column("text", { default: [], array: true })
    tags: string[];

    @Column('text', { default: [], array: true })
    categories: string[];

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date
}