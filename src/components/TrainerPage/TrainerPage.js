import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TrainerType from './TrainerType';
import TrainerModal from './TrainerModal';
import TrainerInfo from './TrainerInfo';

const defText = 'This is a simple paragraph that is meant to be nice and easy to type which is why there will';
// ' be mommas no periods or any capital letters so i guess this means that it cannot really be considered a ' +
// ' paragraph but just a series of run on sentences this should help you get faster at typing as im trying not to ' +
// ' use too many difficult words in it although i think that i might start making it hard by including' +
// ' some more difficult letters I\'m typing pretty quickly so forgive me for any mistakes i think that' +
// ' i will not just tell you a story about the time i went to the zoo and found a monkey and a fox playing' +
// ' together they were so cute and i think that they were not supposed to be in the same cage but they somehow were' +
// ' and i loved watching them horse';

export default class TrainerPage extends Component {
  constructor(props) {
    super(props);

    this.initState = {
      start: false,
      openModal: false,
      currentTime: 0,
      typedData: [],
      errorsData: [],
      typedCount: 0,
      errorsCount: 0,
      text: defText,
      textLength: defText.length,
    };

    this.state = this.initState;
  }

  /**
   * Handle click start
   */
  handleClickStart = () => this.setState({ start: true });

  /**
   * Handle update time
   * @param {object} time
   */
  handleUpdateTime = time => this.setState({ currentTime: time });

  /**
   * Handle add char
   * @param {object} item
   */
  handleAddChar = (item) => {
    const { typedCount, typedData } = this.state;
    this.setState({
      typedData: [
        ...typedData,
        item
      ],
      typedCount: typedCount + 1,
    });
  }

  /**
   * Handle add error
   * @param {object} error
   */
  handleAddError = (error) => this.setState(prevState => ({
    errorsData: [
      ...prevState.errorsData,
      error
    ],
    errorsCount: prevState.errorsCount + 1,
  }));

  /**
   * Handle open modal
   */
  handleOpenModal = () => this.setState({
    openModal: true,
    start: false,
  });

  /**
   * Handle close modal
   */
  handleCloseModal = () => this.setState(this.initState);

  render() {
    const {
      start,
      textLength,
      typedCount,
      currentTime,
      errorsCount,
      errorsData,
      text,
      openModal,
    } = this.state;

    return (
      <div className="container">
        <h1>Training your ability</h1>
        <Paper className="paper">
          {!start && (
            <div className="paper__area">
              <div className="paper__header">
                <h3>Press button to start</h3>
              </div>
              <div className="paper__body">
                <Button
                  color="primary"
                  onClick={this.handleClickStart}
                >
                  Start
                </Button>
              </div>
            </div>
          )}
          {start && (
            <TrainerType
              text={text}
              onUpdateTime={this.handleUpdateTime}
              onAddChar={this.handleAddChar}
              onAddError={this.handleAddError}
              onOpenModal={this.handleOpenModal}
            />
          )}
        </Paper>
        {start && (
          <TrainerInfo
            currentTime={currentTime}
            textLength={textLength}
            typedCount={typedCount}
            errorsCount={errorsCount}
          />
        )}
        <TrainerModal
          open={openModal}
          textLength={textLength}
          typedCount={typedCount}
          currentTime={currentTime}
          errorsCount={errorsCount}
          errorsData={errorsData}
          onCloseModal={this.handleCloseModal}
        />
      </div>
    );
  }
}
