const TestModel = require("../models/TestModel");

exports.createTest = async (req, res) => {
  try {

    const teacherId = req.user.id || req.user._id;

    const {
      testName,
      subject,
      classLevel,
      section,
      type,
      duration,
      questions,
      marks,
      scheduledAt, // optional field
    } = req.body;

    // Basic validation
    if (
      !testName ||
      !subject ||
      !classLevel ||
      !section ||
      !type ||
      !duration ||
      !questions ||
      questions.length === 0
    ) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // Validate test type
    if (!["mcq", "trueFalse"].includes(type)) {
      return res.status(400).json({ message: "Invalid test type" });
    }

    // Create new test
    const newTest = new TestModel({
      testName,
      subject,
      classLevel,
      section,
      type,
      duration,
      marks,
      questions,
      createdBy: teacherId,
      scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
    });

    await newTest.save();

    res.status(201).json({
      message: "Test created successfully",
      test: newTest,
    });
  } catch (error) {
    console.error("Error creating test:", error);
    res.status(500).json({
      message: "Server error while creating test",
      error: error.message,
    });
  }
};

//fetch all test from db
exports.getAllTest = async (req, res) => {
  try {
    // Get the logged-in teacher's ID
    const teacherId = req.user.id;
console.log("teacher id getAllTest...", teacherId);
    // Find all tests created by that teacher
    const tests = await TestModel.find({ createdBy: teacherId })
   //  const tests = await TestModel.find({ createdBy: teacherId },'-questions')
      .populate("createdBy", "name email") // Optional
      .sort({ createdAt: -1 }); // Sort latest first

    if (!tests || tests.length === 0) {
      return res.status(404).json({ message: "No tests found for this teacher" });
    }

    res.status(200).json({
      success: true,
      count: tests.length,
      tests,
    });
  } catch (error) {
    console.error("Error fetching teacher tests:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching tests",
      error: error.message,
    });
  }
};


//view test by id
exports.getTestById = async (req, res) => {
   try {
    const test = await TestModel.findById(req.params.id).populate('createdBy');
    if (!test) return res.status(404).json({ message: 'Test not found' });
    res.status(200).json(test);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching test details' });
  }
}


//edit test by id
exports.updateTest = async (req, res) => {
 try {
    const { id } = req.params;
    const updateData = req.body;

    // Find and update test
    const updatedTest = await TestModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedTest) {
      return res.status(404).json({ message: "Test not found" });
    }

    res.status(200).json({
      message: "Test updated successfully!",
      test: updatedTest,
    });
  } catch (error) {
    console.error("Error updating test:", error);
    res.status(500).json({ message: "Failed to update test" });
  }
}


//delete test by id
exports.deleteTest = async (req, res) => {
 try {
    const { id } = req.params;

    const deletedTest = await TestModel.findByIdAndDelete(id);

    if (!deletedTest) {
      return res.status(404).json({ message: "Test not found" });
    }

    res.status(200).json({
      message: "Test deleted successfully!",
      testId: id,
    });
  } catch (error) {
    console.error("Error deleting test:", error);
    res.status(500).json({ message: "Failed to delete test" });
  }
}




