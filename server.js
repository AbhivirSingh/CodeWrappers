const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();


const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://user:Prize2005@cluster0.ajopkro.mongodb.net/");
        console.log(`Connected to MongoDB`);
    } catch (error) {
        console.log(`Error in MongoDB ${error}`);
    }
};

connectDB();


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    Password: String
});

let srch;

const user = mongoose.model("user", userSchema);

const orderSchema = new mongoose.Schema({
    email: String,
    orders: [[
        {
            description: String,
            discount: String,
            img: String,
            name: String,
            price: String,
            prodname: String,
            qty: Number,
        },
    ]],
});

const Order = mongoose.model('Order', orderSchema);

let EL = "";

app.get('/', (req, res) => {
    res.render("registration");
});

app.get('/metrics', (req, res) => {
    res.render("metrics");
});

app.get("/goals", async (req, res) => {
    // let myOrders = await Order.findOne({ email: EL });

    res.render("goals");
})


app.post('/updatemetrics', async (req, res) => {
    const { weight, height, heartRate, bloodPressure } = req.body;
    try{
        const userEmail = EL;

        if (!userEmail) {
            return res.status(404).send('User email not found');
        } else {
            const userFound = await Order.findOne({ email: userEmail });
            if (userFound) {
                const products = JSON.parse(buyNowCart);
                userFound.orders.push(products);
                await orderFound.save();
            } else {
                const products = JSON.parse(buyNowCart);
                let productsArray = [];
                productsArray.push(products);

                const newOrder = new Order({
                    email: userEmail,
                    orders: productsArray,
                });
                await newOrder.save();
            }
            res.sendStatus(200);
        }
    } catch (error) {
        console.error('Error inserting data into the database:', error);
        res.status(500).send('Error inserting data into the database');
    }
});

app.post('/buyNow', async (req, res) => {
    const { buyNowCart } = req.body;
    // console.log('Received data from client:', buyNowCart);


    try {
        // Find the user's email from the "user" collection
        const userEmail = EL;

        if (!userEmail) {
            return res.status(404).send('User email not found');
        } else {
            const orderFound = await Order.findOne({ email: userEmail });
            if (orderFound) {
                const products = JSON.parse(buyNowCart);
                orderFound.orders.push(products);
                await orderFound.save();
            } else {
                const products = JSON.parse(buyNowCart);
                let productsArray = [];
                productsArray.push(products);

                const newOrder = new Order({
                    email: userEmail,
                    orders: productsArray,
                });
                await newOrder.save();
            }
            res.sendStatus(200);
        }
    } catch (error) {
        console.error('Error inserting data into the database:', error);
        res.status(500).send('Error inserting data into the database');
    }
});


app.get('/recommendations', (req, res) => {
    res.render("recommendations");
});
app.get("/home", (req, res) => {
    res.render("index");
});
app.get("/tracking", (req, res) => {
    res.render("tracking");
});
// app.post('/searches', (req, res) => {
//     const { query } = req.body;
//     console.log('Search query:', query);
//     srch=query;
//     // res.render('searches',{query:srch});
//     res.render("searches",{query});
// });

app.post('/search', (req, res) => {
    const { query } = req.body;
    // if (query===''){
    //     res.render('home',{query});
    // }
    console.log('Search query:', query);
    srch = query;
    // res.render('searches',{query:srch});
    res.render("searches", { query });
});
// app.get("/sign",(req,res)=>{
//     res.render("login");
// });

// app.get("/Sign", (req, res) => {
//     res.render("login", { user: req.user });
// });

// app.get("/login", (req, res) => {
//     res.render("login");
// });

app.get("/success", (req, res) => {
    res.render("home", { name: req.user.displayName, email: req.user.email[0].value, pic: req.user.photos[0].value });
});

app.get("/failed", (req, res) => {
    res.send("You Failed to log in!");
});

app.get("/logout", (req, res, next) => {
    EL = '';
    req.logout(function (err) {
        if (err) { return next(err); }
        req.session.destroy();
        res.redirect("/");
    });
});

app.post("/Sign", async (req, res) => {
    let { name, email, password } = req.body;
    let user_email = await user.findOne({ email: email });
    if (user_email) {
        res.send("Email Id is already registered");
    } else {
        const User1 = new user({
            name: name,
            email: email,
            Password: password
        });
        User1.save();
    }
    EL = email;
    res.redirect("/home")
});



app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const foundUser = await user.findOne({ email: email, Password: password });
    if (foundUser) {
        res.redirect("/home");
    } else {
        res.send("Invalid Credentials");
    }

    EL = email;
});



app.listen(PORT, () => {
    console.log(`Server Running on mode on port ${PORT}`);
});
