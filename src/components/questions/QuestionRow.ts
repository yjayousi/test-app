export interface QuestionRow {
    _id: string;
    text: string;
    answer?: string;
    answer_score?: number;
    test_run_result_id?: string;
}
