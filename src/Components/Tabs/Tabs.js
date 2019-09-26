import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper'
import Chips from '../../Components/Chips/Chips'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NavTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  // console.log(props.Data.country)

  return (
    <div className={classes.root} >
      <AppBar position="static" style={{ backgroundColor: 'white', color: "#00a680" }}>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Resturents" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="My Requests" href="/trash" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} >
        <h3>List Of Resturents Near By You</h3>

        {/* <h1>{props.Data[0].city}</h1> */}
        <Grid container justify="center" >
          <Grid item xs={12} sm={8} md={10} lg={8} >
            <div>
              {
                props.Data.map((v, i) => {
                  return <div style={{margin: '10px'}}>
                    <Paper style={{cursor: 'pointer'}}  onClick={()=>{props.path.push('/restaurantmenu/', v)}}>
                      <h3 style={{ textAlign: 'center' }} >{v.userName}</h3>
                      <h3 style={{ textAlign: 'center' }} >{v.city}</h3>
                      <div style={{textAlign: 'center'}}>

                      <Chips name='Fast Food' /> 
                      <Chips name='Dairy Products' /> 
                      <Chips name='Bariyani' /> 
                      <Chips name='Chat Pata' /> 
                      </div>
                    </Paper>
                  </div>
                })
              }
            </div>
          </Grid>
        </Grid>
              {/* <img src={v.coverPhoto} width='200px' height='200px' alt='Restro' style={{ display: 'inline', textAlign: 'center', padding: '20px' }} /> */}

      </TabPanel>
      <TabPanel value={value} index={1}>
        <h3>No Request Available This Time</h3>
      </TabPanel>
    </div>
  );
}