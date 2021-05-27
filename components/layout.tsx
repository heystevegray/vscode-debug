import { makeStyles, createStyles, Typography, Grid, IconButton, Tooltip } from '@material-ui/core';
import { Brightness2, WbSunny } from '@material-ui/icons';
import { ReactElement, useContext, useState } from 'react';
import Head from 'next/head';
import { CustomThemeContext } from '../lib/themes/CustomThemeProvider'

const useStyles = makeStyles(() =>
    createStyles({
        header: {
            padding: '1em 2em',
        },
    })
);

interface LayoutProps {
    children: ReactElement[] | ReactElement | string;
    title: string;
}

const Layout = ({ children, title }: LayoutProps): ReactElement => {
    const classes = useStyles();
    const { currentTheme, setTheme } = useContext(CustomThemeContext)
    const [isDark, setIsDark] = useState(currentTheme === 'dark' || false)
    console.log({ currentTheme, setTheme, isDark });


    const handleThemeChange = () => {
        if (!isDark) {
            setTheme('dark')
            setIsDark(true)

        } else {
            setTheme('normal')
            setIsDark(false)
        }

    }

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <header className={classes.header}>
                <Grid container alignItems="center">
                    <Grid item xs={6}>
                        <Typography variant="h4" component="h1">
                            Next.js example
                        </Typography>
                    </Grid>
                    <Grid item xs={6} container justify="flex-end">
                        <Grid>
                            {isDark &&
                                <Tooltip title="Light Theme">
                                    <IconButton name="Light Theme" onClick={handleThemeChange}>
                                        <WbSunny />
                                    </IconButton>
                                </Tooltip>
                            }
                            {!isDark && <Tooltip title="Dark Theme">
                                <IconButton name="Dark Theme" onClick={handleThemeChange}>
                                    <Brightness2 />
                                </IconButton>
                            </Tooltip>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </header>
            <main>{children}</main>
        </>
    );
};

export default Layout;
