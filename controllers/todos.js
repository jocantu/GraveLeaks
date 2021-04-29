const Todo = require('../models/Todo')

module.exports = {
    getTodos: async (req,res)=>{
        // console.log(req.user)
        try{
            const todoItems = await Todo.find()
            console.log(todoItems)
            let geojson = {
              type: "FeatureCollection",
              features: [],
            };

            todoItems.forEach(element => {
              geojson.features.push({
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [element.lon,element.lat]
                },
                "properties": {
                  "date": element.date,
                  "lat": element.lat,
                  "lon": element.lon,
                  "description": element.description
                }
              });
            });

            res.render('todos.ejs', {todos: todoItems, points: geojson, user: req.user})
            console.log(todoItems);
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        try{
            await Todo.create({
              date: req.body.date,
              lat: req.body.latitude,
              lon: req.body.longitude,
              description: req.body.description,
              userId: req.user.id
              })
            console.log('New location added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    