import { Dialog, DialogTitle, DialogContent, Grid, TextField, DialogActions, Button } from '@material-ui/core';
import { Tool } from '@prisma/client';
import gql from 'graphql-tag';
import React, { ReactElement } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useCreateToolMutation } from '../../gen/graphql-types';
import { QUERY_TOOLS } from '../../pages';

interface Props {
    open: boolean;
    onClose: () => void;
}

export const MUTATION_CREATE_TOOL = gql`
    mutation CreateTool($name: String!, $description: String!, $link: String!, $image: String) {
        createTool(data: { name: $name, description: $description, link: $link, image: $image }) {
            id
        }
    }
`;

export type ToolForm = Omit<Tool, 'id'>;

export default function ToolDialog({ open, onClose }: Props): ReactElement {
    const { handleSubmit, reset, control } = useForm<ToolForm>({
        defaultValues: {
            name: '',
            description: '',
            image: '',
            link: '',
        },
    });
    const [createTool] = useCreateToolMutation();

    const onSubmit = async (values: ToolForm) => {
        const { name, description, image, link } = values;
        await createTool({ variables: { name, description, link, image }, refetchQueries: [{ query: QUERY_TOOLS }] });
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle id="alert-dialog-title">{`Create Tool`}</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Tool Name"
                                        variant="outlined"
                                        required
                                        margin="dense"
                                        autoFocus={true}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        rows={4}
                                        required
                                        multiline
                                        variant="outlined"
                                        label="Tool Description"
                                        margin="dense"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="image"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        multiline
                                        variant="outlined"
                                        label="Tool image link"
                                        margin="dense"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="link"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        multiline
                                        required
                                        variant="outlined"
                                        label="Tool website"
                                        margin="dense"
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="default" variant="contained">
                        CANCEL
                    </Button>
                    <Button onClick={() => reset()} type="reset" color="secondary" variant="contained">
                        RESET
                    </Button>
                    <Button type="submit" color="primary" variant="contained">
                        SUBMIT
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
