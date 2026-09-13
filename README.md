# Study DNA Studio

I need you to build the FRONTEND/UI ONLY for a product called LOCKIN.

IMPORTANT: this is a visual implementation task. Do NOT build backend functionality, authentication, database logic, AI APIs, telemetry logic, adaptive algorithms, or real data persistence.

The purpose of this build is to create a polished frontend that I will later export and give to another developer/AI to connect to the existing LOCKIN functionality.

WHAT LOCKIN IS

LOCKIN is an adaptive study system.

It is NOT a generic AI study planner.

The core experience is:

student tells LOCKIN about themselves
→ LOCKIN learns their study behavior
→ Study DNA is created
→ LOCKIN creates a personalized plan
→ the student studies
→ LOCKIN observes behavior + feedback
→ Study DNA/evidence changes
→ the plan adapts

The UI needs to make that concept obvious.

VISUAL DIRECTION

LOCKIN should feel:

warm

editorial

playful

Gen-Z

slightly chaotic

cute but NOT childish

clever

highly polished

spatial

memorable enough for a DesignAthon

Use:

Background: #F2EDE8
Dark text: #1A150E
Brick red: #A72925
Wood brown: #755C40
Green accent: #24B26F
Muted blue: #235B9A

NO purple.

NO generic blue/purple AI gradients.

NO glassmorphism.

NO giant gradient blobs.

NO generic SaaS dashboard.

NO excessive rounded cards.

NO huge collection of identical cards.

Do not make everything look like a chatbot.

Use strong editorial typography, oversized headlines, asymmetrical layouts, handwritten annotations, subtle hand-drawn marks, paper-like surfaces, crisp borders and selective hard offset shadows.

Use 2px dark borders and selective 3–4px hard shadows for important interactive elements.

The landing page should feel more like an editorial creative website than a conventional productivity app.

PAGES TO BUILD

Build these as polished, responsive frontend pages.

1. LANDING

Hero headline:

"your study plan should adapt to you"

Use handwritten annotations such as:

"just be consistent, bro."

"yeah... about that."

Primary CTA:

"LET'S LOCK IN →"

Create a beautiful warm isometric student bedroom as the visual anchor on the right.

The room should include:

student studying at desk

noticeable cute cat

bookshelf

books

plants

desk lamp

cozy room details

warm lighting

organic/lived-in feeling

The room should NOT look like a basic collection of rectangles.

The composition should be asymmetric and visually interesting.

Add sections below the hero explaining the adaptive concept, but keep them editorial and visual rather than turning the page into a standard SaaS feature grid.

2. ONBOARDING

Create a conversational onboarding flow.

Example:

"when does your brain actually cooperate?"

Options:

MORNING
AFTERNOON
EVENING
NIGHT

When an option is selected, visually react with a handwritten annotation.

Examples:

"morning person?? respect."

"afternoon energy crash = noted."

"night owl detected."

"okay yeah, your brain clocks in late."

Include:

STEP 1 / 6

Build the remaining onboarding screens around:

focus capacity

study methods

behavior friction

availability

plan preview

Make it feel like LOCKIN is getting to know the student, NOT like filling out a boring questionnaire.

3. STUDY DNA

Create a beautiful editorial Study DNA profile.

Show things like:

FOCUS CAPACITY
45 min

ENERGY WINDOW
evening

STUDY METHOD
active recall

CONSISTENCY
building

BREAK STYLE
short + frequent

Use small tactile labels such as:

INITIAL
OBSERVED
HIGH CONFIDENCE

Make the distinction between "what the student told us" and "what LOCKIN learned" visually clear.

Do NOT make this look like a KPI dashboard.

4. TODAY / WORKSPACE

Create the main study workspace.

Use the room illustration/spatial visual as an anchor on one side and the active study plan on the other.

Example:

TODAY

BIOLOGY
25 MIN
ACTIVE RECALL

START SESSION →

Include:

"WHY IS MY PLAN LIKE THIS?"

as an interactive-looking element.

The workspace should feel like a place the student actually wants to use.

5. ADAPTIVE EXPLANATION

Create a beautiful explanation view/drawer showing:

WHAT LOCKIN NOTICED

"You tend to abandon focus blocks >30 mins."

↓

WHY IT MATTERS

"Shorter sessions show higher completion."

↓

WHAT CHANGED

"45m → 25m + Active Recall"

This is extremely important.

The user should immediately understand:

"I gave LOCKIN information → it learned something → it changed my plan."

6. STUDY SESSION

Create the active study screen.

Include:

BIOLOGY
ACTIVE RECALL
25:00

progress

session instructions

pause / finish controls

Keep it focused and calm.

7. FEEDBACK

After a session:

"be honest. did that actually work?"

Buttons:

COOKED
KINDA
ABSOLUTELY NOT

Make this playful and memorable.

The visual implication should be that this feedback will influence what LOCKIN does next.

RESPONSIVE DESIGN

Make everything resp

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/025530a7-e505-4eaa-8cfd-b6301891b63f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
