import { Cloudinary } from "@cloudinary/url-gen";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";
import { scale } from "@cloudinary/url-gen/actions/resize";

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUD_NAME,
  },
});

function HeadTags({ name, description, thumbnail }) {
  const thumbnailImageURL = cld
    .image(thumbnail?.cloudinaryPublicId)
    .resize(scale().width(400).height(400))
    .delivery(format("auto"))
    .delivery(quality("auto"))
    .toURL();

  return (
    <>
      <title>{`EMP - ${name}`}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://linkfork.co/" />
      <meta property="og:title" content={`Every Mini Painted - ${name}`} />
      <meta property="og:image" content={thumbnailImageURL} />
    </>
  );
}

export default HeadTags;
