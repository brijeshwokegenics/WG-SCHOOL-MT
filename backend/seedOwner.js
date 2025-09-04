//in this file we are inserting the owner credientials in the database   
//this file can be deleted later

const mongoose = require("mongoose");
const User = require("./models/User");

// replace this with your generated hash
const hashedPassword = "$2b$10$DMUseLP3Wgu6lj7ZRbP4k.fEEDltQLnuROr3MSXvF3BnHV66WgIwa";

const insertOwner = async () => {
  try {
    await mongoose.connect("mongodb+srv://abhishekgupta62002:nmhZnqQf52UhP4sh@clusterone.xm4ul.mongodb.net/SchoolMockTest");

    // prevent duplicate owner creation
    const existingOwner = await User.findOne({ role: "owner" });
    if (existingOwner) {
      console.log("⚠️ Owner already exists:", existingOwner.email);
      mongoose.connection.close();
      return;
    }

    const owner = new User({
      email: "owner@gmail.com",
      password: hashedPassword,
      role: "owner",
    });

    await owner.save();
    console.log("✅ Owner inserted successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error inserting owner:", error.message);
    mongoose.connection.close();
  }
};

insertOwner();
