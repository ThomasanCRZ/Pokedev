import { useEffect, useState } from "react";
import Logo from "./assets/imgs/logo.png";
import Pokeball from "/imgs/pokeball.png";
import FilterBar from "./components/FilterBar.jsx";
import Loader from "./components/Loader.jsx";
import Footer from "./components/Footer.jsx";

const typeColors = {
  normal: { color: "#B3B3B3", fr: "Normal" },
  fire: { color: "#EB7471", fr: "Feu" },
  water: { color: "#8AC5F8", fr: "Eau" },
  electric: { color: "#FFCF4A", fr: "Électrik" },
  grass: { color: "#87C75E", fr: "Plante" },
  ice: { color: "#96D9D6", fr: "Glace" },
  fighting: { color: "#C22E28", fr: "Combat" },
  poison: { color: "#B84FB9", fr: "Poison" },
  ground: { color: "#B96928", fr: "Sol" },
  flying: { color: "#A98FF3", fr: "Vol" },
  psychic: { color: "#FB86B4", fr: "Psy" },
  bug: { color: "#A6B91A", fr: "Insecte" },
  rock: { color: "#B6A136", fr: "Roche" },
  ghost: { color: "#735797", fr: "Spectre" },
  dragon: { color: "#6085E7", fr: "Dragon" },
  dark: { color: "#212121", fr: "Ténèbres" },
  steel: { color: "#B7B7CE", fr: "Acier" },
  fairy: { color: "#CF91D1", fr: "Fée" },
};

const regions = {
  Kanto: { limit: 151, offset: 0 },
  Johto: { limit: 100, offset: 151 },
  Hoenn: { limit: 135, offset: 251 },
  Sinnoh: { limit: 107, offset: 386 }
};



