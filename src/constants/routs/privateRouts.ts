import Home from 'pages/Home/Home';
import Budgets from 'pages/Budgets/Budgets';
import NewSubscription from 'pages/NewSubscription/NewSubscription';
import CalendarPage from 'pages/CalendarPage/CalendarPage';
import CreditCards from 'pages/CreditCards/CreditCards';
import Settings from 'pages/Settings/Settings';
import { PRIVATE_PATHS } from '../paths/privatePaths';

const { HOME, BUDGETS, CALENDAR, CARDS, NEW_SUBSCRIPTION, SETTINGS } = PRIVATE_PATHS;

export const PRIVATE_ROUTS = [
  { path: HOME, Component: Home },
  { path: BUDGETS, Component: Budgets },
  { path: NEW_SUBSCRIPTION, Component: NewSubscription },
  { path: CALENDAR, Component: CalendarPage },
  { path: CARDS, Component: CreditCards },
  { path: SETTINGS, Component: Settings },
];
