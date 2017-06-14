import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import Paper from 'material-ui/Paper';
import Timer from './Timer';

const text = 'vivamus magna justo,';


export default class TrainerType extends Component {
  static propTypes = {
    onOpenModal: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      initialText: text.slice(1),
      typedText: '',
      currentChar: text[0],
      countErrors: 0,
      isError: false,
      isTimerPlay: false,
      startTime: 1.5 * 60 * 1000,
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
    this.setState({ isTimerPlay: true });
    console.log('Start timer');
    this.timer = setInterval(() => {
      this.cbTimer();
    }, 1000);
  }

  @autobind
  cbTimer() {
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
      currentTime,
    } = this.state;

    if (event.key === 'Escape') {
      if (!isTimerPlay) {
        return;
      }

      console.log('Click Escape, timer play, need stop');
      this.setState({ isTimerPlay: false });
      clearInterval(this.timer);
      return;
    }

    if (event.key === 'Enter') {
      if (isTimerPlay || !typedText) {
        return;
      }

      this.startTimer();
      return;
    }

    if (event.key.length !== 1) {
      return;
    }

    if (!isTimerPlay && !!typedText) {
      return;
    }

    if (currentChar === event.key) {
      if (typedText.length < 1) {
        if (isTimerPlay) {
          return;
        }

        this.startTimer();
      }

      if (isError) {
        this.setState({ isError: false });
      }

      if (initialText.length < 1) {

        this.setState({ isTimerPlay: false });
        clearInterval(this.timer);

        const data = {
          countErrors,
          typedText,
          currentTime,
        };

        this.props.onOpenModal(data);
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
    const {
      initialText,
      typedText,
      currentChar,
      isError,
      startTime,
      currentTime,
      isTimerPlay,
    } = this.state;
    const isPaused = !!typedText && !isTimerPlay;

    return (
      <div className="paper__area">
        <div className="paper__header">
          <h3>Type text level - {'"easy"'}</h3>
          <Timer
            startTime={startTime}
            currentTime={currentTime}
            isPaused={isPaused}
            onPlay={this.startTimer}
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
        <div className="paper__bottom">
          <div>Press {'"ESC"'} - to pause.</div>
          <div>Press {'"Enter"'} - to continue.</div>
        </div>
      </div>
    );
  }
}
