import React from "react";
import ReactMarkdown from "react-markdown";

export default function ChatAppInstructions() {
  const markdown = `
  # Chat Application Guide
  ## 1. Log In or Sign Up
  - create your own two accounts:
  
  ## 2. Add Friends
  - Search for a registered username and click **Add Friend**.
  - Both users need to add each other to enable chatting.
  
  ## 3. Start Chatting
  - explore chat features (they are already friends).
  - Refresh the page to see the updated friend list if needed.
  
  Happy chatting!
  `;
  

  return (
    <div className="p-4 bg-gray-50 border rounded-lg shadow-md">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}
