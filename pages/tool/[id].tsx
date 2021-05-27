import { Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import Link from '../../components/link/Link';
import { ReactElement } from 'react';
import { useRouter } from 'next/router';

import gql from 'graphql-tag';
import { useToolQuery } from '../../gen/graphql-types';
import Header from '../../components/header/Header';

const useStyles = makeStyles((theme: Theme) => ({
    description: {
        justifyContent: 'center',
        maxWidth: theme.breakpoints.values.sm
    },
    root: {
        padding: '2em',
    },
}));

interface URLParams {
    id?: string;
}

export const QUERY_TOOL = gql`
    query Tool($id: Int!) {
        tool(where: { id: $id }) {
            id
            name
            description
            link
            image
        }
    }
`;

export default function ToolInfo(): ReactElement {
    const classes = useStyles();
    const { query }: { query: URLParams } = useRouter();
    // client side fetch
    const { data } = useToolQuery({ variables: { id: Number(query.id) } });
    const link = data?.tool?.link || ''


    if (!data) {
        return (
            <Grid container spacing={4} className={classes.root}>
                <Grid item xs={12}>
                    <Link href="/" label="Go Home" />
                </Grid>
                <Grid item xs={12} container>
                    <Typography variant="h3">Tool not found.</Typography>
                </Grid>
            </Grid>
        );
    }

    return (
        <Grid container>
            <Header title={data?.tool?.name || ''} image={data?.tool?.image} />
            <Grid container spacing={2} className={classes.root} justify="center" alignItems="center">
                <Grid item container className={classes.description} justify="center" alignItems="center">
                    <Typography >{data?.tool?.description}</Typography>
                </Grid>
                <Grid item container spacing={2} justify="center" alignItems="center">
                    <Grid item>
                        <Link href="/" label="Go Home" />
                    </Grid>
                    <Grid item>
                        <Link href={link} label="Visit documentation" />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
