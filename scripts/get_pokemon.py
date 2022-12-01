import requests as rq;
import json;

# Get the pokemon
pokemonJson = rq.get(b'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0').json()

# Write the pokem with their url to a csv file
with open('./react-src/src/pokemon.json', 'w', newline='') as file:
    writer = json.JSONEncoder()
    output = writer.encode(pokemonJson['results'])

    file.write(output)