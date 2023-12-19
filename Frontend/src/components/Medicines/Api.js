import axios from "axios";

export const getCall = () => {
    axios.get(`http://localhost:8080/api/medicine`)
    .then(function (response) {
        console.log(response.data)
        return (response.data);
    });
}

export const getByNameCall = (e) => {
    axios.get(`http://localhost:8080/api/medicine/${e.currentTarget.value}`)
    .then(function (response) {
        console.log(response.data)
        return (response.data[0]);
    });
}

export const addCall = (name, mfg, exp) => {
    axios.post(`http://localhost:8080/api/medicine`, {
        name: name,
        mfg: mfg,
        exp: exp
    }).then(function (response) {
        console.log(response.data)
        getCall();
    });
}

export const updateCall = () => {

}

export const deleteCall = (e) => {
    axios.delete(`http://localhost:8080/api/medicine/${e.currentTarget.value}`)
    .then(function (response) {
        console.log(response.data)
        getCall();
    });
}