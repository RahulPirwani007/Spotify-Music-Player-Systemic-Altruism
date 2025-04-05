import React, { useState, useEffect, useRef } from "react";

const Hero = () => {
  let [currentAudio, setCurrentAudio] = useState(null);
  let [audio, setAudio] = useState(null);
  let [isPlaying, setIsPlaying] = useState(false);
  let [isMuted, setIsMuted] = useState(false);
  let [progress, setProgress] = useState(0);
  let [currentIndex, setCurrentIndex] = useState(0);
  let [showFavorite, setShowFavorite] = useState(false);
  let [search, setSearch] = useState("");
  let audioRef = useRef(null);

  let songList = [
    {
      songName: "Starboy",
      artistName: "The Weekend",
      duration: "4:39",
      img: "/assets/img/starboy.png",
      song: "/assets/song/starboy.mp3",
      background: "rgb(15, 10, 0)",
    },
    {
      songName: "Demons",
      artistName: "Imagine Dragons",
      duration: "5:24",
      img: "/assets/img/demon.jpg",
      song: "/assets/song/demons.mp3",
      background: "rgb(255, 87, 34)",
    },
    {
      songName: "Mouth of the River",
      artistName: "Imperial Dragon",
      duration: "6:26",
      img: "/assets/img/mouth of the river.jpg",
      song: "/assets/song/mouth of the river.mp3",
      background: "rgb(30, 139, 195)",
    },
    {
      songName: "Ghost Stories",
      artistName: "Coldplay",
      duration: "4:14",
      img: "/assets/img/ghost stories.png",
      song: "/assets/song/ghost stories.mp3",
      background: "rgb(24, 42, 72)",
    },
    {
      songName: "Spark",
      artistName: "Coldplay",
      duration: "3:47",
      img: "/assets/img/spark.jpg",
      song: "/assets/song/spark.mp3",
      background: "rgb(255, 114, 87)",
    },
    {
      songName: "Viva La Vida",
      artistName: "Coldplay",
      duration: "4:02",
      img: "/assets/img/viva la vida.jpg",
      song: "/assets/song/viva la vida.mp3",
      background: "rgb(92, 66, 46)",
    },
    {
      songName: "Hymn for the Weekend",
      artistName: "Coldplay",
      duration: "4:20",
      img: "/assets/img/hymn for the weekend.jpg",
      song: "/assets/song/hymn for the weekend.mp3",
      background: "rgb(73, 57, 183)",
    },
  ];

  let [filteredSongs, setFilteredSongs] = useState(songList);
  let defaultName = "Starboy";
  let defaultArtist = "The Weekend";
  let defaultImg = "/assets/img/starboy.png";

  function songPlay(songPath, songName, artistName, img, index, background) {
    if (audio) {
      audio.pause();
    }

    let newAudio = new Audio(songPath);
    newAudio.play();
    setAudio(newAudio);
    setIsPlaying(true);
    setCurrentIndex(index);
    setCurrentAudio({ songName, artistName, img, background });

    newAudio.ontimeupdate = () => {
      setProgress((newAudio.currentTime / newAudio.duration) * 100);
    };
  }

  useEffect(() => {
    if (currentAudio && currentAudio.background) {
      document.body.style.transition = "background-color 0.5s ease";
      document.body.style.backgroundColor = currentAudio.background;
    }
  }, [currentAudio]);

  function handlePlayPause() {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  }

  function handleMute() {
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  }

  function handleNext() {
    const nextIndex = (currentIndex + 1) % songList.length;
    const nextSong = songList[nextIndex];
    songPlay(
      nextSong.song,
      nextSong.songName,
      nextSong.artistName,
      nextSong.img,
      nextIndex,
      nextSong.background
    );
  }

  function handlePrev() {
    const prevIndex = (currentIndex - 1 + songList.length) % songList.length;
    const prevSong = songList[prevIndex];
    songPlay(
      prevSong.song,
      prevSong.songName,
      prevSong.artistName,
      prevSong.img,
      prevIndex,
      prevSong.background
    );
  }

  const toggleFavorite = () => {
    setShowFavorite(!showFavorite);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", handleNext);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleNext);
      }
    };
  }, [audio]);

  function searchHandle(e) {
    let searchValue = e.target.value;
    setSearch(searchValue);
    if (searchValue === "") {
      setFilteredSongs(songList);
    } else {
      // filteredSong ek naya variable hai jo jaka store ho rah hai setFilteredSongs ma
      const filteredSong = songList.filter(
        (song) =>
          song.songName.toLowerCase().includes(searchValue.toLowerCase()) ||
          song.artistName.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredSongs(filteredSong);
    }
  }

  return (
    <div className="container">
      <div className="left">
        <img
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2021/02/Spotify_Logo_RGB_White.png"
          alt=""
        />
        <ul>
          <li>For You</li>
          <li>Top Track</li>
          <li>Favourite</li>
          <li>Recently Played</li>
        </ul>
      </div>
      <div className="middle">
        <h1>For You</h1>
        <div className="searchBar">
          <input
            type="search"
            placeholder="Search Song, Artist"
            value={search}
            onChange={searchHandle}
          />
          <i className="bx bx-search"></i>
        </div>
        <div className="songListContainer">
          {filteredSongs.map((item, index) => {
            return (
              <div key={index} className="songList">
                <img
                  src={item.img}
                  alt={item.songName}
                  onClick={() =>
                    songPlay(
                      item.song,
                      item.songName,
                      item.artistName,
                      item.img,
                      index,
                      item.background
                    )
                  }
                />
                <div
                  className="songDetail"
                  onClick={() =>
                    songPlay(
                      item.song,
                      item.songName,
                      item.artistName,
                      item.img,
                      index,
                      item.background
                    )
                  }
                >
                  <p>{item.songName}</p>
                  <p>{item.artistName}</p>
                </div>
                <p>{item.duration}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="right">
        {currentAudio ? (
          <div className="songDetails">
            <h1>{currentAudio.songName}</h1>
            <p>{currentAudio.artistName}</p>
            <img src={currentAudio.img} alt={currentAudio.songName} />
          </div>
        ) : (
          <div className="songDetails">
            <h1>{defaultName}</h1>
            <p>{defaultArtist}</p>
            <img src={defaultImg} alt="Default" />
          </div>
        )}

        <div className="controlBarContainer">
          <div className="progressContainer">
            <input
              type="range"
              value={progress}
              onChange={(e) => {
                const newProgress = e.target.value;
                setProgress(newProgress);
                audio.currentTime = (newProgress / 100) * audio.duration;
              }}
              style={{
                background: `linear-gradient(to right, white ${progress}%, #383633 ${progress}%)`,
              }}
            />
          </div>

          <div className="controlBar">
            <button onClick={toggleFavorite} className="favorite">
              <i className="bx bx-dots-vertical-rounded"></i>
            </button>

            {showFavorite && (
              <div className="favoriteText">
                <p>Favorite</p>
              </div>
            )}

            <div className="controlBarCenter">
              <button onClick={handlePrev} className="prev-btn">
                <i className="bx bx-rewind"></i>
              </button>
              <button onClick={handlePlayPause} className="play-btn">
                <i className={isPlaying ? "bx bx-pause" : "bx bx-play"}></i>
              </button>
              <button onClick={handleNext} className="next-btn">
                <i className="bx bx-fast-forward"></i>
              </button>
            </div>
            <button onClick={handleMute} className="mute-btn">
              <i
                className={isMuted ? "bx bxs-volume-mute" : "bx bx-volume-full"}
              ></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
