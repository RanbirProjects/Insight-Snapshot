
# Insight Snapshot

A high-utility work reflection tool designed for professionals. It transforms messy thoughts about workplace situations into structured, analytical snapshots.

## Features

- **Professional Summary**: 1-2 line distillation of the core issue.
- **Key Themes**: Identification of high-level workplace dynamics (e.g., *Role Ambiguity*, *Social Capital*).
- **Emotional Signal**: An objective reading of the energetic state reflected in the writing.
- **Reflection Prompts**: Challenging, practical questions to move the user forward.
- **Risk Note**: Optional detection of behavioral pitfalls like avoidance or impulsivity.

## Implementation Details & Assumptions

1.  **AI Orchestration**: Powered by Gemini 3 Flash for speed and high-quality logical reasoning.
2.  **Prompt Engineering**: Uses structured JSON output (via `responseSchema`) and a detailed system instruction to ensure a "non-cringe" professional tone.
3.  **UI/UX**: 
    - Designed with a "SaaS-native" look using Tailwind CSS. 
    - Focuses on readability and clear information hierarchy.
    - Includes skeleton loaders and robust error states.
4.  **Security**: The application expects `process.env.API_KEY` to be available for the Gemini API.

## How to Run

1.  Clone the repository.
2.  Install dependencies: `npm install`.
3.  Ensure your Gemini API Key is available in the environment variables.
4.  Start the development server: `npm start`.

## Future Improvements

1.  **History Persistence**: Save snapshots locally or in a database to track professional growth over time.
2.  **Action Plan Generation**: Extend the insight into a concrete 3-step action plan for resolving the specific conflict.
3.  **Theme Analytics**: Over time, show the user which "Themes" appear most frequently in their work reflections (e.g., "70% of your stressors involve Stakeholder Alignment").
4.  **Tone Selection**: Allow the user to request a specific persona for feedback (e.g., "The Direct CEO", "The Empathetic Peer").
