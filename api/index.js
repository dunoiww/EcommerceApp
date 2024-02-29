const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const port = 8000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

mongoose
    .connect("mongodb+srv://dunoiww:dunoiww@cluster0.mghnk4g.mongodb.net/", {
        usenewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((err) => {
        console.log("Unable to connect to the database", err);
    });

app.listen(port, () => {
    console.log("Server is running on port:", port);
});

const User = require("./models/user");
const Order = require("./models/order");
const { log } = require("console");

const sendEmailVerification = async (email, verificationToken) => {
    const transporter = nodemailer.createTransport({
        service: "smtp.gmail.com",
        auth: {
            user: "onlynam102003@gmail.com",
            pass: "wxql ecva isxy mnxe",
        },
    });

    const mailOptions = {
        from: "Amazon.com",
        to: email,
        subject: "Email Verification",
        text: `Click on the link to verify your email: http://localhost:8000/verify/${verificationToken}`,
    };

    //send email
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent");
    } catch (err) {
        console.log("Error sending email", err);
    }
};

app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        //create a new user
        const newUser = new User({ name, email, password });

        //create the user verification token
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");

        //save the user
        await newUser.save();

        sendEmailVerification(newUser.email, newUser.verificationToken);

        res.status(201).json({
            message:
                "Registration successful. Please check your email for verification.",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Registration failed" });
    }
});

// endpoint to verify the user's email
app.get("/verify/:token", async (req, res) => {
    try {
        const token = req.params.token;

        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.verified = true;
        user.verificationToken = undefined;

        await user.save();

        res.status(200).json({ message: "Verification successful" });
    } catch (err) {
        res.status(500).json({ message: "Verification failed" });
    }
});

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");
    return secretKey;
};

const secretKey = generateSecretKey();

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, secretKey);

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: "Login failed" });
    }
});

// endpoint to store a new address
app.post("/addresses", async (req, res) => {
    try {
        const { userId, address } = req.body;
        console.log(JSON.stringify(req.body, null, 2));

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.addresses.push(address);
        await user.save();
        res.status(200).json({ message: "Address saved successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to save address" });
        console.log(err);
    }
});

//endpoint to get all addresses of the user
app.get("/addresses/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const addresses = user.addresses;
        res.status(200).json({ addresses });
    } catch (err) {
        res.status(500).json({ message: "Failed to get addresses" });
    }
});

//enndpoint to store a new order
app.post("/orders", async (req, res) => {
    try {
        const {
            userId,
            cartItems,
            totalPrice,
            shippingAddress,
            paymentMethod,
        } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const products = cartItems.map((item) => ({
            name: item.title,
            quantity: item.quantity,
            price: item.price,
            image: item.image,
        }));

        const order = new Order({
            user: userId,
            products: products,
            totalPrice: totalPrice,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
        });

        await order.save();

        res.status(200).json({ message: "Order saved successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to save order" });
    }
});

//get the user's profile
app.get('/profile/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Failed to get profile" });
    }
})

//ger the user's orders
app.get('/orders/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const orders = await Order.find({ user: userId }).populate('user');

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "Orders not found" });
        }

        res.status(200).json({ orders });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Failed to get orders" });
    }
})