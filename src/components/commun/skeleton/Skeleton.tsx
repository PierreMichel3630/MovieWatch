import { Card, CardContent, Grid, Paper, Skeleton } from "@mui/material";
import { percent, px } from "csx";

export const CardSearchSkeleton = () => (
  <Card sx={{ height: percent(100) }}>
    <Skeleton
      variant="rectangular"
      sx={{ width: percent(100), height: px(250) }}
    />
    <CardContent>
      <Skeleton width="60%" />
      <Skeleton width="20%" />
      <Skeleton width="50%" />
      <Skeleton width="25%" />
      <Skeleton />
      <Skeleton />
      <Skeleton width="30%" />
    </CardContent>
  </Card>
);

export const CardActorSkeleton = () => (
  <Card sx={{ height: percent(100) }}>
    <Skeleton
      variant="rectangular"
      sx={{ width: percent(100), height: px(250) }}
    />
    <CardContent>
      <Skeleton width="60%" />
      <Skeleton width="20%" />
    </CardContent>
  </Card>
);

export const CardMovieSerieSkeleton = () => (
  <Card sx={{ height: percent(100) }}>
    <Skeleton
      variant="rectangular"
      sx={{ width: percent(100), height: px(250) }}
    />
    <CardContent>
      <Skeleton width="60%" />
      <Skeleton width="20%" />
    </CardContent>
  </Card>
);

export const CardEpisodeSkeleton = () => (
  <Card sx={{ height: percent(100) }}>
    <Grid container>
      <Grid item xs={12} sm={4}>
        <Skeleton
          variant="rectangular"
          sx={{ width: percent(100), height: px(200) }}
        />
      </Grid>
      <Grid item xs={12} sm={8}>
        <CardContent>
          <Skeleton variant="text" width="30%" sx={{ fontSize: px(16) }} />
          <Skeleton variant="text" width="100%" sx={{ fontSize: px(13) }} />
          <Skeleton variant="text" width="100%" sx={{ fontSize: px(13) }} />
          <Skeleton variant="text" width="100%" sx={{ fontSize: px(13) }} />
          <Skeleton variant="text" width="15%" sx={{ fontSize: px(13) }} />
        </CardContent>
      </Grid>
    </Grid>
  </Card>
);

export const EpisodeSkeleton = () => (
  <>
    <Grid item xs={12} sm={3}>
      <Skeleton
        variant="rectangular"
        sx={{ width: percent(100), height: px(150) }}
      />
    </Grid>
    <Grid item xs={12} sm={9}>
      <Skeleton width="40%" />
      <Skeleton width="100%" />
      <Skeleton width="100%" />
      <Skeleton width="20%" />
    </Grid>
  </>
);

export const NavigateEpisodeSkeleton = () => (
  <Skeleton
    variant="rectangular"
    sx={{ width: percent(100), height: px(30) }}
  />
);

export const PhotoSkeleton = () => (
  <Skeleton
    variant="rectangular"
    sx={{ width: percent(100), height: px(150) }}
  />
);

export const VideoSkeleton = () => (
  <Skeleton
    variant="rectangular"
    sx={{ width: percent(100), height: px(480) }}
  />
);

interface PropsChip {
  width?: number;
  height?: number;
}

export const ChipSkeleton = ({ width = 80, height = 32 }: PropsChip) => (
  <Skeleton
    variant="rectangular"
    sx={{ width: px(width), height: px(height), borderRadius: px(16) }}
  />
);

export const CardSkeleton = () => (
  <Card sx={{ height: percent(100) }}>
    <Skeleton
      variant="rectangular"
      sx={{ width: percent(100), height: px(250) }}
    />
    <CardContent>
      <Skeleton width="60%" />
      <Skeleton width="20%" />
    </CardContent>
  </Card>
);

export const ReviewSkeleton = () => (
  <Paper elevation={3} sx={{ p: 2, width: percent(100) }}>
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <Skeleton variant="circular" width={50} height={50} />
          </Grid>
          <Grid item>
            <Skeleton width={200} />
            <Skeleton width={185} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Skeleton width="20%" />
        <Skeleton width="100%" />
        <Skeleton width="100%" />
        <Skeleton width="60%" />
        <Skeleton width="100%" />
        <Skeleton width="100%" />
        <Skeleton width="30%" />
      </Grid>
    </Grid>
  </Paper>
);
