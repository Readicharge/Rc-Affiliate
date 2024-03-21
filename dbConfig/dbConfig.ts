import mongoose from 'mongoose';

export async function connect () {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected',() => {
            console.log("Mongo DB Conneted Successfully");
        });

        connection.on('error',(err)=>{
            console.log("Something went wrong with the mongoDB Connection!! "+ err);
            process.exit();
        })
    }
    catch (error)
    {
        console.log("Something went wrong",error);
    }
}


