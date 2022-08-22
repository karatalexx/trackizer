import React from 'react';
import classNames from 'classnames/bind';
import { numberWithCommas } from '../../utils/numberWithCommas';
import { DonutData, HalfCircleProgressBarProps, ValueFromGenerateSvgPath } from './type';
import styles from './HalfCircleProgressBar.module.scss';

const cx = classNames.bind(styles);
// that part will be removed after the database is ready
const mockData = [
  {value: 500, colour: '#00FAD9'},
  {value: 500, colour: '#FF7966'},
  {value: 900, colour: '#AD7BFF'},

];

const HalfCircleProgressBar = ({ data, limitValue }: HalfCircleProgressBarProps) => {
  const STROKE_WIDTH = 3;
  const SEPARATOR_GAP = 4;

  const getPercent = (value: number, limit: number) => {
    const upperLimitPercent = (value*(((sumAllValues-limitValue)*100)/limitValue))/100;
    const newValue = value - upperLimitPercent;

    if (sumAllValues > limitValue) {
      return ((newValue * 100) / (limit)+SEPARATOR_GAP);
    } else if (sumAllValues === limitValue) {
      return (value * 100) / (limit)+SEPARATOR_GAP;
    }
    return (value * 100) / (limit)-SEPARATOR_GAP;
  };

  const sumAllValues = data.reduce((a, b) => a + b.value, 0);

  const countPercents = data.map((item) => {
    const limitWithoutCurrentValue = limitValue-item.value;

    if (item.value > 0){
      return {
        ...item,
        value: getPercent(item.value, limitWithoutCurrentValue)};
    }
    return item;
  });

  const getDashLength = (value: number): number => {
    if (value >= 4) {
      return value - SEPARATOR_GAP;
    }
    return 0;
  };

  const donutData = countPercents.map((item, index, array): DonutData => {
    const sum = array.slice(0, index).reduce((a, b) => a + b.value, 0);
    const dash = getDashLength(item.value);
    console.log(sum)
    return {
      stroke: item.colour,
      dashoffset: 157 - sum + SEPARATOR_GAP,
      dashArray: [dash, 157 - dash]
    }
  });

  const generateSvgPath = (arr: DonutData[]): ValueFromGenerateSvgPath => {
    return arr.reduce((a, item: DonutData) => {
      return {
        ...a,
        [item.stroke]: {
          d: 'M2,50 a 25 25 0 0 1 90 0',
          strokeWidth: `${STROKE_WIDTH}`,
          strokeLinecap: 'round',
          stroke: item.stroke,
          strokeDasharray: `${item.dashArray[0]} ${item.dashArray[1]}`,
          strokeDashoffset: item.dashoffset,
        }
      };
    }, {} as ValueFromGenerateSvgPath)
  };

  return (
    <div className={cx('container')}>
      <div className={cx('track')}>
        <svg id="donut" viewBox="0 2 94 45" overflow="visible">
          <path
            className={cx('grey')}
            d="M2,50 a 25 25 0 0 1 90 0"
            fill='none'
            stroke="rgba(78, 78, 97, 0.2)"
            overflow="visible"/>
          {Object.entries(generateSvgPath(donutData)).map((item) => {
            const {d, strokeWidth, strokeLinecap, stroke, strokeDasharray, strokeDashoffset} = item[1];
              return (
                <React.Fragment key={stroke}>
                  <path
                    filter={`url(#${stroke})`}
                    fill="none"
                    d={d}
                    strokeWidth={strokeWidth}
                    strokeLinecap={strokeLinecap}
                    stroke={stroke}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    key={stroke}
                    overflow="visible"
                    data-testid={stroke}
                  />
                  <filter id={stroke} overflow="visible">
                    <feDropShadow
                      dx="0"
                      dy="0"
                      stdDeviation="2"
                      floodColor={stroke}
                      overflow="visible"
                    />
                  </filter>
                </React.Fragment>
              )
          })}
        </svg>
      </div>
        <div className={cx('track__inner')}>
          <span className={cx('track__inner__sum')}>${numberWithCommas(sumAllValues)}</span>
          <span className={cx('track__inner__total')}>of ${numberWithCommas(limitValue)} budget</span>
        </div>
    </div>

  );
};
// that part will be removed after the database is ready
HalfCircleProgressBar.defaultProps = {
  data: mockData,
}

export default HalfCircleProgressBar;
