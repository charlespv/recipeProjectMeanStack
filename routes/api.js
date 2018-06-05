/*
Importer les composants de la route
*/
    // Class
    const express = require('express');
    const router = express.Router();
    const bodyParser = require('body-parser');

/**
 * Définiton de constantes pour capturer l'id pour faire les requêtes
 */
    // Module
    const mongodb = require('mongodb');
    const ObjectId = mongodb.ObjectID;
//

/**
 * Configuration de Mongoose
 * Ici, on le lance sur le port 27017
 */

    const mongoose = require('mongoose');
    const mongoServeur = 'mongodb://localhost:27017/my-recipes';
//


/*
Configuration de body-parser (middleware)
*/
    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({extended: false}));
//

/*
Définition des routes
*/

// Accueil de mon API
    router.get( '/', (req, res) => {
        // Renvoyer un flux JSON dans la réponse
        res.json( { content: 'Hello from API' } );
    });


// Afficher la liste des recettes
    router.get( '/my-recipes', (req, res) => {
   
    // Connexion à la BDD
    mongoose.connect(mongoServeur, (err, db)=>{
        //Tester la connexion
        if(err){ res.json({error: err}) }
        else{
            //Connexion ouverte : récupérer la collection de données grâce au find()
            db.collection('recipes').find().toArray( (err, collection)=>{

                //test de la connexion à la collection
                if(err){res.json({error:err})}
                else{
                    //Collection récupérée et formatage en json
                    res.json(collection);
                }
            } )
        };

        //Fermer la connexion
        db.close();

    })

});



    // Route API pour ajouter une recette
    router.post('/add-recipe', (req,res)=>{
        console.log(req.body);
        mongoose.connect(mongoServeur, (err, db)=>{
            //Tester ma connexion
            if(err){ res.render('add-recipe', {msg:err}) }
            else{
                //Connexion ouverte : ajouter les données dans la BDD grâce au insert
                db.collection('recipes').insert({ 
                    title: req.body.title,
                    content:req.body.content,
                    ingredient:req.body.ingredient,
                    type:req.body.type}, (err, newObject)=>{
                    //Verifier l'ajout et redirection vers l'accueil
                    if(err){res.redirect(500,'/') }
                    else{
                        res.redirect(301, '/')
                    }
                })
            };
    
            //Fermer la connexion
            db.close();
    
        })
    })


//

    // Route API pour supprimer un article
    router.post('/suppr-posts/:id', (req,res)=>{
        console.log(req.params.id);
        mongoose.connect(mongoServeur, (err, db)=>{
            //Test de la connexion
            if(err){ res.render('suppr-posts', {msg:err}) }
            else{
                //Connexion ouverte : supprimer les données dans la BDD
                db.collection('recipes').remove({ 
                    _id: new ObjectId(req.params.id)
                   }, (err, newObject)=>{
                    //Verification de l'operation suppression
                    if(err){res.redirect(500,'/') }
                    else{
                        res.redirect(301,'/')
                    }
                })
            };
    
            //Fermer la connexion
            db.close();
    
        })
    })





//






/*
Exporter le module de route
*/
module.exports = router;
//