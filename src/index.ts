import { app } from "./app"
import { userRouter } from "./routes/userRouter"
import { bandRouter } from "./routes/bandRouter"
import { showRouter } from "./routes/showRouter"
import { ticketRouter } from "./routes/ticketRouter"
import { photoRouter } from "./routes/photoRouter"

//Rotas raiz
app.use('/user', userRouter)
app.use("/band", bandRouter)
app.use("/show", showRouter)
app.use("/ticket", ticketRouter)
app.use("/photo", photoRouter)