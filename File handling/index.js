import express from "express"
import morgan from "morgan"
import path from "path"
import fs from "fs"
import cors from "cors"

const app=express()
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

const PORT=4000;
app.listen(PORT,()=> console.log(`Server is running on ${PORT}`))

const folderPath=path.resolve("public")

app.get("/readFile", (req, res) => {
    const filePath=path.resolve("public","index.html")
    fs.readFile(filePath, (error, fileContent) => {
        if (error) {
            res.json({ message: error });
        }
        else {
            res.send(fileContent);
        }
    })
});

app.post("/writeFile",(req,res)=>{
    console.log(req.body)
    const filepath=path.resolve(folderPath,req.body.fileName);
    fs.writeFile(filepath,req.body.fileContent,(error,success)=>{
        if(error){
            res.json({error:error})
        }
        else{
            console.log("success=>>",success);
            res.json({msg:"file written Successful"})
            
        }
    })
})

app.post("/updateFile",(req,res)=>{
    const filepath=path.resolve(folderPath,req.body.fileName);
    fs.appendFile(filepath,req.body.fileContent,(error,success)=>{
        if(error){
            res.json({msg:error})
        }
        else{
            console.log("success=>>",success);

            res.json({msg:"file appended successfully"})
        }
    })
})

app.post("/deleteFile",(req,res)=>{
    const filepath=path.resolve(folderPath,req.body.fileName);
    fs.unlink(filepath,(error,success)=>{
        if(error){
            res.json({msg:error})
        }
        else{
            console.log("success=>>",success);

            res.json({msg:"file appended successfully"})
        }
    })
})

app.post("/renameFile", (req, res) => {
    const oldPath = path.resolve(folderPath, req.body.fileName);
    const newPath = path.resolve(folderPath, req.body.newName);

    console.log("Old Path:", oldPath);
    console.log("New Path:", newPath);

    fs.rename(oldPath, newPath, (error) => {
        if (error) {
            console.error("Rename Error:", error);
            return res.status(400).json({ error: error.message });
        }

        res.json({ msg: "File renamed successfully" });
    });
});

app.get("/",(req,res)=>{
    res.send("HEllo world")
})