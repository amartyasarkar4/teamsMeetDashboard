import Image from "next/image";
import React from "react";

const FilterArea = () => {
  return (
    <div className="flex w-full justify-between">
      <div className="flex w-16 h-6 items-center rounded-xl px-1 border mr-2">
        <div className="w-2/3">
          <p style={{ paddingTop: "2px", paddingLeft: "4px" }}>Desk</p>
        </div>
        <div className="w-1/3">
          <Image
            src="/downsvgrepo.svg"
            alt="down"
            width={500}
            height={500}
            style={{
              width: "14px",
              height: "14px",
              marginLeft: "4px",
            }}
          />
        </div>
      </div>
      <div className="flex w-16 h-6 items-center rounded-xl px-1 border mr-2">
        <div className="w-2/3">
          <p style={{ paddingTop: "2px", paddingLeft: "4px" }}>Tags</p>
        </div>
        <div className="w-1/3">
          <Image
            src="/downsvgrepo.svg"
            alt="down"
            width={500}
            height={500}
            style={{
              width: "14px",
              height: "14px",
              marginLeft: "4px",
            }}
          />
        </div>
      </div>
      <div className="flex w-16 h-6 items-center rounded-xl px-1 border mr-2 text-zinc-500">
        <Image
          src="/sort-vertical.svg"
          alt="down"
          width={500}
          height={500}
          style={{
            width: "14px",
            height: "14px",
            marginLeft: "4px",
          }}
        />
        <p style={{ paddingTop: "2px" }}>Sort</p>
      </div>
      <div className="flex w-16 h-6 items-center rounded-xl px-1 border text-zinc-500">
        <Image
          src="/filter.svg"
          alt="down"
          width={500}
          height={500}
          style={{
            width: "14px",
            height: "14px",
            marginLeft: "4px",
          }}
        />
        <p style={{ paddingTop: "2px" }}>Filter</p>
      </div>
    </div>
  );
};

export default FilterArea;
