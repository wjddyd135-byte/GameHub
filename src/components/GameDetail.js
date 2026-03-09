import { useParams, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

function GameDetail({ games }) {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const game = games.find((g) => String(g.id) === String(gameId));
  if (!game) return <div style={{ padding: 24 }}>게임을 찾을 수 없어요.</div>;

  const addToWishlist = () => {
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

  const reviews = [
    { id: 1, user: "유저A", rating: 5, text: "스토리랑 분위기 미쳤다. 추천!" },
    { id: 2, user: "유저B", rating: 4, text: "전투가 손맛 있고 중독성 있음." },
    { id: 3, user: "유저C", rating: 4, text: "처음엔 어렵지만 익숙해지면 재밌음." },
    { id: 4, user: "유저D", rating: 3, text: "시간 많으면 힐링 게임으로 딱임." },
    { id: 5, user: "유저E", rating: 5, text: "시간 가는 줄 모르고 게임 했음." },
  ];

  return (
    <div className="container gh-detail" style={{ marginTop: 30, marginBottom: 60 }}>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="gh-detail-thumb">
            <img src={game.img} alt={game.title} className="gh-detail-img" />
          </div>
        </div>

        <div className="col-md-6 text-start">
          <div className="gh-detail-badges">
            <Badge bg="secondary">{game.genre}</Badge>
            <Badge bg="dark">{game.platform}</Badge>
            <Badge bg="success">⭐ {game.rating}</Badge>
          </div>

          <h2 className="gh-detail-title">{game.title}</h2>

          <div className={`gh-detail-price ${game.price === 0 ? "is-free" : ""}`}>
            {game.price === 0 ? "무료" : `${game.price.toLocaleString()}원`}
          </div>

          <p className="gh-detail-desc">{game.desc}</p>

          <div className="gh-detail-actions">
            <Button className="gh-btn-danger" onClick={addToWishlist}>
              ♥ 찜하기
            </Button>

            <Button className="gh-btn-ghost" onClick={() => navigate(-1)}>
              뒤로가기
            </Button>

            <Button className="gh-btn-sky" onClick={() => navigate("/board")}>
              후기게시판 보기
            </Button>
          </div>
        </div>
      </div>

      {/* 후기 섹션 */}
      <div className="review-section">
        <div className="review-head">
          <h4 className="review-title">유저 후기</h4>
          <Button className="gh-btn-sky" onClick={() => navigate("/board")}>
            후기게시판으로 이동 →
          </Button>
        </div>

        <div className="review-table">
          <div className="review-row review-row-head">
            <div>작성자</div>
            <div>내용</div>
            <div>평점</div>
            <div className="text-end">상태</div>
          </div>

          {reviews.map((r) => (
            <div className="review-row" key={r.id}>
              <div className="review-user">{r.user}</div>

              <div className="review-text" title={r.text}>
                {r.text}
              </div>

              <div className="review-rate">⭐ {r.rating}</div>

              <div className="text-end">
                <span className="review-pill">공개</span>
              </div>
            </div>
          ))}

          <div className="review-foot">
            <span className="review-note">* 현재는 예시 데이터로 표시됩니다.</span>
            <Button size="sm" className="gh-btn-primary" onClick={() => navigate("/board")}>
              글 작성/보기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetail;