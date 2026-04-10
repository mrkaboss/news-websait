import React, { useState } from "react";
import { sendMessage } from "../services/messageService";

const ContactAuthor = ({ authorId, token }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!content) return alert("Andika ubutumwa mbere yo kohereza!");

    try {
      setLoading(true);
      await sendMessage({ receiverId: authorId, content }, token);
      alert("Ubutumwa bwoherejwe neza! ✅"); 
      setContent("");
    } catch (error) {
      alert("Hari ikibazo cyabaye, ongera ugerageze.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 p-6 bg-gray-100 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Andikira uyu munyamakuru</h3>
      <form onSubmit={handleSend}>
        <textarea
          className="w-full p-3 border rounded-md"
          rows="4"
          placeholder="Andika ubutumwa bwawe hano..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button
          type="submit"
          disabled={loading}
          className="mt-3 bg-blue-600 text-white px-6 py-2 rounded-md disabled:bg-gray-400"
        >
          {loading ? "Irimo kohereza..." : "Ohereza Ubutumwa"}
        </button>
      </form>
    </div>
  );
};

export default ContactAuthor;