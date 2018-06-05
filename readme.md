# Compte rendu 
*par Charles PAULAS VICTOR - 23/02/2018*


## Infos
Le serveur Node est sur le port 8000
Le serveur MongoDB est sur le port 27017


## Recettage
Un bilan de ce que je n'ai pas pu réaliser par rapport aux specs.

### Outils
Je suis resté sur de l'EJS pour l'ensemble de l'application

### Selection d'une recette 
Pour afficher une nouvelle page avec la recette sélectionnée, je suis passé uniquement par la route front. En passant par l'api, je recevais des messages d'erreurs. 

Par ailleurs, sur la page recipe, mon fichier CSS styles.css n'est pas utilisé. Le navigateur ne le prend pas en compte et m'affiche une erreur '

### Suppression d'une recette
Je n'ai pas réussi à insérer le bouton supprimer sur la page présentant une recette. Par conséquent, j'ai ajouté le bouton sur la liste des recettes, sur la page accueil.

Par ailleurs, je n'ai pas réussi à faire à demander la confirmation à l'utilisateur avant la suppression.

### Ajouter une recette
Je n'ai pas eu le temps de faire la vérification des champs dans le formulaire.
Après validation, on revient sur la page accueil.
