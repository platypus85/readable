import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%'
  },
  flex: {
    flex: 1
  }
});

export default function Header() {
  return (
    <div className={styles.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit" className={styles.flex}>
            Readable
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}