import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

const Home = () => {

    const navigate = useNavigate();
    const [ streamerList, setStreamerList ] =useState([]);

    useEffect(() => {
        axios
        .get("http://localhost:8000/api/Streamers")
        .then((res) => {
            console.log(res.data);
            setStreamerList(res.data);
        })
        .catch((err) => {
            console.log(err.res);
        });
    },[]);

    return (
    <div>
            <h1 class="streamershome">Favorite Twitch Streamers!</h1>
        <p class="streamershome1">Need to find new streamers to watch? You are in just the right place!</p>
                <Link to="/streamer/add" className="adding">Add your favorite streamer to the list!</Link>
        <div className="tablebox">
        <table className="table table-striped table-bordered">
            <thead>
            <tr>
                <th>Streamer Name</th>
                <th>18+ Community?</th>
                <th>Affiliate or Non-Affiliate?</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {streamerList.map((oneStreamer, index) => {

                return (
                <tr key={ index }>
                    <td>{ oneStreamer.name }</td>
                    <td>{ oneStreamer.type }</td>
                    <td>{ oneStreamer.affiliate }</td>

                    <td>
                    <div>
                        <button className="btn btn-link" onClick={ () => navigate(`/streamer/view/${ oneStreamer._id }`) }>
                        Details </button><span>|</span>
                        <button className="btn btn-link" onClick={ () => navigate(`/streamer/update/${ oneStreamer._id }`) }>
                        Update </button>

                    </div>
                    </td>
                </tr>
            );
            })}
        </tbody>
        </table>
        </div>
    </div>
    );

};

export default Home;