import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";

function FilterMenu() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="nav-btn" onClick={handleShow}>
        🎮 필터
      </button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>게임 탐색 필터</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <img
            src={process.env.PUBLIC_URL + "/img/slider4.jpg"}
            alt="GameHub"
            style={{
              width: "100%",
              borderRadius: "8px",
              marginBottom: "20px",
              objectFit: "cover"
            }}
          />
          <h5 style={{ marginBottom: 12 }}>게임 탐색 가이드</h5>

          <p style={{ marginBottom: 12, lineHeight: 1.7 }}>
            GameHub에서는 다양한 게임을 쉽고 빠르게 찾을 수 있도록
            검색과 정렬 기능을 제공합니다. 상단의 검색창에 게임 이름을
            입력하면 원하는 게임을 빠르게 찾을 수 있습니다.
          </p>

          <p style={{ marginBottom: 12, lineHeight: 1.7 }}>
            또한 가격순, 평점순, 이름순 정렬 기능을 통해 다양한 기준으로
            게임 목록을 정렬하여 확인할 수 있습니다. 이를 통해 사용자는
            자신에게 맞는 게임을 더욱 편리하게 탐색할 수 있습니다.
          </p>

          <p style={{ marginBottom: 12, lineHeight: 1.7 }}>
            추천 게임 BEST 섹션에서는 장르와 평점을 기반으로 다양한 게임을
            확인할 수 있으며, 트렌딩 TOP에서는 현재 많은 사람들이 관심을
            가지고 있는 인기 게임을 확인할 수 있습니다.
          </p>

          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>
            마음에 드는 게임은 카드의 ♥ 찜하기 버튼을 통해 저장할 수 있으며
            찜목록 페이지에서 언제든지 다시 확인할 수 있습니다.
          </p>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default FilterMenu;