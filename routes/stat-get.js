const { vk, mongo } = server

const route = {}
route.method = 'POST'
route.url = '/stat-get'

route.handler = async (req, res) => {
    try {
        const { body: {name, time} } = req
        const findObj = {"name":name}
        const formatedTime = new Date(time)
        formatedTime.setHours(0,0,0)
    
        if (time != undefined) {
            findObj["date"] = {$gt: formatedTime, $lt: new Date(formatedTime.getTime()+ 86400000) }
        }
    
        const data = await mongo.find(findObj).sort({"id":-1}).limit(100).toArray()
    
        
        res.status(200).send(data)
    } catch (err) {
        console.log(err)
        res.status(400).send('smt gone wrong')

    }
  
}

module.exports = route