import axios from "../commen/axios";

class ItemService {

    postItem = async (data) => {
        const promise = new Promise((resolve, reject) => {
            axios.post('item/save', data)  
                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        });

        return await promise;
    }

    updateItem = async (id,data) => {
        const promise = new Promise((resolve, reject) => {
            axios.post(`item/update/${id}`, data) 
                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        });

        return await promise;
    }


    fetchItems = async () => {
        const promise = new Promise((resolve, reject) => {
            axios.get('item/all')
                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        })
        return await promise;
    }

    deleteItem = async (id) => {
        const promise = new Promise((resolve, reject) => {
           axios.put(`item/remove/${id}`)
           .then((res) => {
               return resolve(res)
           }) 
           .catch((err) => {
               return resolve(err)
           })
        })
        return await promise;
   };


}

const itemService = new ItemService();
export default itemService;