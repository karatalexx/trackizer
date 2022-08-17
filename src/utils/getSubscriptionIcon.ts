import { ReactComponent as Spotify } from '../assets/icons/spotify.svg';
import { ReactComponent as Youtube } from '../assets/icons/youtube.svg';
import { ReactComponent as Onedrive } from '../assets/icons/onedrive.svg';

export const getSubscriptionIcon = (value: string) => {
  switch (value) {
    case 'Spotify':
      return Spotify;
    case 'YouTube Premium':
      return Youtube;
    case 'Microsoft OneDrive':
      return Onedrive;
    default:
      return Spotify;
  }
};
