const url = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCZVb-qCBzSDxB7Mbh2E3_eQ&part=snippet%2Cid&order=date&maxResults=5';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '95c3263cb7msh5b780ce77b9acf2p127c9ajsncee292399aeb',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};

const content = document.getElementById('content');

const fetchData = async () => {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
}

(async () => {
    try{
        const videos = await fetchData()
        const length = Number(videos.pageInfo.totalResults);
        let view = `
            ${videos.items.map(video => `
                <div class="group relative">
                    <div
                        class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                        <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                    </div>
                    <div class="mt-4 flex justify-between">
                        <h3 class="text-sm text-gray-700">
                            <span aria-hidden="true" class="absolute inset-0"></span>
                            ${video.snippet.title}
                        </h3>
                    </div>
                </div>
            `).slice(0, length -1). join('')}
        `;
        content.innerHTML = view;
    } catch (error) {
        console.error(error);
    }
})()
