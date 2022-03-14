import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import './postdetail.css';
export default function PostDetailPage(){
    const detailID = useParams().id;
    const [detail, setDetail] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${detailID}`, { method:'GET',} )
        .then(function (response){
            return response.json();
        })
        .then(function (json){
            setDetail(json);
            setIsLoading(false);
        })
    }, []);
    if (isLoading) return (
        <div>Loading</div>
    );
    return (
        <div >
            <h3 style={{ margin: '3%', fontWeight: 'bold' }}>Detail</h3>
            <h4 className="view_Detail">ID : {detail.id}</h4>
            <h4 className="view_Detail">Title : {detail.title}</h4>
            <h4 className="view_Detail">Body : {detail.body}</h4>
        </div>
    )
}