function App() {

  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("Kanto");
  const [selectedType, setSelectedType] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const fetchPokemons = async () => {
      setisLoading(true);
      try {
        // Récupérer les limites et l'offset en fonction de la région sélectionnée
        const { limit, offset } = regions[selectedRegion];
  
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const data = await res.json();
  
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon, index) => {
            const id = offset + index + 1;
  
            const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
            const speciesData = await speciesRes.json();
  
            const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
            const pokemonData = await pokemonRes.json();
  
            const frenchName = speciesData.names.find((name) => name.language.name === "fr")?.name || pokemon.name;
  
            return {
              id,
              name: frenchName,
              image: pokemonData.sprites.front_default,
              types: pokemonData.types.map((t) => ({
                name: t.type.name,
                color: typeColors[t.type.name] || "#ccc"
              }))
            };
          })
        );
  
        setPokemons(pokemonDetails);
        setFilteredPokemons(pokemonDetails);
      } catch (error) {
        console.error("Erreur lors de la récupération des Pokémon :", error);
      }
  
      setTimeout(() => {
        setisLoading(false);
      }, 800);
    };
  
    fetchPokemons();
  }, [selectedRegion]); // ⚠️ Ajout de selectedRegion comme dépendance
  

  useEffect(() => {
    let filtered = pokemons;
  
    if (selectedRegion) {
      const { limit, offset } = regions[selectedRegion];
      filtered = pokemons.filter((p) => p.id > offset && p.id <= offset + limit);
    }
  
    if (selectedType.length > 0) {
      filtered = filtered.filter((p) =>
        selectedType.every((type) => p.types.map((t) => t.name.toLowerCase()).includes(type))
      );
    }
  
    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredPokemons(filtered);
  }, [selectedRegion, selectedType, searchTerm, pokemons]);

  const handleTypeChange = (type) => {
    if (selectedType.includes(type)) {
      setSelectedType(selectedType.filter((t) => t !== type));
    } else if (selectedType.length < 2) {
      setSelectedType([...selectedType, type]);
    }
  };

  return (
    <div className="main lg:w-200 md:w-150 sm:w-80 mx-auto px-2 md:px-0 z-0 ">
      {isLoading && <Loader />}
      <img className="w-80 mx-auto mt-5" src={Logo} alt="Pokédex Logo" />

      <div className="filter-pokedex md:w-150 md:h-200 sm:w-50 sm:h-300 mx-auto relative flex flex-col items-center mt-20 p-7 rounded-2xl border-5 border-zinc-700 pt-40 z-0" style= {{ backgroundColor: "rgba(214, 58, 64, 1)"}}>
        
        {/* Style Custom Pokédex */}
        <div className="big-blue-circle ">
          <div className="content-blue-circle"></div>
          <div className="light-blue-circle "></div>
        </div>
        
        <div className="little-red-circle">
          <div className="light-little-red-circle"></div>
        </div>
        <div className="little-yellow-circle">
          <div className="light-little-yellow-circle"></div>
        </div>
        <div className="little-green-circle">
          <div className="light-little-green-circle"></div>
        </div>
        
        <div className="pokedex-top"></div>

        <div className="filter-screen"></div>

        <div className="little-red-point-1"></div>
        <div className="little-red-point-2"></div>

        <div className="small-red-circle"></div>

        <div className="line-1"></div>
        <div className="line-2"></div>
        <div className="line-3"></div>
        <div className="line-4"></div>

        <div className="btn-left"></div>

        <div className="btn-select"></div>
        <div className="btn-start"></div>

        <div className="btn-right"></div>
        <div className="btn-center"></div>

        <div className="small-green-screen flex flex-col justify-center items-center gap-1.5">
          <p className="text-screen">pokedev 2025</p>
          <p className="credit-screen">Create by : Kaiodev</p>
        </div>

        <div className="w-full flex justify-center items-center">
          <input
            type="search"
            placeholder="Rechercher..."
            className="search absolute top-20 right-3 md:top-20 md:right-10 w-50 md:w-70 p-2 rounded-lg bg-amber-50 placeholder:text-gray-600 placeholder:text-xs placeholder:font-bold "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
        <FilterBar onRegionChange={setSelectedRegion} onTypeChange={handleTypeChange} selectedRegion={selectedRegion} selectedType={selectedType}/>
      </div>
      <div className="list-pokemons text-center mt-25 text-sm md:text-lg font-bold">
        <p style={{fontFamily: "PressStart"}}>Pokémons de {selectedRegion} ({filteredPokemons.length})</p>
      </div>
      <div className="pokedev grid grid-cols-2 md:grid-cols-3 gap-5 px-2 md:px-0 md:gap-10 mt-20 mx-auto">
        {filteredPokemons.map((pokemon) => ( 
          <div key={pokemon.id} className=" -z-20 w-fullflex flex-col items-center py-3 px-4 rounded-xl shadow-xl relative overflow-hidden" style={{ backgroundColor: typeColors[pokemon.types[0].name]?.color }}>
            {/* Nom + Numéro */}
            <div className=" w-full flex justify-start relative pt-1 lg:pt-2 ">
              <p className=" text-sm lg:text-lg font-bold text-white">{pokemon.name}</p>
              <p className="absolute top-0 right-1 font-bold lg:font-extrabold lg:right-2 lg:text-lg text-zinc-700">#{pokemon.id.toString().padStart(3, "0")}</p>
            </div>

            {/* Types  et Image*/}
            <div className="flex  items-center justify-between">
              <div className="flex flex-col gap-1 md:gap-2">
                {pokemon.types.map((type) => (
                  <div
                    key={type.name}
                    className=" flex justify-center px-2 py-1 text-xs md:px-3 md:py-1 rounded-2xl text-white md:text-sm font-bold text-center"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
                  >
                    {typeColors[type.name]?.fr || type}
                  </div>
                ))}
              </div>
              {/* Image du Pokémon */}
              <div >
                <img className="max-w-20 md:max-w-20" src={pokemon.image} alt={pokemon.name} />
              </div>
            </div>
            <img className="absolute left-18 top-16 lg:left-26 lg:top-13 -z-10 opacity-30" src={Pokeball} alt="Pokéball" />
          </div>
        ))
        }
      </div>
      <Footer/>
    </div>
  ); 
}

export default App;
