import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from './pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = "https://pokeapi.co/api/v2/pokemon";

  constructor(private http: HttpClient) { }

  getRandomPokemon(): Observable<Pokemon> {
    const randomId = Math.floor(Math.random() * 898) + 1;
    return this.http.get<Pokemon>(`${this.apiUrl}/${randomId}`);
  }
}
