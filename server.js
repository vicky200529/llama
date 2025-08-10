import express, { response } from "express"
import path from "path"
import dotenv from "dotenv"
dotenv.config()
const dir =path.resolve();
const app =express()
const PORT =3000;
app.set("view engine","ejs")
app.use(express.static(path.join(dir+"/public/")))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get("/",(req,res)=>{
    res.render("index",{output:null})
})
app.post("/chat",async(req,res)=>{
    console.log("Raw body:", req.body);
const prompt=req.body.prompt;
console.log("Prompt received from form:", prompt);
    try {
        const ollama=await fetch("http://localhost:11434/api/generate",{
            method:"POST",
            headers:{'content-Type':"application/JSON"},
           body:JSON.stringify({
            model:"tinyllama",
            prompt:prompt,
        stream:false})

        })
        console.log("Prompt received from form2:", prompt);
       
            const x=await ollama.json();
             console.log(x)
        res.render("index.ejs",{output:x.response})
    
    
     
     
    } catch (error) {
        res.render("index",{output:"could not conncect to llama"})
    }
})
app.listen(PORT,()=>{
    console.log("running on port ")
})