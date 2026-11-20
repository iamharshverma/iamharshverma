export type IdeaQuote = {
  /** The line shown when a visitor taps the idea bulb. */
  quote: string;
  /** Who said it. */
  author: string;
  /** Short theme label above the line. */
  topic: string;
};

/** Attributed quotes on research, ideas and building — used by the Research gutter bulb. */
export const ideaQuotes: IdeaQuote[] = [
  { quote: "The best way to predict the future is to invent it.", author: "Alan Kay", topic: "Invention" },
  { quote: "Research is formalized curiosity. It is poking and prying with a purpose.", author: "Zora Neale Hurston", topic: "Curiosity" },
  { quote: "If I have seen further, it is by standing on the shoulders of giants.", author: "Isaac Newton", topic: "Open research" },
  { quote: "The important thing is not to stop questioning. Curiosity has its own reason for existing.", author: "Albert Einstein", topic: "Questions" },
  { quote: "Any sufficiently advanced technology is indistinguishable from magic.", author: "Arthur C. Clarke", topic: "Autonomy" },
  { quote: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs", topic: "Originality" },
  { quote: "Make it work, make it right, make it fast.", author: "Kent Beck", topic: "Craft" },
  { quote: "The first rule of any technology used in a business is that automation applied to an efficient operation will magnify the efficiency.", author: "Bill Gates", topic: "Automation" },
  { quote: "Science is a way of thinking much more than it is a body of knowledge.", author: "Carl Sagan", topic: "Method" },
  { quote: "The only person who never makes mistakes is the person who never makes anything.", author: "Mac Wilson", topic: "Experiment" },
  { quote: "Talk is cheap. Show me the code.", author: "Linus Torvalds", topic: "Evidence" },
  { quote: "We are what we repeatedly do. Excellence, therefore, is not an act but a habit.", author: "Will Durant", topic: "Discipline" },
];
