import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';



const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '300px'
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

export default function OutlinedTextFieldsNew(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  });

  return (

    <form className={classes.container} noValidate autoComplete="off">

      <TextField
        id="outlined-dense"
        label={props.name}
        className={clsx(classes.textField, classes.dense)}
        margin="dense"
        style={{width: '100%', margin: '10px 40px'}}
        type={props.type}
        onChange={props.onchange}
        />
      
    </form>
  );
}