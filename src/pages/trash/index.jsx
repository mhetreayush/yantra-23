import TrashCard from "@/component/TrashCard";
import Link from "next/link";
import trashMap from "@/../fakerData.json";
import { useEffect } from "react";
import { faker } from "@faker-js/faker";
const Trash = () => {
  const genData = () => {
    let data = [];
    for (let i = 0; i < 5; i++) {
      data.push({
        name: faker.name.firstName(),
        id: faker.datatype.uuid(),
        price: faker.datatype.number(),
        seller: faker.name.lastName(),
        byProducts: [
          faker.random.word(),
          faker.random.word(),
          faker.random.word(),
        ],
      });
    }
    return data;
    // return "asd";
  };
  useEffect(() => {
    console.log(genData());
  }, []);
  return (
    <>
      {trashMap.map((trash, idx) => {
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
