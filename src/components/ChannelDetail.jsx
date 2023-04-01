import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";
import { Videos, ChannelCard } from "./"
import { fetchFromAPI } from './../utils/fetchFromAAPI';


const ChannelDetail = () => {

  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`)
      .then((data) => setChannelDetail(data?.items[0]));
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
      .then((data) => setVideos(data?.items));
  }, [id])


  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(118,121,9,1) 0%, rgba(0,212,255,1) 66%)",
          zIndex: 10,
          height: "300px",
        }}
        />
        <ChannelCard channel={channelDetail} mt="-110px"/>
      </Box>
      <Box display="flex" p={2}>
        <Box
          sx={{
            mr: { sm: "100px" }
          }}
        />
        <Videos videos={videos} />
      </Box>
    </Box>
  )
}

export default ChannelDetail