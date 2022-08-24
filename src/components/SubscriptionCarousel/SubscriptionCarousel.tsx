import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import styles from './SubscriptionCarousel.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export interface SubscriptionCarouselProps {
  children: ReactElement[];
  onChange: (selectedSub: string) => void;
}

const SubscriptionCarousel = ({ children, onChange }: SubscriptionCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [subsNamesList, setSubsNamesList] = useState<string[]>([]);

  const updateIndex = (newIndex: number) => {
    if (newIndex >= 0 && newIndex <= children.length - 1)setActiveIndex(newIndex);
  };

  const handlers = useSwipeable({
    trackMouse: true,
    onSwipedLeft: () =>  updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1)
  });


  const subsChangeHandler = (e: ChangeEvent<HTMLButtonElement>) => {
    setSubsNamesList((prevState) => [...prevState, e.target.textContent as string])
  };

  useEffect(() => {
    subsNamesList[activeIndex] && onChange(subsNamesList[activeIndex]);
  },[subsNamesList, activeIndex])

  return (
    <div {...handlers}  className={cx('carousel')}>
      <div
        className={cx('inner')}
        style={{ transform: `translateX(-${activeIndex * (100 / children.length)}%)` }}>
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(
            <div className={cx('inner__item')} style={{ transform: `scale(${activeIndex === index ? 1.7 : 1})`}}>
              <div className={cx('carousel-item')}>
                <button
                  autoFocus
                  onFocus={subsChangeHandler}
                  className={cx('carousel-item-inner')}
                  data-testid={index}>
                    {child}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubscriptionCarousel;
