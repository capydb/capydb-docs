"use client";
import sendFeedback from "../utils/sendFeedback";
import toastOops from "../utils/toastOops";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Feedback() {
  // Local state to track the input values
  const [comment, setComment] = useState("");

  // Function to handle the form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault(); // Prevent the default form submission behavior
      sendFeedback({
        message: comment,
      });
    } catch {
      toastOops();
    }
    setComment("");
    toast.info("Thank you for your feedback!");
  };

  return (
    <div className="flex w-full m-5 lg:w-3/5 items-start">
      <div className="min-w-0 flex-1">
        <form
          onSubmit={handleSubmit}
          className="relative flex flex-col gap-y-4"
        >
          <div className="overflow-hidden rounded-xl shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-blue-600">
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
              id="comment"
              name="comment"
              rows={5}
              placeholder="Add your comment..."
              className="block w-full resize-none border-0 bg-transparent p-3 focus:ring-0 sm:leading-6"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          {comment ? (
            <div className="flex justify-between py-2 pl-3 pr-2">
              <div className="flex w-full justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Submit
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </form>
      </div>
    </div>
  );
}
