<script setup>
import { ref } from 'vue';
import {
  Guerrier,
  Magicien,
  Voleur,
  combattre, ClasseAvatar,
} from './classes/Character-classes';

const classes = Object.values(ClasseAvatar)

/* -----------  REF ------------------  */
// une ref est une fonction qui permet de créer une référence réactive à une donnée. 
// Cela signifie que si la valeur change,
//  l'interface utilisateur (UI) se mettra automatiquement à jour pour refléter ce changement.
const personnages = ref([
  new Guerrier("Paul", "Le puissant")
]);

const nouveauNom = ref('');
const nouvelleClasse = ref(ClasseAvatar.Guerrier);
const combattant1 = ref('');
const combattant2 = ref('');
const journalCombat = ref([]);

function creerPersonnage() {
  if (!nouveauNom.value) return;

  let nouveauPersonnage;
  switch (nouvelleClasse.value) {
    case ClasseAvatar.Guerrier:
      nouveauPersonnage = new Guerrier(nouveauNom.value);
      break;
    case ClasseAvatar.Magicien:
      nouveauPersonnage = new Magicien(nouveauNom.value);
      break;
    case ClasseAvatar.Voleur:
      nouveauPersonnage = new Voleur(nouveauNom.value);
      break;
  }

  personnages.value.push(nouveauPersonnage);
  nouveauNom.value = '';
}

function lancerCombat() {
  const p1 = personnages.value.find(p => p.nom === combattant1.value);
  const p2 = personnages.value.find(p => p.nom === combattant2.value);

  if (p1 && p2) {
    journalCombat.value = combattre(p1, p2);
  }
}
</script>

<template>

  <div class="container">
    <h1>Jeu d'Avatars</h1>
    <div class="game-container">
      <div class="character-zone">
        <!-- Création de personnage -->
        <div class="character-creation">
          <h2>Créer un personnage</h2>
          <input v-model="nouveauNom" placeholder="Nom du personnage" />
          <select v-model="nouvelleClasse">
            <option v-for="classe in classes" :key="classe">{{ classe }}</option>
          </select>
          <button @click="creerPersonnage">Créer</button>
        </div>

        <!-- Liste des personnages -->
        <div class="character-list">
          <h2>Personnages</h2>
          <!-- :key permet d'identifier de manièere unique chaque élément -->
          <!-- Cela aide Vue à optimiser le rendu de l'interface utilisateur en réutilisant -->
          <!-- et mettant à jour uniquement les éléments qui ont changé, au lieu de recréer toute la liste.-->
          <div v-for="personnage in personnages" :key="personnage.nom" class="character-card">
            <h3>{{ personnage.nom }} ({{ personnage.classe }})</h3>
            <p>Vie: {{ personnage.vie }} | Or: {{ personnage.gold }}</p>
            <div class="character-actions">
              <button @click="personnage.saluer()">Saluer</button>
              <button @click="personnage.boireUnePotion()">Potion</button>
            </div>
          </div>
        </div>
      </div>

      <div class="combat-zone">
        <!-- Combat -->
        <div v-if="personnages.length > 1">
          <h2>Zone de Combat</h2>
          <select v-model="combattant1">
            <option v-for="p in personnages" :key="p.nom">{{ p.nom }}</option>
          </select>
          <select v-model="combattant2">
            <option v-for="p in personnages" :key="p.nom">{{ p.nom }}</option>
          </select>
          <button @click="lancerCombat">Combattre</button>
        </div>

        <!-- Journal de combat -->
        <div class="combat-log" v-if="journalCombat.length">
          <h3>Journal de Combat</h3>
          <div v-for="(action, index) in journalCombat" :key="index">
            {{ action }}
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  border: 2px red solid;
  min-width: 800px;
  width: 90vw;
  height: 100vh;
}

.game-container {
  display: flex;
}

.character-zone {
  flex: 50%;
  padding: 50px;
}

.combat-zone {
  padding: 50px;
  flex: 50%;

  border: blue 2px solid;
}

.character-card {
  border: 1px solid #ddd;
  margin: 10px 0;
  padding: 10px;
}

.character-actions button {
  margin-right: 10px;
}

</style>
