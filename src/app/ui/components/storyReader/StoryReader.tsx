import React from "react";
import { Story } from "./story.types";
import { FiChevronLeft } from "react-icons/fi";

type StoryReaderProps = {
  story: Story;
  onBack?: () => void; // optional back button
};

const StoryReader: React.FC<StoryReaderProps> = ({ story, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white rounded-2xl shadow-lg overflow-y-auto h-[90vh] scroll-smooth">
      {onBack && (
        <button
          onClick={onBack}
          className="text-gray-500 hover:text-black mb-4 flex items-center"
        >
          <FiChevronLeft className="mr-2" />
          Back to List
        </button>
      )}

      <h2 className="text-3xl font-bold text-gray-800 mb-2">{story.title}</h2>
      <p className="text-sm text-gray-600 mb-4">
        {story.genre} | {story.runtime} | Released: {story.releaseDate}
      </p>

      <p className="text-gray-700 mb-6">{story.description}</p>

      <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-2">Themes</h3>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        {story.themes.map((theme, i) => (
          <li key={i}>{theme}</li>
        ))}
      </ul>

      {story?.chapters?.map((chapter) => (
        <div key={chapter.id} className="mb-8">
          <h4 className="text-xl font-semibold text-blue-800 mb-2">
            {chapter.title}
          </h4>
          {chapter.content.map((para, i) => (
            <p key={i} className="mb-4 text-gray-800 leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default StoryReader;
