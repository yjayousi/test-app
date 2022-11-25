import { getTestRunResults } from '../../api/test-run-results';
import { TestRunResult } from '../../api/types';
import { QuestionRow } from './QuestionRow';

export async function attachedTestResultsToQuestions(data: QuestionRow[], lastRunId: string) {
    const testRunResults = await getTestRunResults(lastRunId);
    const testRunResultsByQuestionId: Record<string, TestRunResult> = {};
    for (const trr of testRunResults) {
        testRunResultsByQuestionId[trr.question_id] = trr;
    }

    for (const r of data) {
        const result = testRunResultsByQuestionId[r._id];
        if (result) {
            r.answer = result.answer;
            r.answer_score = result.answer_score;
            r.test_run_result_id = result._id;
        }
    }
}

export function calculateTestRunScore(rows: QuestionRow[]): number | undefined {
    let scoreSum = 0;
    let scoreCount = 0;
    for (const row of rows) {
        if (row.answer) {
            const score = row.answer_score as number;
            if (score >= 0) {
                scoreSum += score;
                scoreCount++;
            } else {
                return undefined;
            }
        }
    }

    return scoreSum / scoreCount;
}
