import express from 'express';
const app = express();

app.get("/",(req,res)=>{
res.json({message:"this is the new pages of node.js"})
})

export default app