function RideCard(props) {
  return (
    <div className="ride-card">
      <h2>{props.name}</h2>
      <p>
        {props.from} → {props.to}
      </p>
      <p>
        ₹{props.fare} · ⭐ {props.rating} · {props.vehicle}
      </p>
    </div>
  );
}

export default RideCard;
