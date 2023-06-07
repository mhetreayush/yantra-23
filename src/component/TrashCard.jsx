import { useRouter } from "next/router";

const TrashCard = ({ name, price, seller, byProducts, id }) => {
  // const router = useRouter();
  // const { trashId } = router.query;

  return (
    <div className="p-4 rounded-md bg-black/10 my-10">
      <h1>Id: {id}</h1>
      <h1>Name: {name}</h1>
      <h1>Price: {price}</h1>
      <h1>Seller: {seller}</h1>
      <h1>By Products:</h1>
      <ul>
        {byProducts?.map((byProduct, idx) => {
          return (
            <li key={byProduct + idx}>
              <h1>{byProduct}</h1>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TrashCard;
