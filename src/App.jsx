import React, { useState, useRef, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import Swal from "sweetalert2";
import { BsVolumeUpFill, BsVolumeMuteFill } from "react-icons/bs";

import MouseStealing from "./MouseStealer.jsx";
import lovesvg from "./assets/All You Need Is Love SVG Cut File.svg";
import Lovegif from "./assets/GifData/main_temp.gif";
import heartGif from "./assets/GifData/happy.gif";
import sadGif from "./assets/GifData/sad.gif";
import WordMareque from "./MarqueeProposal.jsx";
import purposerose from "./assets/GifData/RoseCute.gif";
import swalbg from "./assets/Lovingbg2_main.jpg";
import loveu from "./assets/GifData/cutieSwal4.gif";

// ❤️ HER NAME
const HER_NAME = "Vanshika";

// YES GIFS
import yesgif0 from "./assets/GifData/Yes/lovecutie0.gif";
import yesgif1 from "./assets/GifData/Yes/love2.gif";
import yesgif2 from "./assets/GifData/Yes/love3.gif";
import yesgif3 from "./assets/GifData/Yes/love1.gif";
import yesgif4 from "./assets/GifData/Yes/lovecutie1.gif";
import yesgif5 from "./assets/GifData/Yes/lovecutie5.gif";
import yesgif6 from "./assets/GifData/Yes/lovecutie7.gif";
import yesgif7 from "./assets/GifData/Yes/lovecutie8.gif";
import yesgif8 from "./assets/GifData/Yes/lovecutie3.gif";
import yesgif9 from "./assets/GifData/Yes/lovecutie9.gif";
import yesgif10 from "./assets/GifData/Yes/lovecutie6.gif";
import yesgif11 from "./assets/GifData/Yes/lovecutie4.gif";

// NO GIFS
import nogif0 from "./assets/GifData/No/breakRej0.gif";
import nogif0_1 from "./assets/GifData/No/breakRej0_1.gif";
import nogif1 from "./assets/GifData/No/breakRej1.gif";
import nogif2 from "./assets/GifData/No/breakRej2.gif";
import nogif3 from "./assets/GifData/No/breakRej3.gif";
import nogif4 from "./assets/GifData/No/breakRej4.gif";
import nogif5 from "./assets/GifData/No/breakRej5.gif";
import nogif6 from "./assets/GifData/No/breakRej6.gif";
import nogif7 from "./assets/GifData/No/RejectNo.gif";
import nogif8 from "./assets/GifData/No/breakRej7.gif";

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

const YesGifs = [yesgif0, yesgif1, yesgif2, yesgif3, yesgif4, yesgif5, yesgif6, yesgif7, yesgif8, yesgif9, yesgif10, yesgif11];
const NoGifs = [nogif0, nogif0_1, nogif1, nogif2, nogif3, nogif4, nogif5, nogif6, nogif7, nogif8];
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

  // 🔒 size cap (mobile safe)
  const yesButtonSize = Math.min(noCount * 16 + 16, 72);

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

  const toggleMute = () => {
    if (currentAudio) currentAudio.muted = !isMuted;
    setIsMuted(!isMuted);
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

  return (
    <>
      {/* 🌌 Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Spline scene="https://prod.spline.design/oSxVDduGPlsuUIvT/scene.splinecode" />
      </div>

      {noCount > 16 && noCount < 25 && !yesPressed && <MouseStealing />}

      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
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
              Will you be my Valentine,{" "}
              <span className="text-rose-600 font-bold">{HER_NAME}</span>?
            </h1>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleYesClick}
                style={{ fontSize: yesButtonSize }}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Yes
              </button>

              <button
                onClick={handleNoClick}
                className="bg-rose-500 text-white px-4 py-2 rounded-lg"
              >
                No
              </button>
            </div>
          </>
        )}

        <button
          onClick={toggleMute}
          className="fixed bottom-6 right-6 bg-gray-200 p-2 rounded-full"
        >
          {isMuted ? <BsVolumeMuteFill size={26} /> : <BsVolumeUpFill size={26} />}
        </button>
      </div>
    </>
  );
}
