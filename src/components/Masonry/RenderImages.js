import React from "react";
import * as PropTypes from "prop-types"
import { FormattedMessage } from 'react-intl';

const cont = {
  backgroundColor: "#eee",
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  borderRadius: "5px",
};

const RenderImage = ({
  index,
  onClick,
  photo,
}) => {
  const srcSet = Array.isArray(photo.srcSet) ? photo.srcSet.join(", ") : photo.srcSet;
  const sizes = Array.isArray(photo.sizes) ? photo.sizes.join(", ") : photo.sizes;

  return (
    <div style={cont}>
      <a
        href={photo.link}
        style={{ position: "absolute", left: "1.75rem", top: "2rem", zIndex: "4" }}
        className="tag is-primary is-medium"
      >
        <p className="has-text-centered has-text-light is-medium">
          {photo.title + ": "} <FormattedMessage id="find-out-more" />
        </p>
      </a>
      <img
        style={{ overflow: "hidden", display: "block", width: "100%", height: "auto" }}
        src={photo.src}
        srcSet={srcSet}
        sizes={sizes}
        loading="lazy"
        decoding="async"
        alt={photo.alt || photo.title || ""}
        title={photo.title}
        onClick={e => onClick(e, { index, photo })}
      />
    </div>
  );
};

RenderImage.propTypes = {
  index: PropTypes.number,
  onClick: PropTypes.func,
  photo: PropTypes.object,
}

export default RenderImage;
