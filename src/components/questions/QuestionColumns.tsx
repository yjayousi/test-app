import { Box, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { Column, EditorProps, FormatterProps, SelectColumn, textEditor } from 'react-data-grid';
import { updateTestRunResultScore } from '../../api/test-run-results';
import { QuestionRow } from './QuestionRow';

const ANSWER_SCORES = [
    { value: 1, text: 'Perfect', color: 'green' },
    { value: 0.5, text: 'Good', color: 'gray' },
    { value: 0, text: 'Bad', color: 'red' },
];

function AnswerScoreEditor({ row, column, onRowChange, onClose }: EditorProps<QuestionRow>) {
    const [selectedScore, setSelectedScore] = useState(row.answer_score);

    const handleChange = async (e: any) => {
        const scoreValue = Number(e.target.value);
        setSelectedScore(scoreValue);
        onRowChange({ ...row, [column.key]: scoreValue }, true);
        if (row.test_run_result_id) {
            try {
                await updateTestRunResultScore(row.test_run_result_id, scoreValue);
            } catch (error) {
                console.error('updateTestRunResultScore error', error);
            }
        }
    };

    return (
        <Select fullWidth variant='standard' value={selectedScore || ''} onChange={handleChange} onBlur={() => onClose(true)}>
            {ANSWER_SCORES.map((option) => {
                return (
                    <MenuItem key={option.value} value={option.value}>
                        {option.text}
                    </MenuItem>
                );
            })}
        </Select>
    );
}

function AnswerScoreFormatter({ row, column }: FormatterProps<QuestionRow>) {
    const option = ANSWER_SCORES.find((option) => option.value === row.answer_score);
    const text = option?.text || row.answer_score;
    const color = option?.color || 'auto';
    return <Box style={{ background: color }}>{text}</Box>;
}

export function getQuestionColumns(): readonly Column<QuestionRow>[] {
    return [
        SelectColumn,
        {
            key: 'text',
            name: 'Question',
            width: 400,
            editor: textEditor,
            editable: (row: QuestionRow) => {
                return !row.answer;
            },
            cellClass: 'align-text-left',
        },
        {
            key: 'answer',
            name: 'Answer',
            width: 400,
            cellClass: 'align-text-left',
        },
        {
            key: 'answer_score',
            name: 'Answer Score',
            width: 200,
            editable: (row: QuestionRow) => {
                return !!row.answer;
            },
            editor: AnswerScoreEditor,
            editorOptions: {
                editOnClick: true,
            },
            formatter: AnswerScoreFormatter,
            cellClass: 'answer-score-cell',
        },
    ];
}
