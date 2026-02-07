import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    Timestamp
} from "typeorm";
import { User } from "./user";

export enum Status {
    TODO = "todo",
    IN_PROGRESS = "in progress",
    ON_HOLD = "on hold",
    DONE = "done",
    WILL_NOT_DO = "will not do"
}

export enum Priority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    CRITICAL = "critical"
}

@Entity()
export class Todo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    title: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    description: string;

    @Column({ type: "enum", enum: Status, default: Status.TODO })
    status: Status;

    @Column({ type: "enum", enum: Priority, default: Priority.LOW })
    priority: Priority;

    @Column({ type: "timestamp", nullable: true })
    expected_completion_at: Timestamp

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column({ type: "boolean", default: false })
    is_deleted: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}