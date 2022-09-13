import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Update = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [ name, setName ] = useState("");
    const [ type, setType ] = useState("");
    const [ affiliate, setAffiliate ] = useState("");
    const [ games, setGames ] = useState("");
    const [ errors, setErrors ] = useState([]);
    const [ loaded, setLoaded ] = useState(false);

    useEffect(() => {
        axios
        .get(`http://localhost:8000/api/streamers/${ id }`)
        .then((res) => {
            console.log(res.data);
            setName(res.data.name);
            setType(res.data.type);
            setAffiliate(res.data.affiliate);
            setGames(res.data.games);
            setLoaded(true);
        })
        .catch((err) => console.log(err));
    }, [id]);

    const editHandler = (e) => {
        e.preventDefault();
        axios
        .put(`http://localhost:8000/api/streamers/${ id }`, {
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
            <h1 class="streamershome">A Favorite Streamer of ours!</h1>
            <Link to="/">back to home</Link>
        </div>
        {
            loaded && <>
            <h2 class="streamershome">Edit { name }</h2>
            <form className="form" onSubmit={ editHandler }>
                <div className="spacing">
                    <label className="form-label">Streamers Name:</label>
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
                    onChange={ (e) => setAffiliate(e.target.value) }
                    <option value="Affiliate">Affiliate</option>
                    <option value="Non-Affiliate">Non-Affiliate</option>
                    <option value="Unknown">Unknown</option>
                    </select>
                </div>
                <div className="spacing">
                    <label className="form-label">Type of streams <br></br>and/or games played:</label>
                    <input
                        className="games"
                        onChange={ (e) => setGames(e.target.value) }
                        value={ games }
                        name={ games }
                        type="text"
                    />
                    { errors.games ? <p className="error">{ errors.games.message }</p> : null }
                </div>
                    <button className="submit"> Update Streamer Info</button>
            </form>
        </>
        }
    </div>
    );

};

export default Update;