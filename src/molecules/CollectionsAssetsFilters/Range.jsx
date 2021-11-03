import React, { useEffect, useState } from 'react';
import Slider from '@material-ui/core/Slider';
// import Slider from '@mui/material/Slider';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const CustomRange = ({ traits, traitType }) => {
  const getValues = (arr) => {
    const newArr = [];
    arr.map((trait) => {
      newArr.push(trait.value);
    });

    return newArr;
  };

  const [value, setValue] = React.useState([
    Math.min.apply(null, getValues(traits)),
    Math.max.apply(null, getValues(traits)),
  ]);

  const [minValue, setMinValue] = useState(
    Math.min.apply(null, getValues(traits))
  );
  const [maxValue, setMaxValue] = useState(
    Math.max.apply(null, getValues(traits))
  );

  const handleChange = (sliderValues) => {
    setValue(sliderValues);
  };

  const handleMinChange = (e) => {
    if (
      e.target.value < Math.min.apply(null, getValues(traits)) ||
      e.target.value > Math.max.apply(null, getValues(traits))
    ) {
      return setValue([value[0], value[1]]);
    }
    setValue([e.target.value, value[1]]);
    console.log({
      traitType,
      range: [parseFloat(e.target.value), value[1]],
      min: parseFloat(e.target.value),
      max: value[1],
    });
  };

  const handleMaxChange = (e) => {
    if (
      e.target.value > Math.max.apply(null, getValues(traits)) ||
      e.target.value < Math.min.apply(null, getValues(traits))
    ) {
      return setValue([value[0], value[1]]);
    } else {
      setValue([value[0], e.target.value]);
      console.log({
        traitType,
        range: [value[0], parseFloat(e.target.value)],
        min: value[0],
        max: parseFloat(e.target.value),
      });
    }
  };

  useEffect(() => {
    setMinValue(value[0]);
    setMaxValue(value[1]);
  }, [value]);

  if (Number.isInteger(Math.max.apply(null, getValues(traits)))) {
    return (
      <>
        <Range
          className='range'
          defaultValue={value}
          tabIndex={value}
          onChange={handleChange}
          min={Math.min.apply(null, getValues(traits))}
          max={Math.max.apply(null, getValues(traits))}
          onAfterChange={(value) =>
            console.log({
              traitType,
              range: value,
              min: value[0],
              max: value[1],
            })
          }
          value={value}
        />

        <div className='range-number-inputs'>
          <input
            type='number'
            value={minValue}
            onKeyDown={(e) => e.key === 'Enter' && handleMinChange(e)}
            onChange={(e) => {
              setMinValue(e.target.value);
            }}
          />
          <small>-</small>
          <input
            type='number'
            value={maxValue}
            onKeyDown={(e) => e.key === 'Enter' && handleMaxChange(e)}
            onChange={(e) => setMaxValue(e.target.value)}
          />
        </div>
      </>
    );
  }

  // const countDecimals = function (value) {
  //   let decimals = null;

  //   if (Math.floor(value) !== value)
  //     decimals = value.toString().split('.')[1].length || 0;

  //   const arr = [];

  //   for (let i = 0; i < decimals; i++) {
  //     if (i === decimals - 1) {
  //       arr.push(1);
  //     } else {
  //       arr.push(0);
  //     }
  //   }

  //   return '0.' + arr.join('');
  // };

  return (
    <>
      <small className='text-white'>
        {value[0]} - {value[1]}
      </small>
      <Range
        className='range'
        defaultValue={value}
        tabIndex={value}
        onChange={handleChange}
        min={Math.min.apply(null, getValues(traits))}
        max={Math.max.apply(null, getValues(traits))}
        onAfterChange={(value) => console.log(value)}
        value={value}
        step={0.001}
      />
      <div className='range-number-inputs'>
        <input
          type='text'
          value={value[0]}
          onKeyDown={(e) => e.key === 'Enter' && handleMinChange(e)}
          onChange={(e) => {
            setMinValue(e.target.value);
          }}
        />
        <small>-</small>
        <input
          type='text'
          value={value[1]}
          onKeyDown={(e) => e.key === 'Enter' && handleMaxChange(e)}
          onChange={(e) => setMaxValue(e.target.value)}
        />
      </div>
    </>
  );
};

export default CustomRange;
