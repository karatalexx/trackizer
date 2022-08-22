import { ReactComponent as Transport } from '../assets/icons/transport.svg';
import { ReactComponent as Entertainment } from '../assets/icons/entertaiment.svg';
import { ReactComponent as Security } from '../assets/icons/security.svg';

export const getCategoryIcon = (value: string) => {
    switch (value) {
        case 'Auto & Transport':
            return Transport;
        case 'Entertainment':
            return Entertainment;
        case 'Security':
            return Security;
        default:
            return Transport;
    }
};
