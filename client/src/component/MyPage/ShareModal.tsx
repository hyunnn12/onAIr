// PlayListModal.tsx
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
type ShareModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function ShareModal({ isOpen, onClose }: ShareModalProps) {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          width: 400,
          backgroundColor: "white",
          border: "2px solid #000",
          boxShadow: 24,
          p: 2,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          공유하시겠습니까?
        </Typography>
        {/* 이 밑 공유 확인 누르면 실시간에 저장 */}
        {/* <Button onClick={onClose}>확인</Button> */}
        <Button onClick={onClose}>닫기</Button>

        {/* 이 밑 자리에 플레이리스트 가져오고 거기에 + 버튼 */}
        {/* <Button onClick={}>+</Button> */}
      </Box>
    </Modal>
  );
}

export default ShareModal;