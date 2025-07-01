import { Calendar, Clock, Film, BookOpen, Building } from "lucide-react"


export default function CityBoysStory() {
  const story = {
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
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* <Navigation showBackButton={true} currentStory="City Boys" /> */}

      {/* Hero Section */}
      <div className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div
           
            className="text-white font-medium mb-6 text-lg px-4 py-2"
            style={{ backgroundColor: "rgb(7, 29, 106)" }}
          >
            <Film className="w-4 h-4 mr-2" />
            {story.genre}
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ color: "rgb(7, 29, 106)" }}>
            {story.title}
          </h1>

          <div className="flex flex-wrap justify-center gap-6 text-lg text-gray-300 mb-8">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              {story.runtime}
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              {story.releaseDate}
            </div>
          </div>

          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">{story.description}</p>
        </div>
      </div>

      {/* Synopsis Section */}
      <div className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white text-black border-0">
            <div>
              <div className="text-3xl font-bold flex items-center" style={{ color: "rgb(7, 29, 106)" }}>
                <Building className="w-8 h-8 mr-3" />
                Synopsis
              </div>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-gray-700">{story.synopsis}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Themes Section */}
      <div className="py-16 px-6" style={{ backgroundColor: "rgb(7, 29, 106)" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Key Themes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {story.themes.map((theme, index) => (
              <div key={index} className="bg-white text-black border-0">
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2" style={{ color: "rgb(7, 29, 106)" }}>
                    {theme.split(":")[0]}
                  </h3>
                  <p className="text-gray-700">{theme.split(":")[1]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chapters Section */}
      <div className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-4xl font-bold text-center mb-12 flex items-center justify-center"
            style={{ color: "rgb(7, 29, 106)" }}
          >
            <BookOpen className="w-10 h-10 mr-4" />
            Story Chapters
          </h2>

          <div className="space-y-8">
            {story.chapters.map((chapter, index) => (
              <div key={chapter.id} className="bg-white text-black border-0">
                <div>
                  <div className="text-2xl font-bold" style={{ color: "rgb(7, 29, 106)" }}>
                    Chapter {chapter.id}: {chapter.title}
                  </div>
                </div>
                <div>
                  <div className="space-y-4">
                    {chapter.content.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-gray-700 leading-relaxed text-lg">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-12 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-4" style={{ color: "rgb(7, 29, 106)" }}>
            Urban Dreams, Hidden Costs
          </h3>
          <p className="text-gray-300 text-lg">
            Explore the complex world of modern urban ambition and discover what lies beneath the surface of success.
          </p>
        </div>
      </div>
    </div>
  )
}
