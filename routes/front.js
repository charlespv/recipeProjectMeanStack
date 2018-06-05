/*
Importer les composants de la route
*/
    // Class
    const express = require('express');
    const router = express.Router();
//

/**
 * Configuration de Mongoose
 * Ici, on le lance sur le port 27017
 */
    const mongoose = require('mongoose');
    const ObjectId = require('mongodb').ObjectID;
    const mongoServeur = 'mongodb://localhost:27017/my-recipes';
//

/*
Définition des routes
*/
    router.get( '/', (req, res) => {
     //Connexion à la base de données mongoDB
     mongoose.connect(mongoServeur, (err, db)=>{
         //Tester ma connexion
         if(err){ res.json({error: err}) }
         else{
             //Connexion ouverte : récupérer la collection de données
             db.collection('recipes').find().toArray( (err, collection)=>{
 
                 //test de la connexion de la collection
                 if(err){res.render('index',{error:err})}
                 else{
                         // Collection récupérée :rendering de l'index avec les données
                        res.render('index',{data:collection});
                 }
             } )
         };
 
         //Fermer la connexion
         db.close();
 
     })
 
 });

 

 /**
 * Route pour consulter une recette
*/
    router.get( '/recipe/:id', (req, res) => {
        console.log(req.params.id);
        //Connexion à la base de données mongoDB
        mongoose.connect(mongoServeur, (err, db)=>{
            //Test de la connexion
            if(err){ res.json({error: err}) }
            else{
                //Connexion ouverte : récupérer la collection de données
                db.collection('recipes').find(ObjectId(req.params.id)).toArray( (err, collection)=>{
    
                    //tester la connexion de la collection
                    if(err){res.render('recipe',{error:err})}
                    else{
                        //Collection récupérée
                        //res.json(collection);
                            console.log(collection);
                            //rendering et partage des données
                            res.render('recipe',{data:collection});
                    }
                } )
            };
    
            //Fermer la connexion
            db.close();
    
        })
    
    });

//
/*

/**
 * Route pour ajouter des taches, relais avec l'api
*/

    router.get('/add-recipe',(req, res)=>{
        res.render('add-recipe')
    });

//
/*

/**
 * Route pour supprimer des taches, relais avec l'api
*/

    router.get('/suppr-posts',(req, res)=>{
        res.render('suppr-posts')
    });



//
/*



Exporter le module de route
*/
module.exports = router;
//