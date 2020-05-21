import React, { Component } from 'react';

import {
  Button,
  Typography,
  Grid,
  TextField,
  Box
} from '@material-ui/core';

import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';

import Dropzone from 'react-dropzone';
import TypeGenerator from 'lib/type-generator';

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
    width: "99%"
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
  button: {
    height: 36,
  },
  '@keyframes slidein': {
    from: {opacity: 0},
    to: {opacity: 1}
  },
  menu: {
    width: 200,
  },
  settingsLeft: {
    height: 76
  },
  settingsRight: {
    height: 70
  },
  buttonlike: {
    color: '#fff',
    backgroundColor: '#3f51b5',
    padding: '6px 16px',
    fontSize: '0.875rem',
    cursor: 'pointer',
    minWidth: '64px',
    maxWidth: '140px',
    height: '36px',
    float: 'left',
    boxSizing: 'border-box',
    transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500,
    lineHeight: 1.75,
    borderRadius: '4px',
    letterSpacing: '0.02857em',
    textTransform: 'uppercase',
    '&:hover': {
      cursor: "select",
      backgroundColor: "#303f9f",
    }
  }
});

// Component state
interface ComponentState {
  out: string,
  error: string,
  status: string,
  loading: boolean,
  name: string,
  in: string,
  files: File[],
}

class App extends Component<WithStyles<typeof styles>, ComponentState> {
  // Empty constructor, only here for demo purposes
  constructor(props: WithStyles<typeof styles>) {
    super(props);

    this.state = {
      files: [],
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
      if(prevState.files.length != this.state.files.length){
        this.parseFiles();
      }
    }
  }

  parseFiles(){
    // start filereader
    console.log(this.state.files);
    // TODO this only uses the last file as input
    this.state.files.forEach(d => {
      let fr = new FileReader();
      fr.onload = (event) => {
        let str : string = event && event.target ? event.target.result as string : "";
        let name = new TypeGenerator().camelCase(d.name.substr(0,d.name.indexOf('.')));
        this.setState({name: name, in: str});
      };
      fr.readAsText(d);
    });
  }


  parseString(){
    this.setState({loading: true, status: "loading"});
    let name = this.state.name || "Thing";
    let str = this.state.in;
    new TypeGenerator().magicPromise(name, str)
      .then(d => {
        this.setState({loading: false, status: "success", error: "", out: d});
      })
      .catch((e : Error) => {
        console.log(e);
        this.setState({loading: false, status: "error", error: e.message});
      });
  }

  copyToClipboard(){
    let newClip = this.state.out;
    navigator.clipboard.writeText(newClip).then(() => {
      this.setState({status: "clipboard successfully set"});
    }, () => {
      this.setState({status: "clipboard write might have failed"});
      var copyText : any = document.querySelector("#outlined-types");
      copyText.select();
      document.execCommand("copy");
    });
  }

  prettifyInputObject(){
    this.setState(prev => {return{
          in: JSON.stringify(JSON.parse(prev.in), null, 2)
        }});
  }

  renderDropzone(){
    const { classes } = this.props;
    return (<Dropzone onDrop={acceptedFiles => this.setState({files: acceptedFiles})}>
          {({getRootProps, getInputProps}) => (
              <div {...getRootProps()}>
            <section className={classes.buttonlike}>
                <input {...getInputProps()} />
                <div>Select A File</div>
            </section>
              </div>
          )}
        </Dropzone>);
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
                JSON to TS Types
              </Typography>
              <Typography variant="subtitle1">
                Enter your JSON on the left and you get a super basic TypeScript types on the right
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" className={classes.status}>
                {this.state.status}
              </Typography>
              {this.state.error != "" &&
                <Box>
                  {this.state.error}
                </Box>
              }
            </Grid>

            <Grid item xs ={6} justify="flex-start">
            </Grid>
            <Grid item xs={12} container>
              <Grid item xs={6}>
                <Grid container
                  spacing={2}
                  className={classes.settingsLeft}
                  justify="center">
                  <Grid item>
                    {this.renderDropzone()}
                  </Grid>
                  <Grid item>
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.prettifyInputObject()}>
                      Prettify Input
                    </Button>
                  </Grid>
                </Grid>
                <TextField
                  id="outlined-textarea"
                  label="Input JSON"
                  placeholder="Placeholder"
                  multiline
                  rowsMax="30"
                  className={classes.textField}
                  color="primary"
                  margin="normal"
                  variant="outlined"
                  value={this.state.in}
                  onChange={(d) => this.setState({in: d.target.value})}
                />
              </Grid>
              <Grid item xs={6}>
                <Grid className={classes.settingsRight}
                  justify="center">
                  <TextField
                    id="outlined-name"
                    label="Name"
                    placeholder="Top Type Name"
                    margin="normal"
                    value={this.state.name}
                    onChange={(d) => this.setState({name: d.target.value})}
                  />
                  <Button variant="contained" color="primary" onClick={() => this.copyToClipboard()}>
                    Copy to Clipboard
                  </Button>
                </Grid>
                <TextField
                  disabled
                  onClick={() => this.copyToClipboard()}
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