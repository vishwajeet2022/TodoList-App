import React, { useState, useEffect } from "react";
import todoIcon from '../Images/todoIcon.png';



// get the localStorage data back
const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");

    if (lists) {
        return JSON.parse(lists);
    } else {
        return [];
    }
};

const Todo = () => {
    const [data, setData] = useState('');
    const [item, setItem] = useState(getLocalData());
    const [toggleBtn, settoggleBtn] = useState(true);
    const [edit, setEdit] = useState(null);

    // add the items fucnction
    const addItem = () => {
        if (!data) { alert('please fill the data'); }
        else if (data && !toggleBtn) {
            setItem(
                item.map((element) => {
                    if (element.id === edit) {
                        return { ...element, name: data }
                    }
                    return element;
                })

            )
            settoggleBtn(true);
            setData('');
            setEdit(null);
        } else {
            const alldata = { id: new Date().getTime().toString(), name: data }
            setItem([...item, alldata]);
            setData('');
        }
    }

    //edit the items
    const editItem = (id) => {
        let newEditItem = item.find((element) => {
            return element.id === id;
        });
        settoggleBtn(false);
        setData(newEditItem.name);
        setEdit(id);
    }

    //delete the items
    const deleteItem = (index) => {
        //console.log(index);
        const UpdatedData = item.filter((element) => {
            return index !== element.id;
        });
        setItem(UpdatedData);

    }

    //remove the items
    const removeAll = () => {
        setItem([]);
    }

    // adding localStorage
    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(item));
    }, [item]);

    return (
        <>
            <div className="main_div">
                <div className="child_div">
                    <figure>
                        <img src={todoIcon} alt='AppIcon' />
                        <figcaption> Add your task here! </figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text"
                            placeholder="Add Task..."
                            value={data}
                            onChange={(e) => {
                                setData(e.target.value);
                            }} />
                        {
                            toggleBtn ? <i className="fa fa-plus fa-beat add-btn" title="Add Items" onClick={addItem}></i> : <i className="fa fa-edit fa-beat add-btn" title="Update Items" onClick={addItem}></i>
                        }
                    </div>
                    <div className="showItem">
                        {
                            item.map((element) => {
                                return (
                                    <div className="eachItem" key={element.id}>
                                        <h3>{element.name}</h3>
                                        <div className="todo-btn">
                                            <i className="fa fa-edit add-btn" title="Edit" onClick={() => editItem(element.id)}></i>
                                            <i className="fa fa-trash-alt add-btn" title="Delete" onClick={() => deleteItem(element.id)}></i>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="Clear">
                        <button className="btn effect04" data-sm-link-text='Remove all' onClick={removeAll}> <span> CHECK LIST </span></button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Todo; 