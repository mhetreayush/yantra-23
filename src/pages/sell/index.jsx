import Lottie from "react-lottie-player";
import { TextField, TextareaAutosize } from "@mui/material";
import { useRef, useState } from "react";
import lottieJson from "@/../lottieJson.json";
import ShopIll from "@/../public/Assets/shopIll.svg";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/../firebase";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import { db } from "@/../firebase";
import Link from "next/link";
const Sell = () => {
  const [objectData, setObjectData] = useState(null);
  const [detailsStep, setDetailsStep] = useState(true);
  const [image, setImage] = useState(null);
  var firstPage = useRef(null);
  const handleSubmit = () => {
    const id = uuidv4();
    console.log(image);
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      setDoc(doc(db, "trash", id), {
        desc: objectData.description,
        expiry: "20/2/24",
        name: objectData.name,
        quantity: objectData.quantity ? objectData.quantity : 1,
        seller: user.displayName,
        trashId: id,
        image,
      });

      setDoc(
        doc(db, "users", user?.uid),
        {
          name: user.displayName,
          ph_or_email: user.email ? user.email : user.phoneNumber,
          trash: arrayUnion({
            id,
            trashRef: doc(db, "trash", id),
          }),
        },
        { merge: true }
      );
      setObjectData(null);
      setImage(null);
      setTimeout(() => {
        firstPage.current.click();
      }, 1000);
    } catch (err) {
      console.log(err);
    }
    // const storage = getStorage();
  };
  return (
    <>
      <nav className=" flex gap-x-3 py-4 px-16 bg-[#D9D9D9]/60 backdrop-blur-sm sticky top-0 w-full">
        <Link href="/">Home</Link>
        <Link href="/trash">Become a buyer</Link>
      </nav>
      <div className="grid grid-cols-2 gap-x-10 min-h-screen">
        <div className="flex flex-col p-10">
          <div className="flex w-full overflow-x-hidden grow">
            <div
              className={`flex w-[200%] transform transition-all duration-300  ${
                detailsStep ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="min-w-[100%] max-w-[100%]">
                <h1 className="font-extrabold text-4xl">
                  What&apos;s there to sell?
                </h1>
                <p>We have our hearts open for everything</p>
                <div className="flex flex-col gap-y-4 w-full mt-4">
                  <TextField
                    id="outlined-basic"
                    label="Product Name"
                    value={objectData?.name}
                    variant="outlined"
                    onChange={(e) =>
                      setObjectData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                  <TextareaAutosize
                    placeholder="Description"
                    minRows={15}
                    maxRows={15}
                    value={objectData?.description}
                    id="outlined-basic"
                    label="Description"
                    className="border border-black rounded-md p-2"
                    onChange={(e) => {
                      setObjectData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }));
                    }}
                    variant="outlined"
                  />
                  <div className="flex justify-between w-full">
                    <TextField
                      fullWidth
                      value={objectData?.quantity}
                      id="outlined-basic"
                      label="Quantity - Unit E.g. 1kg"
                      variant="outlined"
                      onChange={(e) =>
                        setObjectData((prev) => ({
                          ...prev,
                          quantity: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center w-full min-w-[100%] max-w-[100%]">
                <div className="w-[75%] flex justify-center">
                  {!image ? (
                    <>
                      <Lottie
                        animationData={lottieJson}
                        loop
                        play
                        style={{ width: "75%", height: "75%" }}
                      />
                    </>
                  ) : (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={image} alt="Image Preview" />
                    </>
                  )}
                </div>
                <div className="flex w-full justify-between">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setImage(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                  {!image ? (
                    <label htmlFor="file" className="">
                      Upload Image
                    </label>
                  ) : (
                    <button onClick={() => setImage(null)}>Clear</button>
                  )}

                  <button
                    className="bg-black text-white rounded-md p-2"
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-x-2 relative w-full overflow-hidden justify-center">
            <button
              ref={firstPage}
              onClick={() => setDetailsStep(true)}
              className={`h-6 transition-all duration-300 rounded-full ${
                detailsStep ? "w-12" : "w-6"
              } bg-black`}
            ></button>
            <button
              onClick={() => setDetailsStep(false)}
              className={`h-6 transition-all duration-300 rounded-full ${
                !detailsStep ? "w-12" : "w-6"
              } bg-black`}
            ></button>
          </div>
        </div>

        <div className="flex w-full items-center justify-center min-h-full">
          <Image className="min-w-full" src={ShopIll} alt="Shop Illustration" />
        </div>
      </div>
    </>
  );
};

export default Sell;
