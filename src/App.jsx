import React, { useState, useRef, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import Swal from "sweetalert2";
import { BsVolumeUpFill, BsVolumeMuteFill } from "react-icons/bs";

import MouseStealing from "./MouseStealer.jsx";
import WordMareque from "./MarqueeProposal.jsx";

import lovesvg from "./assets/All You Need Is Love SVG Cut File.svg";
import Lovegif from "./assets/GifData/main_temp.gif";
import heartGif from "./assets/GifData/happy.gif";
import sadGif from "./assets/GifData/sad.gif";
import purposerose from "./assets/GifData/RoseCute.gif";
import swalbg from "./assets/Lovingbg2_main.jpg";
import loveu from "./assets/GifData/cutieSwal4.gif";

// YES GIFS
import yes0 from "./assets/GifData/Yes/lovecutie0.gif";
import yes1 from "./assets/GifData/Yes/love2.gif";
import yes2 from "./assets/GifData/Yes/love3.gif";
import yes3 from "./assets/GifData/Yes/love1.gif";
import yes4 from "./assets/GifData/Yes/lovecutie1.gif";
import yes5 from "./assets/GifData/Yes/lovecutie5.gif";
import yes6 from "./assets/GifData/Yes/lovecutie7.gif";
import yes7 from "./assets/GifData/Yes/lovecutie8.gif";
import yes8 from "./assets/GifData/Yes/lovecutie3.gif";
import yes9 from "./assets/GifData/Yes/lovecutie9.gif";
import yes10 from "./assets/GifData/Yes/lovecutie6.gif";
import yes11 from "./assets/GifData/Yes/lovecutie4.gif";

// NO GIFS
import no0 from "./assets/GifData/No/breakRej0.gif";
import no1 from "./assets/GifData/No/breakRej0_1.gif";
import no2 from "./assets/GifData/No/breakRej1.gif";
import no3 from "./assets/GifData/No/breakRej2.gif";
import no4 from "./assets/GifData/No/breakRej3.gif";
import no5 from "./assets/GifData/No/breakRej4.gif";
import no6 from "./assets/GifData/No/breakRej5.gif";
import no7 from "./assets/GifData/No/breakRej6.gif";
import no8 from "./assets/GifData/No/RejectNo.gif";
import no9 from "./assets/GifData/No/breakRej7.gif";

// MUSIC
import yesmusic1 from "./assets/AudioTracks/Love_LoveMeLikeYouDo.mp3";
import yesmusic2 from "./assets/AudioTracks/Love_EDPerfect.mp3";
import yesmusic3 from "./assets/AudioTracks/Love_Nadaaniyan.mp3";
import yesmusic4 from "./assets/AudioTracks/Love_JoTumMereHo.mp3";

import nomusic1 from "./assets/AudioTracks/Rejection_WeDontTalkAnyMore.mp3";
import nomusic2 from "./assets/AudioTracks/Rejection_LoseYouToLoveMe.mp3";
import nomusic3 from "./assets/AudioTracks/Reject_withoutMe.mp3";
import nomusic4 from "./assets/AudioTracks/Neutral_Base_IHateU.mp3";
import nomusic5 from "./assets/AudioTracks/Reject1_TooGood.mp3";

const HER_NAME = "Vanshika";

const YesGifs = [yes0, yes1, yes2, yes3, yes4, yes5, yes6, yes7, yes8, yes9, yes10, yes11];
const NoGifs = [no0, no1, no2, no3, no4, no5, no6, no7, no8, no9];
const YesMusic = [yesmusic1, yesmusic3, yesmusic4, yesmusic2];
const NoMusic = [nomusic1, nomusic2, nomusic3, nomusic4, nomusic5];

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [currentGifIndex, setCurrentGifIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [popupShown, setPopupShown] = useState(false);
  const [yespopupShown, setYesPopupShown] = useState(false);

  const gifRef = useRef(null);

  const yesButtonSize = Math.min(noCount * 16 + 16, 72);
  const [floatingGifs, setFloatingGifs] = useState([]);

  const spawnFloating = (src) => {
    const gifs = [];
    for (let i = 0; i < 10; i++) {
      gifs.push({
        id: i,
        src,
        style: {
          top: `${Math.random() * 80 + 10}vh`,
          left: `${Math.random() * 80 + 10}vw`,
        },
      });
    }
    setFloatingGifs(gifs);
  };

  const playMusic = (url, list) => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    const audio = new Audio(url);
    audio.muted = isMuted;
    audio.play();
    audio.onended = () => {
      const i = list.indexOf(url);
      playMusic(list[(i + 1) % list.length], list);
    };
    setCurrentAudio(audio);
  };

  const handleNoClick = () => {
    const next = noCount + 1;
    setNoCount(next);

    if (next >= 4 && gifRef.current) {
      gifRef.current.src = NoGifs[(next - 4) % NoGifs.length];
    }

    if (next === 1 || (next - 1) % 7 === 0) {
      playMusic(NoMusic[Math.floor(next / 7) % NoMusic.length], NoMusic);
    }
  };

  const handleYesClick = () => {
    if (yesPressed && noCount < 4 && !popupShown) {
      Swal.fire({
        title: `I love you sooo much, ${HER_NAME} ❤️  
But itni pyaari ladki aur itni jaldi haan? 🥹  
Thoda aur nakhre dikhao na 😌✨`,
        background: `#fff url(${swalbg})`,
        backdrop: `rgba(0,0,0,0.6) url(${loveu}) right no-repeat`,
      });
      setPopupShown(true);
      setYesPressed(false);
      return;
    }

    if (noCount > 3 && !yespopupShown) {
      playMusic(YesMusic[0], YesMusic);
      Swal.fire({
        title: `I love you so much, ${HER_NAME} ❤️  
You are my everything — my joy, my forever 💖  
<br/><br/>Will you be the love of my life forever? 💍`,
        background: `#fff url(${swalbg})`,
        backdrop: `rgba(0,0,0,0.7) url(${purposerose}) right no-repeat`,
      });
      setYesPopupShown(true);
      setYesPressed(true);
    } else {
      setYesPressed(true);
    }
  };

  const toggleMute = () => {
    if (currentAudio) currentAudio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Spline scene="https://prod.spline.design/oSxVDduGPlsuUIvT/scene.splinecode" />
      </div>

      {noCount > 16 && noCount < 25 && !yesPressed && <MouseStealing />}

      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        {yesPressed && noCount > 3 ? (
          <>
            <img ref={gifRef} src={YesGifs[currentGifIndex]} className="h-[230px] rounded-lg" />
            <h1 className="text-5xl font-bold mt-4">
              I Love You, {HER_NAME} ❤️
            </h1>
            <WordMareque />
          </>
        ) : (
          <>
            <img src={lovesvg} className="w-28 animate-pulse mb-4" />
            <img ref={gifRef} src={Lovegif} className="h-[230px] rounded-lg" />
            <h1 className="text-4xl mt-4">
              Will you be my Valentine, <span className="text-rose-600 font-bold">{HER_NAME}</span>?
            </h1>

            <div className="flex gap-4 mt-6 flex-wrap justify-center">
              <button
                onClick={handleYesClick}
                onMouseEnter={() => spawnFloating(heartGif)}
                className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg"
                style={{ fontSize: yesButtonSize }}
              >
                Yes
              </button>

              <button
                onClick={handleNoClick}
                onMouseEnter={() => spawnFloating(sadGif)}
                className="bg-rose-500 text-white font-bold py-2 px-4 rounded-lg"
              >
                No
              </button>
            </div>

            {floatingGifs.map((g) => (
              <img
                key={g.id}
                src={g.src}
                className="absolute w-12 h-12 animate-bounce"
                style={g.style}
              />
            ))}
          </>
        )}

        <button
          onClick={toggleMute}
          className="fixed bottom-6 right-6 bg-gray-200 p-2 rounded-full"
        >
          {isMuted ? <BsVolumeMuteFill size={24} /> : <BsVolumeUpFill size={24} />}
        </button>
      </div>
    </>
  );
}
