import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';

const text = 'Vivamus magna justo,';


export default class TrainerType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialText: text.slice(1),
      typedText: ' ',
      currentChar: text[0],
      countErrors: 0,
      isError: false,
    };
  }
  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  @autobind
  handleKeyUp(event) {
    const { initialText, currentChar, typedText, isError, countErrors } = this.state;

    if (event.key === 'Tab' || event.key === 'Shift' || event.key === 'Alt' || event.key === 'Control') {
      return;
    }

    if (currentChar === event.key) {
      if (isError) {
        this.setState({ isError: false });
      }
      if (initialText.length < 1) {
        console.log('Finish', 'Errors:', countErrors, 'Symbols:', text.length);
        return;
      }

      const updatedCurrentChar = initialText[0];
      const updatedInitialText = initialText.slice(1);
      const updatedText = typedText + currentChar;
      this.setState({ typedText: updatedText, initialText: updatedInitialText, currentChar: updatedCurrentChar });
      return;
    }

    if (!isError) {
      this.setState({ isError: true });
    }

    this.setState({countErrors: countErrors + 1 });
  }

  render() {
    const { initialText, typedText, currentChar, isError } = this.state;


    return (
      <div className="paper__area">
        <div className="paper__header">
          <h3>Type text</h3>
          <div className="timer">
            <div className="timer__hours">
              <h3>{'22:10'}</h3>
            </div>
            <div className="timer__circular">
              <CircularProgress
                mode="determinate"
                value={80}
                size={100}
                thickness={9}
              />
            </div>
          </div>
        </div>
        <div className="paper__body">
          <Paper zDepth={2}>
            <div className="paper__type">
              <div className="paper__left">
                <div className="paper_left_inner">
                  {typedText}
                </div>
              </div>
              <div className="paper__right">
                <span className={isError ? "paper__symbol__error" : "paper__symbol"}>
                  {currentChar}
                </span>
                <span>
                  {initialText}
                </span>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}
