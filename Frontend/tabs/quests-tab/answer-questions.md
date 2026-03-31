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

I've figured out that google stitch uses an "ever changing" svg with a function, basically a reactive svg path animation, dependent on the sound wave, have a look at the element:

```html

<div class="react-flow__panel bottom center" style="z-index: 50;"><div class="relative w-fit outline-none"><canvas class="absolute -bottom-[4vh] left-1/2 -translate-x-1/2 w-[60vw] h-[25vh] pointer-events-none z-0" style="filter: blur(10px);" width="266" height="308"></canvas><div class="absolute -inset-5 z-0 pointer-events-none"><svg xmlns="http://www.w3.org/2000/svg" class="block h-full w-full overflow-visible" viewBox="0 0 260 88" style="filter: drop-shadow(rgba(0, 0, 0, 0.15) 0px 0px 2px);"><path fill="rgba(241, 243, 244, 0.92)" stroke="rgba(22, 23, 24, 0.15)" stroke-width="1" stroke-linejoin="round" stroke-linecap="round" d="M 44 20 L 44.00 20.00 Q 44.00 20.00 45.79 19.97 T 49.38 19.89 T 52.96 19.80 T 56.54 19.75 T 60.13 19.75 T 63.71 19.79 T 67.29 19.85 T 70.88 19.88 T 74.46 19.90 T 78.04 19.90 T 81.63 19.89 T 85.21 19.90 T 88.79 19.92 T 92.38 19.95 T 95.96 20.00 T 99.54 20.05 T 103.13 20.07 T 106.71 20.07 T 110.29 20.04 T 113.88 20.01 T 117.46 20.00 T 121.04 20.04 T 124.63 20.11 T 128.21 20.18 T 131.79 20.22 T 135.38 20.24 T 138.96 20.26 T 142.54 20.35 T 146.13 20.50 T 149.71 20.67 T 153.29 20.77 T 156.88 20.74 T 160.46 20.59 T 164.04 20.36 T 167.63 20.14 T 171.21 19.96 T 174.79 19.86 T 178.38 19.80 T 181.96 19.75 T 185.54 19.73 T 189.13 19.72 T 192.71 19.74 T 196.29 19.80 T 199.88 19.87 T 203.46 19.94 T 207.04 19.98 T 210.63 20.00 T 214.21 20.00 L 216 20 A 24 24 0 0 1 240 44 L 240 44 A 24 24 0 0 1 216 68 L 216.00 68.00 Q 216.00 68.00 214.21 68.00 T 210.63 68.00 T 207.04 68.02 T 203.46 68.06 T 199.88 68.13 T 196.29 68.20 T 192.71 68.26 T 189.13 68.28 T 185.54 68.27 T 181.96 68.25 T 178.38 68.20 T 174.79 68.14 T 171.21 68.04 T 167.63 67.86 T 164.04 67.64 T 160.46 67.41 T 156.88 67.26 T 153.29 67.23 T 149.71 67.33 T 146.13 67.50 T 142.54 67.65 T 138.96 67.74 T 135.38 67.76 T 131.79 67.78 T 128.21 67.82 T 124.63 67.89 T 121.04 67.96 T 117.46 68.00 T 113.88 67.99 T 110.29 67.96 T 106.71 67.93 T 103.13 67.93 T 99.54 67.95 T 95.96 68.00 T 92.38 68.05 T 88.79 68.08 T 85.21 68.10 T 81.63 68.11 T 78.04 68.10 T 74.46 68.10 T 70.88 68.12 T 67.29 68.15 T 63.71 68.21 T 60.13 68.25 T 56.54 68.25 T 52.96 68.20 T 49.38 68.11 T 45.79 68.03 L 44 68 A 24 24 0 0 1 20 44 L 20 44 A 24 24 0 0 1 44 20 Z"></path></svg></div><div class="relative z-[1] flex flex-col justify-end cursor-text bg-transparent text-primary w-fit" style="overflow: hidden; border-radius: 24px; height: 48px;"><div><div class="hidden"><div role="presentation" class="relative flex flex-col px-4 pt-3 text-primary text-start text-sm leading-[1.6] focus:outline-none focus-visible:outline-2 pb-3"><div class="flex w-full flex-wrap gap-2 overflow-x-scroll no-scrollbar transition-all ease-in-out duration-300"></div><div class="chat-tiptap-v3"><div style="position: relative; width: 100%; overflow: auto;"><div class="tiptap-editor selection:bg-neutral-600/70"><div contenteditable="true" role="textbox" translate="no" class="tiptap ProseMirror" tabindex="0"><p data-placeholder="What would you like to change or create?" class="is-empty is-editor-empty"><br class="ProseMirror-trailingBreak"></p></div></div></div></div><div class="flex items-center gap-2 flex-shrink-0 pt-5"><input accept="image/png,.png,image/jpeg,.jpg,.jpeg,image/gif,.gif,image/webp,.webp,text/plain,.txt,text/markdown,.md,.markdown,text/html,.html,.htm,text/javascript,.js,.jsx,.ts,.tsx,application/json,.json,text/css,.css" multiple="" tabindex="-1" type="file" style="border: 0px; clip: rect(0px, 0px, 0px, 0px); clip-path: inset(50%); height: 1px; margin: 0px -1px -1px 0px; overflow: hidden; padding: 0px; position: absolute; width: 1px; white-space: nowrap;"><div><button type="button" tabindex="0" aria-haspopup="menu" aria-expanded="false" id="_r_1a_" class="flex items-center justify-center rounded-full p-2 outline-none focus-ring transition-glass duration-150 ease-out hover:bg-state-hover active:bg-state-pressed data-[popup-open]:bg-state-hover disabled:opacity-50 disabled:cursor-not-allowed size-7"><span class="text-inherit"><svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path></svg></span></button></div><div><button type="button" class="items-center justify-center py-1.5 pl-2 pr-3 gap-2 rounded-full text-subtitle-sm transition-glass duration-150 ease-out bg-transparent border-transparent shadow-none text-primary flex h-7 focus-ring"><span class="cursor-ns-resize"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M15.6 3.396H4.25c-.314 0-.568.283-.568.633v12.665c0 .35.254.633.568.633H15.6c.314 0 .568-.284.568-.633V4.029c0-.35-.254-.633-.567-.633ZM6.8 10.361h6.25M9.925 7.236v6.25"></path><path stroke="currentColor" stroke-linecap="round" d="M17.747 5.02v10.682M19.312 6.019v8.685"></path></svg></span></button></div><div class="flex items-center gap-2 flex-shrink-0"></div><div class="flex-1"></div><div class="flex items-center gap-2 flex-shrink-0"><div><button type="button" tabindex="0" aria-haspopup="menu" aria-expanded="false" id="_r_1f_" class="flex items-center justify-center rounded-full size-7 bg-transparent hover:bg-state-hover active:bg-state-pressed data-[popup-open]:bg-state-hover transition-colors cursor-pointer shrink-0 "><span class="text-primary"><svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256"><path d="M200.77,53.89A103.27,103.27,0,0,0,128,24h-1.07A104,104,0,0,0,24,128c0,43,26.58,79.06,69.36,94.17A32,32,0,0,0,136,192a16,16,0,0,1,16-16h46.21a31.81,31.81,0,0,0,31.2-24.88,104.43,104.43,0,0,0,2.59-24A103.28,103.28,0,0,0,200.77,53.89Zm13,93.71A15.89,15.89,0,0,1,198.21,160H152a32,32,0,0,0-32,32,16,16,0,0,1-21.31,15.07C62.49,194.3,40,164,40,128a88,88,0,0,1,87.09-88h.9a88.35,88.35,0,0,1,88,87.25A88.86,88.86,0,0,1,213.81,147.6ZM140,76a12,12,0,1,1-12-12A12,12,0,0,1,140,76ZM96,100A12,12,0,1,1,84,88,12,12,0,0,1,96,100Zm0,56a12,12,0,1,1-12-12A12,12,0,0,1,96,156Zm88-56a12,12,0,1,1-12-12A12,12,0,0,1,184,100Z"></path></svg></span></button></div><button type="button" tabindex="0" aria-haspopup="menu" aria-expanded="false" id="_r_1j_" class="relative overflow-visible backdrop-blur-glass flex items-center justify-center gap-1.5 px-2 py-1.5 text-subtitle-sm rounded-full text-primary bg-clip-border duration-75 ease-out focus-ring bg-state-enabled hover:bg-state-hover shadow-sm data-[popup-open]:bg-state-pressed data-[popup-open]:border-transparent h-7"><span class="whitespace-nowrap">3.0 Flash</span><span class="text-inherit"><svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="currentColor" viewBox="0 0 256 256"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg></span></button><div class="relative flex items-center"><div><button class="w-8 h-8 flex items-center justify-center rounded-full transition-colors focus-ring active:bg-state-pressed active:scale-95 bg-state-active"><div class="flex items-center justify-center gap-[2px]"><div class="rounded-full bg-current transition-all duration-75 ease-linear" style="width: 2.5px; height: 3px;"></div><div class="rounded-full bg-current transition-all duration-75 ease-linear" style="width: 2.5px; height: 3.0128px;"></div><div class="rounded-full bg-current transition-all duration-75 ease-linear" style="width: 2.5px; height: 3.00518px;"></div><div class="rounded-full bg-current transition-all duration-75 ease-linear" style="width: 2.5px; height: 3px;"></div></div></button></div></div><div><button class="gap-2 bg-clip-border backdrop-blur-glass focus-visible:outline-2 focus-visible:outline-current focus-visible:-outline-offset-2 border border-primary/[.13] enabled:active:bg-state-pressed text-subtitle-md px-3 border-none bg-transparent flex items-center justify-center aspect-square rounded-full size-8 transition-all will-change-transform duration-150 ease-out shadow-sm enabled:hover:bg-transparent enabled:hover:scale-[1.05] enabled:active:scale-[0.95] cursor-not-allowed text-disabled" tabindex="0" data-testid="generate-button" aria-disabled="true"><span class="text-inherit"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor" viewBox="0 0 256 256"><path d="M208.49,120.49a12,12,0,0,1-17,0L140,69V216a12,12,0,0,1-24,0V69L64.49,120.49a12,12,0,0,1-17-17l72-72a12,12,0,0,1,17,0l72,72A12,12,0,0,1,208.49,120.49Z"></path></svg></span></button></div></div></div></div></div><div class="flex items-center gap-1 px-2 py-1.5 rounded-full"><div><button class="w-9 h-9 flex items-center justify-center rounded-full transition-colors cursor-pointer focus-ring active:bg-state-pressed active:scale-95 bg-surface-inverse text-inverse-primary" aria-label="Mark tool"><span class="text-inherit"><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256"><path d="M152,40a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h32A8,8,0,0,1,152,40Zm-8,168H112a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16ZM208,48V72a8,8,0,0,0,16,0V48a16,16,0,0,0-16-16H184a8,8,0,0,0,0,16Zm8,56a8,8,0,0,0-8,8v32a8,8,0,0,0,16,0V112A8,8,0,0,0,216,104ZM40,152a8,8,0,0,0,8-8V112a8,8,0,0,0-16,0v32A8,8,0,0,0,40,152Zm32,56H48V184a8,8,0,0,0-16,0v24a16,16,0,0,0,16,16H72a8,8,0,0,0,0-16ZM72,32H48A16,16,0,0,0,32,48V72a8,8,0,0,0,16,0V48H72a8,8,0,0,0,0-16ZM240,208H224V192a8,8,0,0,0-16,0v16H192a8,8,0,0,0,0,16h16v16a8,8,0,0,0,16,0V224h16a8,8,0,0,0,0-16Z"></path></svg></span></button></div><div class="relative"><div><button class="h-9 px-3 flex items-center gap-1.5 rounded-full transition-colors cursor-pointer focus-ring hover:bg-state-hover active:bg-state-pressed active:scale-95 text-sm text-primary font-medium" aria-label="Select voice"><span class="text-inherit"><svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256"><path d="M56,96v64a8,8,0,0,1-16,0V96a8,8,0,0,1,16,0ZM88,24a8,8,0,0,0-8,8V224a8,8,0,0,0,16,0V32A8,8,0,0,0,88,24Zm40,32a8,8,0,0,0-8,8V192a8,8,0,0,0,16,0V64A8,8,0,0,0,128,56Zm40,32a8,8,0,0,0-8,8v64a8,8,0,0,0,16,0V96A8,8,0,0,0,168,88Zm40-16a8,8,0,0,0-8,8v96a8,8,0,0,0,16,0V80A8,8,0,0,0,208,72Z"></path></svg></span>Autonoe<svg width="10" height="6" viewBox="0 0 10 6" fill="none" class="transition-transform "><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div></div><div class="w-px h-5 bg-secondary/20"></div><div><button class="w-9 h-9 flex items-center justify-center rounded-full transition-colors cursor-pointer focus-ring bg-red-500/20 hover:bg-red-500/40 active:bg-red-500/50 active:scale-95 text-red-400" aria-label="End Live mode"><span class="text-primary"><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256"><path d="M200,40H56A16,16,0,0,0,40,56V200a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,160H56V56H200V200Z"></path></svg></span></button></div></div></div></div></div></div>

```

