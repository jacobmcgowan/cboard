import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';

import messages from './SkinTone.messages';
import { PanTool } from '@material-ui/icons';

const skinToneSources = new Map([
  [
    'arasaac',
    [
      {
        name: 'white',
        color: '#f5e5de'
      },
      {
        name: 'black',
        color: '#a65c17'
      },
      {
        name: 'assian',
        color: '#f4ecad'
      },
      {
        name: 'mulatto',
        color: '#e3ab72'
      },
      {
        name: 'aztec',
        color: '#cf9d7c'
      }
    ]
  ]
]);
const sourcesNames = new Map([['arasaac', 'ARASAAC']]);

const propTypes = {
  source: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
  onChange: PropTypes.func.isRequired,
  selectedColor: PropTypes.string.isRequired
};

class SkinToneSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      sourceName: sourcesNames.has(props.source)
        ? sourcesNames.get(props.source)
        : sourcesNames.get('arasaac'),
      skinToneMenu: skinToneSources.has(props.source)
        ? skinToneSources.get(props.source)
        : skinToneSources.get('arasaac')
    };
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleChange(value, callback) {
    callback(value);
    this.handleClose();
  }

  render() {
    const { intl, onChange, selectedColor } = this.props;
    const skinToneLabel = `${this.state.sourceName} ${intl.formatMessage(
      messages.skinTone
    )}`;

    return (
      <SpeedDial
        ariaLabel={skinToneLabel}
        icon={<PanTool />}
        hidden={false}
        direction="down"
        open={this.state.open}
        onClose={() => this.handleClose()}
        onOpen={() => this.handleOpen()}
      >
        {this.state.skinToneMenu.map(skinTone => (
          <SpeedDialAction
            key={skinTone.name}
            icon={<PanTool />}
            tooltipTitle={skinTone.name}
            onClick={() => this.handleChange(skinTone.name, onChange)}
          />
        ))}
      </SpeedDial>
    );
  }
}

SkinToneSelect.propTypes = propTypes;
export default injectIntl(SkinToneSelect);
