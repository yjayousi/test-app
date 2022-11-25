import { Box, Container, Typography } from '@mui/material';
import { useState } from 'react';
import '../common/style.css';
import { Questions } from '../questions/Questions';
import { RunQueriesDialog } from './RunQueriesDialog';

export const MainPage = () => {
    const [isRunning, setIsRunning] = useState(false);
    const handleSubmit = () => {
        setIsRunning(true);
    };
    return (
        <Container>
            <Questions isRunning={isRunning} setIsRunning={setIsRunning} />
            <Box m={2} display='flex' justifyContent='center'>
                {isRunning && <Typography>Running queries ...</Typography>}
                {!isRunning && <RunQueriesDialog onSubmit={handleSubmit} />}
            </Box>
        </Container>
    );
};
