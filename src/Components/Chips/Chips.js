import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    display: 'inline',
  },
  chip: {
    margin: theme.spacing(1),
  },
}));

export default function SmallChips(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Chip size="small" label={props.name} className={classes.chip} />
    </div>
  );
}