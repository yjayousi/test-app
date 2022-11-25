import { Box, CircularProgress, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { createQuestion, getQuestions, updateQuestion } from '../../api/questions';
import { getLastTestRun } from '../../api/test-runs';
import { AddQuestionForm } from './AddQuestionForm';
import { EmptyRowsRenderer } from './EmptyRowsRenderer';
import { getQuestionColumns } from './QuestionColumns';
import { QuestionRow } from './QuestionRow';

import './Questions.css';
import { attachedTestResultsToQuestions, calculateTestRunScore } from './QuestionsUtils';

function rowKeyGetter(row: QuestionRow): number {
    // Something wrong with typyings in this function
    return row._id as unknown as number;
}

interface QuestionsProps {
    isRunning: boolean;
    setIsRunning: (isRunning: boolean) => void;
}

export const Questions = ({ isRunning, setIsRunning }: QuestionsProps) => {
    const [rows, setRows] = useState<QuestionRow[]>([]);
    const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(() => new Set());

    useEffect(() => {
        const fetchData = async () => {
            const data: QuestionRow[] = await getQuestions();

            const lastRun = await getLastTestRun();
            if (lastRun) {
                if (lastRun.started_at && !lastRun.finished_at) {
                    setIsRunning(true);
                } else {
                    await attachedTestResultsToQuestions(data, lastRun._id);
                    setIsRunning(false);
                }
            }

            setRows(data);
        };
        fetchData().catch(console.error);

        // Fetch data perioidcally if tests are running - later can use sockets for push notifications
        if (isRunning) {
            const interval = setInterval(() => {
                fetchData().catch(console.error);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [isRunning, setIsRunning]);

    const columns = getQuestionColumns();

    const addQuestion = async (question: string) => {
        const q: any = await createQuestion({ text: question });
        setRows([...rows, q]);
    };

    const onRowsChange = async (newRows: any, changedIndexes: any) => {
        for (const indx of changedIndexes.indexes) {
            const r: QuestionRow = newRows[indx];
            await updateQuestion(r._id, { text: r.text });
        }
        setRows(newRows);
    };

    let score: any = calculateTestRunScore(rows);
    const formattedScore = score >= 0 ? `${(score * 100).toFixed(2)}%` : 'N/A';

    return (
        <Container>
            <Grid container direction='column' alignItems='center' rowSpacing='12'>
                <Grid item container direction='row' justifyContent='space-between' alignItems='center'>
                    {!isRunning && (
                        <Grid item xs={3}>
                            <Typography variant='overline'>Last run score: {formattedScore}</Typography>
                        </Grid>
                    )}

                    <Grid item xs={9}>
                        <AddQuestionForm onAdd={addQuestion} />
                    </Grid>
                </Grid>
                <Grid item>
                    {isRunning ? (
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <DataGrid
                            rowKeyGetter={rowKeyGetter}
                            columns={columns}
                            rows={rows}
                            defaultColumnOptions={{
                                resizable: true,
                            }}
                            selectedRows={selectedRows}
                            onSelectedRowsChange={setSelectedRows}
                            onRowsChange={onRowsChange}
                            className='grid'
                            renderers={{ noRowsFallback: <EmptyRowsRenderer /> }}
                        />
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};
