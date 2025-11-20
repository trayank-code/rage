import { motion } from "framer-motion";
import React from "react";
import Description from "./description.tsx";
import Card from "./card.tsx";
import Experience from "./experience.tsx";
import Journey from "./journey.tsx";
import Hand from "./hand.tsx";
import Fullstack from "./fullstack.tsx";
import Color from "./App.tsx";

const Bg = () => {
  return (
    <>
      <div className="w-auto h-auto bg-transparent">
        <section className="w-full h-full bg-transparent">
          <Description color={Color} />
          <Card />
          <Experience />
          <Journey />
          <Hand />
          <Fullstack />
        </section>
      </div>
    </>
  );
};

export default Bg;
