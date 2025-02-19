import pokeball from "/imgs/pokeball.png";
import normalImg from "../assets/imgs/icons/normal.svg";
import fireImg from "../assets/imgs/icons/fire.svg";
import waterImg from "../assets/imgs/icons/water.svg";
import electricImg from "../assets/imgs/icons/electric.svg";
import grassImg from "../assets/imgs/icons/grass.svg";
import iceImg from "../assets/imgs/icons/ice.svg";
import fightingImg from "../assets/imgs/icons/fighting.svg";
import poisonImg from "../assets/imgs/icons/poison.svg";
import groundImg from "../assets/imgs/icons/ground.svg";
import flyingImg from "../assets/imgs/icons/flying.svg";
import psychicImg from "../assets/imgs/icons/psychic.svg";
import bugImg from "../assets/imgs/icons/bug.svg";
import rockImg from "../assets/imgs/icons/rock.svg";
import ghostImg from "../assets/imgs/icons/ghost.svg";
import dragonImg from "../assets/imgs/icons/dragon.svg";
import darkImg from "../assets/imgs/icons/dark.svg";
import steelImg from "../assets/imgs/icons/steel.svg";
import fairyImg from "../assets/imgs/icons/fairy.svg";


const typeColors = {
  normal: { color: "#D4D4D4", fr: "Normal", img: normalImg },
  fire: { color: "#EB7471", fr: "Feu", img: fireImg},
  water: { color: "#8AC5F8", fr: "Eau", img: waterImg},
  electric: { color: "#FFCF4A", fr: "Électrik", img: electricImg},
  grass: { color: "#87C75E", fr: "Plante", img: grassImg},
  ice: { color: "#96D9D6", fr: "Glace", img: iceImg},
  fighting: { color: "#C22E28", fr: "Combat", img: fightingImg},
  poison: { color: "#B84FB9", fr: "Poison", img: poisonImg},
  ground: { color: "#E2BF65", fr: "Sol", img: groundImg},
  flying: { color: "#A98FF3", fr: "Vol", img: flyingImg},
  psychic: { color: "#FAD9E6", fr: "Psy", img: psychicImg},
  bug: { color: "#A6B91A", fr: "Insecte", img: bugImg},
  rock: { color: "#B6A136", fr: "Roche", img: rockImg},
  ghost: { color: "#735797", fr: "Spectre", img: ghostImg},
  dragon: { color: "#6F35FC", fr: "Dragon", img: dragonImg},
  dark: { color: "#705746", fr: "Ténèbres", img: darkImg},
  steel: { color: "#B7B7CE", fr: "Acier", img: steelImg},
  fairy: { color: "#FAD9E6", fr: "Fée", img: fairyImg},
};

const regions = {
  Kanto: { limit: 151, offset: 0 },
  Johto: { limit: 100, offset: 151 },
  Hoenn: { limit: 135, offset: 251 },
  Sinnoh: { limit: 107, offset: 386 },
};

const FilterBar = ({ selectedRegion, selectedType, onRegionChange, onTypeChange }) => {
  return (
    <div className="filter-div relative bg-black rounded-2xl w-70 md:w-110 mt-10 p-2 z-2" >
        <div className="filter-container relative flex flex-col items-center gap-4 mt-2 md:mt-5" >
        <img className="filter-pokeball absolute top-0 right-0 " src={pokeball} alt="" />
            {/* Boutons de région */}
            <div className="filter-region md:flex md:gap-2 grid grid-cols-4 gap-2">
                {Object.entries(regions).map(([region, _]) => (
                <button
                    key={region} // Clé unique avec le nom de la région
                    className={` px-1 py-2 md:px-4 md:py-2 md:text-xs text-2xs  rounded-lg text-black border-2 border-blue-800  shadow-black shadow-sm ${selectedRegion === region ? "bg-yellow-400 text-blue-800" : "bg-white"}`}
                    onClick={() => onRegionChange(region)}
                >
                    {region}
                </button>
                ))}
            </div>

            {/* Boutons de type */}
            <div className="filter-type grid grid-cols-4 md:grid-cols-5 place-items-center w-full ">
                {Object.entries(typeColors).map(([type, data]) => (
                <button
                    key={type} // Clé unique avec le nom du type
                    className={`flex items-center justify-center rounded-full w-10 h-10 my-2 border-2 border-gray-100 ${
                    selectedType.includes(type) ? "scale-80" : "shadow-black shadow-md "
                    }`}
                    style={{ backgroundColor: data.color }}
                    onClick={() => onTypeChange(type) }
                >
                    <img className="w-6" src={data.img} alt={data.fr}/>
                </button>
                ))}
            </div>
        </div>
    </div>
    
  );
};

export default FilterBar;
