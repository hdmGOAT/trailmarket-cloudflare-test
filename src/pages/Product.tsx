import React from "react";
import { useNavigate } from "react-router-dom";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
}

const Product: React.FC<ProductProps> = ({
  id,
  name,
  price,
  stock,
  imageUrl,
}) => {
  const nav = useNavigate();
  return (
    <div className="PRODUCT-CONTAINER space-y-3 flex flex-col w-full p-4 md:max-w-md lg:max-w-lg xl:max-w-xl">
      <button
        className="flex flex-col gap-3"
        onClick={() => {
          nav(`/product/${id}`);
        }}
      >
        <div className="flex w-full rounded-xl overflow-hidden aspect-square">
          <img
            src={imageUrl}
            className="object-cover w-full h-full"
            alt={name}
          />
        </div>
        <div className="flex w-full bg-zinc-900 rounded-xl p-4 flex-row">
          <div className="left-side flex-[3] flex flex-col align-top">
            <div className="flex flex-row align-middle space-x-2">
              <div className="w-4 h-4 rounded-full overflow-hidden border border-black">
                <img
                  className="object-cover h-full w-full"
                  src={imageUrl}
                  alt="User"
                />
              </div>
              <p className="text-xs align-middle text-white">Username</p>
            </div>
            <h2 className="text-white text-left font-normal text-sm">{name}</h2>
          </div>
          <div className="right-side flex flex-[2] flex-col justify-start text-right">
            <h2 className="text-white text-2xl md:text-lg xl:text-2xl">
              PHP {price.toFixed(2)} pesos
            </h2>
            <h2 className="text-white font-normal text-sm md:text-xs xl:text-sm">
              Stock available: {stock}
            </h2>
          </div>
        </div>
      </button>
    </div>
  );
};

export default Product;
