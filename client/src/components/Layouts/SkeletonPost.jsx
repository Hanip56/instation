import Skeleton from "@mui/material/Skeleton";

const SkeletonPost = () => {
  return (
    <div className="flex flex-col border h-[32rem] w-[90%] sm:w-[32rem] mx-auto rounded-md bg-white">
      <div className="flex items-center gap-2 p-2">
        <Skeleton animation="wave" variant="circular" width={40} height={38} />
        <div className="flex flex-col gap-1 w-full">
          <Skeleton
            height={10}
            variant="rectangular"
            width="25%"
            animation="wave"
          />
          <Skeleton
            height={10}
            variant="rectangular"
            width="20%"
            animation="wave"
          />
        </div>
      </div>
      <Skeleton sx={{ height: 520 }} animation="wave" variant="rectangular" />
    </div>
  );
};

export default SkeletonPost;
