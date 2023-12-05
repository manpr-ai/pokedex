import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  // État pour stocker les données du Pokémon
  const [data, setData] = useState(null);
  // État pour stocker le nom du Pokémon
  const [name, setName] = useState('');
  // État pour stocker le poids du Pokémon
  const [weight, setWeight] = useState('');
  // État pour stocker le numéro du Pokémon (par défaut à 1)
  const [number, setNumber] = useState(1);

  // Fonction pour déclencher la requête API et mettre à jour les états
  const show = () => {
    // URL de l'API avec le numéro du Pokémon
    const URL = `https://pokeapi.co/api/v2/pokemon/${number}`;

    // Effectuer une requête GET à l'API Pokémon
    axios.get(URL).then((response) => {
      // Mettre à jour les états avec les données du Pokémon
      setData(response.data);
      setName(response.data.name);
      setWeight(response.data.weight);
    }).catch((err) => {
      // Gérer les erreurs, par exemple, afficher une alerte
      window.alert(err);
    });
  };

  // Utiliser useEffect pour effectuer la requête API au chargement du composant
  useEffect(() => {
    show();
  }, []); // Ajouter un tableau de dépendances vide pour éviter les appels excessifs

  return (
    <div className="App">
      <h1>Pokemon</h1>
      {/* Input pour saisir le numéro du Pokémon */}
      <input type="number" value={number} onChange={(e) => setNumber(e.target.valueAsNumber)} />
      {/* Bouton pour déclencher l'affichage du Pokémon */}
      <button onClick={show}>Show</button>
      {/* Afficher le nom du Pokémon */}
      <h2>Name: {name}</h2>
      {/* Afficher le poids du Pokémon */}
      <h3>Weight: {weight}</h3>
      {/* Afficher l'image du Pokémon (ou un message de chargement) */}
      <img src={data ? data.sprites.other.dream_world.front_default : "<p>Loading</p>"} alt="Pokemon" />
      {/* Afficher les capacités du Pokémon */}
      <p>My abilities are:</p>
      {data ? data.abilities.map((value, key) => (
        <div key={key}>{value.ability.name}</div>
      )) : ""}
    </div>
  );
}

export default App;
