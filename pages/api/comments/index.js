function handler(req, res) {
  if (req.method === "POST") {
    const eventId = req.body.eventId;
    const name = req.body.name;
    const email = req.body.email;
    const comment = req.body.comment;

    const newComment = {
      id: new Date().toISOString(),
      eventId: eventId,
      name: name,
      email: email,
      comment: comment,
    };

    return res
      .status(201)
      .json({ message: "Successfully Comment!", newComment: newComment });
  } else {
    return res.status(200).json({ message: "Connected!" });
  }
}

export default handler;
