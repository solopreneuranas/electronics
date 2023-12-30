import { TextField, InputAdornment } from "@mui/material";
import Search from '@mui/icons-material/Search'

export default function SearchComponent(props) {

  return (
    <div style={{ display: 'flex', background: '#fff', height: 55, padding: '0 30px', borderRadius: 6, alignItems: 'center', margin: 'auto' }}>
      <TextField
        hiddenLabel
        placeholder="What are you looking for?"
        variant="standard"
        size="small"
        fullWidth

        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          ),
        }}
      />
    </div>)


}