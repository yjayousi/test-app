import { getJson, patchJson } from './common';
import { TestRunResult } from './types';

export async function getTestRunResults(testRunId: string): Promise<TestRunResult[]> {
    return getJson(`/test-run-results/${testRunId}`);
}

// export async function createTestRunResult(data: Partial<TestRunResult>): Promise<TestRunResult> {
//     return postJson('/test-run-results', data);
// }

export async function updateTestRunResultScore(id: string, score: number): Promise<TestRunResult> {
    return patchJson(`/test-run-results/${id}`, { answer_score: score });
}
