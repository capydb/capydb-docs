"use client";
import { useLanguage } from "../context/LanguageContext";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = (newLanguage: any) => {
    setLanguage(newLanguage);
  };

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground w-100"
      style={{ outline: "currentcolor" }}
    >
      <button
        type="button"
        role="tab"
        aria-selected={language === "python"}
        onClick={() => toggleLanguage("python")}
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all 
          ${
            language === "python"
              ? "bg-gray-500 text-white"
              : ""
          } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
      >
        Python
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={language === "javascript"}
        onClick={() => toggleLanguage("javascript")}
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all 
          ${
            language === "javascript"
              ? "bg-gray-500 text-white"
              : ""
          } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
      >
        JavaScript
      </button>
    </div>
  );
}
