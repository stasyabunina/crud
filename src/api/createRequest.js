const createRequest = async (url, method, data = {}) => {
    const requestURL = url + (method === "DELETE" ? `/notes/${data.id}` : "/notes");
    const isGetMothod = method === "GET";

    try {
        let request;

        if (isGetMothod) {
            request = await fetch(requestURL, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
            });

            return await request.json();
        } else {
            request = await fetch(requestURL, {
                body: JSON.stringify(data),
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
            });

           return request.status;
        }
    } catch (error) {
        throw new Error(error);
    }
};

export default createRequest;