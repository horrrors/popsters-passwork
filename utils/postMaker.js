const groups = require('../groups.json')

const postDownloader = async (vk, domain ,all) => {
    const posts = []
    const {response: {count, items}} = await vk.method(
        'wall.get', {
        "domain": domain,
        "count": 100,
        "filter": 'all'
    })        
    posts.push(...items)
    if (!all) return posts
    console.log(`       founded ${count} posts`)

    console.log(`           successfully downloaded: ${posts.length}`)

    let offset = 100;
    while(count - offset > 0) {
    const { response }= await vk.method(
        'wall.get', {
        "domain": 'moyakofta',
        "count": 100,
        "filter": 'all',
        "offset": offset
    }) 
    posts.push(...response.items)
    offset += 100  
    console.log(`           successfully downloaded: ${posts.length}`)  
    }
    return posts
};

const postToDocument = (name, posts) => {
    const result = []
    const insertedDate = Date.now()

    for (const post of posts) {
        result.push({
            name,
            insertedDate,
            id: post.id,
            comments: post.comments.count,
            likes: post.likes.count,
            reposts: post.reposts.count,
            date: new Date(post.date*1000),
            views: post.views ? post.views.count : null,

        })
    }
    return result
}

const postUpdate = async (db, vk) => {
    for (const key in groups) {
        posts = await postDownloader(vk, groups[key].domain)
        result = postToDocument(groups[key].name, posts)
        for (const post of result) {
             db.updateOne({
                "name": groups[key].name, 
                "id": post.id}, 
                {$set: post}, 
                {upsert:true})

        }
    }

}

module.exports = {
    postDownloader,
    postToDocument,
    postUpdate
}