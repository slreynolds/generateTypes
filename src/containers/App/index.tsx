import React, { Component } from 'react';

import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';

import HomePage from '@pages/HomePage';

// Definition of injected styles
const styles = (theme: Theme) => createStyles({
  root: {
    width: '99%',
    textAlign: 'center',
    paddingTop: theme.spacing(1),
    marginLeft: '4px',
    marginRight: '4px',
  },
});

// Component-specific props.
interface ComponentProps {

}

// Component state
interface ComponentState {

}

// Combined props (custom + styles)
type StyledComponentProps = ComponentProps & WithStyles<typeof styles>;

class App extends Component<StyledComponentProps, ComponentState> {
  
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <main>
          <HomePage />
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(App);
