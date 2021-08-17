import React from 'react';

import GridTile from './grid-tile-basic.component';

const Template = (args) => (
  <ul>
    <GridTile {...args} />
  </ul>
);

export default {
  title: 'Components/GridTileBasic',
  component: GridTile,
};

export const Normal = Template.bind({});

Normal.args = {
  title: '212',
	fontSizeTitle: 30,
	bodyText: 'Reviewing older Whizz-Kidz wheelchairs',
	backgroundText: 'rgba(132, 189, 0, 0.6)',
  isBig: false
};

export const Big = Template.bind({});

Big.args = {
  title: '717',
	fontSizeTitle: 40,
	bodyText: 'Total number of young people helped with equipment or repair and maintenance',
	backgroundText: '#523178',
  isBig: true
};
