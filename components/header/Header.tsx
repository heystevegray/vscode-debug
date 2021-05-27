import { createStyles, Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import { Maybe } from "graphql/jsutils/Maybe";
import Image from "../Image";
import { ReactElement } from "react";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			minHeight: 175,
			backgroundColor: theme.palette.background.paper
		},
	})
);

type Props = {
	title: string
	image?: Maybe<string> | undefined;
}

export default function Header({ title, image }: Props) {
	const classes = useStyles()
	return (
		<Grid container justify="center" alignItems="center" className={classes.root}>
			<Grid item xs={12} spacing={2} container justify="center" alignItems="center">
				<>
					{image && <Grid item>
						<Image image={image} name={title} />
					</Grid>}
					<Grid item>
						<Typography variant="h1">{title}</Typography>
					</Grid>
				</>
			</Grid>
		</Grid>
	)
}
