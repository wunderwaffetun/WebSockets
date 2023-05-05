import  React from 'react'; 
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const representInn = ( arr ) => {
  const obj = []
  arr.forEach( (inn, id) => {obj.push({label: inn.toString(), id})});
  return obj
}



export const AutoComplete = ( {INNs, updateRef} ) => {
  
  const [ value, setValue ] = React.useState('')
  const [ inputValue, setInputValue ] = React.useState('')
  
  React.useEffect(() => {
    updateRef(inputValue)
  }, [value, inputValue])
  

  

  const [ ins, setInns ] = React.useState(representInn(INNs))

  return (
    <Autocomplete
      inputValue={inputValue}
      value={value}
      autoSelect={false}
      freeSolo
      clearOnBlur={false}
      onChange={(e, newValue) => { setValue(newValue);  }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      // disablePortal
      onBlur={() => {updateRef(inputValue)}}
      id="combo-box-demo"
      options={ins}
      sx={{ width: 300 }}
      isOptionEqualToValue={(option, value) => {
        return option.id === value.id
      }}
      renderOption={(props, option) => {
        return <li
          {...props}
          key={option.id}
        >{option.label}</li>
      } }
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
  )
}
