import Skeleton from "@mui/material/Skeleton";

const SkeletonExplore = () => {
  return (
    <div className="grid grid-cols-3 gap-4 bg-white">
      {Array(15)
        .fill("")
        .map((el, idx) => (
          <Skeleton
            sx={{ height: 200 }}
            animation="wave"
            variant="rectangular"
          />
        ))}
    </div>
  );
};

export default SkeletonExplore;
