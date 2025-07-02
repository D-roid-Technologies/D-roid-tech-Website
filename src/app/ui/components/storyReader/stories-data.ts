export type Chapter = {
  id: number;
  title: string;
  content: string[]; // paragraphs
};

export type Story = {
  id: string;
  title: string;
  genre: string;
  runtime: string;
  releaseDate: string;
  description: string;
  synopsis: string;
  themes: string[];
  chapters: Chapter[];
};

export const stories : Story[]= [
  {
    id: "brothers",
    title: "Brothers",
    genre: "Emotional Drama / Adventure",
    runtime: "45 minutes",
    releaseDate: "March 5, 2025",
    description:
      "A deeply moving animated tale that explores the unbreakable bond between siblings in the face of unimaginable adversity.",
    synopsis:
      "Brothers is a deeply moving animated tale that explores the unbreakable bond between siblings in the face of unimaginable adversity. When a devastating enemy invasion tears through their homeland, two young brothers are violently separated during the chaos of evacuation. What follows is a parallel journey of survival, growth, and the enduring power of family love that transcends physical distance.",
    themes: [
      "Resilience: How trauma can forge unbreakable strength",
      "Hope: The light that guides us through the darkest moments",
      "Family Bonds: Love that endures beyond physical separation",
      "Coming of Age: Growing up when childhood is stolen away",
      "Redemption: Finding meaning in suffering",
    ],
    chapters: [
      {
        id: 1,
        title: "The Morning Before",
        content: [
          "The morning sun cast long shadows across the village square as Kael and his younger brother Finn played their favorite game of hide-and-seek among the market stalls. The air was filled with the familiar sounds of their peaceful homeland: merchants calling out their wares, children laughing, and the gentle hum of daily life that had remained unchanged for generations.",
          "Kael, at twelve years old, had always been the protector. Even in their games, he would let Finn win just to see the joy light up his eight-year-old brother's face. Their mother often said that Kael had been born with an old soul, always watching over others with a wisdom beyond his years.",
          "But on this particular morning, something felt different. The adults spoke in hushed tones, their eyes darting toward the horizon with an unease that made Kael's stomach twist with worry. He had learned to read the subtle signs of adult concern, and today those signs were everywhere.",
        ],
      },
      {
        id: 2,
        title: "The Separation",
        content: [
          "The first explosion shattered the morning calm like thunder splitting the sky. Birds erupted from the trees in panicked clouds, and the ground beneath their feet trembled with a violence that seemed to shake the very foundations of their world. Kael grabbed Finn's hand instinctively, his protective instincts kicking in before his mind could fully process what was happening.",
          "Chaos erupted in the village square. People ran in every direction, some toward their homes, others toward the evacuation routes that had been planned but never expected to be used. The sound of approaching aircraft grew louder, and Kael could see the fear in his brother's eyes – a fear that mirrored his own but which he knew he had to hide.",
          "Their mother appeared through the crowd, her face pale but determined. She pressed a small bag into Kael's hands and knelt down to look both boys in the eyes. 'Listen to me carefully,' she said, her voice steady despite the chaos around them. 'You must stay together, no matter what happens. Take care of each other.'",
          "The evacuation convoy was a river of desperate humanity flowing toward the border. Families clutched their few possessions, children cried for toys left behind, and everyone moved with the urgent knowledge that their old life was ending. Kael held Finn's hand so tightly that his knuckles turned white, determined not to lose his brother in the crowd.",
          "But fate, it seemed, had other plans. The attack came without warning – a sudden burst of gunfire that sent the convoy scattering like leaves in a hurricane. In the confusion and terror that followed, Kael felt Finn's hand slip from his grasp. He turned, reaching desperately through the crowd, calling his brother's name until his voice was hoarse.",
        ],
      },
      {
        id: 3,
        title: "Parallel Journeys",
        content: [
          "When the dust settled and the immediate danger had passed, Kael found himself alone for the first time in his life. The realization hit him like a physical blow – somewhere in that chaos, he had lost the one person he had sworn to protect. The weight of that failure would stay with him for years to come.",
          "Meanwhile, miles away, Finn had been swept up by a different group of evacuees. At eight years old, he was too young to fully understand the magnitude of what had happened, but old enough to know that his world had been turned upside down. He kept looking for Kael's familiar face in every crowd, listening for his brother's voice in every conversation.",
          "The refugee camp where Kael ended up was a temporary city of tents and hope. Here, displaced families tried to rebuild some semblance of normal life while waiting for news of loved ones. Kael threw himself into helping others, becoming a leader among the children despite his young age. It was as if caring for others helped fill the void left by his missing brother.",
          "Finn's journey took him to a different kind of refuge – a small town that had opened its doors to evacuees. Here, he was taken in by an elderly couple who had lost their own grandson in the conflict. They provided him with safety and love, but nothing could replace the bond he had shared with his brother.",
        ],
      },
      {
        id: 4,
        title: "Growing Apart, Growing Strong",
        content: [
          "Years passed, and both boys grew into young men shaped by their experiences. Kael became known in his community as someone who could be counted on, someone who never gave up on finding lost family members. His own search for Finn had taught him the skills and determination needed to help others in similar situations.",
          "Finn, meanwhile, had channeled his early trauma into a quiet strength. He had learned to survive on his own, but he never stopped believing that somewhere out there, his brother was looking for him. This faith sustained him through the darkest moments and gave him the courage to keep moving forward.",
        ],
      },
      {
        id: 5,
        title: "The Reunion",
        content: [
          "The reunion, when it finally came, was both everything they had dreamed of and nothing like they had imagined. They were no longer the children who had been separated in that chaotic evacuation. They were young men who had been forged by hardship, shaped by loss, and strengthened by the unbreakable bond of brotherhood that had endured despite the years and distance.",
          "As they embraced for the first time in nearly a decade, both brothers understood that their separation had not weakened their connection – it had proven its strength. They had carried each other in their hearts through every challenge, every lonely night, and every moment of doubt. Their love had been the constant star that guided them back to each other.",
          "The story of their reunion spread throughout the refugee communities, becoming a symbol of hope for other separated families. It reminded everyone that love transcends physical distance, that family bonds can survive even the most devastating circumstances, and that sometimes the greatest strength comes from the faith that somewhere, someone is looking for you too.",
        ],
      },
    ],
  },
  {
    id: "cityBoys",
    title: "City Boys",
    genre: "Social Commentary / Urban Drama",
    runtime: "38 minutes",
    releaseDate: "February 10, 2025",
    description:
      "A razor-sharp examination of modern urban culture through the lens of young men consumed by the pursuit of wealth, status, and material success.",
    synopsis:
      "City Boys offers a razor-sharp examination of modern urban culture through the lens of young men consumed by the pursuit of wealth, status, and material success. Set against the backdrop of a glittering metropolis, this animated exploration reveals the hidden costs of living in a world where your worth is measured by your wallet.",
    themes: [
      "Materialism: The hidden costs of wealth-seeking behavior",
      "Social Media Culture: The gap between online personas and reality",
      "Modern Masculinity: Redefining success in contemporary society",
      "Systemic Pressure: Understanding what creates these personas",
      "Self-Worth: Finding value beyond external validation",
    ],
    chapters: [
      {
        id: 1,
        title: "Morning Rituals",
        content: [
          "The city never sleeps, and neither do its most ambitious sons. In the gleaming towers of downtown, where glass and steel reach toward heaven like modern-day ziggurats, five young men navigate the treacherous waters of urban success. Each morning, they wake up to the same question that haunts every city dweller: Am I winning?",
          "Marcus checks his phone before his eyes are fully open. The cryptocurrency markets never close, and fortunes can be made or lost while you sleep. His apartment, a minimalist shrine to success, overlooks the financial district. Every piece of furniture, every gadget, every carefully curated detail screams one message: I have made it. But the constant anxiety in his chest suggests otherwise.",
        ],
      },
      {
        id: 2,
        title: "The Performance",
        content: [
          "Three floors below, Devon is already setting up his ring light for the morning content creation session. His followers expect daily motivation, lifestyle tips, and glimpses into the 'successful entrepreneur lifestyle.' The irony isn't lost on him that his most successful business is selling the dream of success to people who, like him, are still chasing it.",
          "Across town, Kai sits in his startup's office space – a converted warehouse that costs more per month than most people's salaries. The walls are covered with motivational posters about 'disruption' and 'innovation,' but the reality is more mundane: endless pitch meetings, investor calls, and the constant pressure to grow or die in the unforgiving ecosystem of venture capital.",
        ],
      },
      {
        id: 3,
        title: "The Cost of Success",
        content: [
          "As evening approaches, the city's true nature reveals itself. The gleaming facades hide a multitude of struggles, insecurities, and quiet desperation. Each of our five protagonists returns to their respective homes, successful by every external measure but haunted by the nagging feeling that something essential is missing.",
          "The social media feeds tell one story – success, happiness, achievement. But the reality is more complex. Marcus lies awake calculating his net worth, Devon crafts the perfect post about gratitude while feeling empty inside, Kai works until midnight trying to save his failing company.",
        ],
      },
    ],
  },
  {
    id: "resilience",
    title: "Resilience",
    genre: "Biographical Drama / Medical",
    runtime: "42 minutes",
    releaseDate: "January 20, 2025",
    description: "A powerful animated story about an African woman living with sickle cell disease.",
    synopsis:
      "Resilience tells the inspiring true-to-life story of Amara, a young African woman living with sickle cell disease. This powerful animated feature chronicles her journey from childhood through adulthood, showcasing not just her medical struggles but her transformation into an advocate, educator, and symbol of hope for others facing similar challenges.",
    themes: [
      "Medical Awareness: Authentic representation of sickle cell disease",
      "Personal Growth: From confusion to advocacy and empowerment",
      "Cultural Stigma: Addressing misconceptions in various communities",
      "Healthcare Systems: Different cultural approaches to chronic conditions",
      "Resilience: Finding strength through struggle and community support",
    ],
    chapters: [
      {
        id: 1,
        title: "The Beginning",
        content: [
          "Amara's story begins in the bustling city of Lagos, Nigeria, where the sounds of traffic, street vendors, and daily life create a symphony of urban energy. As a child, she was like any other – curious, playful, and full of dreams. But there was something different about Amara that she couldn't yet understand, something that would shape every aspect of her life's journey.",
          "The first crisis came when she was seven years old. What started as a normal day of playing with friends in the compound courtyard suddenly became a nightmare of excruciating pain. Her joints felt like they were on fire, and no position could bring relief.",
        ],
      },
      {
        id: 2,
        title: "Understanding",
        content: [
          "Dr. Okafor, the clinic physician, had seen this before. After a series of tests, he delivered the diagnosis that would change everything: sickle cell disease. He explained to Amara's parents how their daughter's red blood cells, instead of being round and flexible, were shaped like crescents or sickles, causing them to get stuck in blood vessels and create painful blockages.",
          "The news hit the family like a thunderbolt. In their community, chronic illness was often misunderstood, sometimes attributed to spiritual causes or family curses.",
        ],
      },
      {
        id: 3,
        title: "Advocacy",
        content: [
          "Today, Dr. Amara Okonkwo is recognized as one of the world's leading advocates for people with sickle cell disease. Her research has improved treatment protocols, her advocacy has reduced stigma, and her personal story continues to inspire others facing similar challenges.",
          "But perhaps most importantly, Amara has shown that resilience isn't about avoiding pain or pretending that challenges don't exist. True resilience is about facing difficulties head-on, learning from them, and using that knowledge to help others.",
        ],
      },
    ],
  },
  {
    id: "warriors",
    title: "Warriors",
    genre: "Epic Fantasy / Action Adventure",
    runtime: "52 minutes",
    releaseDate: "January 20, 2025",
    description:
      "An epic animated saga about a powerful clan that rises to become the strongest force on the planet through determination and unity.",
    synopsis:
      "Warriors presents an epic saga of the Ketu clan, a people who rise from the ashes of near-extinction to become the most formidable force on their world. This isn't just a story of physical strength, but of spiritual fortitude, community bonds, and the power of unified purpose in the face of seemingly impossible odds.",
    themes: [
      "Transformation: From peaceful farmers to elite warriors",
      "Unity: The power of community bonds and unified purpose",
      "Protection: Fighting not for glory but to protect what you love",
      "Leadership: The sacrifices required for true leadership",
      "Spiritual Strength: Power that comes from connection to land and purpose",
    ],
    chapters: [
      {
        id: 1,
        title: "The Peaceful Valley",
        content: [
          "In the fertile valleys of the ancient world, where the Ketu River wound through emerald fields like a silver serpent, lived a people who knew only peace. The Ketu clan had tended their lands for countless generations, their lives governed by the rhythm of seasons, the cycle of planting and harvest, and the gentle wisdom passed down from elder to child.",
          "Adunni, the clan's eldest, often sat beneath the great baobab tree that marked the center of their village, sharing stories of the old days when the world was young and the spirits walked openly among mortals.",
        ],
      },
      {
        id: 2,
        title: "The First Attack",
        content: [
          "The first attack came like lightning from a clear sky. Jaguda warriors, their faces painted with the symbols of war, descended from the mountain passes in the pre-dawn darkness. They moved with the silence of shadows and struck with the fury of a storm, targeting the outlying farms and settlements where the Ketu people lived in peaceful vulnerability.",
          "Kemi, now a young woman of twenty-two, was among the first to sense the approaching danger. The earth itself seemed to whisper warnings to her, and the animals grew restless with an anxiety that spoke of impending violence.",
        ],
      },
      {
        id: 3,
        title: "The Transformation",
        content: [
          "The transformation that followed was unlike anything the Ketu people had ever experienced. Under Kemi's leadership, they began to train not just their bodies but their spirits for the challenges ahead. They learned that true strength came not from anger or hatred, but from love – love for their land, their people, and the way of life they were determined to preserve.",
          "The training was grueling and comprehensive. The Ketu people learned to move like the wind through the forest, to strike like lightning from unexpected angles, and to endure like the ancient mountains that had stood watch over their valley for millennia.",
        ],
      },
      {
        id: 4,
        title: "The Final Battle",
        content: [
          "The final confrontation between the Ketu and Jaguda clans took place on the plains where the valley opened toward the mountains. It was a battle that would be remembered in songs and stories for generations to come, not just for its scale and intensity, but for what it represented – the triumph of unity and purpose over division and conquest.",
          "Kemi faced Balogun in single combat, not because she sought personal glory, but because she understood that some conflicts could only be resolved through the direct confrontation of opposing philosophies.",
        ],
      },
      {
        id: 5,
        title: "Legacy of Warriors",
        content: [
          "In the years that followed, the Ketu clan became known throughout their world as the strongest people on the planet, but their strength was measured not in the enemies they had defeated but in the peace they had preserved.",
          "Kemi, now recognized as the greatest leader her people had ever known, continued to teach that strength without wisdom is mere brutality, and that the most powerful weapon any warrior can possess is a clear understanding of what they are fighting for.",
        ],
      },
    ],
  },
]
