import TrashCard from "@/component/TrashCard";
import Link from "next/link";
import trashMap from "@/../fakerData.json";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import FuzzySearch from "fuzzy-search";
const Trash = () => {
  const [result, setResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  //   const genData = () => {
  //     let data = [];
  //     for (let i = 0; i < 5; i++) {
  //       data.push({
  //         name: faker.name.firstName(),
  //         id: faker.datatype.uuid(),
  //         price: faker.datatype.number(),
  //         seller: faker.name.lastName(),
  //         byProducts: [
  //           faker.random.word(),
  //           faker.random.word(),
  //           faker.random.word(),
  //         ],
  //       });
  //     }
  //     return data;
  //     // return "asd";
  //   };
  const searcher = new FuzzySearch(trashMap, ["name", "byProducts"], {
    caseSensitive: false,
    sort: true,
  });
  useEffect(() => {
    setResult(searcher.search(searchTerm));
  }, [searchTerm]);

  return (
    <>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 rounded-md border-2 border-black/50"
      />
      {result.map((trash, idx) => {
        return (
          <Link href={`trash/${trash.id}`} key={idx}>
            <TrashCard {...trash} />
          </Link>
        );
      })}
    </>
  );
};

export default Trash;
