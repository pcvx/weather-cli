const getArgs = (args) => {
    const res = {};
    const [exec, file, ...rest] = args;

    rest.forEach((val, idx, arr) => {
        if (val.charAt(0) === '-') {
            if (idx === arr.length - 1) {
                res[val.substring(1)] = true;
                return;
            }

            if (arr[idx + 1].charAt(0) !== '-') {
                res[val.substring(1)] = arr[idx + 1];
                return;
            }

            res[val.substring(1)] = true;
        }
    });

    return res;
};

export { getArgs }
