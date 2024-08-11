export interface Task {
    text: string;
    done: boolean;
    created_at: Date;
}

export interface TaskCollection extends Task {
    id_user: string;
}