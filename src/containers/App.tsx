import React, { Component } from 'react';

import {
  Button,
  Typography,
  Grid,
  TextField,
} from '@material-ui/core';

import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';

import TypeGenerator from 'lib/TypeGenerator';

// Definition of injected styles
const styles = (theme: Theme) => createStyles({
  root: {
    width: '99%',
    textAlign: 'center',
    paddingTop: theme.spacing(1),
    marginLeft: '4px',
    marginRight: '4px',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    paddingLeft: "8px",
    paddingRight: "8px",
    width: "100%"
  },
  small: {
    marginLeft: "8px",
    marginRight: "8px",
  },
  dense: {
    marginTop: "16px",
  },
  status: {
    animation: `slidein 2500ms ${theme.transitions.easing.easeInOut} 200ms infinite`,
  },
  '@keyframes slidein': {
    from: {opacity: 0},
    to: {opacity: 1}
  },
  menu: {
    width: 200,
  },
});

// Component state
interface ComponentState {
  out: string,
  error: string,
  status: string,
  loading: boolean,
  name: string,
  in: string,
}

class App extends Component<WithStyles<typeof styles>, ComponentState> {
  // Empty constructor, only here for demo purposes
  constructor(props: WithStyles<typeof styles>) {
    super(props);

    this.state = {
      out: "",
      error: "",
      status: "",
      loading: false,
      name: "",
      in: "",
    };
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  componentDidUpdate(prevProps : WithStyles<typeof styles>, prevState : ComponentState) {

    if(!this.state.loading){
      if(prevState.in != this.state.in ||
        prevState.name != this.state.name){
        this.parseString();
      }
    }
  }


  parseString(){
    this.setState({loading: true, status: "Working..."});
    try{
      let name = this.state.name || "Thing";
      let str = this.state.in;
      let result = new TypeGenerator().magic(name, str);
      this.setState({loading: false, status: "success", error: "", out: result});
    }catch(e){
      console.log(e);
      this.setState({loading: false, status: "error", error: e});
    }
  }

  copyToClipboard(){
    let newClip = this.state.out;
    navigator.clipboard.writeText(newClip).then(() => {
      console.log("clipboard successfully set");
    }, () => {
      console.log("clipboard write failed, try something else instead:");
      var copyText : any = document.querySelector("#outlined-types");
      copyText.select();
      document.execCommand("copy");
    });
  }

  /**
   * The component's render method
   */
  render() {
     const { classes } = this.props;
    return (
  <div className={classes.root}>
    <main>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">
            JSON to Typescript Type
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1">
            Enter your JSON in the left and you get a super basic Typescript configuration on the right
          </Typography>
          <hr />
          <div className={classes.status}>
            <Typography>
              {this.state.status}
            </Typography>
          </div>
          <Button onClick={this.copyToClipboard}>
            Copy to Clipboard
          </Button>
        </Grid>

        <Grid item xs ={6} justify="flex-start">
          <TextField
            id="outlined-name"
            label="Name"
            placeholder="Name"
            margin="normal"
            value={this.state.name}
            onChange={(d) => this.setState({name: d.target.value})}
          />
          <TextField
            id="outlined-error"
            label="Error"
            placeholder=""
            multiline
            InputProps={{
              readOnly: true,
            }}
            className={classes.small}
            margin="normal"
            variant="outlined"
            value={this.state.error}
          />
        </Grid>
        <Grid item xs={12} container>
          <Grid item xs={6}>
            <TextField
              id="outlined-textarea"
              label="Input Object"
              placeholder="Placeholder"
              multiline
              rowsMax="30"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={(d) => this.setState({in: d.target.value})}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
            onClick={this.copyToClipboard}
              id="outlined-types"
              label="Output Types"
              placeholder="Placeholder"
              multiline
              InputProps={{
                readOnly: true,
              }}
              className={classes.textField}
              margin="normal"
              variant="outlined"
              value={this.state.out}
            />
          </Grid>
        </Grid>
      </Grid>
    </main>
  </div>
    );
  }

}

export default withStyles(styles)(App);