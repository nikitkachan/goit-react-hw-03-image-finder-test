import axios from "axios";

const BASE_URL = "https://pixabay.com/api/?";

export async function fetchImages(searchWord, page) {
  try {
    const options = new URLSearchParams({
      key: "39475001-11b88f007050dad872c9b621c",
      image_type: "photo",
      orientation: "horizontal",
      page,
      per_page: 12,
      q: searchWord,
    });
    const url = BASE_URL + options.toString();
    const response = await axios.get(url);
      return response.data;
  } catch (error) {
    console.error(error);
  }
}