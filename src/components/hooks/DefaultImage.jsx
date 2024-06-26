const useDefaultImage = (item) => {
  if (item?.photo && item.photo !== "null") {
    return item.photo;
  }
  switch (item?.gender) {
    case 1:
      return "/images/male.png";
    case 2:
      return "/images/female.png";
    default:
      return "/images/agender.png";
  }
};
export default useDefaultImage;
