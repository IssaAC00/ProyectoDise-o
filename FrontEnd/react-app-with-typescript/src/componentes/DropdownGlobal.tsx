import React, {useRef, useState , MouseEvent } from 'react';
//import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function DropdownsGlobal ( ){

  const [selectedOption, setSelectedOption] = useState<String>();

  const options = [
    {label:'React', value: 'react'},
    {label:'ReactNative', value: 'react-native'},
    {label:'JavaScript', value: 'js'},
    {label:'CSS', value: 'css'}
  
  ];
    

    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      setSelectedOption(value);
    };
  
  return (
    <div style={styles.container}>
    <select onChange={selectChange} style={styles.select}>
    <option value="">Select</option>
      {options.map((options) => (
      <option key={options.label} value={options.value}>
      {options.label}
    </option>
  ))}
    </select>
    {selectedOption && <h2 style={styles.result}>{selectedOption}</h2>}
  </div>
  )


};


const styles: { [name: string]: React.CSSProperties } = {
  container: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  select: {
    padding: 5,
    width: 200,
  },
  result: {
    marginTop: 30,
  },
};