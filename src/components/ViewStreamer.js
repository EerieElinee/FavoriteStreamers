import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from 'axios';

const ViewStreamer = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [ singleStreamer, setSingleStreamer ] = useState({});

    useEffect(() => {
        axios
        .get(`http://localhost:8000/api/streamers/${ id }`)
        .then((res) => {
            console.log(res.data);
            setSingleStreamer(res.data);
        })
        .catch((err) => console.log(err));
    }, [id]);

    const deleteHandler = () => {
        axios
        .delete(`http://localhost:8000/api/streamers/${ id }`)
        .then((res) => {
            console.log(res);
            console.log(res.data);
            navigate("/");
        })
        .catch((err) => console.log(err));
    };

    return (
    <div>
        <div className="navbar">
            <h1 class="streamershome">A Favorite Streamer!</h1>
            <Link to="/">back to home</Link>
        </div>
        <div className="form">
            <table className="spacing">
            <h2 class="streamershome">Streamer name:<span className="streamername"> { singleStreamer.name }</span></h2>
            <tr>
                <th className="details">18+ Community?:</th>
                <td>{ singleStreamer.type }</td>
            </tr>
            <tr>
                <th className="details">Affiliate or Non-Affiliate:</th>
                <td>{ singleStreamer.affiliate }</td>
            </tr>
            <tr>
                <th className="details">Type of streams<br></br> and/or games played:</th>
                <td className="details1">{ singleStreamer.games }</td>
            </tr>
        <div className="">
            <button className="delete" onClick={ deleteHandler }> Delete { singleStreamer.name }</button>
        </div>
            </table>
        </div>
        <div className="link1">
            <a href="https://www.twitch.tv/" target="_blank" rel="noreferrer" >Follow me on Twitch!</a>
        </div>
    </div>
    

    );

};

export default ViewStreamer;