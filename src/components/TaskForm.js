// src/components/TaskForm.js
import React, { useState } from "react";
import { parseTaskWithAI } from "../services/aiService";

function TaskForm({ onAddTask, existingTask }) {
  const [title, setTitle] = useState(existingTask?.title || "");
  const [deadline, setDeadline] = useState(existingTask?.deadline || "");
  const [tags, setTags] = useState(existingTask?.tags?.join(", ") || "");
  const [naturalText, setNaturalText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false); // New: Track mic state

  // Initialize Web Speech API
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask({
      title,
      deadline,
      tags: tags.split(",").map((tag) => tag.trim()),
    });
    setTitle("");
    setDeadline("");
    setTags("");
    setNaturalText("");
  };

  const handleAIParse = async () => {
    if (!naturalText) return;
    setLoading(true);
    try {
      const {
        title: aiTitle,
        deadline: aiDeadline,
        tags: aiTags,
      } = await parseTaskWithAI(naturalText);
      setTitle(aiTitle || "");
      setDeadline(aiDeadline || "");
      setTags(aiTags?.join(", ") || "");
    } catch (error) {
      console.error("AI parse failed:", error);
      alert("Parsing failed - check input");
    }
    setLoading(false);
  };

  const handleSpeech = () => {
    if (!recognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    setIsListening(true);
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setNaturalText(transcript);
      handleAIParse(); // Auto-parse after transcription
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert("Speech recognition failed: " + event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mb-6 bg-white p-4 rounded-lg shadow-md"
    >
      <div className="flex flex-col sm:flex-row gap-2">
        <textarea
          value={naturalText}
          onChange={(e) => setNaturalText(e.target.value)}
          placeholder="Enter or speak task (e.g., 'Buy milk tomorrow')"
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
          rows={2}
        />
        <button
          type="button"
          onClick={handleSpeech}
          disabled={isListening || !SpeechRecognition}
          className={`p-2 rounded transition-colors ${
            isListening
              ? "bg-red-500 text-white"
              : "bg-indigo-500 text-white hover:bg-indigo-600"
          } ${!SpeechRecognition ? "opacity-50 cursor-not-allowed" : ""}`}
          title={SpeechRecognition ? "Speak task" : "Speech not supported"}
        >
          {isListening ? "Listening..." : "🎤"}
        </button>
      </div>
      <button
        type="button"
        onClick={handleAIParse}
        disabled={loading || isListening}
        className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600 transition-colors"
      >
        {loading ? "Parsing..." : "Parse with AI"}
      </button>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        required
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma-separated)"
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
      >
        {existingTask ? "Update" : "Add"} Task
      </button>
    </form>
  );
}

export default TaskForm;
