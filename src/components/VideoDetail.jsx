import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Typography, Box, Stack } from '@mui/material';

import { CheckCircle } from '@mui/icons-material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import { Videos } from "./";
import { fetchFromAPI } from './../utils/fetchFromAAPI';

const VideoDetail = () => {
  const [videoDetail, setviDeoDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
    .then((data) => {
      setviDeoDetail(data.items[0]);
    });

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then(data => setVideos(data.items));
  }, [id]);

  if(!videoDetail?.snippet) return "Loading...";
  const { snippet: { title, channelId, channelTitle },
          statistics: { viewCount, likeCount, commentCount } } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack
        direction={{ xs: "column", md: "row" }}
      >
        <Box flex={1}>
          <Box
            sx={{ width: "100%", position: "sticky" , top: "86px" }}
          >
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} 
              className="react-player" controls/>
              <Typography color="#fff" variant="h5"
                fontWeight="bold" p={2}
              >
                {title}
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ color: "#fff" }}
                py={1}
                px={2}
              >
                <Link to={`/channel/${channelId}`}>
                  <Typography variant="subtitle1"
                    color="#fff"
                  >
                    {channelTitle}
                    <CheckCircle sx={{ fontSize: "12px", color: "gray", ml: "5px"}}/>
                  </Typography>
                </Link>
                <Stack direction="row" gap="20px" alignItems="center">
                  <Typography color="#fff" variant="body1" sx = {{ opacity: 0.7 }}>
                    <RemoveRedEyeIcon sx={{ fontSize: "16px", color: "gray", mr: "5px"}}/>
                    {parseInt(viewCount).toLocaleString()}
                  </Typography>
                  <Typography color="#fff" variant="body1" sx = {{ opacity: 0.7 }}>
                    <ThumbUpIcon sx={{ fontSize: "16px", color: "gray", mr: "5px"}}/>
                    {parseInt(likeCount).toLocaleString()}
                  </Typography>
                  <Typography color="#fff" variant="body1" sx = {{ opacity: 0.7 }}>
                    <CommentIcon sx={{ fontSize: "16px", color: "gray", mr: "5px"}}/>
                    {parseInt(commentCount).toLocaleString()}
                  </Typography>
                </Stack>
              </Stack>
          </Box>
        </Box>
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center"
          alignItems="center"
        >
          <Videos videos={videos} direction="column"/>
        </Box>
      </Stack>
    </Box>
  )
}

export default VideoDetail