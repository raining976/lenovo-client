const handlerGoodConfig = (id, config) => {
    const allConfigs = config[0].value.map(item => {
        return {
            name: Object.keys(item)[0],
            choices: new Set()
        }
    })
    config.forEach(item => addSet(allConfigs, item.value))
    const cur = findCurConfig(id, config)
    const curValue = cur.value.map(item => {
        return Object.values(item)[0]
    })
    return { cur, allConfigs, curValue}
}
const addSet = (configs, arr) => {
    for (let i = 0; i < configs.length; i++) {
        configs[i].choices.add(Object.values(arr[i])[0])
    }
}

const findCurConfig = (id, arr) => {
    return arr.find(item => item.productCode == id)
}

export default handlerGoodConfig