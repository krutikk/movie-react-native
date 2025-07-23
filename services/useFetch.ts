import {useEffect, useState} from "react";

const  useFetch = <T>(fetchFunction : ()=> Promise<T>, autoFatch=true) => {
    const [data,setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        try{
            setLoading(true);
            setError(null);

            const result = await fetchFunction();
            setData(result);
        }catch(err){
            setError(err instanceof Error ? err : new Error("An Error Occured"));
        } finally {
            setLoading(false);
        }
    }
    const reset = () => {
        setLoading(false);
        setError(null);
        setData(null);
    }

    useEffect(() => {
        if(autoFatch){
            fetchData();
        }
    },[])

    return {data,loading,error, reset, fetchData};
}
export default useFetch;