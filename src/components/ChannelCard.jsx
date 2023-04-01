import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

import { demoProfilePicture } from "../utils/constants";

const ChannelCard = ({channel, mt}) => (
   <Box sx={{
    boxShadow: "none",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: { md:"320px", xs:"100%" },
    margin: "auto",
    mt
   }}>
    <Link to={`/channel/${channel?.id?.channelId}`}>
      <CardContent 
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff"
        }}
      >
        <CardMedia 
          image={channel?.snippet?.thumbnails?.high?.url 
          || demoProfilePicture}
          alt={channel?.snippet?.title}
          sx={{ 
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            mb:2,
            border: "1px solid #e3e3e3"
          }}
          />
          <Typography variant="h6">
          {channel?.snippet?.title}
          <CheckCircle sx={{ fontSize:14, color: "gray", ml: "5px"}}/>
          </Typography>
          {channel?.statistics?.subscriberCount && 
          (<Typography>
            {parseInt(channel?.statistics?.subscriberCount).toLocaleString()}
             Subscribers
          </Typography>)}
      </CardContent>
    </Link>
   </Box>
  )


export default ChannelCard