import { useMutation, useQuery } from "convex/react";
import { set } from "date-fns";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useConvexQuery = (query, ...args) => {
    const result = useQuery(query);

    const [data, setData] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (result === undefined) {
            setIsLoading(true)
        } else {
            try {
                setData(result)
                setError(null)
            } catch (err) {
                setError(err)
                toast.error(err.message)
            } finally {
                setIsLoading(false)
            }
        }
    }, [result])

    return { data, isLoading, error }
}

export const useConvexMutation= (mutation) => {
    const mutationFn = useMutation(mutation);

    const [data, setData] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const mutate = async (...args) => {
        setIsLoading(true)
        setError(null)
        try {
            const result = await mutationFn(...args);
            setData(result)
            return result;
        } catch (err) {
            setError(err)
            toast.error(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return { mutate, data, isLoading, error }
}