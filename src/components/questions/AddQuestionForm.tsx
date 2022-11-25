import { Button, Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import '../common/style.css';

export interface AddQuestionFormProps {
    onAdd: (question: string) => void;
}


export const AddQuestionForm = ({ onAdd }: AddQuestionFormProps) => {
    const { register, handleSubmit, reset } = useForm({ shouldUseNativeValidation: true });
    const onSubmit = async (data: any) => {
        onAdd(data.question);
				reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction='row' spacing={2} alignItems='center' justifyContent='flex-end' style={{ padding: '0px' }}>
                <Grid item xs={9}>
                    <Grid item>
                        <TextField fullWidth variant='outlined' size='small' {...register('question', { required: 'Please enter a question.' })} />
                    </Grid>
                </Grid>

                <Grid item xs={3} style={{ paddingTop: '15px' }}>
                    <Button fullWidth className='button' type='submit'>
                        Add Question
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};
