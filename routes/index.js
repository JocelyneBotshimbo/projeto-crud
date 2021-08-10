const express = require('express');
const club = require('../models/club');
const router = express.Router();
let Club = require('../models/club');

//ROUTE FOR READ
router.get('/',(req,res) =>{
    club.find((err, docs) =>{
        if(err)throw err;
        res.render('index', {clubs: docs});
}).catch(err =>{
    console.log("something wrong with mongoDB");

})

});
    

//ROUTE FOR CREATE
router.post('/add',(req,res,next) =>{
    //const name = req.body.name;
    //const players = req.body.players;
    //const coach = req.body.coach;

    const {name, players, coach} =req.body;

console.log(name, players,coach);

const club =new Club({
    name,
    players,
    coach
});

club.save(err =>{
    if(err){
        console.log("something went wrong to save data to database");
    }else{
        console.log("Data is recorded successfully");
        res.redirect('/');
    }
});

});

//ROUTE TO SHOW UPDATE ELEMENT
router.get('/edit/:id', (req,res, next)=>{
    console.log(req.params.id);
    club.findOneAndUpdate({_id: req.params.id }, req.body, {new:true}, (err, docs) => {
        if(err){
            console.log("can't retrive data and edit because some database problem ");
            next (err);
        }else{
            res.render('edit',{club: docs});
        }
    }); 

})


//ROUTE TO UPDATE ELEMENT
router.post('/edit/:id', (req, res,next) =>{
    club.findByIdAndUpdate({_id:req.params.id}, req.body,(err,docs) =>{
        if(err){
            console.log("something went wrong to update your data");
            next(err)                 ;
        }else{
            console.log("updated successfully");
            res.redirect('/');

        }
    });
} );

//ROUTE TO DELETE ITEM
router.get('/delete/:id',(req,res,next)=>{
    club.findByIdAndDelete({_id:req.params.id},(err,docs)=>{
        if(err){
            console.log("something went wrong to delete data ");
            next(err);

        }else{
            console.log("deleted successfully");
        }

    })
})



module.exports = router;