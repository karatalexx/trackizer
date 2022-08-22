import React from 'react';
import CategoryItem from '../CategoryItem';
import { render, screen } from '@testing-library/react';


describe('CategoryItem component', () => {
    it('component displayed on the page', () => {
        render(<CategoryItem currentValue={300} limitValue={400} color='#00FAD9' name='Auto & Transport' />);
        const checkbox = screen.getByText('Auto & Transport');

        expect(checkbox).toBeInTheDocument();
    });

});
