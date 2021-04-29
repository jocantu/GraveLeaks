module.exports = {
    getAllTodos: async (req,res)=>{
        console.log(req.user)
        try{
            const todoItems = await Todo.find()
            // var outGeoJson = {}
            // outGeoJson['properties'] = jsonData
            // outGeoJson['type']= "Feature"
            // outGeoJson['geometry']= {"type": "Point", "coordinates":
            //     [jsonData['lat'], jsonData['lon']]}

            // console.log(outGeoJson)
            // res.render('todos.ejs', {todos: todoItems, user: req.user})
            console.log(todoItems)
        }catch(err){
            console.log(err)
        }
    }
}    