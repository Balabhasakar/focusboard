# AI Usage Disclosure

## Tools Used

- **Claude (Anthropic):** Used as an AI assistant for coding guidance, debugging, improving existing code, and solving specific implementation challenges.
- **My own development:** I independently wrote and implemented parts of the application, made development decisions, integrated components, and tested the functionality.

No other AI tools were used.

## Approach

I approached this project as a hands-on development task rather than relying entirely on AI-generated code.

I started by reviewing the assignment requirements and Figma designs, then divided the work into smaller implementation stages. I wrote some of the code myself and used Claude when I needed help with specific components, logic, styling, debugging, or understanding alternative implementation approaches.

I followed an iterative development process: implement a feature, integrate it into the project, run the application, test its behaviour, and fix any issues before moving to the next feature.

## Representative Prompts

Some examples of how I used Claude during development:

1. "This is the Figma design. How long will this take? I want a step-by-step approach."
2. "The assignment says the To do tab is also required." (I identified a difference between the assignment requirements and the Figma design and asked for guidance on handling it.)
3. "I added all the code but still see only 'FocusBoard, 12 tasks loaded'." (Used Claude to investigate and resolve an integration issue.)
4. "Here are my 390px and 768px screenshots. What's next?" (Asked for feedback on responsive behaviour and possible improvements.)

## AI-Assisted Areas

I used Claude selectively throughout development for:

- **Code assistance:** Generating or suggesting implementations for certain React components and functionality.
- **State management:** Getting guidance on task operations, filtering, and updating application state.
- **Custom hooks:** Assistance with implementing and understanding the `useLocalStorage` hook.
- **Styling:** Suggestions and assistance with CSS, responsive layouts, and visual improvements.
- **Accessibility:** Guidance on accessibility improvements and best practices.
- **Debugging:** Identifying errors, understanding unexpected behaviour, and finding possible solutions.
- **Documentation:** Assistance with structuring and drafting the README.

Not all code was AI-generated. I wrote and modified parts of the implementation myself, reviewed AI suggestions, and integrated only the solutions that worked correctly with my project.

## My Contributions

### 1. Requirements and Planning
- Reviewed the assignment requirements and Figma designs.
- Identified differences between the design and the written requirements.
- Decided how to handle the additional To do tab and calculated statistics.
- Planned the implementation in manageable stages.

### 2. Development and Integration
- Set up the React project and its structure.
- Wrote and modified application code.
- Integrated components and connected their functionality.
- Implemented and refined features using a combination of my own code and AI-assisted suggestions.
- Made decisions about how different components and features should work together.

### 3. Debugging and Problem Solving
- Investigated issues encountered during development.
- Used browser testing and debugging to identify integration problems.
- Verified suggested fixes before applying them.
- Resolved issues such as an `App.jsx` file that had not been replaced correctly.

### 4. Functional Testing
I personally tested the following features:

- Creating and editing tasks.
- Deleting tasks with confirmation.
- Changing task statuses.
- Searching and applying combined filters.
- Carousel navigation.
- Verifying that task updates were reflected correctly in the UI.

### 5. Persistence Testing
- Tested task creation, editing, and deletion across page refreshes.
- Inspected Local Storage to verify that task data was saved correctly.
- Checked that saved tasks were restored when reopening the application.

### 6. Responsive and Quality Testing
- Tested the application at 390px, 768px, and 1440px screen widths.
- Checked the layout and functionality across different screen sizes.
- Ran `npm run lint` and `npm run build`.
- Verified that both commands completed without errors.

## Verified or Corrected AI Suggestions

I did not blindly accept every suggestion provided by Claude.

For example, Claude interpreted the text of carousel slides 2 and 3 from a low-resolution Figma screenshot and mentioned that the interpretation might be inaccurate. I ran the carousel and compared the actual slides against the original Figma frames before confirming the text.

I also reviewed the differences between the Figma design and assignment requirements, including:

- Adding the required To do tab.
- Using calculated statistics instead of the static values shown in Figma.
- Supporting carousel navigation on mobile devices.

I made the final decisions about these differences and documented them in the README.

## Understanding of the Implementation

I understand the main application architecture and how its functionality works:

- **State management:** Tasks are maintained in a single array in `App.jsx`. Creating, editing, changing status, and deleting tasks produce updated arrays rather than directly mutating the existing state.
- **Derived data:** Statistics and the visible task list are calculated using the task array, search text, selected status tab, and priority filter.
- **Local Storage:** The `useLocalStorage` hook restores saved tasks when the application loads and persists updates when the task list changes.
- **Reusable form:** A single `TaskForm` component supports both creating and editing tasks depending on whether an existing task is passed to it.
- **Carousel logic:** A single active-slide index controls the displayed slide, counter, and navigation indicators.

I can explain the implementation, the purpose of the main components, and how the application's functionality works.

## Conclusion

Claude was used as a development assistant, not as a replacement for my own work. I contributed to the implementation, made technical and design decisions, integrated the code, investigated problems, and personally verified the final functionality.

I take responsibility for the final application and understand the core logic and implementation.