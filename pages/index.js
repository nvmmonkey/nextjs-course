import { useRef } from "react";

function HomePage() {
  const emailInputRef = useRef();
  const feedbackIputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackIputRef.current.value;

    const reqBody = { email: enteredEmail, text: enteredFeedback };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody), //{email: "xxx@ddd.com", text: "some feedback"}
      headers: {
        "Content-Type": "application/json", //***IMPORTANT STEP TO CLARIFY FOR THE API FOR JSON DATA */
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address: </label>
          <input
            type="email"
            id="email"
            placeholder="your@email.com"
            ref={emailInputRef}
          />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback: </label>
          <textarea
            rows="5"
            id="feedback"
            placeholder="..."
            ref={feedbackIputRef}
          />
        </div>
        <button>Send Feedback</button>
      </form>
    </div>
  );
}

export default HomePage;
