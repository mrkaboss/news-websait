import API from "./api";

export const getNews = () => API.get("/news");


export const createNews = (data) =>
  API.post("/news", data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
export const deleteNews = (id) => API.delete(`/news/${id}`);

export const getMyNews = () => API.get("/news/my-news");
