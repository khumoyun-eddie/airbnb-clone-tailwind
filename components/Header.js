import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { SearchIcon, GlobeAltIcon, MenuIcon, UserCircleIcon, UsersIcon } from "@heroicons/react/solid";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";

const Header = ({placeholder}) => {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const router = useRouter();

  const selectionRange = {
    startDate,
    endDate,
    key: "selection",
  };
  const handleSelect = ({ selection }) => {
    // console.log(selection)
    setStartDate(selection.startDate);
    setEndDate(selection.endDate);
  };
  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numberOfGuests
      },
    });
  };

  return (
    <header className='sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10'>
      <div
        className='relative flex items-center h-10 cursor-pointer my-auto'
        onClick={() => router.push("/")}
      >
        <Image
          src='https://links.papareact.com/qd3'
          fill='true'
          objectFit='contain'
          objectPosition='left'
          alt='logo'
        />
      </div>
      <div className='flex items-center md:border-2 overflow-hidden rounded-full py-2 md:shadow-sm'>
        <input
          type='text'
          value={searchInput}
          className='flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400'
          placeholder={placeholder || 'Start your search'}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <SearchIcon className='hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2' />
      </div>
      <div className='flex space-x-4 items-center justify-end text-gray-500'>
        <p className='hidden md:inline cursor-pointer'>Become a host</p>
        <GlobeAltIcon className='h-6 cursor-pointer' />
        <div className='flex items-center space-x-2 rounded-full border-2 p-2'>
          <MenuIcon className='h-6 cursor-pointer' />
          <UserCircleIcon className='h-6 cursor-pointer' />
        </div>
      </div>
      {searchInput && (
        <div className='col-span-3 justify-self-center'>
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#fd5b61"]}
            onChange={handleSelect}
          />
          <div className='flex items-center border-b mb-4'>
            <h2 className='text-2xl flex-grow font-semibold'>Number of Guests</h2>
            <UsersIcon className='h-5' />
            <input
              type='number'
              value={numberOfGuests}
              min={1}
              step={1}
              className='outline-none w-12 pl-2 text-lg text-red-400'
              onChange={(e) => setNumberOfGuests(e.target.value)}
            />
          </div>
          <div className='flex'>
            <button
              className='flex-grow text-gray-500 cursor-pointer'
              onClick={() => setSearchInput("")}
            >
              Cancel
            </button>
            <button
              className='flex-grow text-red-400 cursor-pointer'
              onClick={search}
            >
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
