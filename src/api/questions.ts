import { getJson, patchJson, postJson } from './common';
import { Question } from './types';

export async function getQuestions(): Promise<Question[]> {
    return getJson('/questions');
}

export async function createQuestion(data: Partial<Question>): Promise<Question> {
    return postJson('/questions', data);
}

export async function updateQuestion(id: string, data: Partial<Question>): Promise<Question> {
    return patchJson(`/questions/${id}`, { text: data.text });
}
