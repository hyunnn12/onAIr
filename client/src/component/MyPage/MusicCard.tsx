import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useState } from "react";
import MusicBoxModal from "../Common/MusicBoxModal";
import MusicAddModal from "../Common/MusicAddModal";
import MusicDetailModal from "./MusicDetailModal";
import dummyData from "./dummyData.json";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "./MusicCard.module.css";

function MusicList() {
  /** state */
  const userData = useSelector((state: RootState) => state.user); //리덕스에 있는 회원데이터
  const [isMusicBoxModalOpen, setMusicBoxModalOpen] = useState<boolean>(false); //보관함 추가 모달
  const [myMusicBox, setMyMusicBox] = useState(dummyData.my_music_box); //전체 보관함 관리 state
  const [playlistData, setPlaylistData] = useState(dummyData.playlist_info); //플레이리스트별 관리 state
  const [newPlaylistTitle, setNewPlaylistTitle] = useState(""); //새로운 플레이리스트 제목 관리 state
  const [isMusicAddModalOpen, setMusicAddModalOpen] = useState<boolean>(false); //음악 더하기 변수
  const [isMusicDetailModalOpen, setMusicDetailModalOpen] =
    useState<boolean>(false); //전체 보관함 음악 상세 보기 모달 state
  const [selectedPlaylistTitle, setSelectedPlaylistTitle] =
    useState<string>(""); //리스트 이름 관리 state

  /** function */
  //보관함추가 실행 함수
  const MusicBoxModalOpen = () => {
    setMusicBoxModalOpen(true);
  };

  //보관함추가 닫기 함수
  const MusicBoxModalClose = () => {
    setMusicBoxModalOpen(false);
  };

  //보관함 추가 함수
  const addMusicBox = () => {
    const newPlaylist = {
      playlistName: newPlaylistTitle,
      playlistCount: 0,
      playlistImage: "https://icons8.com/icon/Xvnz23NvQSwk/shield",
    };
    setPlaylistData(prevData => [...prevData, newPlaylist]);
    setNewPlaylistTitle("");
    MusicBoxModalClose();
  };

  //음악검색 모달 열기 함수
  const openMusicAddModal = () => {
    setMusicAddModalOpen(true);
  };
  //음악검색 모달 닫기 함수
  const closeMusicAddModal = () => {
    setMusicAddModalOpen(false);
  };

  //플레이리스트 이름 보내기 함수
  const openMusicDetailModal = (playlistName: string) => {
    setSelectedPlaylistTitle(playlistName);
    setMusicDetailModalOpen(true);
  };

  // 음악 리스트상세보기 모달 닫기 함수
  const closeMusicDetailModal = () => {
    setMusicDetailModalOpen(false);
  };

  return (
    <div>
      <List>
        <ListItem alignItems="flex-start" className={styles.hoverableListItem}>
          <ListItemAvatar>
            <AddIcon
              color="primary"
              className={styles.audiotrackIcon}
              onClick={openMusicAddModal}
            />
          </ListItemAvatar>
          <ListItemText
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <Typography
              className={styles.textPrimary}
              style={{ marginTop: "13px" }}
            >
              플레이리스트 추가
            </Typography>
          </ListItemText>
        </ListItem>

        {/* 전체보관함 */}
        <ListItem alignItems="flex-start" className={styles.hoverableListItem}>
          <ListItemAvatar>
            <AudiotrackIcon color="primary" className={styles.audiotrackIcon} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography
                className={styles.textPrimary}
                onClick={() => openMusicDetailModal("전체보관함")}
                style={{ cursor: "pointer" }}
              >
                전체보관함
              </Typography>
            }
            secondary={
              <Typography
                className={styles.textSecondary}
                component="span"
                variant="body2"
              >
                {myMusicBox} 곡
              </Typography>
            }
          />
          <Button
            className={styles.playButton}
            onClick={() => {
              if (myMusicBox === 0) {
                alert("재생할 노래가 없습니다!");
              }
            }}
          >
            <PlayCircleOutlineIcon />
          </Button>
          <MusicDetailModal
            isOpen={isMusicDetailModalOpen}
            onClose={closeMusicDetailModal}
            title={selectedPlaylistTitle}
            songCount={myMusicBox}
          />
        </ListItem>
        <MusicAddModal
          isOpen={isMusicAddModalOpen}
          onClose={closeMusicAddModal}
        />
        {/* 플레이리스트  */}
        {playlistData.map((playlist, index) => (
          <ListItem
            key={index}
            alignItems="flex-start"
            className={styles.hoverableListItem}
            style={{ cursor: "pointer" }}
          >
            <ListItemAvatar>
              <Avatar
                variant="square"
                src={playlist.playlistImage}
                alt={playlist.playlistName}
                onClick={() => openMusicDetailModal(playlist.playlistName)}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  className={styles.textPrimary}
                  onClick={() => openMusicDetailModal(playlist.playlistName)}
                >
                  {playlist.playlistName}
                </Typography>
              }
              secondary={
                <Typography
                  className={styles.textSecondary}
                  component="span"
                  variant="body2"
                >
                  {playlist.playlistCount} 곡
                </Typography>
              }
            />
            <Button
              className={styles.playButton}
              onClick={() => {
                if (playlist.playlistCount === 0) {
                  alert("재생할 노래가 없습니다!");
                }
              }}
            >
              <PlayCircleOutlineIcon />
            </Button>
            <MusicDetailModal
              isOpen={
                isMusicDetailModalOpen &&
                selectedPlaylistTitle === playlist.playlistName
              }
              onClose={closeMusicDetailModal}
              title={playlist.playlistName}
              songCount={playlist.playlistCount}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default MusicList;