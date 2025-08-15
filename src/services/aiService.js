// src/services/aiService.js
export const parseTaskWithAI = (text) => {
  console.log("Using mock AI for task parsing");

  // Normalize input
  const cleanedText = text.trim().toLowerCase();
  if (!cleanedText) return { title: "", deadline: null, tags: [] };

  // Simple date keywords or YYYY-MM-DD pattern
  const datePatterns = {
    today: new Date().toISOString().split("T")[0],
    tomorrow: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    "next week": new Date(Date.now() + 7 * 86400000)
      .toISOString()
      .split("T")[0],
  };
  const dateRegex = /\b(\d{4}-\d{2}-\d{2})\b|\b(today|tomorrow|next week)\b/;
  let deadline = null;
  let titleParts = cleanedText;
  let tags = [];

  // Find date in text
  const dateMatch = cleanedText.match(dateRegex);
  if (dateMatch) {
    deadline = dateMatch[1] || datePatterns[dateMatch[2]];
    titleParts = cleanedText.replace(dateMatch[0], "").trim();
  }

  // Extract tags (after 'tags', 'with', or commas)
  const tagRegex = /(?:tags|with)\s+([\w\s,]+)$/i;
  const tagMatch = titleParts.match(tagRegex);
  if (tagMatch) {
    tags = tagMatch[1]
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    titleParts = titleParts.replace(tagMatch[0], "").trim();
  } else {
    // Fallback: last words after comma might be tags
    const parts = titleParts.split(",");
    if (parts.length > 1) {
      tags = parts
        .slice(-1)[0]
        .split(" ")
        .map((tag) => tag.trim())
        .filter((tag) => tag);
      titleParts = parts.slice(0, -1).join(",").trim();
    }
  }

  // Remaining text is the title
  const title = titleParts || "Untitled Task";

  return {
    title: title.charAt(0).toUpperCase() + title.slice(1), // Capitalize title
    deadline: deadline || null,
    tags: tags.length ? tags : ["default"],
  };
};
