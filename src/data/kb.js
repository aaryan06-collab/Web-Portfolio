export const quickReplies = [
  'Who are you?',
  'What are your skills?',
  'Show your projects',
  'How can I contact you?',
];

const rules = [
  {
    match: ['who are you', 'about', 'who is', 'name', 'introduce', 'yourself'],
    reply: 'I\'m Aaryan Bansal — an AI/ML enthusiast and B.Tech IT student from New Delhi, India. I focus on Python, machine learning, and data analysis.',
  },
  {
    match: ['skill', 'technolog', 'stack', 'know', 'good at', 'languages'],
    reply: 'I work with Python, OOP, SQL, HTML/CSS; ML with Scikit-learn (regression, classification); data with Pandas, NumPy, Matplotlib, Seaborn; and tools like Git, Jupyter, VS Code, Tkinter, and Excel.',
  },
  {
    match: ['project', 'build', 'portfolio', 'what have you made'],
    reply: 'Some projects: an OTP-based secure login with loan prediction, a face attendance website, house price prediction, a student registration form, a music player, and a calculator app.',
  },
  {
    match: ['experience', 'work', 'intern', 'job', 'career'],
    reply: 'I\'m an App Developer Team Leader at Belvo (since Jun 2026), a Python Programming Intern at CodeAlpha · Decode Labs, and hold an HR role at Amanitvam Foundation.',
  },
  {
    match: ['education', 'study', 'college', 'university', 'degree', 'b.tech'],
    reply: 'I\'m pursuing a B.Tech in Information Technology at Dr. Akhilesh Das Gupta Institute of Professional Studies (2024–present) with a CGPA of 7.20.',
  },
  {
    match: ['certificate', 'certification', 'courses'],
    reply: 'I hold 6 certifications, including Supervised ML (DeepLearning.AI / Stanford), Software Engineering and Gen-AI (IBM), Claude 101 (Anthropic), and more.',
  },
  {
    match: ['contact', 'email', 'phone', 'mail', 'reach'],
    reply: 'You can reach me at aaryanbansal0006@gmail.com, phone +91 9891115788, or via LinkedIn/GitHub (links in the Contact section).',
  },
  {
    match: ['github', 'code', 'source', 'repo'],
    reply: 'My GitHub is github.com/aaryan06-collab — take a look at my projects and contributions.',
  },
  {
    match: ['linkedin', 'profile'],
    reply: 'Connect with me on LinkedIn at linkedin.com/in/aaryan--bansal.',
  },
  {
    match: ['location', 'where', 'delhi', 'based'],
    reply: 'I\'m based in New Delhi, India.',
  },
  {
    match: ['hello', 'hi', 'hey', 'namaste', 'yo'],
    reply: 'Hey there! Ask me about my skills, projects, experience, or how to get in touch.',
  },
];

export function getReply(input) {
  const text = input.toLowerCase();

  if (/(thank|thanks|ty|thx)/.test(text)) {
    return 'You\'re welcome! Anything else you\'d like to know?';
  }
  if (/(bye|goodbye|see you|thanks for)/.test(text)) {
    return 'Take care! Feel free to reach out anytime.';
  }

  for (const rule of rules) {
    if (rule.match.some((k) => text.includes(k))) return rule.reply;
  }

  return 'I\'m not sure I understood that. Try asking about my skills, projects, experience, education, or how to contact me.';
}
