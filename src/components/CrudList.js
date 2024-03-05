import "../App.css";
import CrudItem from "./CrudItem";

function CrudList({ items, onDeleteItem }) {
    return (
        <ul className="list">
            {items.map(item => (
                <CrudItem item={item} key={item.id} onDeleteItem={onDeleteItem} />
            ))}
        </ul>
    );
}

export default CrudList;
