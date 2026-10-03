"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaRegComment,
} from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { RiShoppingBag4Line } from "react-icons/ri";

import { easeInOut, motion } from "framer-motion";

const initialData = [
  {
    id: 1,
    name: "hemayal",
    category: "Unstitched",
    img: "/images/instagramFeed/1.webp",
  },
  {
    id: 2,
    name: "aniatblog",
    category: "Unstitched",
    img: "/images/instagramFeed/2.webp",
  },
  {
    id: 3,
    name: "rumsha.m",
    category: "Bridal Formals",
    img: "/images/instagramFeed/3.webp",
  },
  {
    id: 4,
    name: "therealresham",
    category: "Unstitched",
    img: "/images/instagramFeed/4.webp",
  },
  {
    id: 5,
    name: "naimakhawarabbasi",
    category: "Luxury Pret",
    img: "/images/instagramFeed/5.webp",
  },
];

const InstagramCard = ({ data, isCenter }) => {
  return (
    <motion.div
      layout
      transition={{
        duration: 0.2,
        ease: easeInOut,
      }}
      animate={{
        scale: isCenter ? 1 : 0.85,
        filter: isCenter ? "blur(0px)" : "blur(3px)",
        opacity: isCenter ? 1 : 0.6,
      }}
      className="
        flex
        flex-col
        shrink-0
        overflow-hidden
        rounded-2xl
        sm:rounded-3xl
        bg-white

        w-[260px]
        h-[430px]

        sm:w-[300px]
        sm:h-[500px]

        md:w-[340px]
        md:h-[570px]

        lg:w-[400px]
        lg:h-[700px]
      "
    >
      {/* Header */}
      <div
        className="
          h-14
          sm:h-16
          md:h-17
          bg-white
          flex
          items-center
          shrink-0
        "
      >
        {/* Profile Image */}
        <div
          className="
            relative
            h-9
            w-9
            sm:h-10
            sm:w-10
            md:h-12
            md:w-12
            rounded-full
            ml-3
            sm:ml-4
            overflow-hidden
            bg-zinc-200
            shrink-0
          "
        >
          <Image
            src={data.img}
            fill
            alt={`${data.name}'s pfp`}
            className="object-cover object-top"
            sizes="48px"
          />
        </div>

        {/* User Info */}
        <div className="flex flex-col ml-2 sm:ml-3 leading-tight min-w-0">
          <h1
            className="
              text-xs
              sm:text-sm
              font-semibold
              tracking-wide
              truncate
              max-w-[150px]
              sm:max-w-[190px]
            "
          >
            {data.name}
          </h1>

          <span
            className="
              text-[9px]
              sm:text-[11px]
              text-gray-500
              font-medium
              tracking-wider
              truncate
            "
          >
            {data.category}
          </span>
        </div>
      </div>

      {/* Main Image */}
      <div
        className="
          relative
          flex-1
          min-h-0
          w-full
          overflow-hidden
          bg-zinc-200
        "
      >
        <Image
          src={data.img}
          fill
          alt={`${data.name} fashion post`}
          className="object-cover object-top"
          sizes="
            (max-width: 640px) 260px,
            (max-width: 768px) 300px,
            (max-width: 1024px) 340px,
            400px
          "
        />
      </div>

      {/* Footer */}
      <div
        className="
          h-11
          sm:h-12
          md:h-14
          bg-white
          flex
          justify-between
          items-center
          px-3
          sm:px-4
          md:px-5
          shrink-0
        "
      >
        {/* Social Icons */}
        <div
          className="
            flex
            items-center
            gap-2
            sm:gap-3
            text-base
            sm:text-lg
            md:text-xl
          "
        >
          <button
            type="button"
            aria-label="Like"
            className="cursor-pointer"
          >
            <FaHeart className="text-red-600" />
          </button>

          <button
            type="button"
            aria-label="Comment"
            className="cursor-pointer"
          >
            <FaRegComment />
          </button>

          <button
            type="button"
            aria-label="Share"
            className="cursor-pointer"
          >
            <FiSend />
          </button>
        </div>

        {/* Shop Now */}
        <button
          type="button"
          className="
            flex
            items-center
            gap-1
            sm:gap-2
            cursor-pointer
          "
        >
          <h4
            className="
              text-[10px]
              sm:text-xs
              md:text-sm
              font-semibold
              tracking-wide
            "
          >
            Shop Now
          </h4>

          <RiShoppingBag4Line
            className="
              text-sm
              sm:text-base
              md:text-xl
            "
          />
        </button>
      </div>
    </motion.div>
  );
};

const InstagramFeed = () => {
  const [data, setData] = useState(initialData);

  const centerIndex = Math.floor(data.length / 2);

  const goRight = () => {
    setData((prev) => {
      const rotated = [...prev];
      rotated.push(rotated.shift());
      return rotated;
    });
  };

  const goLeft = () => {
    setData((prev) => {
      const rotated = [...prev];
      rotated.unshift(rotated.pop());
      return rotated;
    });
  };

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-zinc-900/10

        pt-20
        pb-16

        sm:pt-24
        sm:pb-20

        md:pt-28
        md:pb-24
      "
    >
      {/* Cards */}
      <div
        className="
          flex
          items-center
          justify-center
          gap-2
          sm:gap-4
          md:gap-5
          w-full
        "
      >
        {data.map((item, index) => (
          <InstagramCard
            key={item.id}
            data={item}
            isCenter={index === centerIndex}
          />
        ))}
      </div>

      {/* Left Arrow */}
      <button
        type="button"
        onClick={goLeft}
        aria-label="Previous post"
        className="
          absolute
          left-2
          sm:left-4
          md:left-6
          lg:left-10
          top-1/2
          -translate-y-1/2
          z-20

          w-9
          h-9

          sm:w-10
          sm:h-10

          md:w-12
          md:h-12

          flex
          items-center
          justify-center

          rounded-full
          bg-white
          shadow-lg

          cursor-pointer
          hover:bg-zinc-100
          transition
        "
      >
        <FaChevronLeft className="text-xs sm:text-sm md:text-base" />
      </button>

      {/* Right Arrow */}
      <button
        type="button"
        onClick={goRight}
        aria-label="Next post"
        className="
          absolute
          right-2
          sm:right-4
          md:right-6
          lg:right-10
          top-1/2
          -translate-y-1/2
          z-20

          w-9
          h-9

          sm:w-10
          sm:h-10

          md:w-12
          md:h-12

          flex
          items-center
          justify-center

          rounded-full
          bg-white
          shadow-lg

          cursor-pointer
          hover:bg-zinc-100
          transition
        "
      >
        <FaChevronRight className="text-xs sm:text-sm md:text-base" />
      </button>
    </section>
  );
};

export default InstagramFeed;