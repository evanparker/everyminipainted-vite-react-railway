import { Cloudinary } from "@cloudinary/url-gen";
import { pad } from "@cloudinary/url-gen/actions/resize";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";
import { AdvancedImage } from "@cloudinary/react";

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUD_NAME,
  },
});

const CldThumbnailImage = ({ publicId, width, height }) => {
  let thumb = pad();
  if (width !== undefined) {
    thumb = thumb.width(width);
  }
  if (height !== undefined) {
    thumb = thumb.height(height);
  }
  const myImage = cld
    .image(publicId)
    .delivery(format("auto"))
    .delivery(quality("auto:good"))
    .resize(thumb);
  return <AdvancedImage cldImg={myImage} style={{ maxWidth: "100%" }} />;
};
export default CldThumbnailImage;
