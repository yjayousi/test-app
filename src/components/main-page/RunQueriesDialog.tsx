import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { createTestRun } from '../../api/test-runs';
import '../common/style.css';

interface RunQueriesDialogProps {
    onSubmit: () => void;
}
export function RunQueriesDialog({ onSubmit }: RunQueriesDialogProps) {
    const [open, setOpen] = React.useState(false);
    const [artifact_id, setArtifactId] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = async () => {
        setOpen(false);
        if (artifact_id) {
            const testRun = await createTestRun({ artifact_id });
						onSubmit();
        }
    };

    const onChangeArtifactId = (event: any) => {
        setArtifactId(event.target.value);
    };

    return (
        <div>
            <Button className='button' variant='outlined' onClick={handleClickOpen}>
                Run Queries
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Run Queries</DialogTitle>
                <DialogContent>
                    <DialogContentText>Enter open book artifact id:</DialogContentText>
                    <TextField autoFocus margin='dense' id='name' label='artifact id' type='text' fullWidth variant='standard' onChange={onChangeArtifactId} />
                </DialogContent>
                <DialogActions>
                    <Button className='button' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className='button' onClick={handleClose}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
