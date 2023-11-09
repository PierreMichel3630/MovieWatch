import { Box, Grid, Paper, Typography } from "@mui/material";
import moment from "moment";
import { Review } from "src/models/commun/Review";
import { UsernameAvatar } from "./Avatar";

import StarIcon from "@mui/icons-material/Star";
import { padding } from "csx";

interface Props {
  review: Review;
}

export const ReviewMessage = ({ review }: Props) => (
  <Paper elevation={3} sx={{ p: 2 }}>
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <UsernameAvatar
              username={review.author}
              img={
                review.author_details.avatar_path !== null
                  ? `https://image.tmdb.org/t/p/w45_and_h45_face${review.author_details.avatar_path}`
                  : null
              }
            />
          </Grid>
          <Grid item>
            <Typography variant="h2">{review.author}</Typography>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
              }}
            >
              {review.author_details.rating !== null && (
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    padding: padding(1, 5),
                    alignItems: "center",
                    border: "2px solid",
                    borderRadius: 2,
                    borderColor: "secondary",
                    width: "fit-content",
                  }}
                >
                  <StarIcon fontSize="small" />
                  <Typography variant="body1">
                    {review.author_details.rating.toFixed(1)}
                  </Typography>
                </Box>
              )}
              <Typography variant="body1">
                {moment(review.created_at).format("DD MMMM YYYY")}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
          {review.content}
        </Typography>
      </Grid>
    </Grid>
  </Paper>
);
