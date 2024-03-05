import "../App.css";

function CrudForm({formData, onValueChange, onSubmit}) {
    return (
        <form className="form" onSubmit={onSubmit}>
            <label className="label">
                <span className="label-text">New note</span>
                <textarea name="content" className="input" value={formData.content} onChange={onValueChange}></textarea>
            </label>
            <button className="submit">→</button>
        </form>
    );
}

export default CrudForm;
