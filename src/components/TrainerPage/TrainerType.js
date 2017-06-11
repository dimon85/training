import React, { Component } from 'react';
import autobind from 'autobind-decorator';

const text = 'Vivamus magna justo,';


export default class TrainerType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialText: text.slice(1),
      typedText: '',
      currentChar: text[0],
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
    const { initialText, currentChar, typedText } = this.state;
    if (currentChar === event.key) {
      const updatedCurrentChar = initialText[0];
      const updatedInitialText = initialText.slice(1);
      const updatedText = typedText + currentChar;
      this.setState({ typedText: updatedText, initialText: updatedInitialText, currentChar: updatedCurrentChar })
    }
  }

  render() {
    const { initialText, typedText, currentChar } = this.state;

    return (
      <div className="paper__area">
        <div className="paper__header">
          <h3>Type text</h3>
        </div>
        <div className="paper__body">
          <div className="paper__type">
            <div className="paper__left">
              <div className="paper_left_inner">
                {typedText ? typedText:  'begin type '}
              </div>
            </div>
            <div className="paper__right">
              <span className="paper__symbol">{currentChar}</span>
              <span>{initialText}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
