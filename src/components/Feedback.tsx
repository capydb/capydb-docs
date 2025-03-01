"use client";
import { useState } from "react";
import { toast } from "react-toastify";

interface FeedbackData {
  message: string;
}

// Utility function to send feedback
const sendFeedback = async (data: FeedbackData) => {
  try {
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to send feedback');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error sending feedback:', error);
    throw error;
  }
};

// Utility function to show error toast
const toastOops = () => {
  toast.error("Oops! Something went wrong. Please try again later.");
};

export default function Feedback() {
  // Local state to track the input values
  const [comment, setComment] = useState("");

  // Function to handle the form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    try {
      await sendFeedback({
        message: comment,
      });
      setComment("");
      toast.success("Thank you for your feedback!");
    } catch {
      toastOops();
    }
  };

  return (
    <div className="feedback-container w-full my-6">
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Share Your Thoughts</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Your feedback helps us improve our documentation. Let us know what you think!
        </p>
        <form
          onSubmit={handleSubmit}
          className="relative flex flex-col gap-y-4"
        >
          <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus-within:ring-2 focus-within:ring-blue-500">
            <label htmlFor="comment" className="sr-only">
              Add your feedback
            </label>
            <textarea
              id="comment"
              name="comment"
              rows={4}
              placeholder="What did you think of this documentation? Any suggestions for improvement?"
              className="block w-full resize-none border-0 bg-white dark:bg-gray-900 p-3 text-gray-900 dark:text-gray-100 focus:ring-0 sm:leading-6"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!comment.trim()}
              className={`inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition-all duration-200 ${
                comment.trim() 
                  ? "bg-blue-600 text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" 
                  : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
              }`}
            >
              <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 