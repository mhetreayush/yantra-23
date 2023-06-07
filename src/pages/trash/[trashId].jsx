import { useRouter } from "next/router";
import trashMap from "@/../fakerData.json";
import { useEffect, useState } from "react";
import TrashCard from "@/component/TrashCard";
const TrashId = () => {
  const router = useRouter();
  const { trashId } = router.query;
  const [data, setData] = useState(null);
  const initialData = () => {
    trashMap.map((trash) => {
      if (trash.id == trashId) {
        setData(trash);
        return;
      }
    });
  };
  useEffect(() => {
    return initialData();
  }, [trashMap]);
  return (
    <div>
      {data && (
        <>
          <TrashCard {...data} />
        </>
      )}
    </div>
  );
};

export default TrashId;
