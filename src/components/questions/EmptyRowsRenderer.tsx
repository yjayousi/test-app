import { Box, Typography } from '@mui/material';

export const EmptyRowsRenderer = () => {
    return (
        <div style={{ textAlign: 'center', gridColumn: '1/-1' }}>
            <Box m='auto' style={{ height: '100%' }}>
                <Typography variant='h4'>
                    Use the form above to add new questions
                </Typography>
            </Box>
        </div>
    );
};
