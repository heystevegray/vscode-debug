import { GetServerSideProps } from 'next';
import Link from '../components/link/Link';
import {
    makeStyles, createStyles, Theme, Grid, Button, List
} from '@material-ui/core';
import { useState } from 'react';
import { gql } from '@apollo/client';
import Layout from '../components/layout';

import ToolDialog from '../components/dialog/ToolDialog';
import Header from '../components/header/Header'
import ListItem from '../components/list/ListItem';
import { useToolsQuery } from '../gen/graphql-types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            minWidth: theme.breakpoints.values.sm,
            [theme.breakpoints.down('xs')]: {
                width: '100%',
                minWidth: 100
            }
        },
        info: {
            justify: "center",
            padding: theme.spacing(2)
        },
        avatar: {
            backgroundColor: theme.palette.gray.light
        },
        button: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6)
        },
    })
);

export const QUERY_TOOLS = gql`
    query Tools {
        tools(orderBy: { name: asc }) {
            id
            name
            description
            link
            image
        }
    }
`;

export default function Home() {
    const [dialogOpen, setDialogOpen] = useState(false);
    // CSR(Client-side rendering) example
    const { data } = useToolsQuery();
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={12}>
                <Header title="Tools" />
            </Grid>
            <Grid container justify="center" alignItems="center" className={classes.button}>
                <Grid item>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => setDialogOpen(true)}
                    >
                        Create Tool
                    </Button>
                </Grid>
            </Grid>
            <Grid container justify="center">
                <List aria-label="Project Tool List" className={classes.list} >
                    {data?.tools.map(({ id, name, image }) => {
                        const link = { href: "/tool/[id]", as: `/tool/${id}`, label: "More Info" }
                        return <ListItem key={id} image={image} name={name} link={link} />
                    })}
                </List>
            </Grid>
            <ToolDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
        </Grid >
    );
}
