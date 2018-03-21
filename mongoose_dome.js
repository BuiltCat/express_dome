const mongoose = require('mongoose');

const uri = `mongodb://localhost:27017/test`;

mongoose.connect(uri, {
    useMongoClient: true
});

const db = mongoose.connection;

const Schema = mongoose.Schema({
    name: {type: String,required:true},
    age: Number
});

const Model = mongoose.model('Model', Schema);

(async (params) => {
    const filter = {};
    if (params.name) filter.name = params.name;
    const flow = Model.find(filter);
    // if (params.projection) flow.select(params.projection);
    // if (params.sort) flow.sort(params.sort);
    const newModel = await flow.exec();
    return newModel;
})({
    name: '王钟浩',
    // projection: {
    //     age: 10
    // },
    // sort: 'age'
})
.then(r => {
    console.log(r);
}).catch(e => {
    console.log(e);
})


db.once('open', () => {
    console.log('db connected!')
})

db.on('error', (e) => {
    console.log(e)
})