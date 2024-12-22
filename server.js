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

const metricSchema = new mongoose.Schema({
    email: { type: String, required: true },
    weight: [Number],
    height: [Number],
    heartRate: [Number],
    bloodPressure: [String],
});


const metric = mongoose.model("metric", metricSchema);

let EL = "";

app.get('/', (req, res) => {
    res.render("registration");
});

app.get('/metrics', async (req, res) => {
    const userFound = await metric.findOne({ email: EL });
    res.render("metrics", { userFound });
});

app.get("/goals", async (req, res) => {
    const userFound = await metric.findOne({ email: EL });
    res.render("goals", { userFound });
})


app.post('/updatemetrics', async (req, res) => {
    const { weight, height, heartRate, bloodPressure } = req.body;
    try {
        const userEmail = EL;

        if (!userEmail) {
            return res.status(500).send('Error updating metrics');
        } else {
            const userFound = await metric.findOne({ email: userEmail });
            if (userFound) {
                userFound.weight.push(weight);
                userFound.height.push(height);
                userFound.heartRate.push(heartRate);
                userFound.bloodPressure.push(bloodPressure);
                await userFound.save();
            } else {
                const newMetric = new metric({
                    email: userEmail,
                    weight: [weight],
                    height: [height],
                    heartRate: [heartRate],
                    bloodPressure: [bloodPressure],
                });
                await newMetric.save();
            }
            res.status(200).send('Metrics updated successfully');

        }
    } catch (error) {
        console.error('Error inserting data into the database:', error);
        res.status(500).send('Error updating metricse');

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
