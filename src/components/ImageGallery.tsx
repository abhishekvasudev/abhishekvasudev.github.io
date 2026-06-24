interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  if (images.length === 0) return null;

  return (
    <div className="article-gallery">
      {images.map((image) =>
        image.caption ? (
          <figure key={image.src} className="article-gallery-item">
            <img src={image.src} alt={image.alt} loading="lazy" />
            <figcaption>{image.caption}</figcaption>
          </figure>
        ) : (
          <img key={image.src} src={image.src} alt={image.alt} loading="lazy" />
        ),
      )}
    </div>
  );
}
