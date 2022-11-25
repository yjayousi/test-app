interface BaseModel {
    readonly _id: string;
    readonly created_at: Date;
    readonly updated_at: Date;
}
export interface Question extends BaseModel {
    text: string;
}

export interface TestRun extends BaseModel {
    artifact_id: string;
    started_at?: Date;
    finished_at?: Date;
}

export interface TestRunResult extends BaseModel {
    test_run_id: string;
    question_id: string;
    question: string;
    answer: string;
    answer_score: number;
}
