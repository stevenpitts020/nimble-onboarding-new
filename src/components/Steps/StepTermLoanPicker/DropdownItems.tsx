import React, { FC, useContext, useEffect, useState } from "react";
import DropdownList from "./DropdownList";
import { TermLoanContext } from "../../../store/TermLoan/TermLoadContext";
import { IDropdownItems } from "./types";
import {
  MAPBOX_ENDPOINT,
  MAPBOX_TOKEN,
} from "../../../utils/constants/general";
import WhatInput from "./components/WhatInput";

const DropdownItems: FC<IDropdownItems> = ({
  termLoanPickerItems,
  activeItem,
  setActiveItem,
  setData,
  data,
}) => {
  const { isShowDropdown, toggleDropdownVisibility } =
    useContext(TermLoanContext);
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [lat, setLat] = useState<number>();
  const [lng, setLng] = useState<number>();

  const getLocation = () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          console.error("Unable to retrieve your location");
        }
      );
    }
  };

  const getReverseGeocodeng = async (endpoint, longitude, latitude) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/${endpoint}/${longitude},${latitude}.json?access_token=${MAPBOX_TOKEN}`
      );
      return await response.json();
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getLocation();
  }, []);
  useEffect(() => {
    if (lat && lng && inputValue === "") {
      getReverseGeocodeng(MAPBOX_ENDPOINT, lng, lat)
        .then((place) => {
          place.features.forEach((item) => {
            if (
              activeItem.name === "Real Estate" &&
              item.place_type[0] === "address"
            ) {
              setInputValue(item.place_name);
            }
          });
        })
        .catch((err) => console.log(err));
    }
  }, [lat, lng, activeItem]);
  useEffect(() => {
    setInputValue("");
  }, [activeItem]);

  const onChangeActiveItem = (value) => {
    const newActiveItem = termLoanPickerItems.find(
      ({ name }) => name === value
    );
    if (newActiveItem) {
      setActiveItem(newActiveItem);
    }
  };

  return (
    <div className="w-full mt-8">
      <WhatInput onChange={onChangeActiveItem} value={activeItem.name} />
      <div className="flex w-full mt-2">
        <div className="flex h-10 w-full items-center">
          <div
            className={`w-full flex items-center h-full pl-3 cursor-pointer border rounded-r-lg ${
              isInputFocus ? "border-blueRibon" : "border-neutral30"
            }`}
          >
            <input
              className="w-full placeholder:text-neutral60-400-font-inter-text-sm text-neutral100 font-normal font-inter text-sm focus:outline-none cursor-pointer"
              placeholder={activeItem.description}
              onFocus={() => {
                setIsInputFocus(true);
                toggleDropdownVisibility(false);
              }}
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onBlur={() => setIsInputFocus(false)}
            />
          </div>
        </div>
        <div className="flex items-center justify-center w-10 border border-neutral30 rounded-lg ml-2">
          <button
            className="font-normal text-3xl text-neutral60"
            onClick={() => {
              setActiveItem(termLoanPickerItems[3]);
              const newData = {
                address: inputValue,
                id: Date.now(),
                type: "Refinance",
                price: 100000,
                requestPrice: 85000,
                activeItem: activeItem,
              };
              setData([...data, newData]);
            }}
          >
            +
          </button>
        </div>
      </div>
      {isShowDropdown && <DropdownList list={termLoanPickerItems} />}
    </div>
  );
};

export default DropdownItems;
