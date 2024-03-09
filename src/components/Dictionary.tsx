import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FcSpeaker } from "react-icons/fc";
import Loading from "./Loading";
import axios from "axios";
import NoData from "./NoData";

export default function Dictionary() {
  const [data, setData] = useState<any>();
  const [searchForWord, setSearchForWord] = useState("");
  const [loading, setLoading] = useState(false);

  function getWordMeaning() {
    setLoading(true);
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchForWord}`)
      .then((response) => {
        setData(response.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        // console.log(data?.message);
        setData(error.response.data?.message);
        // console.log(data);
        setLoading(false);
      });
  }

  function playAudio() {
    let audio = new Audio(data.phonetics[0].audio);
    audio.play();
  }

  // console.log(data?.message);

  return (
    <div className="bg-[#5D5AE1] h-screen w-screen ">
      <div className=" w-[90%] md:w-[80%] lg:w-[60%]  mx-auto pt-10 md:p-20 lg:pt-40 ">
        <h1 className=" font-bold text-4xl md:text-5xl lg:text-7xl text-white text-center pb-10 ">
          Dictionary App
        </h1>

        <div className="flex items-center gap-2 lg:gap-3 justify-center lg:pt-4 ">
          <input
            type="text"
            placeholder="Search word ..."
            className=" lg:text-2xl px-4 py-4 rounded-full bg-transparent border border-[#D2D8F8] "
            onChange={(e) => {
              setSearchForWord(e.target.value);
            }}
          />
          <button
            className="bg-white text-black px-4 py-4 lg:text-2xl rounded-full"
            onClick={() => {
              getWordMeaning();
            }}
          >
            <FaSearch />
          </button>
        </div>

        <div className="flex justify-center pt-7 ">
          {loading ? (
            <Loading />
          ) : data ? (
            typeof data === "string" ? (
              <div>{data}</div>
            ) : (
              <div>
                <div className="flex justify-center gap-2  ">
                  <h1 className=" font-bold text-3xl lg:text-5xl text-white uppercase ">
                    {data.word}
                  </h1>

                  <button
                    onClick={() => {
                      playAudio();
                    }}
                    className="bg-white p-2 md:py-2 md:px-3 rounded-full"
                  >
                    <FcSpeaker size={20} />
                  </button>
                </div>

                <div className=" pt-3 md:pt-8 max-w-[28rem]">
                  <h4 className=" font-bold text-white text-xl ">
                    Parts of speech:{" "}
                  </h4>
                  <p className=" py-1">{data.meanings[0].partOfSpeech}</p>
                  <h4 className=" font-bold text-white text-xl ">
                    Definition:
                  </h4>
                  <p className=" py-1">
                    {typeof data === "string"
                      ? data
                      : data.meanings[0].definitions[0].definition}
                  </p>
                  <h4 className=" font-bold text-white text-xl ">Example:</h4>
                  <p className=" py-1">
                    {data.meanings[0].definitions[0].example}
                  </p>
                </div>
              </div>
            )
          ) : (
            <NoData />
          )}
        </div>
      </div>
    </div>
  );
}
