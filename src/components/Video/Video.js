import React, { useState } from 'react';
import { AUTOPLAY } from '../../config'
import PropTypes from "prop-types";

const Video = (({
                  url,
                  type,
                  timeUpdateHandler,
                  videoRef,
                  onPlayStart,
                  onPlayEnd,
                  onSeeked,
                  muted,
                  autoPlay
                }) => {
  const [startOnPlay, setStartOnPlay] = useState(true);

  const playHandler = () => {
    if (startOnPlay){
      onPlayStart()
      setStartOnPlay(false)
    }
  }

  return (
    <video
      onTimeUpdate={ timeUpdateHandler }
      onEnded={ onPlayEnd }
      onPlay={ playHandler }
      onSeeked={ onSeeked }
      ref={ videoRef }
      muted={ muted }
      autoPlay={ autoPlay }
      controls
      playsInline >
      <source
        src={ url }
        type={ type }/>
      <p>This browser does not support the video type { type }</p>
    </video>
  );

});

Video.propTypes = {
  handleClick: PropTypes.func,
  type: PropTypes.string
};

/* Chrome's autoplay policies: muted autoplay is allowed */
Video.defaultProps = {
  type: '',
  autoPlay: AUTOPLAY,
  muted: AUTOPLAY
};

export default Video;