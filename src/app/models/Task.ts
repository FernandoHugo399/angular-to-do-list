export interface Task {
    text: string;
    done: boolean;
    created_at: Date;
}

export interface TaskCollection {
    text: string;
    done: boolean;
    created_at: Date;
    id_user: string;
}