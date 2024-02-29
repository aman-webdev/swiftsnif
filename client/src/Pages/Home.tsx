import React, { useEffect, useState } from "react";
import hero from "../assets/hero2.svg";
import Input from "../components/Input";
import Button from "../components/Button";
import Expand from "../components/Expand";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import { HashLoader } from "react-spinners";
import { Success } from "../components";
import { toast } from "react-toastify";
import axios from "axios";



const Home = () => {
  const [url, setUrl] = useState("");
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [expirationTime, setExpirationTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [shortenedResult, setShortenedResult] = useState(null);




  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!url) return;
    const data = {
      url,
      ...(password && { password }),
      ...(expirationTime && { expirationTime }),
    };
    try {
      setIsLoading(true);
     const res = await fetch(import.meta.env.VITE_BE_URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      if(!res.ok) throw new Error(result.message)
      setShortenedResult(result)
      setIsLoading(false);
      setUrl('')
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong')
      setIsLoading(false);
      setIsError(err.message);
    }
  };

  return (
    <div>
      <img
        src={hero}
        alt="hero-img"
        className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-25 md:opacity-5"
      />
      {shortenedResult ? <Success data={shortenedResult} setData={setShortenedResult} /> : <div>
        <h1 className="sm:w-full font-heading mt-24 leading-loose sm:leading-relaxed   text-3xl sm:text-5xl md:text-6xl md:leading-normal lg:leading-relaxed lg:text-7xl md:w-5/6 lg:w-2/3 text-center mx-auto">
          Create short links with
          <span className="bg-[#DCF2F1] block px-3 py-0 my-0 border-8 border-[#4c4c4c]  rounded-full">
            Password Protection
          </span>
          and Expiration
        </h1>
        <form onSubmit={handleSubmit} className="relative w-full md:w-3/4 lg:w-1/2 mx-auto">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full mx-auto block mt-20 px-3 py-4 border-[5px] border-[#] focus:outline-none rounded-md border-spacing-10 text-sm md:text-md md:text-lg"
            placeholder="https://"
          />
          <Button
            type="submit"
            className="w-20 sm:w-40 h-10 sm:h-12 text-sm md:text-base rounded-md bg-[#DCF2F1] text-[#4c4c4c] absolute top-1/2 -translate-y-1/2 right-2"
          >
           { !isLoading ?  "Create" : <HashLoader size={30} className="mx-auto" color="#4c4c4c"/>}
          </Button>
        </form>
        <div className="md:w-1/2 mx-auto mt-12 text-sm">
          <h4
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="opacity-70  border-b-4 border-[#] font-medium cursor-pointer"
          >
            Advanced Options
          </h4>
          {isAdvancedOpen && (
            <div>
              <Expand
                title="Protect your URL with Password?"
                desc="Password expires after 5 mins when the short URL is accessed each time"
                inputProps={{
                  type: "password",
                  placeholder: "******",
                  className:
                    "w-1/2 px-3 py-2 mt-2 border-[#] border-4 focus:outline-none",
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                }}
              />

              <Expand
                title="Add expiration time to shortened url?"
                desc="Shortend URL is only valid till the expiration time"
                inputProps={{
                  type: "datetime-local",
                  className:
                    "w-1/2 px-3 py-2 mt-2 border-[#] border-4 focus:outline-none",
                  value: expirationTime,
                  onChange: (e) => setExpirationTime(e.target.value),
                }}
              />
            </div>
          )}
        </div>
      </div>}
    </div>
  );
};

export default Home;
