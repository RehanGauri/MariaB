import Image from "next/image";
import Button from "../ui/Button";
import { MdArrowRightAlt } from "react-icons/md";
import Link from "next/link";

const ShopByCollection = () => {
  return (
    <div className="mt-16 md:mt-24 lg:mt-30">
      {/* Row 1 — text + image, stacks on mobile */}
      <div className="flex flex-col-reverse md:flex-row w-full min-h-[500px] md:h-[550px] lg:h-163 items-center">
        {/* Text side */}
        <div className="w-full md:w-6/12 px-6 md:pl-8 lg:pl-12 py-8 md:py-0">
          <h1 className="text-xs tracking-wide">New Arrivals&apos;26</h1>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-wider mt-1">
            Shop By Collection
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-2 max-w-md">
            Explore the newest summer arrivals — fresh prints, breezy
            fabrics, and styles made for the season.
          </p>


<Link href="/trending">
  <Button
    text="Shop The Look"
    classNames="mt-6 md:mt-8"
    icon={<MdArrowRightAlt />}
  />
</Link>

          {/* Dots/progress indicator */}
          <div className="flex mt-10 md:mt-20 gap-2 sm:gap-3 *:cursor-pointer">
            <span className="h-1.25 w-8 sm:w-12 rounded-full bg-zinc-600/30" />
            <span className="h-1.25 w-8 sm:w-12 rounded-full bg-zinc-600/30" />
            <span className="h-1.25 w-14 sm:w-20 rounded-full bg-black" />
            <span className="h-1.25 w-8 sm:w-12 rounded-full bg-zinc-600/30" />
          </div>
        </div>

        {/* Image side */}
        <div className="relative w-full md:w-6/12 h-[320px] sm:h-[420px] md:h-full rounded-2xl overflow-hidden">
          <Image
            src="/images/shopByCollection/1.webp"
            fill
            alt="Shop by collection"
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Row 2 — second image, full width on mobile, partial on desktop */}
      <div className="flex w-full h-[320px] sm:h-[420px] md:h-[550px] lg:h-125 mt-4 md:mt-6">
        <div className="relative h-full w-full md:w-[34%] rounded-2xl md:rounded-none overflow-hidden">
          <Image
            src="/images/shopByCollection/5.webp"
            fill
            alt="Collection highlight"
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 34vw"
          />
        </div>
      </div>
    </div>
  );
};

export default ShopByCollection;