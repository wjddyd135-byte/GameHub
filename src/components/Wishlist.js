import { useEffect, useState } from "react";
import { Button, Table, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Wishlist() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const loadWishlist = () => {
    const saved = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setList(saved);
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const removeItem = (id) => {
    const next = list.filter((x) => x.id !== id);
    setList(next);
    localStorage.setItem("wishlist", JSON.stringify(next));
  };

  const clearAll = () => {
    localStorage.removeItem("wishlist");
    setList([]);
  };

  return (
    <div className="container" style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
        <div>
          <h3>찜목록</h3>
          <p style={{ opacity: 0.8, marginBottom: 0 }}>
            내가 찜한 게임을 한 번에 모아볼 수 있어요.
          </p>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="outline-secondary" onClick={loadWishlist}>
            새로고침
          </Button>
          <Button variant="outline-danger" onClick={clearAll} disabled={list.length === 0}>
            전체삭제
          </Button>
        </div>
      </div>

      {list.length === 0 ? (
        <Alert variant="light" style={{ marginTop: 20 }}>
          아직 찜한 게임이 없어요. 홈에서 <b>♥ 찜하기</b>를 눌러보세요!
        </Alert>
      ) : (
        <Table striped bordered hover responsive style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th style={{ width: 90 }}>이미지</th>
              <th>게임</th>
              <th style={{ width: 110 }}>가격</th>
              <th style={{ width: 90 }}>평점</th>
              <th style={{ width: 120 }}>관리</th>
            </tr>
          </thead>

          <tbody>
            {list.map((g) => (
              <tr key={g.id}>
                <td>
                  <img
                    src={g.img}
                    alt={g.title}
                    style={{
                      width: 72,
                      height: 46,
                      objectFit: "cover",
                      borderRadius: 6,
                      display: "block",
                    }}
                  />
                </td>

                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/detail/${g.id}`)}
                >
                  <div style={{ fontWeight: 700 }}>{g.title}</div>
                  <div style={{ fontSize: 13, opacity: 0.75 }}>
                    {g.genre} · {g.platform}
                  </div>
                </td>

                <td>{g.price === 0 ? "무료" : `${Number(g.price).toLocaleString()}원`}</td>
                <td>{g.rating ?? "-"}</td>

                <td>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeItem(g.id)}
                  >
                    삭제
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Wishlist;