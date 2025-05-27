import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';

import messages from './HairColor.messages';
import { Face } from '@material-ui/icons';

const hairColorSources = new Map([
  [
    'arasaac',
    [
      {
        name: 'blonde',
        color: '#fdd700'
      },
      {
        name: 'brown',
        color: '#a65e26'
      },
      {
        name: 'darkBrown',
        color: '#6a2703'
      },
      {
        name: 'gray',
        color: '#efefef'
      },
      {
        name: 'darkGray',
        color: '#aaabab'
      },
      {
        name: 'red',
        color: '#ed4120'
      },
      {
        name: 'black',
        color: '#020100'
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

class HairColorSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      sourceName: sourcesNames.has(props.source)
        ? sourcesNames.get(props.source)
        : sourcesNames.get('arasaac'),
      hairColorMenu: hairColorSources.has(props.source)
        ? hairColorSources.get(props.source)
        : hairColorSources.get('arasaac')
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
    const hairColorLabel = `${this.state.sourceName} ${intl.formatMessage(
      messages.hairColor
    )}`;

    return (
      <SpeedDial
        ariaLabel={hairColorLabel}
        icon={<Face />}
        direction="down"
        open={this.state.open}
        onClose={() => this.handleClose()}
        onOpen={() => this.handleOpen()}
      >
        {this.state.hairColorMenu.map(hairColor => (
          <SpeedDialAction
            key={hairColor.name}
            icon={<Face />}
            tooltipTitle={hairColor.name}
            onClick={() => this.handleChange(hairColor.name, onChange)}
          />
        ))}
      </SpeedDial>
    );
  }
}

HairColorSelect.propTypes = propTypes;
export default injectIntl(HairColorSelect);
