import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { useEffect } from "react"
import { useState } from "react"
import { toast } from "react-toastify"
import { db } from "../firebase/config"



const useFetchCollection = (collectionName) => {

    const [isLoadingProduct, setIsLoadingProduct] = useState(false)
    const [data, setData] = useState([])




    const getCollection = async () => {
        setIsLoadingProduct(true)
        try {

            const docRef = collection(db, collectionName);
            const q = query(docRef, orderBy("createdAt", "desc"));
            const querySnap = await getDocs(q);
            let allData = [];
            querySnap.forEach((doc) => {
                return allData.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            setData(allData);
            setIsLoadingProduct(false)
           

        } catch (error) {
            setIsLoadingProduct(false)
            toast.error(error.message)

        }
    }

    useEffect(() => {

        getCollection()
    }, [])


    return {data, isLoadingProduct}

}

export default useFetchCollection;