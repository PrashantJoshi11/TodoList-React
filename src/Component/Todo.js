import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import "./style.css";
import 'animate.css';

function getlocalData(){

    let storagedata= localStorage.getItem("lists");
    if(storagedata){
        return JSON.parse(localStorage.getItem("lists"));
    }
    else{
        return [];
    }
    
}


function Todo() {
    const [Input, setInput] = useState();
    const [InputList, setInputList] = useState(getlocalData());
    const [Toggle, setToggle] = useState(true);
    const [Edit, setEdit] = useState();

    // function randomcolor(){
    //     let chars="0123456789ABCDE";
    //     let hash="#";
    //     for(let i=0;i<6;i++){
    //         hash+=chars[Math.floor(Math.random()*16)];
    //     }
    //     console.log(hash);
    //     return hash;    
    // }
    
    useEffect(()=>{

        localStorage.setItem("lists", JSON.stringify(InputList))

    },[InputList]);

    function deletedata(id) {
        let afterDelete = InputList.filter((data) => {
            return data.id !== id
        })
        setInputList(afterDelete);

    }



    function InputData() {
        if (!Input) {
            alert("Please enter something");
        }
        else if (Input && !Toggle) {
            
            setInputList(
                InputList.map((elem)=>{
                    if(elem.id === Edit)
                    {
                        return {...elem, listData:Input}
                    }
                    return elem;
                })
               
        )
        setToggle(true);

        setInput("");
        }
        else {
            let newData = {
                id: new Date().getTime().toString(),
                listData: Input
            }
            setInputList((data) => {
                return [...data, newData]
            })
        }
        setInput("");

    }
    function editData(id,name) {
        // let afterEdit = InputList.find((data) => {
        //     return data.id === id
        // })

        setToggle(false);

        setInput(name);

        setEdit(id);
    }

    function dltAll(){

        setInputList([]);
    }

    console.log(InputList);
    return (

        <div className='container'>
            <h1>ToDo List</h1>
           
            <div>
                <input type='text' placeholder='Please Enter here ✍️ ' value={Input} onChange={(e) => { setInput(e.target.value) }} />
                {Toggle ? <FontAwesomeIcon icon={faSquarePlus} beat size="2xl" style={{ color: "#53f80d", marginLeft: "10px",backgroundColor:'black'
                 }} onClick={InputData} /> :
                    <FontAwesomeIcon icon={faPenToSquare} beat size="2xl" style={{ color: "#c66210", marginLeft: "10px" }} onClick={InputData} />
                }
            </div>
            <div className='listValue'>
                <div   style={{display:'flex',  justifyContent:'space-around'}}>

                {InputList.length > 0 ? <h3 >Task Count:{InputList.length} </h3> : " "}
               
                {InputList.length > 0 ? <button style={{height:'30px', marginTop:'14px', border:'1px solid red',borderRadius:'10px'}}onClick={dltAll}>Delete All</button>:""}
                </div>
                {
                    InputList.map((value) => {

                        return (
                            <>

                                <div key={value.id} className="inner" >
                                    {value.listData}
                                </div>
                                
                                <FontAwesomeIcon className="animate__animated  animate__slideInLeft"  icon={faTrash} size="2xl" style={{ color: "#f70814", }} onClick={() => { deletedata(value.id); }} />
                                <FontAwesomeIcon  className="animate__animated animate__slideInRight" icon={faPenToSquare} size="2xl" style={{ color: "#c66210", marginLeft: '20px' }} onClick={() => { editData(value.id,value.listData); }} />
                            </>
                        )

                    })
                }

            </div>
        </div>

    )
}

export default Todo;