import React, { useState } from 'react';
import jsonData from '../data.json';

const Row = ({ data, level = 0 }) => {
  const [selected, setSelected] = useState(false);
  const hasChildren = data.children && data.children.length > 0;
  const [expanded, setExpanded] = useState(false);

  const handleRowClick = () => {
    setSelected(!selected);
  };

  const toggleExpand = (e) => {
    e.stopPropagation(); 
    if (hasChildren) {
      setExpanded(!expanded);
    }
  };

  return (
    <>
      <div
        onClick={handleRowClick}
        className={`cursor-pointer px-6 py-4 flex border-b border-gray-200 hover:bg-gray-100 transition duration-150 ease-in-out ${
          selected ? 'bg-gray-500' : 'bg-transparent'
        } hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200`}
        style={{
          paddingLeft: `${20 + level * 20}px`, 
        }}
      >
        <div className="flex-grow flex items-center">
          {hasChildren && (
            <span
              onClick={toggleExpand}
              className="material-icons cursor-pointer mr-2"
            >
              {expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}
            </span>
          )}
          <div className={`flex-grow ${!hasChildren ? 'ml-4' : ''}`}>{data.id}</div>
        </div>
        <div className="flex-grow">{data.text1}</div>
        <div className="flex-grow">{data.text2}</div>
      </div>
      {hasChildren && expanded &&
        <div
          className={`overflow-hidden transition-[max-height] duration-700 ease-in-out ${expanded ? 'max-h-96' : 'max-h-0'}`}
        >
          {data.children.map((child) => <Row key={child.id} data={child} level={level + 1} />)}
        </div>
      }
    </>
  );
};

const Table = () => {
  return (
    <div className='p-10 h-screen bg-gradient-to-b from-white to-gray-500 flex flex-col'>
      <h1 className="text-3xl text-center font-bold text-purple-700 mt-8 mb-4 bg-purple-300 bg-opacity-25 backdrop-blur-md p-4 rounded-lg shadow-lg">
        TABLE DATA
      </h1>

      <div className="flex flex-col flex-1">
        <div className="mb-2">
          <div className="px-4 py-4 flex font-bold text-left bg-gray-400 border-b border-gray-200 rounded-xl">
            <div className="flex-grow font-bold text-2xl">ID</div>
            <div className="flex-grow font-bold text-2xl">Text 1</div>
            <div className="flex-grow font-bold text-2xl">Text 2</div>
          </div>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          {jsonData.rows.map((row) => (
            <Row key={row.id} data={row} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
