import { getJson, postJson } from './common';
import { TestRun } from './types';

export async function getTestRuns(): Promise<TestRun[]> {
    return getJson('/test-runs');
}

export async function getLastTestRun(): Promise<TestRun | undefined> {
    try {
        const lastRun = await getJson('/test-runs/last');
        return lastRun;
    } catch (error) {
        return;
    }
}

export async function createTestRun(data: Partial<TestRun>): Promise<TestRun> {
    return postJson('/test-runs', data);
}

// export async function updateTestRun(id: string, data: Partial<TestRun>): Promise<TestRun> {
//     return patchJson(`/test-runs/${id}`, { text: data.text });
// }
