# Record Videos

> *Copied from: Frontend.md — "Record Videos"*

> Demo: [quest-record-videos.html](quest-record-videos.html) ← empty stub

Now, lets go over the "recording videos" quest. Now... here's a problem:
Making a built in camera feature might to much for now... so instead, they simply upload the video, an AI transcribes it, checks for how good the filming was with some sort of algorithm, approves or disproves. (all algorithms are backend)

If disproved, We do it again, and the AI will give feedback. If approved, we finish.

Per video we get 30XP and 14 Sparks.

## UI

The UI is pretty simple, but before detailing it, I want to highlight the presence of an "x" button to cancel the realization of a task, once clicked, a small, in window, popup, will appear, saying "Are you sure you want to cancel this task?". With the options, "BACK TO TASK" and "GIVE TASK UP"

Alright, now let's break down the actual UI, there are 4 sections:
- Info Section
- Print It Section
- Script Section
- Upload Section

### Info Section
The info section is where you provide information about the script, and it has 2 elements.
The top element is the heading, the title of the script, and the bottom one is a group.
That group contains, in order, the day of the week this script is scheduled to, a dividing line, and the type of video, (being the options TOFU [Top of Funnel], MOFU [Middle of Funnel] and BOFU [Bottom of Funnel]), that in order from left to right.

The background color for this section's vivid, it can be a vivid gradient too.

### Print It Section
After this, we have the "print it" section - this is where you have a button to print the script, which gives you a pdf or it actually, ACTIVELY, send it to the printer.

Lets talk about the UI, it pairs well with the last section in a kind of bento box style...

And it has 2 elements, one at the rightmost and one at the leftmost, respectively: the text "PRINT SCRIPT", and an arrow pointing right.

The background has a vivid color.

### Script Section
The third section is a formatted markdown - which will be the script, this section's scrollable.

### Upload Section
The last section is a video to upload (you can upload multiple videos), it's literally a button saying "UPLOAD RECORDINGS", this button sticks to the bottom of the screen and has some margin with the bottom, it's also centered.
The final thing about this section is that, on the container for the bottom (touching the bottom, left & right of the frame), the opacity of the markdown below, at the top of the container's 100%, and at the bottom, 0%, the opposite happens with blur, 0px at the top, 4px at the bottom.

> Note: What do I mean with actively send it to printer?
    On android, most printer have an app on the phone that allows to print via wifi nowadays, we can just make it so they can share a pdf with the printer. If on iOS, the process is somewhat similar. I believe (do not own an iOS). And if no options are available, we can always generate a pdf out of the markdown optimized for readability for them to print.