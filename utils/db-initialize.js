const groups = require('../groups.json')
const {postDownloader, postToDocument} = require('./postMaker')



module.exports = async (db, vk) => {
    console.log(`Founded groups: ${groups.length}`)

    for (const key in groups) {
        console.log(`   group "${groups[key].name}" started (${+key+1}/${groups.length})`)
        const posts = await postDownloader(vk, groups[key].domain, true)
        
        console.log(`inserting posts of ${groups[key].name} to db`)

        const result = postToDocument(groups[key].name, posts)
        await db.insertMany(result)
        console.log('inserting is finished')


        }

        


    }


