import React from "react";
import Navbar from "./navbar";
interface NavbarProps {
  color: string;
}
const Topbar = ({ color }: NavbarProps) => {
  return (
    <>
      <div className=" w-770 h-45 justify-between relative left-110 top-18 bg-black flex cursor-none fixed rounded-full">
        <section className="w-15 h-10 m-5 relative ">
          <button
            data-cursor="scale"
            className=" font-bold text-4xl cursor-none right-180"
            style={{
              color: color,
            }}
          >
            // TRAYANK //
          </button>
        </section>
        {/* <span className="relative">
          <Navbar />
        </span> */}

        <section className=" w-70 flex m-5 h-20 justify-around relative top-5 right-10">
          <button
            data-cursor="scale"
            className="w-70 font-bold text-4xl flex items-center rounded-full cursor-none"
            style={{ color: color }}
          >
            Key
          </button>
          <button
            data-cursor="scale"
            className="w-130 h-20 text-4xl flex-row justify-center font-bold backdrop-blur-md text-black rounded-full cursor-none"
            style={{ backgroundColor: color }}
          >
            Log In ⇒
          </button>
        </section>
      </div>
    </>
  );
};

export default Topbar;
