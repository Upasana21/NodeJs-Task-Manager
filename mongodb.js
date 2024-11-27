const { MongoClient, ObjectId } = require('mongodb');
const connectionURL = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(connectionURL);
const dbName = 'task-manager';
const id = new ObjectId();
console.log(id);

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);

    const collection = db.collection('users');   
try{
        //_id: new ObjectId('67450252a6ae9c1606e1ac65')
        // const result = await db.collection('users')
        //     .findOne({ age:20 })
        // const result = await db.collection('users')
        //     .find({ age:19 }).toArray()
        //Read-----------------------------------------
        // const result=await db.collection('tasks').findOne({_id:new ObjectId('67445803d0454407d0c08024')})
        // console.log(result)
        // const res=await db.collection('tasks').find({completed:false}).toArray()
        // console.log(res)
        //UpdateOne-------------------------------------
        // const updateResult=await db.collection('users').updateOne(
        //     {_id:new ObjectId('67450252a6ae9c1606e1ac63')},
        //     {
        //         $set:{name:'Radhe'},
        //         $inc:{age:2}
        //     }
        // )
        // console.log(updateResult)
        //UpdateMany-----------------------------------------
        /*const updateManyResult=await db.collection('tasks').updateMany(
            // {_id:{$in:[new ObjectId('67445803d0454407d0c08022'),new ObjectId('67445803d0454407d0c08023')]}},
            // {_id:new ObjectId('67445803d0454407d0c08023')},
            {completed:false},
            {$set:{
                completed:true
            }})
        console.log(updateManyResult)*/
        //delete------------------------------------
        // const delManyResult= await db.collection('users').deleteMany({age:19});
        // console.log(delManyResult)
        const delOneResult= await db.collection('tasks').deleteOne({description:'Third Session'})
        console.log(delOneResult)

    }catch(err){
        console.log(err);
    }finally{
        client.close();
    }


}

main()
// .then().catch((error)=>{
//     console.log(error)
// }).finally(()=>client.close());