import React from "react";

export default function WebHomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-bg text-text p-8">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-6xl font-bold mb-6 tracking-tight">ARTSY</h1>
        <p className="text-xl text-text/60 mb-8">The premium aesthetic platform for creators.</p>
        <div className="p-12 border border-white/5 bg-card rounded-2xl shadow-xl">
          <p>Please visit from a mobile device to experience the iOS design system.</p>
        </div>
      </div>
    </div>
  );
}
