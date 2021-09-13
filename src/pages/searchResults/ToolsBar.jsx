import React, { useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

const ToolsBar = ({ isToolsBarOpen }) => {
  const [isTypeToolsOpen, setIsTypeToolsOpen] = useState(false);
  const [isSizeToolsOpen, setIsSizeToolsOpen] = useState(false);

  const typeOptions = ['JPG', 'PNG', 'GIF', 'SVG', 'MP4'];
  const sizeOption = ['Large', 'Medium', 'Small'];

  return (
    <>
      {isToolsBarOpen && (
        <div className='tools'>
          <div
            className='tool'
            onClick={() => setIsTypeToolsOpen(!isTypeToolsOpen)}
          >
            <p>
              Type
              {isTypeToolsOpen ? (
                <AiFillCaretUp size={12} />
              ) : (
                <AiFillCaretDown size={12} />
              )}
            </p>
            {isTypeToolsOpen && (
              <div className='drop-down-tool'>
                <ul>
                  {typeOptions.map((type) => (
                    <li key={type} onClick={() => alert(type)}>
                      <small>{type}</small>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div
            className='tool'
            onClick={() => setIsSizeToolsOpen(!isSizeToolsOpen)}
          >
            <p>
              Size
              {isSizeToolsOpen ? (
                <AiFillCaretUp size={12} />
              ) : (
                <AiFillCaretDown size={12} />
              )}
            </p>
            {isSizeToolsOpen && (
              <div className='drop-down-tool'>
                <ul>
                  {sizeOption.map((type) => (
                    <li key={type} onClick={() => alert(type)}>
                      <small>{type}</small>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ToolsBar;
