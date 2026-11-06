/* Event catalogue. To add an event: append an object here + drop an image in assets/images/.
   `date` is the start time in ISO-8601 with the IST offset. */
window.KX = window.KX || {};

KX.CATEGORIES = [
  { id: 'Technology', icon: '💻', blurb: 'Hackathons, robotics and code' },
  { id: 'Music',      icon: '🎵', blurb: 'Live shows and open stages' },
  { id: 'Business',   icon: '📈', blurb: 'Startups, pitches, networking' },
  { id: 'Sports',     icon: '⚽', blurb: 'Tournaments and fun runs' },
  { id: 'Workshop',   icon: '🛠️', blurb: 'Hands-on skill building' },
  { id: 'Arts',       icon: '🎨', blurb: 'Design, photography, exhibits' }
];

KX.EVENTS = [
  {
    id: 'codestorm-hackathon', title: 'CodeStorm 24-Hour Hackathon', category: 'Technology', featured: true,
    date: '2026-12-12T09:00:00+05:30', duration: '24 hours', venue: 'Innovation Lab, Block C', fee: 0, capacity: 200,
    organizer: 'Computer Science Society', image: 'assets/images/codestorm-hackathon.svg',
    short: 'Team up, build a working product overnight and pitch it to a panel of industry mentors.',
    description: 'CodeStorm is our flagship overnight hackathon. Teams of up to four have 24 hours to turn an idea into a working prototype around themes of sustainability, campus life and open data. Mentors from local tech companies are on hand throughout, and the top three teams win prizes and internship interviews.',
    highlights: ['Teams of 2–4 members', 'Mentor desks open all night', 'Meals and snacks included', 'Prizes and internship interviews for the top 3'],
    schedule: [{ time: '9:00 AM', item: 'Kick-off and theme reveal' }, { time: '11:00 AM', item: 'Hacking begins' }, { time: '9:00 AM (next day)', item: 'Submissions close' }, { time: '11:00 AM (next day)', item: 'Demos and awards' }]
  },
  {
    id: 'rhythm-nights', title: 'Rhythm Nights Music Festival', category: 'Music', featured: true,
    date: '2026-12-20T18:00:00+05:30', duration: '5 hours', venue: 'Open Air Amphitheatre', fee: 299, capacity: 1200,
    organizer: 'Cultural Committee', image: 'assets/images/rhythm-nights.svg',
    short: 'An evening of live bands, DJ sets and student performances under the open sky.',
    description: 'Rhythm Nights brings together student bands, solo artists and a headline DJ for one unforgettable evening. Expect food stalls, a lit-up amphitheatre and a closing set that traditionally ends with the whole crowd singing along.',
    highlights: ['6 live acts and a headline DJ', 'Food and beverage stalls', 'Gates open at 5:00 PM', 'Student ID required at entry'],
    schedule: [{ time: '5:00 PM', item: 'Gates open' }, { time: '6:00 PM', item: 'Student band showcase' }, { time: '8:00 PM', item: 'Headline performance' }, { time: '10:30 PM', item: 'DJ closing set' }]
  },
  {
    id: 'startup-pitch-summit', title: 'Startup Pitch Summit', category: 'Business', featured: true,
    date: '2027-01-09T10:00:00+05:30', duration: '6 hours', venue: 'Main Auditorium', fee: 199, capacity: 400,
    organizer: 'Entrepreneurship Cell', image: 'assets/images/startup-pitch-summit.svg',
    short: 'Watch student founders pitch real ideas to investors, then network with the people behind them.',
    description: 'Ten shortlisted student startups pitch to a panel of angel investors and founders. Between rounds there are fireside chats on fundraising, product-market fit and building a team, followed by an open networking lunch.',
    highlights: ['10 live startup pitches', 'Investor Q&A panel', 'Networking lunch included', 'Certificate of participation'],
    schedule: [{ time: '10:00 AM', item: 'Opening keynote' }, { time: '11:00 AM', item: 'Pitch round' }, { time: '1:30 PM', item: 'Networking lunch' }, { time: '3:00 PM', item: 'Winners announced' }]
  },
  {
    id: 'inter-college-football-cup', title: 'Inter-College Football Cup', category: 'Sports',
    date: '2027-01-23T08:30:00+05:30', duration: 'Full day', venue: 'University Sports Ground', fee: 0, capacity: 600,
    organizer: 'Department of Sports', image: 'assets/images/inter-college-football-cup.svg',
    short: 'Sixteen college teams, one knockout bracket and a trophy on the line.',
    description: 'The annual knockout tournament returns with sixteen teams from across the region. Come and cheer from the stands, or register your own team before slots fill up. Refreshments are available at the ground all day.',
    highlights: ['16-team knockout format', 'Open to spectators', 'Referees from the district association', 'Trophy and medals for the top 3'],
    schedule: [{ time: '8:30 AM', item: 'Opening ceremony' }, { time: '9:30 AM', item: 'Round of 16' }, { time: '2:00 PM', item: 'Quarter and semi-finals' }, { time: '5:00 PM', item: 'Final and prize distribution' }]
  },
  {
    id: 'ai-ml-workshop', title: 'AI & Machine Learning Workshop', category: 'Workshop',
    date: '2027-01-30T10:00:00+05:30', duration: '5 hours', venue: 'Seminar Hall 2', fee: 149, capacity: 80,
    organizer: 'AI Club', image: 'assets/images/ai-ml-workshop.svg',
    short: 'A beginner-friendly, hands-on introduction to training and evaluating your first ML model.',
    description: 'No prior machine-learning experience needed. You will clean a real dataset, train a simple classifier in Python and learn how to judge whether it can be trusted. Bring a laptop with Python 3 installed; setup help is available from 9:30 AM.',
    highlights: ['Hands-on coding in Python', 'Laptop required', 'Starter notebooks provided', 'Limited to 80 seats'],
    schedule: [{ time: '10:00 AM', item: 'ML fundamentals' }, { time: '11:30 AM', item: 'Building a classifier' }, { time: '1:30 PM', item: 'Evaluating results' }, { time: '2:30 PM', item: 'Mini challenge' }]
  },
  {
    id: 'art-design-expo', title: 'Annual Art & Design Expo', category: 'Arts', featured: false,
    date: '2027-02-13T11:00:00+05:30', duration: '2 days', venue: 'Central Gallery', fee: 0, capacity: 500,
    organizer: 'Fine Arts Department', image: 'assets/images/art-design-expo.svg',
    short: 'Paintings, sculpture, illustration and digital design from more than 80 student artists.',
    description: 'Walk through a curated gallery of student work, join live sketching sessions and vote for the audience-choice award. Many pieces are available to purchase directly from the artists.',
    highlights: ['80+ student artists', 'Live sketching corner', 'Audience-choice award', 'Free entry'],
    schedule: [{ time: '11:00 AM', item: 'Gallery opens' }, { time: '2:00 PM', item: 'Live sketching session' }, { time: '5:00 PM', item: 'Artist talks' }, { time: '7:00 PM', item: 'Gallery closes' }]
  },
  {
    id: 'open-mic-night', title: 'Open Mic Night', category: 'Music',
    date: '2027-02-20T19:00:00+05:30', duration: '3 hours', venue: 'Student Cafe Courtyard', fee: 0, capacity: 150,
    organizer: 'Literary & Music Club', image: 'assets/images/open-mic-night.svg',
    short: 'Sing, play, recite or just listen. A relaxed stage open to every talent.',
    description: 'A friendly, low-pressure stage for music, poetry, stand-up and storytelling. Performers get a five-minute slot; the audience gets a warm evening and good coffee.',
    highlights: ['5-minute slots for performers', 'Acoustic setup provided', 'Free entry', 'Coffee and snacks on sale'],
    schedule: [{ time: '7:00 PM', item: 'Doors open' }, { time: '7:30 PM', item: 'Performances begin' }, { time: '9:30 PM', item: 'Closing jam' }]
  },
  {
    id: 'photography-walk', title: 'Heritage Photography Walk', category: 'Arts',
    date: '2027-03-06T06:30:00+05:30', duration: '4 hours', venue: 'Old Town Heritage Quarter', fee: 99, capacity: 40,
    organizer: 'Photography Club', image: 'assets/images/photography-walk.svg',
    short: 'Catch the golden hour on a guided street-photography walk led by a working photographer.',
    description: 'Walk the old quarter at sunrise with a professional photographer who will share tips on composition, light and candid portraits. Any camera works, including a phone. The best frames are featured in the next Art & Design Expo.',
    highlights: ['Guided by a professional photographer', 'Phone cameras welcome', 'Limited to 40 participants', 'Best photos get featured'],
    schedule: [{ time: '6:30 AM', item: 'Meet at the heritage gate' }, { time: '7:00 AM', item: 'Guided walk' }, { time: '9:30 AM', item: 'Photo review over tea' }]
  },
  {
    id: 'robotics-championship', title: 'National Robotics Championship', category: 'Technology',
    date: '2027-03-13T09:00:00+05:30', duration: '2 days', venue: 'Engineering Arena', fee: 249, capacity: 300,
    organizer: 'Robotics Club', image: 'assets/images/robotics-championship.svg',
    short: 'Line-followers, sumo bots and drone races. Bring your machine and compete for the title.',
    description: 'Teams from across the country compete in line-following, robot sumo and an indoor drone course. Spectators can watch every arena and visit the demo zone to try out the machines themselves.',
    highlights: ['Three competition arenas', 'Spectator demo zone', 'Judging by industry engineers', 'Prize pool for each category'],
    schedule: [{ time: '9:00 AM', item: 'Inspection and registration' }, { time: '11:00 AM', item: 'Line-follower heats' }, { time: '3:00 PM', item: 'Robot sumo' }, { time: 'Day 2', item: 'Drone race and finals' }]
  }
];
