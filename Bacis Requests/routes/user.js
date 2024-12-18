// import express from "express";
// const router = express.Router()

// router.post('/', async (req, res) => {
    // const { fullname, email } = req.body
    // let newUser = new User({
    //     fullname,
    //     email
    // })
    // newUser = await newUser.save()
    // console.log({fullname,email});
    
    // res.status(201).json({
    //     msg: "User added successfully",
    //     error: false,
    //     data: newUser
    // })
// })
// router.get("/", (req, res) => {
//     res.send("hello world");
//     console.log("hello wolrd");
    
//   });

// router.get('/', async (req, res) => {
//     const users = await User.find()
//     res.status(200).json({
//         msg: "User fetched successfully",
//         error: false,
//         data: users
//     })
// })

// router.get('/:id', async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id)
//         // const user = await User.findOne({_id : req.params.id})
//         if (!user) return res.status(404).json({
//             error: true,
//             msg: "User not found",
//             data: null
//         })

//         res.status(200).json({
//             msg: "User found successfully",
//             error: false,
//             data: user
//         })
//     }
//     catch (err) {
//         res.status(500).json({
//             error: true,
//             msg: "Something went wrong",
//             data: null
//         })
//     }

// })

// router.put('/:id', async (req, res) => {
//     const { fullname, email } = req.body
//     const user = await User.findById(req.params.id)
//     if (!user) return res.status(404).json({
//         error: true,
//         msg: "User not found",
//         data: null
//     })
//     if (fullname) user.fullname = fullname
//     if (email) user.email = email

//     await user.save()

//     res.status(200).json({
//         msg: "User updated successfully",
//         error: false,
//         data: user
//     })
// })

// export default router

import express from "express"
const router=express.Router();
const users=[];

router.post("/",(req,res)=>{
    const {fullname,email}=req.body;
    users.push({fullname,email,id:users.length+1});
    res.status(201).json({
        msg:"User added Succesdfully",
        error:false,
        data:users
    })
})
router.get("/",(req,res)=>{
    res.status(201).json({
        msg:"User Fetched Successfully",
        error:false,
        data:users
    })
})


router.get("/:id",(req,res)=>{
    console.log(req.params.id);
    
    const user=users.find((data)=>data.id==req.params.id)
    if(!user) return res.status(404).json({
        error:true,
        msg:"USer not found",
        data:null
    })
    res.status(200).json({
        msg:"User Found Successfully",
        error:false,
        data:user
    })
})


//get for recieve data
// post for send data
// put for update data
router.put("/:id",(req,res)=>{
    const {fullname,email}=req.body;
    const userFind=users.find((data)=> data.id == req.params.id)
    if(!userFind) return res.status(404).json({
        msg:"user not found",
        error:true,
        data:null
    })
    if(fullname) userFind.fullname=fullname
    if(email) userFind.email=email

    res.status(201).json({
        msg:"user Data updated",
        error:false,
        data:userFind
    })

})













export default router;

