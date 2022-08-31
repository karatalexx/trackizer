import React, { ChangeEvent, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useSwipeable } from 'react-swipeable';
import { getSubscriptionIcon } from '../../utils/getSubscriptionIcon';
import styles from './SubscriptionCarousel.module.scss';

const cx = classNames.bind(styles);

export interface SubscriptionCarouselProps {
  onChange: (selectedSub: string) => void;
  list: {name: string; category: string}[];
}

const SubscriptionCarousel = ({ list, onChange }: SubscriptionCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [subsNamesList, setSubsNamesList] = useState<string[]>([]);

  const updateIndex = (newIndex: number) => {
    if (newIndex >= 0 && newIndex <= list?.length - 1) {
      return setActiveIndex(newIndex);
    }
    return setActiveIndex(0);
  };

  const handlers = useSwipeable({
    trackMouse: true,
    onSwipedLeft: () =>  updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1)
  });

  useEffect(() => {
    updateIndex(list?.length - 1)
  }, [list])

  const subsChangeHandler = (e: ChangeEvent<HTMLButtonElement>) => {
    setSubsNamesList((prevState) => [...prevState, e.target.textContent as string])
  };

  useEffect(() => {
    subsNamesList[activeIndex] && onChange(subsNamesList[activeIndex]);
  },[subsNamesList, activeIndex])

  return (
    <div className={cx('wrapper')}>
      <div {...handlers}  className={cx('carousel')}>
        <div
          className={cx('inner')}
          style={{
            transform: `translateX(-${(100 * activeIndex) / list?.length}%)`,
            marginLeft: `${100 / list?.length}vw`
          }}>
          {list?.map(({ name }, index) => {
            const Icon = getSubscriptionIcon(name);
            return(
              <div
                className={cx('inner__item')}
                key={name}
                style={{
                  transform: `scale(${activeIndex === index ? 1.7 : 1})`,
                  margin: `0 ${80 / list?.length}vw`}}>
                <button
                  autoFocus
                  onFocus={subsChangeHandler}
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
