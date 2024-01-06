import { TextField, InputAdornment } from "@mui/material";
import Search from '@mui/icons-material/Search'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../../../services/FetchNodeServices";

export default function SearchComponent(props) {

  var navigate = useNavigate()
  const [text, setText] = useState('')

  const fetchProducts = async () => {
    var respone = await postData('ui-Home/filter_products', { 'text': text })
    return respone.data
  }

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      fetchProducts().then((respone) => {
        navigate('/store', { state: { result: respone } })
        window.scrollTo(0, 0)
      })
    }
  }

  return (
    <div style={{ display: 'flex', background: '#fff', height: 55, padding: '0 30px', borderRadius: 6, alignItems: 'center', margin: 'auto' }}>
      <TextField
        onKeyPress={handleSearch}
        onChange={(e) => setText(e.target.value)}
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