"use client";

import {
  Calendar,
  Clock,
  Film,
  BookOpen,
  Building,
  ChevronLeft,
  ChevronRight,
  User,
  Eye,
  Heart,
} from "lucide-react";
import { useState, useEffect } from "react";
import "./BrothersStory.css";

export default function BrothersStory() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isReading, setIsReading] = useState(false);

  const story = {
    id: "brothers",
    title: "Brothers in Arms",
    subtitle: "A Tale of Loyalty and Sacrifice",
    author: "Marcus Chen",
    genre: "War Drama / Historical Fiction",
    runtime: "45 minutes",
    readingTime: "12 min read",
    releaseDate: "March 15, 2025",
    rating: "4.8",
    views: "2.3K",
    likes: "189",
    description:
      "An intimate portrayal of brotherhood forged in the crucible of war, exploring the unbreakable bonds between soldiers who become family.",
    synopsis:
      "Set during the Pacific Theater of World War II, Brothers in Arms follows three childhood friends from a small American town who enlist together and find themselves fighting side by side in some of the war's most brutal battles. As they face the horrors of combat, their friendship is tested and transformed, revealing the true meaning of loyalty, sacrifice, and what it means to be brothers.",
    themes: [
      "Brotherhood: The bonds that transcend blood relations",
      "Sacrifice: What we're willing to give for those we love",
      "Honor: Maintaining dignity in the face of horror",
      "Survival: The will to live and protect others",
      "Memory: How we carry our fallen with us",
    ],
    chapters: [
      {
        id: 1,
        title: "Hometown Heroes",
        readingTime: "3 min",
        content: [
          "The summer of 1941 was the last time everything felt normal in Millbrook. Three boys sat on the wooden dock that jutted into Miller's Pond, their fishing lines disappearing into the dark water below. Tommy Rodriguez, the dreamer with calloused hands from his father's auto shop. Jake Morrison, the athlete whose scholarship to State had just been confirmed. And Sam Chen, the quiet one who read more books than the rest of the town combined.",
          "They had been inseparable since childhood, bound by shared adventures, scraped knees, and the kind of loyalty that only comes from growing up together in a place where everyone knows your name. The war in Europe felt as distant as the moon, something that happened to other people in other places.",
          "But Pearl Harbor changed everything. Within a week of the attack, all three had walked into the recruitment office together, just as they had walked into their first day of school, their first baseball tryout, their first dance. Some bonds, they believed, were stronger than fear.",
        ],
      },
      {
        id: 2,
        title: "Baptism by Fire",
        readingTime: "4 min",
        content: [
          "The transport ship cut through the Pacific swells like a knife through dark silk. Below deck, hundreds of young men tried to sleep in hammocks that swayed with each wave, but sleep was elusive when you knew you were sailing toward hell.",
          "Tommy had stopped writing letters home. What could he say? That he was scared? That the boy who used to fix engines with his father now spent his days learning how to kill? Jake had grown quiet, his usual bravado replaced by a thousand-yard stare that had become common among the men. Sam read constantly, but now it was field manuals and tactical guides instead of the poetry that once filled his footlocker.",
          "Their first battle came at dawn on a beach whose name they would never forget. The landing craft doors dropped, and suddenly they were running through surf turned red, their childhood friendship transformed into something harder, more essential. They were no longer three boys from Millbrook. They were brothers in arms.",
        ],
      },
      {
        id: 3,
        title: "The Price of Brotherhood",
        readingTime: "5 min",
        content: [
          "Six months later, they huddled in a foxhole on a nameless hill, sharing their last cigarette and watching the stars appear through the smoke of distant artillery. They had seen things that would have broken their younger selves, done things that would haunt their dreams for decades to come.",
          "But they had also discovered something profound about the nature of family. Blood might make you related, but choice makes you brothers. Every time one of them stumbled, the others were there to lift him up. Every time fear threatened to overwhelm them, they found strength in each other's presence.",
          "When the final battle came, when Jake fell protecting a wounded Sam, when Tommy carried them both to safety through a hail of gunfire, they understood that some bonds transcend even death. They had entered the war as friends and emerged as something deeper – brothers forged in fire, united by sacrifice, forever changed by the crucible of combat.",
          "Years later, when Sam would tell his grandchildren about the war, he would speak not of the battles won or lost, but of the friends who became family, and the family that became legend. Because in the end, that's what mattered most – not the medals or the glory, but the love that made ordinary men do extraordinary things.",
        ],
      },
    ],
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextChapter = () => {
    if (currentChapter < story.chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  const prevChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  const toggleReadingMode = () => {
    setIsReading(!isReading);
  };

  if (isReading) {
    return (
      <div className="brothers-story-reading">
        {/* Reading Progress Bar */}
        <div
          className="reading-progress-bar"
          style={{ width: `${readingProgress}%` }}
        />

        {/* Reading Header */}
        <div className="reading-header">
          <button onClick={toggleReadingMode} className="back-button">
            <ChevronLeft size={16} />
            Back to Overview
          </button>

          <div className="reading-header-center">
            <div className="chapter-info">
              Chapter {story.chapters[currentChapter].id} of{" "}
              {story.chapters.length}
            </div>
            <div className="chapter-title">
              {story.chapters[currentChapter].title}
            </div>
          </div>

          <div className="progress-text">
            {Math.round(readingProgress)}% complete
          </div>
        </div>

        {/* Reading Content */}
        <div className="reading-content">
          <div className="reading-chapter-header">
            <h1 className="reading-chapter-title">
              {story.chapters[currentChapter].title}
            </h1>
            <div className="reading-chapter-meta">
              <span>Chapter {story.chapters[currentChapter].id}</span>
              <span>•</span>
              <span>{story.chapters[currentChapter].readingTime}</span>
            </div>
          </div>

          <div className="reading-text">
            {story.chapters[currentChapter].content.map((paragraph, index) => (
              <p key={index} className="reading-paragraph">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Chapter Navigation */}
          <div className="chapter-navigation">
            <button
              onClick={prevChapter}
              disabled={currentChapter === 0}
              className="nav-button"
            >
              <ChevronLeft size={16} />
              Previous Chapter
            </button>

            <div className="chapter-dots">
              {story.chapters.map((_, index) => (
                <span
                  key={index}
                  onClick={() => setCurrentChapter(index)}
                  className={`chapter-dot ${
                    index === currentChapter ? "active" : ""
                  }`}
                >
                  <span style={{ display: "none" }}>{index}</span>
                </span>
              ))}
            </div>

            <button
              onClick={nextChapter}
              disabled={currentChapter === story.chapters.length - 1}
              className="nav-button"
            >
              Next Chapter
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="brothers-story">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-container">
          <div className="genre-tag">
            <Film size={16} />
            {story.genre}
          </div>

          <h1 className="hero-title">{story.title}</h1>

          <p className="hero-subtitle">{story.subtitle}</p>

          <div className="hero-meta">
            <div className="meta-item">
              <User size={16} />
              {story.author}
            </div>
            <div className="meta-item">
              <Clock size={16} />
              {story.readingTime}
            </div>
            <div className="meta-item">
              <Calendar size={16} />
              {story.releaseDate}
            </div>
          </div>

          <div className="hero-stats">
            <div className="stat-item rating">⭐ {story.rating}</div>
            <div className="stat-item views">
              <Eye size={16} />
              {story.views} views
            </div>
            <div className="stat-item likes">
              <Heart size={16} />
              {story.likes} likes
            </div>
          </div>

          <p className="hero-description">{story.description}</p>

          <button onClick={toggleReadingMode} className="start-reading-btn">
            Start Reading
          </button>
        </div>
      </div>

      {/* Synopsis Section */}
      <div className="content-section">
        <div className="content-container">
          <div className="synopsis-card">
            <div className="synopsis-header">
              <Building size={24} />
              <h2 className="synopsis-title">Synopsis</h2>
            </div>
            <p className="synopsis-text">{story.synopsis}</p>
          </div>
        </div>
      </div>

      {/* Themes Section */}
      <div className="themes-section">
        <div className="content-container">
          <h2 className="themes-title">Key Themes</h2>
          <div className="themes-grid">
            {story.themes.map((theme, index) => (
              <div key={index} className="theme-card">
                <h3 className="theme-card-title">{theme.split(":")[0]}</h3>
                <p className="theme-card-text">{theme.split(":")[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chapters Preview */}
      <div className="content-section">
        <div className="content-container">
          <h2 className="chapters-title">
            <BookOpen size={32} />
            Story Chapters
          </h2>

          <div className="chapters-list">
            {story.chapters.map((chapter, index) => (
              <div key={chapter.id} className="chapter-card">
                <div className="chapter-header">
                  <div>
                    <h3 className="chapter-title-text">
                      Chapter {chapter.id}: {chapter.title}
                    </h3>
                    <div className="chapter-reading-time">
                      <Clock size={14} />
                      {chapter.readingTime}
                    </div>
                  </div>
                </div>
                <p className="chapter-preview">
                  {chapter.content[0].substring(0, 200)}...
                </p>
              </div>
            ))}
          </div>

          <div className="begin-journey-section">
            <button onClick={toggleReadingMode} className="begin-journey-btn">
              Begin Your Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
