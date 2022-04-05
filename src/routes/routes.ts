import express, {Request, Response} from "express";
import { Todo } from "../models/todo.model";

const router = express.Router();

//GET request
router.get('/', async (req: Request, res: Response) => {
    try{
        const item = await Todo.find({});
        return res.status(200).json({
            data: item
        });
    }catch(err){
        return res.status(500).json({
            error: err
        })
    }
})

// GET one doc
router.get('/:_id', async (req: Request, res: Response)=> {
    try{
        const item = await Todo.findById(req.params._id);

        return res.status(200).json({
            data: item
        })
    }catch(err){
        return res.status(500).json({
            error: err
        })
    }
})

// POST request
router.post("/add", async (req: Request, res: Response) => {

    const {title, description} = req.body;

    const item = Todo.set({title, description});

    await item.save();
    
    return res.status(200).json({
        data: item,
    });
});

// Update
router.put('/update', async (req: Request, res: Response)=> {
    try{
        const filter = {
            title: req.body.title,
        };
        const update = {
            description : req.body.description,
        }
        const item = await Todo.updateOne(filter, update, {
            new: true
        })

        return res.status(200).json({
            data: item
        })
    }catch(err){
        return res.status(500).json({
            error: err
        })
    }
});

// Delete Document
router.delete('/delete', async(req: Request, res: Response) => {
    try{
        const filter = {
            title: req.body.title,
        }
        const item = await Todo.deleteOne(filter).then((data)=>res.json({
            data: data
        })).catch((e) => {
            console.log(e)
        })

    }catch(err){
        return res.status(500).json({
            error: err
        });
    }
})


export {router};