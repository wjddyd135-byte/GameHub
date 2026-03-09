function TrendingCard({ item }) {
  return (
    <div className="col-md-4 mb-3">
      <div className="card h-100 trending-card">
        <img src={item.img} className="card-img-top game-thumb" alt={item.title} />
        <div className="card-body">
          <h5 className="card-title">🔥 {item.title}</h5>
          <div style={{ fontSize: 13, opacity: 0.8 }}>
            {item.genre} · ⭐ {item.rating}
          </div>
          <div style={{ marginTop: 8, fontWeight: 700 }}>
            {item.price === 0 ? "무료" : `${item.price.toLocaleString()}원`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrendingCard;