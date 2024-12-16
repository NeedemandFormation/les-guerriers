// Types d'avatars
const ClasseAvatar = {
    Guerrier: 'Guerrier',
    Magicien: 'Magicien',
    Voleur: 'Voleur',
};


class Avatar {
    constructor(nom, classe) {
        this.nom = nom;
        this.puissance = Math.floor(Math.random() * 10) + 1;
        this.vie = 100;
        this.magie = Math.floor(Math.random() * 10) + 1;
        this.gold = 50;
        this.classe = classe;
    }

    boireUnePotion() {
        this.vie += 20;
        console.log(`${this.nom} boit une potion et regagne 20 points de vie`);
    }
}

class Guerrier extends Avatar {
    constructor(nom) {
        super(nom, ClasseAvatar.Guerrier);
        this.puissance = Math.floor(Math.random() * 10) + 5;
    }

    saluer() {
        return "Arg";
    }

    attaquer(cible) {
        const degats = Math.floor(Math.random() * this.puissance) + 5;
        cible.vie -= degats;
        return `${this.nom} assène un coup de hache à ${cible.nom} et inflige ${degats} dégâts !`;
    }
}

class Magicien extends Avatar {
    constructor(nom) {
        super(nom, ClasseAvatar.Guerrier);
        this.puissance = Math.floor(Math.random() * 10) + 5;
    }

    saluer() {
        return "Arg";
    }

    attaquer(cible) {
        const degats = Math.floor(Math.random() * this.puissance) + 5;
        cible.vie -= degats;
        return `${this.nom} assène un sort de magie à ${cible.nom} et inflige ${degats} dégâts !`;
    }
}

class Voleur extends Avatar {
    constructor(nom) {
        super(nom, ClasseAvatar.Guerrier);
        this.puissance = Math.floor(Math.random() * 10) + 5;
    }

    saluer() {
        return "Arg";
    }

    attaquer(cible) {
        const degats = Math.floor(Math.random() * this.puissance) + 5;
        cible.vie -= degats;
        return `${this.nom} assène un coup de poignard à ${cible.nom} et inflige ${degats} dégâts !`;
    }
}


// Fonction de combat
function combattre(attaquant, defenseur) {
    const actions = [];


    while (attaquant.vie > 0 && defenseur.vie > 0 ) {
        const actionAttaquant = attaquant.attaquer(defenseur);
        actions.push(actionAttaquant);

        if (defenseur.vie <= 0) {
            actions.push(`${defenseur.nom} est K.O !`);
            actions.push(`${attaquant.nom} a gagné !`);
            const orTransfere = defenseur.gold;
            defenseur.gold = 0;
            attaquant.gold += orTransfere;
            actions.push(`${attaquant.nom} remporte ${orTransfere} pièces d'or !`);
            break;
        }
        // Échange des rôles
        [attaquant, defenseur] = [defenseur, attaquant];
    }

    return actions;
}

// Convertir les autres classes de la même manière...

export {
    Avatar,
    Guerrier,
    Magicien,
    Voleur,
    ClasseAvatar,
    combattre
};