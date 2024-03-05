import "../App.css";

function CrudItem({ item, onDeleteItem }) {
    return (
        <li className="list-item">
            <p>{item.content}</p>
            <button type="button" className="list-item-remove" onClick={() => onDeleteItem(item.id)}>x</button>
        </li>
    );
}

export default CrudItem;