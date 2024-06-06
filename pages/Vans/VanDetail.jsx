import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { getVans } from "../../api";

export default function VanDetail() {
  const [van, setVan] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { id } = useParams();
  const location = useLocation();

  // Fetches the van data and sets it in localized state
  React.useEffect(() => {
    async function loadVans() {
      setLoading(true);
      try {
        const data = await getVans(id);
        setVan(data);
      } catch (err) {
        console.log("There was an error!");
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadVans();
  }, [id]);

  // JSX to render the van on the page || display a loading message if not yet rendered
  const search = (location.state && location.state.search) || ""; //  optional chaining ->  const search = location.state?.search || ""
  const type = (location.state && location.state.type) || "all"; // const type = location.state?.type || "all"

  // UI for when awaiting api fetch request
  if (loading) {
    return <h1 aria-live="polite">Loading...</h1>;
  }
  // UI for if error is thrown
  if (error) {
    return <h1 aria-live="assertive">There was an error: {error.message}</h1>;
  }
  return (
    <div className="van-detail-container">
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr; <span>Back to {type} vans</span>
      </Link>

      {van && (
        <div className="van-detail">
          <img src={van.imageUrl} />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className="van-price">
            <span>${van.price}</span>/day
          </p>
          <p>{van.description}</p>
          <button className="link-button">Rent this van</button>
        </div>
      )}
    </div>
  );
}
