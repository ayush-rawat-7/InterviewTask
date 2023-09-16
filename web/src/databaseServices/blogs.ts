import { baseUrl } from "@/utils/constant";
import axios from "axios"
import { storage } from '../config/firebase'
import { uploadBytes, getDownloadURL, ref } from "firebase/storage"

export async function fetchBlogs() {
    const response = await axios.get(baseUrl + "/blog");
    return response.data
}
export async function fetchSingleBlog(id: any) {

    const response = await fetch(baseUrl + "/blog/" + id, { cache: "no-cache" });
    const data = await response.json();

    return data
    // return response.data.length > 0 ? response.data[0] : null
}

export async function uploadFile({ file }: any) {
    if (!file) return;
    let storageRef: any;
    storageRef = ref(
        storage,
        `blogs/${file.name}`
    );
    await uploadBytes(storageRef, file);
    let url = await getDownloadURL(storageRef);
    return url
}

export async function uploadBlog({ blog }: any) {
    const res = await axios.post(baseUrl + '/blog', blog)
    return res;
}


export async function updateBlog({ blog }: any) {
    const res = await axios.put(baseUrl + `/blog/${blog?.id}`, blog)
    return res;
}