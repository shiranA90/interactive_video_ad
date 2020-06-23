import React, { useState, useRef, useEffect } from 'react';
import TrackingPixel from '../TrackingPixel/TrackingPixel';
import Button from '../Button/Button';
import Video from '../Video/Video';
import { isAndroidType, isIOSType } from '../../utils'
import './InteractiveVideoAd.css';


const InteractiveVideoAd = ({ urls, videoType, times }) => {
  const [firstElementAppear, setFirstElementAppear] = useState(false)
  const [firstElementWasClicked, setFirstElementWasClicked] = useState(false)
  const [secondElementAppear, setSecondElementAppear] = useState(false)
  const [trackingPixelURL,setTrackingPixel] = useState('')
  const videoRef = useRef(null)

  useEffect(
    () => {
      if(firstElementAppear) {
        const timerHandler = setTimeout(() => {
          notClickAfterTenSecondsHandler()
        }, times.FIRST_ELEMENT_WAIT_CLICK * 1000);
        return () => {
          clearTimeout(timerHandler);
        };
      }
    },
    [firstElementAppear, videoRef]
  );

  /* The controls are removed when the first element appear
   * so the user can only choose to click the element or not
   */
  const videoTimeHandler = () => {
    if (videoRef.current.currentTime >= times.FIRST_ELEMENT &&
        videoRef.current.currentTime < times.FIRST_ELEMENT + 1 &&
        !firstElementWasClicked) {
      setFirstElementAppear(true)
      videoRef.current.pause()
      videoRef.current.removeAttribute('controls')
    }
    if (videoRef.current.currentTime >= times.SECOND_ELEMENT &&
        videoRef.current.currentTime < times.SECOND_ELEMENT + 1) {
      setSecondElementAppear(true)
    }
  }

  const firstElementRemove =  () => {
    setFirstElementAppear(false)
    videoRef.current.setAttribute('controls', 'true')
    videoRef.current.play()
  }

  const notClickAfterTenSecondsHandler = () => {
    if(!firstElementWasClicked){
      videoRef.current.currentTime = times.SECOND_ELEMENT;
      firstElementRemove()
    }
  }

  const OnClickFirstElementHandler = () => {
    setFirstElementWasClicked(true)
    firstElementRemove()
  }

  const onClickSecondElementHandler = () => {
    if (isAndroidType()) {
      window.location.href = urls.ANDROID
    }
    if (isIOSType()) {
      window.location.href = urls.IOS
    }
  }

  const onTrackingPixel = url => {
    setTrackingPixel(url)
  }

  const resetElement = () => {
    if (videoRef.current.currentTime < times.FIRST_ELEMENT + 1) {
      setFirstElementAppear(false)
      setFirstElementWasClicked(false)
    }
    if (videoRef.current.currentTime < times.SECOND_ELEMENT + 1) {
      setSecondElementAppear(false)
    }
  }

  return (
    <div className={ 'video-container' } >
      <Video
        url={ urls.VIDEO }
        type={ videoType }
        videoRef={ videoRef }
        timeUpdateHandler={ videoTimeHandler }
        onPlayEnd={ () => onTrackingPixel(urls.END_TRACKING) }
        onPlayStart={ () => onTrackingPixel(urls.START_TRACKING)}
        onSeeked={ resetElement }
      />
      { firstElementAppear && <Button handleClick={ OnClickFirstElementHandler }> Spin </Button> }
      { secondElementAppear && <Button handleClick={ onClickSecondElementHandler }> Download now </Button>}
      <TrackingPixel url={ trackingPixelURL }/>
    </div>
  );
}

export default InteractiveVideoAd;