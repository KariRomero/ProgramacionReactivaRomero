import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon } from './pokemon.model';
import { PokemonService } from './poke.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  pokemon$!: Observable<Pokemon>;
  pokemonForm!: FormGroup;
  private subscription: Subscription = new Subscription();

  constructor(private pokemonService: PokemonService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.pokemonForm = this.fb.group({});
    this.loadRandomPokemon();
  }

  loadRandomPokemon(): void {
    this.pokemon$ = this.pokemonService.getRandomPokemon().pipe(
      map((pokemon: Pokemon) => {
       // console.log(pokemon);
        
        if (Array.isArray(pokemon.abilities)) { 
          const typeNames = pokemon.abilities.map((ability: { ability: { name: string; }; }) => ability.ability.name);
          pokemon.abilities = typeNames.join(', ');
        }
        return pokemon;
      })
    );
  }
  
  

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
