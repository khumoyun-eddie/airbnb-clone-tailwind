import { useRouter } from "next/router";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";

const Search = ({ searchResults }) => {
  const router = useRouter();
  const { location, startDate, endDate, numberOfGuests } = router.query;
  const formattedStartDate = startDate && format(new Date(startDate), "dd MMMM yyyy");
  const formattedEndDate = endDate && format(new Date(endDate), "dd MMMM yyyy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${numberOfGuests} guests`} />
      <main className='flex'>
        <section className='flex-grow pt-14 px-6'>
          <p className='text-xs '>
            300+ Stays - {range} - for {numberOfGuests} guests
          </p>
          <h1 className='text-3xl font-semibold mt-2 mb-6'>Stays in {location}</h1>
          <div className='hidden lg:inline-flex space-x-3 text-gray-800 whitespace-nowrap mb-5 '>
            <p className='button'>Cancellation Flexibility</p>
            <p className='button'>Type of place</p>
            <p className='button'>Price</p>
            <p className='button'>Rooms and Beds</p>
            <p className='button'>More filters</p>
          </div>
          <div className="flex flex-col">
          {searchResults.map((item, index) => (
            <InfoCard
              key={index}
              img={item.img}
              location={item.location}
              description={item.description}
              total={item.total}
              star={item.star}
              price={item.price}
              title={item.title}
            />
          ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch("https://www.jsonkeeper.com/b/5NPS").then((res) => res.json());
  return {
    props: {
      searchResults,
    },
  };
}
