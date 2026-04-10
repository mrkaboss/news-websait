import { useState } from "react";
// 1. Shaho .js niba Vite ikomeje kwanga
// 2. Genzura niba dosiye iri muri src/services/newsService.js
import { createNews } from "../services/newsService.js"; 

export default function CreateNews() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    try {
      const response = await createNews(formData);
      if (response) {
        alert("Inkuru yashyizweho neza!");
        // Urashobora no gusukura form hano
      }
    } catch (error) {
      console.error("Error posting news:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <input
        type="text"
        placeholder="Title"
        className="border p-2 w-full"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        className="border p-2 w-full"
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="file"
        className="border p-2 w-full"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">
        Post News
      </button>
    </form>
  );
}