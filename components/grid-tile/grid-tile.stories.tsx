import React from 'react';

import GridTile from './grid-tile.component';

const Template = (args) => (
  <ul>
    <GridTile {...args} />
  </ul>
);

export default {
  title: 'Components/GridTile',
  component: GridTile,
};

export const Normal = Template.bind({});

Normal.args = {
  label: 'Whizz-Kidz Clubs',
  isBig: false,
  linkProps: { href: '/' },
};

export const Big = Template.bind({});

Big.args = {
  label: 'Whizz-Kidz Clubs',
  isBig: true,
  linkProps: { href: '/' },
};