These documents for their javascript might also help:

```javascript

class AudioProcessingWorklet extends AudioWorkletProcessor {
  // Send and clear buffer every 480 samples
  // At 16kHz this is 30ms per chunk — matches Live API recommendation of 20-40ms
  buffer = new Int16Array(480);
  bufferWriteIndex = 0;

  constructor() {
    super();
  }

  /**
   * @param inputs Float32Array[][] [input#][channel#][sample#]
   */
  process(inputs) {
    if (inputs[0] && inputs[0].length) {
      const channel0 = inputs[0][0];
      this.processChunk(channel0);
    }
    return true;
  }

  sendAndClearBuffer() {
    this.port.postMessage({
      event: "chunk",
      data: {
        int16arrayBuffer: this.buffer.slice(0, this.bufferWriteIndex).buffer,
      },
    });
    this.bufferWriteIndex = 0;
  }

  processChunk(float32Array) {
    const l = float32Array.length;
    
    for (let i = 0; i < l; i++) {
      // Convert float32 -1 to 1 to int16 -32768 to 32767
      const int16Value = Math.max(-32768, Math.min(32767, Math.floor(float32Array[i] * 32768)));
      this.buffer[this.bufferWriteIndex++] = int16Value;
      if (this.bufferWriteIndex >= this.buffer.length) {
        this.sendAndClearBuffer();
      }
    }

    if (this.bufferWriteIndex >= this.buffer.length) {
      this.sendAndClearBuffer();
    }
  }
}

registerProcessor("audio-recorder-worklet", AudioProcessingWorklet);

```

