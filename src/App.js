import React from 'react';
import InteractiveVideoAd from './components/InteractiveVideoAd/InteractiveVideoAd';
import { URLS, TIME_LINE } from './config'

function App() {

  return (
    <InteractiveVideoAd urls={ URLS } times={ TIME_LINE } videoType={'video/mp4'}/>
  );
}

export default App;
