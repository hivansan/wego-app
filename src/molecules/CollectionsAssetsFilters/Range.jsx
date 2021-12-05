import React, { useEffect, useState } from 'react';
import Slider from '@material-ui/core/Slider';
// import Slider from '@mui/material/Slider';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const CustomRange = ({ traits, traitType }) => {
  const getValues = (arr) => arr.map((t) => t.value);

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
    console.log({ [traitType]: { gt: value[0], lt: value[1] } });
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
        [traitType]: [{ gt: value[0], lt: parseFloat(e.target.value) }],
        // range: [value[0], parseFloat(e.target.value)],
        // min: value[0],
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
            console.log(
              `http://localhost:3000/api/assets?slug=forgottenruneswizardscult&limit=20&offset=0&sortDirection=desc&traits={%22${traitType}%22:{%22min%22:${value[0]},%22max%22:${value[1]}}}`
              // [traitType]: { gt: value[0], lt: value[1] },
              // range: [value[0], parseFloat(e.target.value)],
              // min: value[0],
            )
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
        onAfterChange={(value) =>
          console.log({ [traitType]: { gt: value[0], lt: value[1] } })
        }
        value={value}
        step={0.001}
      />
      <div className='range-number-inputs'>
        <input
          type='number'
          value={minValue}
          onKeyDown={(e) => e.key === 'Enter' && handleMinChange(e)}
          onChange={(e) => setMinValue(e.target.value)}
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
};

export default CustomRange;
