const getS3Url = ({
  signature = "insecure",
  options = "",
  key,
  bucket,
  extension = "jpg",
}) => {
  const s3address = `s3://${bucket}/${key}`;
  const url = `${
    import.meta.env.VITE_IMGPROXY_URL
  }/${signature}/${options}/${window.btoa(s3address)}.${extension}`;
  return url;
};

export default getS3Url;
