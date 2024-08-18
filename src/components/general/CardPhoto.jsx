import React from "react";

/**
 * Renders a photo card component.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.key - The unique key for the card.
 * @param {string} props.image - The URL of the image to be displayed in the card.
 * @param {string} props.caption - The caption for the image.
 * @return {JSX.Element} The photo card component.
 */
export default function CardPhoto(props) {
  return (
    <div className="col-md-4 mb-4">
      <div
        className="card border-0 shadow-sm rounded-3 text-center"
        key={props.key}
      >
        <div className="card-body mt-2">
          <div className="text-center mb-3">
            <img src={props.image} className="w-100 rounded" />
          </div>
          <hr />
          <h6>
            <i>{props.caption}</i>
          </h6>
        </div>
      </div>
    </div>
  );
}
