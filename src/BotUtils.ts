
export default () => {
    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const dateDiffInDays = (a: Date, b: Date) => {



        return Math.floor((a.getTime() - a.getTime()) / 1000 * 60 * 60 * 24);
    }
    const getRandomBoolean = () => getRandomInt(0,1) == 0;
    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    return {
        dateDiffInDays,
        getRandomInt,
        sleep,
        getRandomBoolean
    }
}