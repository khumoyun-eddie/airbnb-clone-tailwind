import React from "react";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";

const InfoCard = ({ img, location, title, description, star, price, total }) => {
  return (
    <div className='flex flex-col sm:flex-row py-7 px-2 border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t'>
      <div className='relative h-40 w-full sm:h-52 sm:w-80 flex-shrink-0 '>
        <Image
          src={img}
          layout='fill'
          className='rounded-2xl'
          objectFit='cover'
          alt={title}
        />
      </div>
      <div className='flex flex-col flex-grow sm:pl-5 pt-3 sm:pt-0'>
        <div className='flex justify-between items-center'>
          <p className='text-sm'>{location}</p>
          <HeartIcon className='h-7 cursor-pointer text-red-500' />
        </div>
        <h4 className='text-xl'>{title}</h4>
        <div className='w-10 border-b pt-2' />
        <p className='pt-2 text-sm text-gray-500 flex-grow'>{description}</p>
        <div className='flex justify-between items-end pt-5'>
          <p className='flex space-x-2 items-center'>
            <StarIcon className='h-5 text-red-400' />
            {star}
          </p>
          <div className=''>
            <p className='text-lg font-semibold pb-2 lg:text-2xl'>{price}</p>
            <p className='text-right font-extralight'>{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
