import React from 'react';
import Calendar from '../Calendar';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockedOnClick = jest.fn();
const mockedSetSelectedMonth = jest.fn();
const mockedSetSelectedDate = jest.fn();
const date = new Date();

describe('Calendar component', () => {
    it('component displayed on the page', () => {
        render(<Calendar
          onClick={mockedOnClick}
          selectedMothHandler={mockedSetSelectedMonth}
          selectedDateHandler={mockedSetSelectedDate}
        />);

        expect(screen.getByText(/today/i)).toBeInTheDocument();
    });

    it('button onClick to work correctly', () => {
        render(<Calendar
          onClick={mockedOnClick}
          selectedMothHandler={mockedSetSelectedMonth}
          selectedDateHandler={mockedSetSelectedDate}
        />);

        const btn = screen.getByText(date.toLocaleString('default',{day: '2-digit'}))
        userEvent.click(btn);

        expect(mockedOnClick).toHaveBeenCalled();
    });

    it('onClick to work correctly', async  () => {
        render(<Calendar
          onClick={mockedOnClick}
          selectedMothHandler={mockedSetSelectedMonth}
          selectedDateHandler={mockedSetSelectedDate}
        />);

        const nextMonth = date.setMonth(date.getMonth() + 1);
        const currentMonth = screen.getByText(date.toLocaleDateString('en-US', { month: 'long' }));
        const nextMonthValue = new Date(nextMonth).toLocaleDateString('en-US', { month: 'long' });

        userEvent.click(currentMonth);
        userEvent.click(await screen.findByText(nextMonthValue));

        expect(screen.getByText(nextMonthValue)).toBeInTheDocument();
    });
});