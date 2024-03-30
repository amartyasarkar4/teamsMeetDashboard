"use client";

import React from "react";
import GridItems from "../gridComponents/gridItems";
import Image from "next/image";

const DisscussionMain = () => {
  const pagetitle = "Products";

  return (
    <div className=" h-full w-full">
      <div className="flex flex-col sm:flex-row justify-between">
        <h2
          className="text-md text-zinc-900 font-semibold ml-4 bg-slate-50 py-1 bg-slate-50"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 99,
          }}
        >
          {/* {pagetitle.toUpperCase()} */}
          {pagetitle}
        </h2>
        <div style={{ fontSize: "10px" }} className="flex items-center">
          <div className="flex  w-48 h-6 items-center rounded-xl px-2 border mr-2">
            <Image
              src="/search.svg"
              alt="down"
              width={500}
              height={500}
              style={{
                width: "14px",
                height: "14px",
                marginLeft: "4px",
                marginRight: "4px",
              }}
            />
            {/* <p style={{ paddingTop: "2px" }}>All brands</p> */}
            <input type="text" placeholder="Search for..." />
          </div>
          <div>
            <Image
              src="/chat-conversation.svg"
              alt="down"
              width={500}
              height={500}
              style={{
                width: "18px",
                height: "18px",
                marginLeft: "8px",
              }}
            />
          </div>
          <div className="hover:bg-zinc-200 ml-2 items-center">
            <Image
              src="/settings.svg"
              alt="down"
              width={500}
              height={500}
              style={{
                width: "18px",
                height: "18px",
                marginLeft: "8px",
              }}
            />
          </div>
        </div>
      </div>

      <GridItems />
    </div>
  );
};

export default DisscussionMain;
