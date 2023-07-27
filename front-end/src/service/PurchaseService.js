import axios from "../commen/axios";

class PurchaseService {

    postOrder = async (data) => {
        const promise = new Promise((resolve, reject) => {
            axios.post('order/save', data)  
                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        });

        return await promise;
    }


    fetchItems = async (id) => {
        const promise = new Promise((resolve, reject) => {
            axios.get(`item/${id}`)
                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        })
        return await promise;
    }
}

const purchaseService = new PurchaseService();
export default purchaseService;