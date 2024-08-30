export interface Task {
    id_task: string;
    text: string;
    done: boolean;
    created_at: Date;
}

export interface TaskCollection {
    id_user: string;
    text: string;
    done: boolean;
    created_at: Date;
}