```javascript

class VolumeMeterWorklet extends AudioWorkletProcessor {
  volume = 0;
  updateIntervalMs = 25;
  nextUpdateFrame = this.updateIntervalMs;

  constructor() {
    super();
  }

  get intervalInFrames() {
    return (this.updateIntervalMs / 1000) * sampleRate;
  }

  process(inputs) {
    const input = inputs[0];
    if (input.length > 0) {
      const samples = input[0];
      let sum = 0;
      let rms = 0;

      for (let i = 0; i < samples.length; ++i) {
        sum += samples[i] * samples[i];
      }

      rms = Math.sqrt(sum / samples.length);
      this.volume = Math.max(rms, this.volume * 0.95);

      this.nextUpdateFrame -= samples.length;
      if (this.nextUpdateFrame < 0) {
        this.nextUpdateFrame += this.intervalInFrames;
        this.port.postMessage({ volume: this.volume });
      }
    }
    return true;
  }
}

registerProcessor("vu-meter", VolumeMeterWorklet);

```

```javascript

class VolumeMeterWorklet extends AudioWorkletProcessor {
  volume = 0;
  updateIntervalMs = 25;
  nextUpdateFrame = this.updateIntervalMs;

  constructor() {
    super();
  }

  get intervalInFrames() {
    return (this.updateIntervalMs / 1000) * sampleRate;
  }

  process(inputs) {
    const input = inputs[0];
    if (input.length > 0) {
      const samples = input[0];
      let sum = 0;
      let rms = 0;

      for (let i = 0; i < samples.length; ++i) {
        sum += samples[i] * samples[i];
      }

      rms = Math.sqrt(sum / samples.length);
      this.volume = Math.max(rms, this.volume * 0.95);

      this.nextUpdateFrame -= samples.length;
      if (this.nextUpdateFrame < 0) {
        this.nextUpdateFrame += this.intervalInFrames;
        this.port.postMessage({ volume: this.volume });
      }
    }
    return true;
  }
}

registerProcessor("vu-meter", VolumeMeterWorklet);

```

> Demo (talk button state): [quest-talk-button.html](quest-talk-button.html) ← empty stub

The next button is the answer button, which... "ANSWERS" as said on the text.

Finally, this section has a opacity effect, like the last ones of it's kind, starts at the bottom of the screen with 0% opacity for the text underneath it, and on the top of the container, which touches right, left & bottom corners, 100% opacity, blur here is, also 0px, and at the bottom, 4px.

> **Suggested edit (Answer Questions):** The AI honesty check needs a backend spec — flag as `[TODO: define honesty scoring algorithm]`.
