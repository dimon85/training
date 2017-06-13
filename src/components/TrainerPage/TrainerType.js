import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import Paper from 'material-ui/Paper';
import Timer from './Timer';

const text = 'Vivamus magna justo,';


export default class TrainerType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialText: text.slice(1),
      typedText: '',
      currentChar: text[0],
      countErrors: 0,
      isError: false,
      isTimerPlay: false,
      startTime: 1.5*60*1000,
      currentTime: 0,
    };
  }
  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  @autobind
  startTimer() {
    const { currentTime, startTime } = this.state;
    if (currentTime >= startTime) {
      clearInterval(this.timer);
      return;
    }
    const updatedTime = currentTime + 1000;
    this.setState({ currentTime: updatedTime });
  }

  @autobind
  handleKeyUp(event) {
    const {
      isTimerPlay,
      initialText,
      currentChar,
      typedText,
      isError,
      countErrors,
    } = this.state;

    console.log(event.key);
    if (event.key === 'Escape') {
      if (!isTimerPlay) {
        console.log('Click Escape, timer stop');
        return;
      }

      console.log('Click Escape, timer play, need stop');
      this.setState({ isTimerPlay: false});
      clearInterval(this.timer);
      return;
    }

    if (event.key === 'Enter') {

    }

    if (event.key.length !== 1) {
      return;
    }

    if (currentChar === event.key) {
      if (typedText.length < 1) {
        if (isTimerPlay) {
          return;
        }
        this.setState({ isTimerPlay: true });
        this.timer = setInterval(() => {
        this.startTimer();
        }, 1000);
      }

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

    this.setState({ countErrors: countErrors + 1 });
  }

  render() {
    const { initialText, typedText, currentChar, isError, startTime, currentTime } = this.state;


    return (
      <div className="paper__area">
        <div className="paper__header">
          <h3>Type text 1</h3>
          <Timer
            startTime={startTime}
            currentTime={currentTime}
          />
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
                <span className={isError ? 'paper__symbol__error' : 'paper__symbol'}>
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
