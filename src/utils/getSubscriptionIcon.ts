import { ReactComponent as Spotify } from '../assets/icons/spotify.svg';
import { ReactComponent as Youtube } from '../assets/icons/youtube.svg';
import { ReactComponent as Onedrive } from '../assets/icons/onedrive.svg';
import { ReactComponent as Netflix } from '../assets/icons/netflix.svg';
import { ReactComponent as HboG0 } from '../assets/icons/hbo.svg';

export const getSubscriptionIcon = (value: string) => {
  switch (value) {
    case 'Spotify':
      return Spotify;
    case 'YouTube Premium':
      return Youtube;
    case 'Microsoft OneDrive':
      return Onedrive;
    case 'Netflix':
      return Netflix;
    case 'HBO GO':
      return HboG0;
    default:
      return Spotify;
  }
};
