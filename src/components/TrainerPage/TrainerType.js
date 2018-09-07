import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Timer from './Timer';

export default class TrainerType extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onOpenModal: PropTypes.func.isRequired,
    onUpdateTime: PropTypes.func.isRequired,
    onAddChar: PropTypes.func.isRequired,
    onAddError: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      initialText: props.text.slice(1),
      typedText: '',
      currentChar: props.text[0],
      isError: false,
      isTimerPlay: false,
      startTime: 0.5 * 60 * 1000,
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

  /**
   * Start timer
   */
  startTimer = () => {
    this.setState({ isTimerPlay: true });
    console.log('Start timer');
    this.timer = setInterval(() => {
      this.cbTimer();
    }, 1000);
  }

  /**
   * Callback timer
   */
  cbTimer = () => {
    const { currentTime, startTime } = this.state;
    if (currentTime >= startTime) {
      clearInterval(this.timer);
      this.props.onOpenModal();
      return;
    }

    const updatedTime = currentTime + 1000;
    this.props.onUpdateTime(updatedTime);
    this.setState({ currentTime: updatedTime });
  }

  /**
   * Handle key events
   * @param {object} event
   */
  handleKeyUp = (event) => {
    const {
      isTimerPlay,
      initialText,
      currentChar,
      typedText,
      isError,
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

      this.props.onAddChar({
        typedChar: currentChar,
        currentTime
      });

      if (initialText.length < 1) {
        this.setState({ isTimerPlay: false });
        this.props.onOpenModal();
        clearInterval(this.timer);
        return;
      }

      const updatedCurrentChar = initialText[0];
      const updatedInitialText = initialText.slice(1);
      const updatedText = typedText + currentChar;

      this.setState({
        typedText: updatedText,
        initialText: updatedInitialText,
        currentChar: updatedCurrentChar,
      });
      return;
    }

    if (!isTimerPlay) {
      return;
    }

    if (!isError) {
      this.setState({ isError: true });
    }

    this.props.onAddError({
      typedChar: event.key,
      needChar: currentChar,
    });
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
