import { useState, useEffect, useCallback } from 'react'

const useAPI = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const fetchData = async (reqConfig, inputData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                'https://react-hooks-957e1-default-rtdb.europe-west1.firebasedatabase.app/tasks.json', {

                method: reqConfig.method ? reqConfig.method : 'GET',
                body: reqConfig.body ? JSON.stringify(reqConfig) : {},
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            );

            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();

            const loadedTasks = [];

            for (const taskKey in data) {
                loadedTasks.push({ id: taskKey, text: data[taskKey].text });
            }

            setData(loadedTasks);
        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    };

    useCallback(
        fetchData,
        [setData]
    )

    useEffect(() => {
        fetchData()
    }, []);

    return { data, isLoading, error }

}

export default useAPI