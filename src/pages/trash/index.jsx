import TrashCard from "@/component/TrashCard";
import Link from "next/link";
import { db } from "@/../firebase";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";
// import trashMap from "@/../fakerData.json";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import FuzzySearch from "fuzzy-search";
import Navbar from "@/component/Navbar";
const Trash = () => {
  const [result, setResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [trashMap, setTrashMap] = useState([]);
  const searcher = new FuzzySearch(trashMap, ["name", "byProducts"], {
    caseSensitive: false,
    sort: true,
  });
  const fetchTrash = async () => {
    try {
      const trashSnap = await getDocs(collection(db, "trash"));
      trashSnap.forEach((doc) => {
        setTrashMap(trashMap.push(doc.data()));
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchTrash();
  }, []);
  useEffect(() => {
    if (searchTerm.length > 0) {
      setResult(searcher.search(searchTerm));
    } else {
      setResult(trashMap);
    }
  }, [searchTerm]);
  return (
    <>
      {/* <Navbar /> */}
      <nav className="py-4 px-16 flex gap-x-3 bg-[#D9D9D9]/60 backdrop-blur-sm sticky top-0 w-full">
        <Link href="/">Home</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/sell">Become a seller</Link>
      </nav>
      <div className="p-4">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 rounded-md border-2 border-black/50 sticky top-16 z-50"
        />
        <div className="grid grid-cols-2 gap-x-32 gap-y-10 mt-4">
          {result.length > 0 ? (
            result.map((trash, idx) => {
              return <TrashCard {...trash} key={idx} />;
            })
          ) : (
            <h1>No res</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Trash;
