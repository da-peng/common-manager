export const convertUnit = (strData: string) => {
    let i = parseFloat(strData)
    if (strData.length >= (10 ** 8).toString().length) {
        return {
            value: i / (10 ** 8),
            unit: '亿'
        }
    } else if (strData.length >= (10 ** 7).toString().length) {
        return {
            value: i / (10 ** 7),
            unit: '千万'
        }
    } else if (strData.length >= (10 ** 4).toString().length) {
        return {
            value: i / (10 ** 4),
            unit: '万'
        }
    } else if (strData.length >= (10 ** 3).toString().length) {
        return {
            value: i / (10 ** 3),
            unit: '千'
        }
    } else if (strData.length >= (10 ** 2).toString().length) {
        return {
            value: i / (10 ** 3),
            unit: '百'
        }
    }
}

/**
 * 获取单位
 * @param strData 
 */
export const getUnit = (strData: string) => {
    let i = parseFloat(strData)
    if (strData.length >= (10 ** 8).toString().length) {
        return '亿'
    } else if (strData.length >= (10 ** 7).toString().length) {
        return '千万'
    } else if (strData.length >= (10 ** 4).toString().length) {
        return '万'
    } else if (strData.length >= (10 ** 3).toString().length) {
        return '千'
    } else if (strData.length >= (10 ** 2).toString().length) {
        return '百'
    }
}