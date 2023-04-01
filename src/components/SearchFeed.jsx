import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Videos } from './';
import { useParams } from "react-router-dom";

import { fetchFromAPI } from "../utils/fetchFromAAPI";

const SearchFeed = () => {

  const [videos, setVideos] = useState([]);

  const { searchItem } = useParams();

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchItem}`)
      .then((data) => setVideos(data.items));
  }, [searchItem]);

  return (
    <Box p={2} sx={{ overflowY:"auto", height:"90vh", flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} 
          sx={{ color: "white"}}>
          Search results for <span style={{ color: "#f31503"}}>{ searchItem }</span>
        </Typography>
        <Videos videos={videos} />
    </Box>
  )
}

export default SearchFeed