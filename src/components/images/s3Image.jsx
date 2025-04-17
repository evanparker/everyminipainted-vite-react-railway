const getUrl = ({
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

const S3Image = ({ image, width, height, className }) => {
  const options = ["quality:80", "extend:1"];

  if (width) {
    options.push(`width:${width}`);
  }
  if (height) {
    options.push(`height:${height}`);
  }

  const url = getUrl({
    options: options.join("/"),
    key: image.s3Key,
    bucket: image.s3Bucket,
    extension: "png",
  });
  return <img className={className} src={url} />;
};

export default S3Image;
