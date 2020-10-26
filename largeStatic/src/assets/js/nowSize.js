let notsize = (val, initWidth = 1920)=> {
        let nowClientWidth = document.documentElement.clientWidth;
        return val * (nowClientWidth / initWidth);
    }
export { notsize };