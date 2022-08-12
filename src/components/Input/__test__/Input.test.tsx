import React from 'react';
import Input from '../input';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockedOnChange = jest.fn();

describe('Input component', () => {
    it('component displayed on the page', () => {
        render(<Input label='label' value='test value' onChange={mockedOnChange}/>);
        expect(screen.getByRole('textbox')).toHaveValue('test value');
    });

    it('component display correct label', () => {
        render(<Input label='label' value='test value' onChange={mockedOnChange}/>);
        expect(screen.getByTestId('label')).toHaveTextContent('label');
    });

    it('onChange to work correctly', () => {
        render(<Input label='label' value='test value' onChange={mockedOnChange}/>);
        const input = screen.getByRole('textbox');
        userEvent.type(input, 'some text');

        expect(mockedOnChange).toHaveBeenCalled();
    });
});