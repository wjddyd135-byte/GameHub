import { useState } from "react";
import { Button, Modal, Container } from "react-bootstrap";

function PlatformModal() {
  const [show, setShow] = useState(false);

  return (
    <>
      <button className="nav-btn" onClick={() => setShow(true)}>
        📘 가이드
      </button>

      <Modal show={show} onHide={() => setShow(false)} fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>GameHub 소개</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container>

            <img
              src={process.env.PUBLIC_URL + "/img/slider.jpg"}
              alt="GameHub"
              style={{
                width: "100%",
                borderRadius: "12px",
                marginBottom: "30px",
                objectFit: "cover",
                aspectRatio: "16/6"
              }}
            />

            <h3 style={{ marginBottom: 20 }}>
              GameHub 게임 추천 플랫폼
            </h3>

            <p style={{ lineHeight: 1.8 }}>
              GameHub는 다양한 장르의 게임을 한눈에 확인하고 추천받을 수 있는
              게임 탐색 플랫폼입니다. 추천 게임 BEST와 트렌딩 TOP을 통해
              현재 인기 있는 게임을 빠르게 확인할 수 있습니다. 여러 유저들의 후기를 보고 
              마음에 들거나 해보고 싶은 게임이 있다면 재밌게 즐겨주세요.
            </p>

            <p style={{ lineHeight: 1.8 }}>
              각 게임 카드에서는 장르, 평점, 가격, 플랫폼 정보를 확인할 수 있으며
              관심 있는 게임은 찜 기능을 통해 저장하여 나중에 다시 확인할 수 있습니다.
            </p>

            <hr style={{ margin: "30px 0" }} />

            <h5>주요 기능</h5>

            <ul style={{ lineHeight: 2 }}>
              <li>추천 게임 BEST</li>
              <li>트렌딩 TOP 게임</li>
              <li>게임 검색 기능</li>
              <li>가격 / 평점 정렬</li>
              <li>찜 목록 저장</li>
            </ul>

          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PlatformModal;