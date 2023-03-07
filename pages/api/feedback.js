import fs from "fs";
import path from "path";

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedbackText = req.body.text; //get the data from the document.body

    const newFeedback = {
      //store the data in an object
      id: new Date().toISOString(), //unique id is better
      email: email,
      text: feedbackText,
    };

    //store the data in a DB/file
    const filePath = path.join(process.cwd(), "data", "feedback.json"); //create path for the feedback.json
    const fileData = fs.readFileSync(filePath); //read the current data on the file for later updata
    const data = JSON.parse(fileData); //json and parse the filedata

    data.push(newFeedback); //make the json file starts as an ARRAY ** with [] inside **, push update the data
    fs.writeFileSync(filePath, JSON.stringify(data)); //updata & write the actual string data
    res
      .status(201)
      .json({ message: "Successfully Sent!", feedback: newFeedback }); //send back Status code 201, and data we updated"s
  } else {
    res.status(200).json({
      message: "This works!",
    });
  }
}

export default handler;
