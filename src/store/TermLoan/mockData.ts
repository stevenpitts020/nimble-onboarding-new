import armchair from "./img/Armchair.svg";
import armchairActive from "./img/ArmchairActive.svg";
import buildings from "./img/Buildings.svg";
import buildingsActive from "./img/BuildingsActive.svg";
import car from "./img/Car.svg";
import carActive from "./img/CarActive.svg";
import graph from "./img/Graph.svg";
import graphActive from "./img/GraphActive.svg";
import packageIcon from "./img/Package.svg";
import packageIconActive from "./img/PackageActive.svg";

export default [
  {
    id: "0",
    name: "Businness",
    description: "Insert vin #",
    icon: buildings,
    activeIcon: buildingsActive,
  },
  {
    id: "1",
    name: "Equipment",
    description: "Insert vin #",
    icon: armchair,
    activeIcon: armchairActive,
  },
  {
    id: "2",
    name: "Inventory",
    description: "Insert vin #",
    icon: packageIcon,
    activeIcon: packageIconActive,
  },
  {
    id: "3",
    name: "Real Estate",
    description: "Start typing an address...",
    icon: buildings,
    activeIcon: buildingsActive,
  },
  {
    id: "4",
    name: "Recievables",
    description: "Enter below",
    icon: graph,
    activeIcon: graphActive,
  },
  {
    id: "5",
    name: "Vehicle / Other",
    description: "Insert vin #",
    icon: car,
    activeIcon: carActive,
  },
];
