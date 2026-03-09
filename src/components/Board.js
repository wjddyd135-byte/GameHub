import React, { useMemo, useState } from "react";
import { Button, Table, Form, Alert, Card, Badge } from "react-bootstrap";

const FruitBoard = () => {
  // 게시물 목록
  const [boardList, setBoardList] = useState([
    {
      no: "1",
      title: "[Elden Ring] 난이도는 높지만 갓겜",
      description: "보스 패턴 보는 재미가 있어요. 초반은 힘들지만 손맛 최고!",
      viewCount: 1,
      likes: 2,
      rating: 5,
    },
    {
      no: "2",
      title: "[Hades] 짧게 하기 좋은 로그라이크",
      description: "플레이 템포 좋고 빌드 고민하는 재미가 큽니다.",
      viewCount: 2,
      likes: 1,
      rating: 4,
    },
    {
      no: "3",
      title: "[Stardew Valley] 힐링용으로 딱",
      description: "농장 키우면서 꾸준히 하기 좋아요. 스트레스 해소됨.",
      viewCount: 1,
      likes: 3,
      rating: 5,
    },
    {
      no: "4",
      title: "[Baldur's Gate 3] 스토리 몰입감 미쳤음",
      description: "선택지 많고 연출 좋아서 시간 순삭입니다.",
      viewCount: 1,
      likes: 4,
      rating: 5,
    },
  ]);

  // UI 상태
  const [listOk, setListOk] = useState(true);
  const [readOk, setReadOk] = useState(false);
  const [writeOk, setWriteOk] = useState(false);
  const [editOk, setEditOk] = useState(false);

  const [boardInfo, setBoardInfo] = useState(null);

  // 작성 폼
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(5);

  // 수정 폼
  const [editNo, setEditNo] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editRating, setEditRating] = useState(5);

  // 검색/필터
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("ALL");

  const [errorMessage, setErrorMessage] = useState("");

  // 최신 글 위로 정렬 (no 숫자 기준)
  const sortedBoards = useMemo(() => {
    return [...boardList].sort((a, b) => Number(b.no) - Number(a.no));
  }, [boardList]);

  // 제목에서 [게임명] 추출
  const extractGameTag = (t) => {
    const m = (t || "").match(/\[(.*?)\]/);
    return m?.[1]?.trim() || "ETC";
  };

  // 태그 목록(ALL + 자동 생성)
  const tagList = useMemo(() => {
    const set = new Set(sortedBoards.map((b) => extractGameTag(b.title)));
    return ["ALL", ...Array.from(set)];
  }, [sortedBoards]);

  // 검색 + 태그 필터 적용 결과
  const filteredBoards = useMemo(() => {
    const q = query.trim().toLowerCase();

    return sortedBoards.filter((b) => {
      const tag = extractGameTag(b.title);
      const tagOk = activeTag === "ALL" ? true : tag === activeTag;

      const searchOk =
        q === ""
          ? true
          : (b.title || "").toLowerCase().includes(q) ||
            (b.description || "").toLowerCase().includes(q);

      return tagOk && searchOk;
    });
  }, [sortedBoards, query, activeTag]);

  // 화면 전환
  const boardListView = () => {
    setListOk(true);
    setReadOk(false);
    setWriteOk(false);
    setEditOk(false);
    setErrorMessage("");
  };

  // 글 읽기 (조회수 +1)
  const boardRead = (no) => {
    setListOk(false);
    setWriteOk(false);
    setEditOk(false);
    setReadOk(true);
    setErrorMessage("");

    setBoardList((prev) =>
      prev.map((b) => (b.no === no ? { ...b, viewCount: b.viewCount + 1 } : b))
    );

    const selected = boardList.find((b) => b.no === no);
    setBoardInfo(selected);
  };

  // 이전/다음 글 이동 (현재 화면의 필터된 목록 기준)
  const goPrevNext = (dir) => {
    if (!boardInfo) return;
    const list = filteredBoards;
    const idx = list.findIndex((x) => x.no === boardInfo.no);
    if (idx < 0) return;

    const nextIdx = dir === "prev" ? idx - 1 : idx + 1;
    if (nextIdx < 0 || nextIdx >= list.length) return;

    const target = list[nextIdx];
    boardRead(target.no);
  };

  // 추천(좋아요)
  const likePost = (no) => {
    setBoardList((prev) =>
      prev.map((b) => (b.no === no ? { ...b, likes: (b.likes ?? 0) + 1 } : b))
    );

    // 상세 화면이면 boardInfo도 동기화
    if (boardInfo?.no === no) {
      setBoardInfo((prev) =>
        prev ? { ...prev, likes: (prev.likes ?? 0) + 1 } : prev
      );
    }
  };

  // 작성 폼 열기
  const boardWrite = () => {
    setListOk(false);
    setReadOk(false);
    setEditOk(false);
    setWriteOk(true);
    setErrorMessage("");

    setTitle("");
    setDescription("");
    setRating(5);
  };

  // 새 글 저장
  const boardSave = () => {
    if (title.trim() === "" || description.trim() === "") {
      setErrorMessage("제목과 내용을 모두 입력해주세요!");
      return;
    }

    const newBoard = {
      no: (boardList.length + 1).toString(),
      title,
      description,
      viewCount: 0,
      likes: 0,
      rating: Number(rating) || 5,
    };

    setBoardList((prev) => [...prev, newBoard]);
    boardListView();
  };

  // 삭제
  const boardDelete = (no) => {
    if (!window.confirm("정말 삭제할까요?")) return;
    setBoardList((prev) => prev.filter((b) => b.no !== no.toString()));
    boardListView();
  };

  // 수정 폼 열기
  const boardEdit = (no) => {
    setEditOk(true);
    setListOk(false);
    setReadOk(false);
    setWriteOk(false);
    setErrorMessage("");

    const b = boardList.find((x) => x.no === no);
    if (!b) return;

    setEditNo(b.no);
    setEditTitle(b.title);
    setEditDescription(b.description);
    setEditRating(b.rating ?? 5);
  };

  // 수정 저장
  const updateBoard = () => {
    if (editTitle.trim() === "" || editDescription.trim() === "") {
      setErrorMessage("수정할 제목과 내용을 모두 입력해주세요!");
      return;
    }

    setBoardList((prev) =>
      prev.map((b) =>
        b.no === editNo
          ? {
              ...b,
              title: editTitle,
              description: editDescription,
              rating: Number(editRating) || 5,
            }
          : b
      )
    );
    boardListView();
  };

  return (
    <div className="container board-wrap">
      {/* 헤더 */}
      <div className="board-hero">
        <div>
          <h3 className="board-title">GameHub 후기 게시판</h3>
          <p className="board-sub">
            유저들의 한 줄 후기와 팁을 공유해요. 제목을 클릭하면 상세 내용을 볼 수 있어요.
          </p>
        </div>
        <div className="board-hero-actions">
          <Button className="board-btn-primary" onClick={boardWrite}>
            ✍️ 후기 작성
          </Button>
          <Button className="board-btn-ghost" onClick={boardListView}>
            📃 전체 목록
          </Button>
        </div>
      </div>

      {/* 목록 */}
      {listOk && (
        <Card className="board-card">
          <Card.Body>
            <div className="board-card-head">
              <div className="board-card-head-left">
                <h5 className="m-0">전체 후기</h5>
                <Badge bg="secondary">{filteredBoards.length} posts</Badge>
              </div>
              <small className="text-muted">최근 글이 상단에 표시돼요.</small>
            </div>

            {/* 🔎 검색 + 태그 */}
            <div className="board-toolbar">
              <div className="board-search">
                <Form.Control
                  className="board-input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="제목/내용 검색 (예: Hades, 힐링, 보스)"
                />
              </div>

              <div className="board-tags">
                {tagList.map((t) => (
                  <button
                    key={t}
                    className={`tag-chip ${activeTag === t ? "active" : ""}`}
                    onClick={() => setActiveTag(t)}
                    type="button"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="board-table-wrap">
              <Table responsive className="board-table">
                <thead>
                  <tr>
                    <th style={{ width: 70 }}>No</th>
                    <th>제목</th>
                    <th className="d-none d-md-table-cell">내용</th>
                    <th style={{ width: 110 }}>평점</th>
                    <th style={{ width: 90 }}>조회</th>
                    <th style={{ width: 90 }}>추천</th>
                    <th style={{ width: 240 }}>관리</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredBoards.map((b, idx) => (
                    <tr key={b.no}>
                      <td className="td-muted">{idx + 1}</td>

                      <td className="td-title" onClick={() => boardRead(b.no)}>
                        {b.title}
                      </td>

                      <td
                        className="td-desc d-none d-md-table-cell"
                        onClick={() => boardRead(b.no)}
                      >
                        {b.description}
                      </td>

                      <td className="td-muted">
                        <span className="star">{Number(b.rating || 0) >= 1 ? "★" : "☆"}</span>
                        <span className="star">{Number(b.rating || 0) >= 2 ? "★" : "☆"}</span>
                        <span className="star">{Number(b.rating || 0) >= 3 ? "★" : "☆"}</span>
                        <span className="star">{Number(b.rating || 0) >= 4 ? "★" : "☆"}</span>
                        <span className="star">{Number(b.rating || 0) >= 5 ? "★" : "☆"}</span>
                      </td>

                      <td className="td-muted">{b.viewCount}</td>

                      <td>
                        <Button
                          size="sm"
                          className="like-btn"
                          onClick={() => likePost(b.no)}
                        >
                          👍 {b.likes ?? 0}
                        </Button>
                      </td>

                      <td>
                        <div className="board-actions">
                          <Button
                            size="sm"
                            className="board-action-btn read"
                            onClick={() => boardRead(b.no)}
                          >
                            읽기
                          </Button>
                          <Button
                            size="sm"
                            className="board-action-btn edit"
                            onClick={() => boardEdit(b.no)}
                          >
                            수정
                          </Button>
                          <Button
                            size="sm"
                            className="board-action-btn del"
                            onClick={() => boardDelete(b.no)}
                          >
                            삭제
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredBoards.length === 0 && (
                    <tr>
                      <td colSpan={7} className="td-muted" style={{ padding: 18 }}>
                        검색 결과가 없어요. 다른 키워드로 찾아보세요.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* 읽기 */}
      {readOk && boardInfo && (
        <Card className="board-card">
          <Card.Body>
            <div className="board-read-head">
              <div>
                <h5 className="m-0">{boardInfo.title}</h5>
                <div className="board-meta">
                  <span>조회수</span>
                  <b>{boardInfo.viewCount}</b>
                  <span>추천</span>
                  <b>{boardInfo.likes ?? 0}</b>
                  <span>평점</span>
                  <b>{boardInfo.rating ?? 5} / 5</b>
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Button className="board-btn-ghost" onClick={() => likePost(boardInfo.no)}>
                  👍 추천
                </Button>
                <Button className="board-btn-ghost" onClick={boardListView}>
                  ← 목록
                </Button>
              </div>
            </div>

            <div className="board-read-body">
              <p className="m-0">{boardInfo.description}</p>
            </div>

            {/* 이전/다음 */}
            <div className="board-nav">
              <Button
                className="board-btn-ghost"
                onClick={() => goPrevNext("prev")}
                disabled={filteredBoards.findIndex((x) => x.no === boardInfo.no) <= 0}
              >
                ← 이전글
              </Button>

              <Button
                className="board-btn-ghost"
                onClick={() => goPrevNext("next")}
                disabled={
                  filteredBoards.findIndex((x) => x.no === boardInfo.no) ===
                  filteredBoards.length - 1
                }
              >
                다음글 →
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* 작성 */}
      {writeOk && (
        <Card className="board-card">
          <Card.Body>
            <div className="board-form-head">
              <h5 className="m-0">후기 작성</h5>
              <Button className="board-btn-ghost" onClick={boardListView}>
                ← 목록
              </Button>
            </div>

            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <Form.Group className="mb-3">
              <Form.Label className="board-label">제목</Form.Label>
              <Form.Control
                className="board-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예) [Portal 2] 퍼즐이 미쳤다"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="board-label">내용</Form.Label>
              <Form.Control
                className="board-input"
                as="textarea"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="플레이 팁 / 좋았던 점 / 아쉬운 점 등을 적어주세요."
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="board-label">평점</Form.Label>
              <Form.Select
                className="board-input"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value={5}>★★★★★ (5)</option>
                <option value={4}>★★★★☆ (4)</option>
                <option value={3}>★★★☆☆ (3)</option>
                <option value={2}>★★☆☆☆ (2)</option>
                <option value={1}>★☆☆☆☆ (1)</option>
              </Form.Select>
            </Form.Group>

            <div className="board-form-actions">
              <Button className="board-btn-primary" onClick={boardSave}>
                저장
              </Button>
              <Button className="board-btn-ghost" onClick={boardListView}>
                취소
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* 수정 */}
      {editOk && (
        <Card className="board-card">
          <Card.Body>
            <div className="board-form-head">
              <h5 className="m-0">후기 수정</h5>
              <Button className="board-btn-ghost" onClick={boardListView}>
                ← 목록
              </Button>
            </div>

            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <Form.Group className="mb-3">
              <Form.Label className="board-label">제목</Form.Label>
              <Form.Control
                className="board-input"
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="수정된 제목"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="board-label">내용</Form.Label>
              <Form.Control
                className="board-input"
                as="textarea"
                rows={5}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="수정된 내용"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="board-label">평점</Form.Label>
              <Form.Select
                className="board-input"
                value={editRating}
                onChange={(e) => setEditRating(e.target.value)}
              >
                <option value={5}>★★★★★ (5)</option>
                <option value={4}>★★★★☆ (4)</option>
                <option value={3}>★★★☆☆ (3)</option>
                <option value={2}>★★☆☆☆ (2)</option>
                <option value={1}>★☆☆☆☆ (1)</option>
              </Form.Select>
            </Form.Group>

            <div className="board-form-actions">
              <Button className="board-btn-primary" onClick={updateBoard}>
                수정 저장
              </Button>
              <Button className="board-btn-ghost" onClick={boardListView}>
                취소
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default FruitBoard;