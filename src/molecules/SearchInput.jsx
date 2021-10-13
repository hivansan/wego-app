import React, { forwardRef, useEffect, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { BiSearch } from 'react-icons/bi';

const SearchInput = forwardRef((props, ref) => {
  const [isFocus, setIsFocus] = useState(false);

  const hasExtraClasses = props.className ? props.className : '';

  const handleChange = (e) => {
    props.onChange(e.target.value);

    if (props.setDebounceParam) {
      props.setDebounceParam(e.target.value);
    }
  };

  // useEffect(() => {
  //   if (props.dropDown) {
  //     if (isFocus && props.value !== '') {
  //       return props.setDropDownOpen(true);
  //     }
  //     // props.setDropDownOpen(false);
  //     if (props.isModalFocus) {
  //       return props.setDropDownOpen(true);
  //     }

  //     props.setDropDownOpen(false);
  //   }
  // }, [isFocus, props.isModalFocus]);

  return (
    <div
      className={`${hasExtraClasses} search-input`}
      onClick={() => ref.current.focus()}
    >
      <div className='input'>
        <BiSearch />
        <input
          type='text'
          placeholder='Search Nft, Collections, or Keyword'
          value={props.value}
          onChange={handleChange}
          ref={ref}
          onKeyDown={(e) => e.key === 'Enter' && props.onPressEnter()}
          onFocus={() => (props.onFocus ? props.onFocus() : false)}
          autoFocus
        />
      </div>

      {props.value.length > 0 && (
        <IoIosClose size={25} onClick={() => props.onChange('')} />
      )}
    </div>
  );
});

export default SearchInput;
