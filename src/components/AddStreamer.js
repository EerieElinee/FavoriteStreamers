import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
const AddStreamer = () => {

    const navigate = useNavigate();
    const [ name, setName ] = useState("");
    const [ type, setType ] = useState("");
    const [ affiliate, setAffiliate ] = useState("");
    const [ games, setGames ] = useState("");
    const [ errors, setErrors ] = useState([]);

    const submitHandler = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/streamers", {
                name,
                type,
                affiliate,
                games,
            })
        .then((res) => {
            console.log(res.data);
            navigate("/");
        })
        .catch((err) => {
            console.log(err.response.data.errors);
            setErrors(err.response.data.errors);
        });
    };

    return (

        <div>
        <div className="navbar">
            <h1 class="streamershome">Favorite Streamers!</h1>
            <Link to="/">back to home</Link>
        </div>
        <h2 class="streamershome">Looking for a new streamer to watch?</h2>
        <form className="form" onSubmit={ submitHandler }>
            <div className="spacing">
                <label className="form-label">Streamer Name:</label>
                <input
                    className="spacing1"
                    onChange={ (e) => setName(e.target.value) }
                    value={ name }
                    name={ name }
                    type="text"
                />
                { errors.name ? <p className="error">{ errors.name.message }</p> : null }
                </div>
                <div className="spacing">
                <label className="form-label">18+ Community?:</label>
                <input
                    className="spacing2"
                    onChange={ (e) => setType(e.target.value) }
                    id="yes"
                    value="yes"
                    name="type"
                    type="radio"
                /> Yes
                <input
                    className="spacing2"
                    onChange={ (e) => setType(e.target.value) }
                    id="no"
                    value="no"
                    name="type"
                    type="radio"
                /> No
                { errors.type ? <p className="error">{ errors.type.message }</p> : null }
                </div>

                <div className="spacing">
                    <label for="affiliate" className="form-label">Affliate or Non-Affiliate?</label>
                    <select id="affiliate" className="spacing3" 
                    onChange={ (e) => setAffiliate(e.target.value) }>
                    <option value="Affiliate">Affiliate</option>
                    <option value="Non-Affiliate">Non-Affiliate</option>
                    <option value="Unknown">Unknown</option>
                    </select>
                </div>
            <div className="spacing">
                <label className="form-label">Types of streams<br></br>and games played?:</label>
                <input
                    className="games"
                    onChange={ (e) => setGames(e.target.value) }
                    value={ games }
                    name={ games }
                    type="text"
                />
                { errors.games ? <p className="error">{ errors.games.message }</p> : null }
            </div>
                <button className="submit"> Add Streamer</button>
        </form>
    </div>
    );

};



export default AddStreamer;