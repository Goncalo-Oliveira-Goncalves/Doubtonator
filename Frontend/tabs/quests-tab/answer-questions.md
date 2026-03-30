# Give Feedback / Answer Questions

> *Copied from: Frontend.md — "Give Feedback/Answer Questions"*

> Demo: [quest-answer-questions.html](quest-answer-questions.html) ← empty stub

Now finished with this quest/task, lets go to the last one... Give Feedback & Answer Questions.

These kinds of tasks really are for no more then market research, lets go over how it works.
First, they must answer honestly & not garbage, an AI will confirm if their answer is just to get sparks, or is actually honest.

We will give the option to talk by voice & make it default to get more elaborate answers. The more elaborate the answer to questions, the more sparks and XP.

There will be 5 questions maximum per quest with a certain theme. These questions will be pulled up from a database. Please refer to the "Database Structure Backend.md" for More Information.

## UI

Now, lets detail the UI, there are 4 sections:

- Progress
- Question
- Text
- Buttons

Besides this, like all the other ones, there is an "x" present in the top left with the same functionality as previously stated for these quests.

### Progress Section

The progress section is a small progress bar followed by a text (x/y), like (4/5). The progress bar doesn't span the full screen, it's found at the top center of the screen.

### Question

Below that, there is a question (the question), stylized as a heading.

### Text

Then the next section is text, your answer, it's scrollable, and the number of lines grow as you type or talk more (text size stays the same, it's just bounding boxes and context being added through a script).

### Buttons

Then there is buttons. That's the 4th section, always placed at the bottom, it's placed there, if you can scroll, it stays there. And there are 2 buttons... The top button is the Talk button, now, this button has some interesting functionality.

This button has 2 elements, on the leftmost, a "TALK" text, and on the rightmost, an svg with a soundwave. Please refer to the assets folder for this asset.

When you press on it and it is recording, 2 things happen, first, there is a red outline around the button, a thick 4px one, and next, the button's container itself takes the shape of the soundwave being received, adds to the buttons initial shape and smooths it out, here's an example (taken from google's stitch development environment):

> **[DOUBT]:** The talk button morphing into the soundwave shape — this is the most technically complex animation in the entire spec. "Takes the shape of the soundwave and smooths it out" implies a real-time border-path morph. How is this implemented — CSS `clip-path` animated with JS, a canvas overlay, or SVG path animation? And is this an exception to the no-CSS-animation rule? The example was from Google Stitch but no image or link is present here.

> Demo (talk button state): [quest-talk-button.html](quest-talk-button.html) ← empty stub

The next button is the answer button, which... "ANSWERS" as said on the text.

Finally, this section has a opacity effect, like the last ones of it's kind, starts at the bottom of the screen with 0% opacity for the text underneath it, and on the top of the container, which touches right, left & bottom corners, 100% opacity, blur here is, also 0px, and at the bottom, 4px.

> **Suggested edit (Answer Questions):** The AI honesty check needs a backend spec — flag as `[TODO: define honesty scoring algorithm]`.
