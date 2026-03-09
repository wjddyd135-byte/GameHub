import { useNavigate } from "react-router-dom";

function GameCard({ game, idx = 0 }) {
  const navigate = useNavigate();

  const addToWishlist = (e) => {
    e.stopPropagation();

    const saved = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const exists = saved.some((x) => x.id === game.id);

    if (exists) {
      alert("이미 찜목록에 있어요!");
      return;
    }

    saved.push(game);
    localStorage.setItem("wishlist", JSON.stringify(saved));
    alert("찜목록에 추가됐어요!");
  };

  const rateClass =
    (game.rating ?? 0) >= 4.7 ? "top" : (game.rating ?? 0) >= 4.3 ? "mid" : "low";

  return (
    <div
      className="col-md-4 mb-3"
      data-aos="fade-up"
      data-aos-duration="800"
      data-aos-delay={idx * 100}
    >
      <div
        className="card h-100 game-card"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/detail/${game.id}`)}
      >
        <div className="game-thumb-wrap">
          <img
            src={game.img}
            className="card-img-top game-thumb"
            alt={game.title}
          />

          <div className="card-overlay" aria-hidden="true">
            <button
              className="card-overlay-btn"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/detail/${game.id}`);
              }}
              type="button"
            >
              상세보기 →
            </button>
          </div>
        </div>

        <div className="card-body">
          <h5 className="card-title" style={{ fontWeight: 900 }}>
            {game.title}
          </h5>

          <div className="meta-row">
            <span className="chip">{game.genre}</span>
            <span className={`chip rate ${rateClass}`}>⭐ {game.rating}</span>
          </div>

          <div className="price-row">
            <span className={`price ${game.price === 0 ? "is-free" : ""}`}>
              {game.price === 0 ? "무료" : `₩ ${game.price.toLocaleString()}`}
            </span>
          </div>

          <button onClick={addToWishlist} className="wish-btn" type="button">
            ♥ 찜하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameCard;