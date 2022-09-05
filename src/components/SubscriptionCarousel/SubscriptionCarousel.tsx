import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useSwipeable } from 'react-swipeable';
import { getSubscriptionIcon } from '../../utils/getSubscriptionIcon';
import styles from './SubscriptionCarousel.module.scss';

const cx = classNames.bind(styles);

export interface SubscriptionCarouselProps {
  onChange: (name: string, category: string) => void;
  list: {name: string; category: string}[];
}

const SubscriptionCarousel = ({ list, onChange }: SubscriptionCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedApp, setSelectedApp] = useState<{name: string, category: string} | null>(null);

  const updateIndex = (newIndex: number) => {
    if (newIndex >= 0 && newIndex <= list?.length - 1) {
      subsChangeHandler(newIndex);
      return setActiveIndex(newIndex);
    }
    subsChangeHandler(newIndex);
    return setActiveIndex(0);
  };

  const handlers = useSwipeable({
    trackMouse: true,
    onSwipedLeft: () =>  updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1)
  });

  const subsChangeHandler = (index: number) => {
    if (list?.length) setSelectedApp(list[index]);
  };

  useEffect(() => {
    selectedApp && onChange(selectedApp.name, selectedApp.category);
  },[selectedApp, activeIndex]);

  useEffect(() => {
    if (list) setSelectedApp(list[activeIndex]);
  }, [list, activeIndex]);

  return (
    <div className={cx('wrapper')}>
      <div {...handlers}  className={cx('carousel')}>
        <div
          className={cx('inner')}
          style={{
            minWidth: `${100 * list?.length}%`,
            transform: `translateX(-${(100 * activeIndex) / list?.length}%)`,
          }}>
          {list?.map(({ name }, index) => {
            const Icon = getSubscriptionIcon(name);
            return(
              <div
                className={cx('inner__item', {focused: activeIndex === index})}
                key={name}>
                <button
                  className={cx('carousel-item-inner')}
                  data-testid={index}>
                  <Icon />
                  <span>{name}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCarousel;
