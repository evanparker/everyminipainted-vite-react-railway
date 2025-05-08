import getS3Url from "./getS3Url";

const S3Image = ({ image, width, height, blur, className }) => {
  const options = ["quality:80", "extend:1"];

  if (width) {
    options.push(`width:${width}`);
  }
  if (height) {
    options.push(`height:${height}`);
  }
  if (blur) {
    className += " blur-sm";
  }

  const url = getS3Url({
    options: options.join("/"),
    key: image.s3Key,
    bucket: image.s3Bucket,
    extension: "png",
  });
  return <img className={className} src={url} />;
};

export default S3Image;
