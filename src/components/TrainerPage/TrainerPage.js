import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TrainerType from './TrainerType';
import TrainerModal from './TrainerModal';

const text = 'THIS is a simple paragraph that is meant to be nice and easy to type which is why there will be mommas';
// ' no periods or any capital letters so i guess this means that it cannot really be considered a paragraph' +
// ' but just a series of run on sentences this should help you get faster at typing as im trying not to use' +
// ' too many difficult words in it although i think that i might start making it hard by including' +
// ' some more difficult letters I\'m typing pretty quickly so forgive me for any mistakes i think that' +
// ' i will not just tell you a story about the time i went to the zoo and found a monkey and a fox playing' +
// ' together they were so cute and i think that they were not supposed to be in the same cage but they somehow were' +
// ' and i loved watching them horse';

export default class TrainerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: false,
      openModal: false,
      data: {},
      text
    };
  }

  @autobind
  handleClickStart() {
    this.setState({ start: true });
  }

  @autobind
  handleOpenModal(data) {
    this.setState({ openModal: true, start: false, data });
  }

  @autobind
  handleCloseModal() {
    this.setState({ openModal: false });
  }

  render() {
    const { start, data, text, openModal } = this.state;

    return (
      <div className="container">
        <h1>Training your ability</h1>
        <Paper zDepth={4}>
          {!start &&
            <div className="paper__area">
              <div className="paper__header">
                <h3>Press button to start</h3>
              </div>
              <div className="paper__body">
                <RaisedButton
                  label="Start"
                  primary={Boolean(true)}
                  fullWidth={Boolean(true)}
                  keyboardFocused
                  onTouchTap={this.handleClickStart}
                />
              </div>
            </div>
          }
          {start &&
            <TrainerType
              text={text}
              onOpenModal={this.handleOpenModal}
            />
          }
        </Paper>
        <TrainerModal
          open={openModal}
          data={data}
          onCloseModal={this.handleCloseModal}
        />
      </div>
    );
  }
}
