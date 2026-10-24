import React, { useState, useCallback } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import RenderImage from "./RenderImages";
import PropTypes from "prop-types";

function MasonryGal({ photos = [] }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const slides = photos.map(x => ({
    src: x.src,
    alt: x.alt || x.title || "",
    title: x.title,
  }));

  return (
    <div>
      <div className="columns is-multiline is-variable is-1">
        {photos.map((photo, index) => (
          <div key={photo.src || index} className="column is-6-tablet is-4-desktop">
            <RenderImage index={index} photo={photo} onClick={openLightbox} />
          </div>
        ))}
      </div>
      <Lightbox
        open={viewerIsOpen}
        close={closeLightbox}
        index={currentImage}
        slides={slides}
        plugins={[Captions]}
      />
    </div>
  );
}

MasonryGal.propTypes = {
  photos: PropTypes.array,
};

export default MasonryGal;
