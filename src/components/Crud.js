import "../App.css";
import { useState, useEffect } from "react";
import CrudForm from "./CrudForm";
import CrudList from "./CrudList";
import { v4 as uuidv4 } from "uuid";
import createRequest from "../api/createRequest";

const url = 'http://localhost:7070';

function Crud() {
    const [notes, setNotes] = useState([]);
    const [form, setForm] = useState({
        id: uuidv4(),
        content: "",
    });
    const [error, setError] = useState(false);

    const fetchData = async () => {
        const response = await createRequest(url, "GET");
        setNotes([...response]);
    };

    const deleteData = async (data) => {
        return await createRequest(url, "DELETE", data);
    };

    const postData = async (data) => {
        return await createRequest(url, "POST", data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onValueChange = (e) => {
        setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (form.text === "") {
            setError(true);
            return;
        }

        try {
            const response = await postData(form);

            if (response === 204) {
                setForm({
                    id: uuidv4(),
                    content: "",
                });
                setError(false);
                fetchData();
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    const onDeleteItem = async (id) => {
        try {
            const response = await deleteData({ id: id });

            if (response === 204) {
                fetchData();
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    const onRefresh = () => {
        try {
            fetchData();
        } catch (error) {
            throw new Error(error);
        }
    }

    return (
        <div className="container">
            <div className="title-wrapper">
                <h1 className="title">Notes</h1>
                <button type="button" className="refresh" onClick={onRefresh}>↻</button>
            </div>
            {notes.length !== 0 ? <CrudList items={notes} onDeleteItem={onDeleteItem} /> : <></>}
            <CrudForm onSubmit={onSubmit} onValueChange={onValueChange} formData={form} />
            {error ? <span className="error">Поле не может быть пустым</span> : <></>}
        </div>
    );
}

export default Crud;
