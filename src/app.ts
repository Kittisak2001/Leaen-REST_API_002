import express, {Request, Response} from "express";
import dotenv from "dotenv"
import { router } from "./routes/routes";
import mongoose, {ConnectOptions} from "mongoose";

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URL as string,
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    } as ConnectOptions,
    ()=>{
        console.log("DB Connected")
    }
)

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.use("/", router)

app.listen(process.env.PORT, () => {
    console.log(`Server is rocking at ${process.env.PORT}`);
});