import React from 'react';
import SubsRatingItem from '../SubsRatingItem';
import { render, screen } from '@testing-library/react';

describe('SubsRatingItem component' ,() => {
  it('component displayed on the page', () => {
    render(<SubsRatingItem title='Active subs' value='12' color='rgba(255, 166, 153, 1)' />);
    expect(screen.getByTestId('rgba(255, 166, 153, 1)')).toBeInTheDocument();
  });
});
