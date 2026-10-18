import React from "react";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  return (
    <div className='flex flex-row flex-wrap justify-center gap-6 sm:gap-10'>
      {technologies.map((technology) => (
        <div className='w-24 h-24 sm:w-28 sm:h-28' key={technology.name}>
          {/* Tampilan Desktop: 3D Ball Canvas */}
          <div className='hidden sm:block w-full h-full'>
            <BallCanvas icon={technology.icon} />
          </div>

          {/* Tampilan Mobile: Elegan, Ultra Cepat & Ringan Tanpa Lag GPU */}
          <div className='sm:hidden w-full h-full bg-[#161616] border border-[#2b2b2b] rounded-2xl flex flex-col items-center justify-center p-3 shadow-lg hover:border-white/40 transition-all'>
            <img src={technology.icon} alt={technology.name} className='w-12 h-12 object-contain' />
            <span className='text-[10px] text-secondary mt-1 text-center font-medium'>{technology.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
