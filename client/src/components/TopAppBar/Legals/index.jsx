/* eslint-disable max-len */

import React from 'react';

import { Typography } from '../..';

const Legals = () => (
  <React.Fragment>
    <Typography variant='h5'>
      Déroulement de la partie
    </Typography>
    <Typography variant='body1'>
      Le but du jeu est de réaliser la meilleure combinaison de cartes possible.
      Pour ce faire, chaque joueur dispose de 10 cartes réponse tirées au hasard parmi plusieurs milliers de
      cartes exclusives créées par nos soins. Ces cartes servent à compléter les cartes questions qui sont des
      phrases à trous.
      Au premier tour, un des joueurs est désigné aléatoirement comme étant le patron, c’est lui qui devra
      choisir quelle combinaison de carte est, selon lui, la meilleure.
      Celui qui sera désigné deviendra à son tour le patron et ainsi de suite.
      Le vainqueur est celui qui remporte le nombre de tours défini en début de partie (5 points par défaut).
    </Typography>
    <Typography variant='h5'>
      À savoir
    </Typography>
    <Typography variant='body1'>
      Rejoignez-nous sur Discord afin de rendre votre expérience de jeu beaucoup plus conviviale !
      UnderTheLimits est librement inspiré du jeu « Cards Against Humanity » sous licence Creative
      Commons.
      Certaines de nos cartes sont particulièrement atroces ou politiquement incorrectes. Il serait préférable
      de ne jouer à UnderTheLimits que si vous avez au moins 16 ans !
      Il est possible que malgré nos efforts vous puissiez retrouver certaines communes avec d’autres
      adaptations françaises de ce jeu comme « Blanc Manger Coco » ou « Limite Limite ». Nous faisons
      notre maximum pour que nos decks soient les plus originaux possibles. Vous pourrez, sous peu de temps, nous
      suggérer de nouvelles cartes via le formulaire présent sur notre homepage. Si ces cartes ne sont pas
      déjà présentes, nous pourrons alors, après modération, les intégrer.
      Bon jeu !
    </Typography>
  </React.Fragment>
);

export default Legals;
