import { useState, useCallback } from 'react'

const useAPI = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (reqConfig, applyData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                'https://react-hooks-957e1-default-rtdb.europe-west1.firebasedatabase.app/tasks.json', {
                ...reqConfig,
            }
            );

            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();

            applyData(data);

            console.log(data)
        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, []);

    return { isLoading, error, fetchData }

}

export default useAPI