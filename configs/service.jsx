const { default: axios } = require("axios")

const YOUTUBE_BASE_API = 'https://www.googleapis.com/youtube/v3'

const getVideos = async (query) => {
    const params = {
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: 1,
        key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
    }

    const resp = await axios.get(YOUTUBE_BASE_API + '/search', { params })

    return resp.data.items;
}

export default { getVideos }